#!/usr/bin/env python3
"""Offline heuristics for this static site; no exploit execution or network I/O."""
from __future__ import annotations

import argparse
from dataclasses import dataclass
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import sys
from urllib.parse import unquote, urlsplit


EXCLUDED = {".git", ".claude", ".codex", ".venv", "venv", "node_modules",
            "__pycache__", "docs", "scripts", "tests", "referenz", "_briefe",
            "obsidian-vault", "dist"}
EXTENSIONS = {".html", ".htm", ".css", ".js", ".mjs", ".svg"}
INTERNAL = ("_briefe/", "obsidian-vault/", ".env", ".claude/settings.local.json")
SECRET_PATTERNS = (
    r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----",
    r"\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|AKIA[A-Z0-9]{16})\b",
    r"(?i)\b(?:api[_-]?key|api[_-]?secret|access[_-]?token|client[_-]?secret|password)\b\s*[:=]\s*['\"][^'\"\r\n]{8,}['\"]",
)


@dataclass(frozen=True, order=True)
class Finding:
    file: str
    line: int
    level: str
    code: str
    message: str


class Audit:
    def __init__(self, root: Path):
        self.root = root.resolve()
        self.findings: set[Finding] = set()
        self.files = 0
        self.manifest: set[str] | None = None

    def load_manifest(self):
        path = self.root / "scripts/public-files.json"
        if not path.exists():
            return
        try:
            entries = json.loads(path.read_text(encoding="utf-8-sig"))
            if not isinstance(entries, list) or not entries or not all(isinstance(p, str) for p in entries):
                raise ValueError("invalid manifest")
            self.manifest = set(entries)
            for entry in entries:
                candidate = self.root / entry
                if "\\" in entry or ":" in entry or Path(entry).is_absolute() or ".." in Path(entry).parts or any(part in EXCLUDED for part in Path(entry).parts):
                    raise ValueError("unsafe manifest path")
                if entry != ".nojekyll" and any(part.startswith(".") for part in Path(entry).parts):
                    raise ValueError("hidden manifest path")
                if not candidate.resolve().is_relative_to(self.root) or not candidate.is_file():
                    raise ValueError("missing manifest entry")
        except (ValueError, OSError, UnicodeError):
            self.report(path, 1, "ERROR", "MANIFEST_INVALID", "Public-Manifest enthaelt ungueltige/interne Pfade oder fehlende Dateien; Export pruefen.")
            self.manifest = None

    def report(self, path: Path, line: int, level: str, code: str, message: str):
        self.findings.add(Finding(path.relative_to(self.root).as_posix(), line, level, code, message))

    def url(self, path: Path, line: int, value: str, embedded: bool):
        value = value.strip()
        if not value or value.startswith("#"):
            return
        # HTMLParser has already decoded character references. Browsers ignore
        # ASCII controls in schemes and treat backslashes as slashes in URLs.
        normalized = re.sub(r"[\x00-\x20\x7f]", "", value).replace("\\", "/")
        try:
            parsed = urlsplit(normalized)
        except ValueError:
            self.report(path, line, "WARN", "URL_PARSE", "URL nicht eindeutig lesbar; manuell pruefen (Wert ausgeblendet).")
            return
        if parsed.scheme in {"javascript", "vbscript", "file"}:
            self.report(path, line, "WARN", "URL_SCHEME", "Potenziell gefaehrliches URL-Schema; Kontext pruefen (Wert ausgeblendet).")
            return
        if parsed.scheme in {"http", "https", "ws", "wss"} or parsed.netloc:
            if embedded:
                self.report(path, line, "ERROR", "EXTERNAL_RESOURCE", "Externe Einbindung verletzt die lokale Ressourcen-Regel (URL ausgeblendet).")
            return
        if parsed.scheme == "data":
            if not normalized.lower().startswith(("data:image/", "data:font/", "data:application/font")):
                self.report(path, line, "WARN", "DATA_URL", "Eingebettete Data-URL auf ausfuehrbare Inhalte pruefen (Wert ausgeblendet).")
            return
        if parsed.scheme in {"mailto", "tel"} and not embedded:
            return
        if parsed.scheme:
            self.report(path, line, "WARN", "URL_SCHEME", "Ungeprueftes URL-Schema; Kontext pruefen (Wert ausgeblendet).")
            return
        local = unquote(urlsplit(value.replace("\\", "/")).path)
        candidate = self.root / local.lstrip("/") if local.startswith("/") else path.parent / local
        try:
            candidate = candidate.resolve()
            candidate.relative_to(self.root)
        except (ValueError, OSError):
            self.report(path, line, "ERROR", "OUTSIDE_ROOT", "Lokales URL-Ziel liegt ausserhalb des Website-Verzeichnisses.")
            return
        if candidate.is_dir():
            candidate = candidate / "index.html"
        if not candidate.is_file():
            self.report(path, line, "ERROR", "MISSING_RESOURCE", "Lokales Link- oder Ressourcen-Ziel fehlt (URL-Wert ausgeblendet).")
        elif self.manifest is not None and candidate.relative_to(self.root).as_posix() not in self.manifest:
            self.report(path, line, "ERROR", "NOT_IN_MANIFEST", "Lokales Ziel fehlt im Public-Manifest und waere im Export nicht erreichbar.")

    def css(self, path: Path, text: str, first_line: int = 1):
        # Preserve line numbers while excluding commented-out examples.
        text = re.sub(r"/\*.*?\*/", lambda m: "\n" * m[0].count("\n"), text, flags=re.S)
        for match in re.finditer(r"url\(\s*(['\"]?)(.*?)\1\s*\)|@import\s+(['\"])(.*?)\3", text, re.I | re.S):
            self.url(path, first_line + text[:match.start()].count("\n"), match[2] if match[2] is not None else match[4], True)

    def js(self, path: Path, text: str, first_line: int = 1):
        # Heuristic, not a JS parser. Never print matched values or source lines.
        for match in re.finditer(r"\b(?:innerHTML|outerHTML)\s*(?:\+?=)\s*([^;\n]+)", text):
            rhs = match[1].strip()
            # Complete static quoted strings are not evidence of attacker input.
            if re.fullmatch(r"'(?:[^'\\]|\\.)*'|\"(?:[^\"\\]|\\.)*\"|`[^`$]*`", rhs):
                continue
            self.report(path, first_line + text[:match.start()].count("\n"), "WARN", "HTML_SINK", "Dynamischer HTML-Sink: Herkunft und Bereinigung der Daten manuell pruefen; kein XSS-Nachweis.")
        for match in re.finditer(r"\b(?:insertAdjacentHTML|document\s*\.\s*write(?:ln)?|eval|Function)\s*\(", text):
            self.report(path, first_line + text[:match.start()].count("\n"), "WARN", "CODE_OR_HTML_SINK", "HTML-/Code-Ausfuehrungsstelle manuell pruefen; kein Schwachstellennachweis.")
        resources = r"(?P<kind>\b(?:fetch|import|Worker|WebSocket|EventSource)\s*\(|\bimport\s+|\bfrom\s+|\.src\s*=\s*)(['\"])([^'\"\n]+)\2"
        for match in re.finditer(resources, text):
            line = first_line + text[:match.start()].count("\n")
            value = match[3]
            # fetch/DOM URLs resolve against the document, imports against the
            # module. Do not fabricate missing resources with the wrong base.
            if not re.match(r"(?:[A-Za-z][\w+.-]*:|//)", value) and not match["kind"].lstrip().startswith(("import", "from")):
                self.report(path, line, "WARN", "JS_RESOURCE", "Lokale JS-Ressource im Browser pruefen; Dokument-Basis ist statisch nicht bestimmt.")
            else:
                self.url(path, line, value, True)

    def scan(self):
        for path in sorted(self.root.rglob("*")):
            relative = path.relative_to(self.root)
            if any(part in EXCLUDED for part in relative.parts) or path.suffix.lower() not in EXTENSIONS:
                continue
            if self.manifest is not None and relative.as_posix() not in self.manifest:
                self.report(path, 1, "WARN", "UNLISTED_ASSET", "Asset fehlt im Public-Manifest; bewusst ausgeschlossen oder Manifest ergaenzen.")
                continue
            if not path.is_file():
                continue
            if not path.resolve().is_relative_to(self.root):
                self.report(path, 1, "ERROR", "OUTSIDE_ROOT", "Asset-Symlink zeigt aus dem Website-Verzeichnis heraus.")
                continue
            try:
                text = path.read_text(encoding="utf-8-sig")
            except (OSError, UnicodeError):
                self.report(path, 1, "ERROR", "READ_ERROR", "Asset kann nicht als UTF-8 gelesen werden.")
                continue
            self.files += 1
            if path.suffix.lower() in {".html", ".htm", ".svg"}:
                parser = Page(self, path)
                parser.feed(text)
                parser.close()
            elif path.suffix.lower() == ".css":
                self.css(path, text)
            else:
                self.js(path, text)
            for pattern in SECRET_PATTERNS:
                for match in re.finditer(pattern, text):
                    self.report(path, text[:match.start()].count("\n") + 1, "WARN", "SECRET_HINT", "Moeglicher Schluessel/Token: manuell pruefen, bei Echtheit widerrufen. Wert wird nie ausgegeben.")

    def git(self):
        if not (self.root / ".git").exists():
            self.report(self.root / ".git", 1, "INFO", "GIT_SKIPPED", "Kein Git-Root: Index und Historie nicht geprueft.")
            return
        for args, code in [(["ls-files", "-z"], "INTERNAL_TRACKED"),
                           (["log", "--all", "--format=", "--name-only", "--", *INTERNAL], "INTERNAL_HISTORY")]:
            try:
                result = subprocess.run(["git", "-C", str(self.root), *args], capture_output=True, timeout=30)
            except (OSError, subprocess.TimeoutExpired):
                self.report(self.root / ".git", 1, "WARN", "GIT_UNAVAILABLE", "Git-Pruefung nicht vollstaendig ausgefuehrt.")
                return
            if result.returncode:
                self.report(self.root / ".git", 1, "WARN", "GIT_UNAVAILABLE", "Git-Pruefung fehlgeschlagen; Details bewusst ausgeblendet.")
                continue
            paths = result.stdout.decode("utf-8", errors="replace").replace("\0", "\n").splitlines()
            matches = sorted({p for p in paths if any(p == prefix or p.startswith(prefix) for prefix in INTERNAL)})
            if matches:
                self.report(self.root / ".git", 1, "WARN", code,
                            f"{len(matches)} interne Pfade in {'Index' if code == 'INTERNAL_TRACKED' else 'lokaler Git-Historie'}; Vertraulichkeit manuell pruefen. Keine automatische Aenderung.")


