# Claude-Bericht 29.10.2026 – Kundensicht, Ruhe, „KI-Note“ raus

Auftrag Yunus: Seite als Kunde durchgehen, wackelnde Bilder und „Festpreis“ entfernen, Sinnhaftigkeit prüfen, Kontakt und Vertrauen verbessern, die „KI-Note“ (typischer KI-Vorlagen-Look) rausnehmen.
Ausgangsstand: Calvins `main` (4d15b6c).

## Was mir als Kunde aufgefallen ist
- Überschrift zu lang (12 Wörter) und unklar, was genau angeboten wird.
- „Festpreis“ an mehreren Stellen, obwohl in der Startphase kein Geld genommen wird.
- Leistungsseiten: gekipptes Video, schwebendes Preisschild, schwebende Geräte, Laufband, kippende Karten – unruhig.
- Beim Scrollen liegen die Header-Knöpfe ohne Hintergrund über dem Text (vor allem auf dem Handy).
- KI-Vorlagen-Muster: nummerierte Chips „01 · Über uns“, riesige Umriss-Ziffern, riesiges Anführungszeichen, Verlaufsschrift, Icon-Kacheln, Floskeln („Messbar besser“, „auf Augenhöhe“, „keine leeren Agenturversprechen“).
- „Live-Vorschau“/„Live-Demo“ beim KI-Assistenten, obwohl es feste Beispielantworten sind.
- Team auf dem Desktop: riesige Initialen-Flächen.
- Wer kein Mail-Programm hat, sah im Hero keine Mail-Adresse.

## Geändert
- **Texte (DE + EN):** neue Überschrift „Webseiten und KI für deinen Betrieb“, klarere Unterzeile; „Festpreis“ überall entfernt (Panels: „einmalig“, Ablauf: „Den Preis kennst du vorher.“, Meta-Beschreibung); Über-uns-Text ohne Floskeln; „Live“ → „Beispiel-Chat“ / „Beispiel-Dialog“.
- **Kontakt:** Mail-Adresse unter dem Haupt-Button auf Startseite und allen Leistungsseiten.
- **Ruhe:** kein Kippen, Schweben, Hüpfen, Laufband; keine Bewegung bei nicht klickbaren Karten; Panels zoomen nicht mehr.
- **KI-Look:** Nummern-Chips, Umriss-Ziffern, Anführungszeichen, Verlaufsschrift, Icon-Kacheln entfernt; Hintergrund-Verlauf steht still.
- **Header:** beim Scrollen feste dunkle Fläche hinter Sprache/Kurz-Check/Menü.
- **Team:** Foto links, Text rechts auch auf dem Desktop.

Dateien: `index.html`, `en/index.html`, `leistungen/*.html`, `en/leistungen/*.html`, `assets/site.css`, `assets/leistung.css`.

## Geprüft
- `python scripts/security_check.py`: 0 Fehler, 1 bekannte Warnung (Git-Historie).
- `python -m unittest discover -s scripts -p "test_*.py"`: 13 Tests OK.
- Playwright, 8 Seiten bei 375 und 1440 px: kein horizontales Scrollen, Kurz-Check-Button ohne Scrollen sichtbar, keine Konsolenfehler, keine externen Anfragen.
- 0 Treffer für „Festpreis“ auf den Seiten.

## Offen
- **Videos:** Das KI-Assistent-Video („AI Agent Network“, Hologramm-Bildschirme) wirkt am stärksten nach KI. Ersatz durch ein ruhigeres Motiv oder echtes Foto – Entscheidung Yunus/Calvin.
- Echte Fotos (Team, Porträts) bleiben der größte Hebel für Vertrauen.
- Effekte aus PR #4 sind mit Calvins Force-Push aus `main` verschwunden (liegen auf `animationen`); nicht wieder eingebaut, weil sie dem Wunsch nach Ruhe widersprechen.
