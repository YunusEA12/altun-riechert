# Sicherheitsmonitor – Ausgangsstand

Erste Prüfung und lokale Härtung: 25.10.2026.

Git-Basis: `de6a7b8d8bce858cdbcd408551970df9d13c542d`. Es gibt zahlreiche uncommittierte Änderungen von Claude und Codex; der Commit allein bezeichnet deshalb nicht den geprüften Website-Stand. SHA-256-Hashes der öffentlichen Dateien und Prüfwerkzeuge stehen in `docs/security-baseline.json`.

## Ausgeführt

- Unabhängiger Sicherheitsagent: statische Dateien und lokale HTTP-Auslieferung geprüft.
- `python -m unittest discover -s scripts -p 'test_*.py' -v`: **13 Tests bestanden** (11 Scanner-Tests, 2 Exporttests mit mehreren Unterfällen).
- `node scripts/test_demo_security.cjs`: **PASS**, einschließlich Typ-/Anzahl-/Größenlimits, veralteter asynchroner Ergebnisse, Fehlerausgaben, Submit-Guards und Skriptsyntax. Dies sind lokale JS-Tests mit Test-Doubles, kein Browser-No-JS-Test.
- `python scripts/security_check.py`: **13 Assets, 0 Fehler, 1 Warnung** (`INTERNAL_HISTORY`). Der Standardmodus endet bei Warnungen mit Exit 0; `--strict` endet hier absichtlich mit Exit 1.
- Neuer Export `dist/site-20261025-183023-63fe8891`: Offline-Prüfung mit `--no-git --strict` ohne Fehler/Warnungen. Der Export wurde nach den Demo-Fixes erzeugt. Es wurde nichts veröffentlicht.
- Unabhängiger Browser-Smoke: Beide Demo-Schaltflächen zeigen ihre jeweilige Bestätigung; keine Warn-/Fehlerlogs in der abgefragten Sitzung. Keine tatsächlichen Kontaktdaten eingegeben, keine Fotos hochgeladen.

## Lokal behoben / vorbereitet

- S-03: Demo-Schaltflächen ohne native Submit-Funktion; Submit-Guard und ergänzende Meta-CSP `form-action 'none'`, `base-uri 'self'`, `object-src 'none'`; klare Demo- und No-JS-Hinweise. Kein umfassender CSP-Schutz behauptet.
- S-04: Lokale Vorschau begrenzt auf 6 Bilder, je 5 MiB, zusammen 20 MiB; JPG/PNG/WebP; alte Lesevorgänge abbrechen und veraltete Ergebnisse verwerfen.
- Export mit expliziter Dateiliste erstellt. Pfad-Traversal, interne Ordner auch in anderer Groß-/Kleinschreibung sowie Links/Junctions werden beim Export abgewehrt. Keine automatische Löschung oder Veröffentlichung.
- `.env.*` und `dist/` ignoriert; `.env.example` muss bewusst geheimnisfrei bleiben.
- Tägliche lokale Codex-Automation **Website-Sicherheitsprüfung** eingerichtet (09:00). Konfiguration/Prompt in der App; keine permanente Echtzeitüberwachung.

## Bekannte offene Punkte — ohne Änderung nicht erneut melden

1. **S-01:** Interne Briefdatei in alter Git-Historie und lokalen Remote-Refs vorhanden. Öffentlichen Ist-Zustand nicht live abgefragt. Entscheidung/Bereinigung mit Yunus und Calvin erforderlich; keine automatische Historienänderung.
2. **S-02:** Arbeitsordner-Server liefert interne Dateien, ist jedoch nur an 127.0.0.1 gebunden. Nicht tunneln. Produktionshosting ist noch nicht auf den neuen Export umgestellt.
3. **S-05:** Produktive HTTPS-/Header-/Zugriffsprüfung erst nach geklärtem Hosting. CSP der Demo ist eine Ergänzung, keine vollständige Script-Policy; Frame-Schutz muss am tatsächlichen Hoster erfolgen.
4. Kein vollständiger Penetrationstest, kein vollständiger Secret-Scan der Historie und keine Prüfung von Hostingkonten/MFA/DNS.

## Nächster Lauf

Dateihashes und Git-Änderungen vergleichen, Prüfsuite ausführen, neue Eingaben/Netzwerkpfade manuell beurteilen. Bekannte Warnungen bleiben offen, bis ihre Behebung belegt ist. Nur bei neuem handlungsrelevantem Befund, wichtigem Fix oder fehlgeschlagener Prüfung benachrichtigen.