class Page(HTMLParser):
    def __init__(self, audit: Audit, path: Path):
        super().__init__(convert_charrefs=True)
        self.audit, self.path = audit, path
        self.block = None
        self.block_line = 1
        self.block_text: list[str] = []

    def handle_starttag(self, tag, attributes):
        attrs = dict(attributes)
        line = self.getpos()[0]
        for key, value in attributes:
            if value is None:
                continue
            if key.startswith("on"):
                self.audit.report(self.path, line, "WARN", "EVENT_HANDLER", "Inline-Eventhandler vorhanden; CSP und Datenherkunft manuell pruefen.")
            if key in {"src", "poster", "background"} or (key == "data" and tag == "object"):
                self.audit.url(self.path, line, value, True)
            elif key in {"href", "xlink:href", "action", "formaction"}:
                # Ordinary navigation, mail and canonical/alternate links do not load assets.
                rel = set(attrs.get("rel", "").lower().split())
                embedded = tag not in {"a", "area", "base"} and not (tag == "link" and rel <= {"canonical", "alternate", "author", "license"})
                self.audit.url(self.path, line, value, embedded)
            elif key == "srcset":
                if "data:" in value.lower():
                    self.audit.report(self.path, line, "WARN", "SRCSET_REVIEW", "Kompakte srcset-Liste manuell pruefen; Parser ist heuristisch.")
                else:
                    for candidate in value.split(","):
                        tokens = candidate.split()
                        if tokens:
                            self.audit.url(self.path, line, tokens[0], True)
            elif key == "style":
                self.audit.css(self.path, value, line)
            elif key == "srcdoc":
                self.audit.report(self.path, line, "WARN", "SRCDOC", "Eingebettetes HTML manuell pruefen; wird nicht rekursiv analysiert.")
        if tag == "base":
            self.audit.report(self.path, line, "WARN", "BASE_URL", "base-Element vorhanden; lokale Pfadpruefung beruecksichtigt es nicht.")
        if tag == "meta" and attrs.get("http-equiv", "").lower() == "refresh":
            self.audit.report(self.path, line, "WARN", "META_REFRESH", "Automatische Weiterleitung manuell pruefen (Ziel ausgeblendet).")
        if tag in {"style", "script"}:
            self.block, self.block_line, self.block_text = tag, line, []

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        self.handle_endtag(tag)

    def handle_data(self, data):
        if self.block:
            self.block_text.append(data)

    def handle_endtag(self, tag):
        if tag == self.block:
            text = "".join(self.block_text)
            (self.audit.css if tag == "style" else self.audit.js)(self.path, text, self.block_line)
            self.block = None


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    parser.add_argument("--strict", action="store_true", help="Auch Warnungen ergeben Exitcode 1.")
    parser.add_argument("--no-git", action="store_true", help="Index/History bewusst auslassen (z.B. Export-Paket).")
    args = parser.parse_args(argv)
    if not args.root.is_dir():
        parser.error("--root muss ein vorhandenes Verzeichnis sein")
    audit = Audit(args.root)
    audit.load_manifest()
    audit.scan()
    if not args.no_git:
        audit.git()
    if not audit.files:
        audit.report(audit.root / "index.html", 1, "ERROR", "NO_ASSETS", "Keine pruefbaren HTML/CSS/JS/SVG-Assets gefunden.")
    for item in sorted(audit.findings):
        print(f"{item.level} {item.code} {item.file}:{item.line} - {item.message}")
    errors = sum(item.level == "ERROR" for item in audit.findings)
    warnings = sum(item.level == "WARN" for item in audit.findings)
    print(f"Geprueft: {audit.files} Assets; {errors} Fehler; {warnings} Warnungen. Kein Penetrationstest oder Sicherheitsnachweis.")
    return int(bool(errors or (args.strict and warnings)))


if __name__ == "__main__":
    sys.exit(main())
