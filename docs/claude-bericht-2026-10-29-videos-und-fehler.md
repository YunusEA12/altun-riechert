# Claude-Bericht 29.10.2026: Fehlerbehebung, Feinschliff, eigene Videos

**Auftrag (Calvin):** Seite anschauen, analysieren, alle Fehler beheben, schöner gestalten bei gleichem Inhalt, Videos dort einbauen, wo noch keine sind – nur Material ohne Abmahnrisiko.

**Branch:** `claude/seite-ueberarbeitung` auf Basis `origin/main` (`74801ca`).

## Gefundene und behobene Fehler

| # | Fehler | Ursache | Behoben in |
|---|---|---|---|
| 1 | Ablauf: Ziffern 1/2/3 standen oben links im Kreis statt mittig (alle Bildschirmgrößen) | Effekt-Block überschrieb `display:flex` mit `inline-block`; Hover-`transform` hob das `translateY(-50%)` auf | `assets/site.css` |
| 2 | `.nb`-Regel wirkungslos | Übrig gebliebener Merge-Konfliktmarker `=======` am Ende der Datei | `assets/site.css` |
| 3 | Panel „Automatisierung“ brach bei 1024–1280 px mitten im Wort um („Automatisierun / g“) | feste 56 px bei begrenzter Breite | `assets/site.css` (`min(56px, 3.5vw)`) |
| 4 | Impressum/Datenschutz: Logo-Kachel „A & R“ stand untereinander und ragte aus der Kachel | `display:grid` machte jedes Zeichen zu einer eigenen Zeile | `style.css` |
| 5 | Ohne JavaScript zeigte der Browser Wiedergabe-Leisten über den Panel-Vorschaubildern | Browser blenden bei abgeschaltetem JS Steuerelemente ein | `assets/site.css` |
| 6 | Datenschutzerklärung nannte GitHub Pages als Hoster, die Seite liegt bei IONOS | veralteter Stand | `datenschutz.html` (Abschnitt 2) |

Geprüft ohne Befund: keine Konsolenfehler, keine externen Anfragen, kein horizontales Scrollen (375/768/1280/1440), alle Links und Anker erreichbar, Menü per Tastatur (Escape, Fokus zurück), „E-Mail-Adresse kopieren“, DE/EN-Struktur identisch.

## Videos (alle selbst erstellt)

Kein Stock-Material, keine KI-Clips Dritter, keine Musik → kein Lizenzrisiko. Herkunft und Neuerstellung: `docs/videos/README.md`.

| Sektion | Video | Größe Desktop / Handy |
|---|---|---|
| Über uns | Höhenlinien der Region, Betriebe verbinden sich mit Stuttgart (Hintergrund) | 563 KB / 101 KB |
| Ablauf | Erklärfilm E-Mail → Check → 15 Minuten, neben der Überschrift | 252 KB / 44 KB |
| Beispiel | Bildschirmaufnahme der Muster-Website statt Standbild (Hinweisleiste „Beispiel“ bleibt sichtbar) | 550 KB / 265 KB |
| Kontakt (Startseite + 5 Leistungsseiten, DE/EN) | Höhenlinien mit Amber-Puls statt statischer Grafik | 629 KB / 152 KB |

Regeln eingehalten: kein `autoplay` im HTML, `preload="none"`, Start erst bei Sichtbarkeit, WebP-Vorschaubild ohne JS, steht bei `prefers-reduced-motion`, Pause-Knopf an jedem Video (beim Beispiel außerhalb des Links, damit er nicht navigiert). Team bekommt bewusst kein Video – dort gehören echte Fotos hin.

## Gestaltung

- Ablauf: Überschrift links, Erklärfilm rechts (Handy: darunter).
- Über uns: Karten leicht abgesetzt über dem Video, Verlauf für Lesbarkeit.
- Team: Übergangs-Grafiken in Petrol mit weißen Initialen und Amber-Licht statt grauer Flächen (bis echte Fotos kommen).

## Geänderte Dateien

`index.html`, `en/index.html`, `leistungen/*.html`, `en/leistungen/*.html`, `assets/site.css`, `assets/site.js`, `assets/leistung.js`, `style.css`, `datenschutz.html`, `images/grafik/portrait-*.svg`, neue Dateien unter `videos/`, `videos/mobil/`, `images/*.webp`, `docs/videos/`, `scripts/public-files.json` (nur neue Einträge), `CLAUDE.md`.

## Tests

- `python scripts/security_check.py`: 0 Fehler, 1 bekannte Warnung (Git-Historie)
- `python -m unittest discover -s scripts -p "test_*.py"`: OK
- `python scripts/build_public.py`: Export enthält alle neuen Videos und Vorschaubilder
- Videos mit ffmpeg vollständig dekodiert (H.264 High, 30 fps). Abspielen im echten Browser konnte hier nicht geprüft werden (Test-Chromium ohne H.264) – bitte einmal in Chrome/Safari ansehen.
- Lighthouse: nicht gelaufen

## Offen / an Codex

- Nachprüfung Ablauf ohne JavaScript und Pause-Knöpfe per Tastatur.
- Impressum: Telefonnummer fehlt weiter.
- **Abweichung zu früheren Entscheidungen von Calvin, nicht angefasst:** Preise stehen auf der Seite (laut CLAUDE.md bestätigt), Calvin hatte am 22.10. „Preise immer auf Anfrage“ gewünscht; das Kontaktformular (`kontakt.php`) ist seit der Zusammenführung nicht mehr im Repo. Beides im Team klären.

## Für den Rechts-Chat

1. Datenschutz Abschnitt 2: Hoster jetzt IONOS SE (Montabaur) statt GitHub Pages. Auftragsverarbeitungsvertrag im IONOS-Kundenbereich abschließen.
2. Neue Videos sind eigene Animationen bzw. eine Aufnahme der eigenen Muster-Website, keine Rechte Dritter, keine externen Einbindungen.

## Nachtrag: Panel-Videos Sichtbar, Fachkräfte, Automatisierung

Die bisherigen Clips waren fast Standbilder (nur leichter Zoom). Neu gerendert mit echter Bewegung auf denselben Bildern (`docs/videos/scenes2.js`):
- **Sichtbar:** Pin fällt auf die Karte und pulsiert, fünf Sterne füllen sich nacheinander, Sonnenlicht und Staub.
- **Fachkräfte:** Formular füllt sich, Button pulsiert, Bewerbungs-Karten steigen auf (nur Symbole, kein Text – passt für DE und EN).
- **Automatisierung:** Datenpakete laufen über das Diagramm auf dem Laptop, Knoten leuchten, Blätterschatten bewegen sich.

Größen: Desktop 594–718 KB, Handy 161–243 KB (vorher ähnlich). Dateinamen unverändert, daher keine HTML-Änderung nötig.
