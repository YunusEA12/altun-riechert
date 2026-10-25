# Claude-Bericht Runde 2 (25.10.2026)

Grundlage: `docs/codex-nachpruefung-2026-10-25.md`, `docs/agenten-zusammenarbeit.md`, `docs/security-monitor.md`.
Vor den Änderungen geprüft: `index.html`, `assets/site.css`, `assets/site.js` waren seit Claudes letzter Runde unverändert (Zeitstempel), keine fremden Änderungen überschrieben. Dateien von Codex (`scripts/`, `beispiel/`, Security-Dokumente, `README.md`, `.gitignore`) wurden **nicht** verändert.

**Status aller Punkte unten: umgesetzt, wartet auf unabhängige Nachprüfung durch Codex.**

---

## Umgesetzt

### UI-01 – Logo-Kachel
- **Ursache:** `.logo-tile` hatte `display: inline-grid`; die Textknoten „A“, „R“ und das `<span>` „&“ wurden zu einzelnen Grid-Zeilen.
- **Fix:** `assets/site.css` → `.logo-tile` nutzt `inline-flex` mit `align-items/justify-content: center` und `white-space: nowrap`. Gilt für Header (`.logo-tile`) und Footer (`.logo-tile--lg`).
- **Test (1440 × 900, Browser-Pane):** Positionen je Teil – Header: A links 51,0 / & 61,3 / R 72,6 px, Oberkanten 42,2 / 41,2 / 42,2 px; Footer: A 1325,7 / & 1340,7 / R 1357,2 px. Zoom-Screenshot zeigt „A&R“ einzeilig in der Kachel.

### UI-02 – Header und Menü bei geringer Höhe / Zoom
- **Menü** (`assets/site.css`): Zentrierung per `margin: auto 0` auf der Liste statt `align-items: center` am Scroll-Container (der schnitt bei Überlauf oben ab). `flex-direction: column`, `overflow-y: auto`, `overscroll-behavior: contain`, `scroll-padding-top` (100 px Desktop / 80 px Mobile), damit fokussierte Links nicht unter den festen Header rutschen.
- **Seite:** `html { scroll-padding-top: 90px }` – Anker-Ziele und Tastaturfokus nicht unter dem festen Header.
- **Hero** (`assets/site.js`): Fixierter Hero nur noch bei `innerHeight >= 640`; darunter (kleines Fenster, Desktop-Zoom) normale Scroll-Leiste, damit Überschrift und CTA nicht oben abgeschnitten werden.
- **Test:** Menü geöffnet, jeden der 7 Links per `focus()` angesprungen, Lage gegen Header-Unterkante und Fensterhöhe geprüft:

| Viewport | Menü scrollt | 7/7 Links sichtbar, nicht verdeckt | Escape → Fokus auf Menü-Button | Hero fixiert | seitlicher Überlauf |
|----------|--------------|-------------------------------------|-------------------------------|--------------|---------------------|
| 1440 × 500 | ja | ja | ja | nein (gewollt, < 640 px) | – |
| 375 × 500 | nein (passt) | ja | ja | – (Mobile) | nein |
| 812 × 375 (Handy quer) | ja | ja | ja | – (Mobile) | nein |

- **Nicht getestet:** echter Browser-Zoom (200/400 %), Screenreader. Der Zoom-Fall wurde über kleine Viewports angenähert.

### Befund 7 – Marken-Tokens doppelt
- `index.html` lädt jetzt `brand_assets/tokens.css` vor `assets/site.css`.
- `assets/site.css`: eigene `@font-face` entfernt (kommt aus `tokens.css`); `--petrol`/`--amber` lesen `var(--brand-petrol, #123B40)` / `var(--brand-amber, #E39A2D)` – die Literale sind nur Rückfall.
- **Test:** `--brand-petrol` und `--petrol` = `#123B40`, Kachel-Hintergrund `rgb(18, 59, 64)`, `document.fonts`: „Archivo: loaded“. `tokens.css` steht bereits in `scripts/public-files.json`.

### RELEASE-01 – lokaler Teil
- Hosting selbst nicht geändert (keine Entscheidung, kein Deployment).
- Neuer Export: `dist/site-20261025-183442-177a7a7e` (`python scripts/build_public.py`).
- **Vollständigkeit:** Alle `href`/`src`-Verweise aus `index.html`, `impressum.html`, `datenschutz.html`, `beispiel/index.html` sowie alle `url()` in den CSS-Dateien des Exports gegen die Dateien im Export geprüft: **42 Verweise, 0 fehlend.**
- `python scripts/security_check.py --root dist/site-20261025-183442-177a7a7e --no-git --strict`: **13 Assets, 0 Fehler, 0 Warnungen.**

## Weitere Prüfungen

- `python -m unittest discover -s scripts -p 'test_*.py'`: **13 Tests OK.**
- `node scripts/test_demo_security.cjs`: **PASS.**
- `python scripts/security_check.py` (Arbeitsordner): 13 Assets, 0 Fehler, 1 Warnung `INTERNAL_HISTORY` (bekannt, S-01).
- Browser (localhost, 1440 px): keine Konsolenfehler; Netzwerk nur `localhost:8765` (Startseite, Schrift, `tokens.css`, `site.css`, `site.js`, Bilder) – keine externen Anfragen.
- **Hinweis:** `docs/security-baseline.json` enthält Hashes vom Stand vor dieser Runde. `index.html`, `assets/site.css`, `assets/site.js` wurden absichtlich geändert; Baseline beim nächsten Lauf neu setzen.

## Geänderte Dateien

| Datei | Änderung |
|-------|----------|
| `assets/site.css` | Logo-Kachel (Flex), Menü-Scroll/Zentrierung, `scroll-padding-top`, Tokens aus `tokens.css`, doppeltes `@font-face` entfernt |
| `assets/site.js` | Hero nur bei Höhe ≥ 640 px fixiert |
| `index.html` | `brand_assets/tokens.css` eingebunden |
| `CLAUDE.md` | Export-Ablauf und Zusammenarbeit ergänzt |
| `docs/claude-bericht-2026-10-25-runde2.md` | dieser Bericht |

## Nicht bearbeitet – braucht Yunus/Team

| ID | Grund |
|----|-------|
| CONTENT-01 | Echte Fotos und Hamzas Angaben fehlen; werden nicht erfunden. Prompts für KI-Symbolbilder: `docs/bild-video-prompts.md` |
| CONTENT-02 | Englische Version: sinnvoll erst, wenn die deutschen Texte freigegeben sind (sonst doppelte Pflege). Rechtsform/Telefon/USt-IdNr. nur vom Team |
| DESIGN-01 | Seitenlänge und Footer-Größe: Entscheidung Yunus |
| RELEASE-01 (Hosting) | Hoster noch nicht gewählt; Export ist vorbereitet und geprüft |
| S-01 | Firmenliste in Git-Historie: Entscheidung Yunus + Calvin, keine Historienänderung durch Claude |
