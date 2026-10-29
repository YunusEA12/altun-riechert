# Claude-Bericht 29.10.2026: Zusammenführung und Council-Maßnahmen

**Auftrag Yunus:** Calvins GitHub-Stand (`origin/main`, `4d15b6c`) und den lokalen Stand (`main`, `4de8b22`, PR #4) in einem neuen Branch zusammenführen, ohne Push. Danach die Code-Maßnahmen aus `docs/council-bewertung-2026-10-29.md` umsetzen.

**Branch:** `zusammenfuehrung` (lokal, nicht gepusht). Nicht übernommen: `origin/main-d0r92u` („Kundensicht: ruhiger, ehrlicher, klarer“) – ein eigener Umbau auf Calvins Stand, der u. a. Kippen/Schweben entfernt. Er widerspricht teilweise den Effekten aus PR #4. Zusammen mit dem Team entscheiden.

## Wie zusammengeführt wurde

| Bereich | Übernommen von | Anmerkung |
|---|---|---|
| Leistungsseiten `leistungen/*.html`, `en/leistungen/*.html`, `assets/leistung.*` | Calvin | ersetzen das Detail-Fenster |
| Neues Menü, Sektions-Design (dunkel/Papier/Sand/Nebel), Team-Karten, Fußzeile | Calvin | |
| Muster-Website `beispiel/` | Calvin | Hinweisleiste und `noindex` geprüft |
| Effekte (Überschriften, Buttons, Mauszeiger, Fortschritt) | lokal | Selektoren an Calvins Aufbau angepasst (`.sec__title`, `.pillar`, `.browser img`) |
| Fixierter Hero über `.pin-ok` im `<head>` | lokal | verhindert Layoutverschiebung |
| Videos in voller Qualität, Vorschaubilder 124–145 KB | lokal | Calvins 700-KB-JPGs nicht übernommen |
| Mail-Adresse unter dem Hero-Button | lokal | |
| Detail-Fenster samt CSS/JS | entfernt | durch Leistungsseiten ersetzt |

## Umgesetzte Maßnahmen

| # | Maßnahme | Dateien |
|---|---|---|
| 2 | Videos: kein `autoplay`, laden erst bei Sichtbarkeit; Handy-Fassungen 640 px in `videos/mobil/` (alle fünf zusammen 1,2 MB statt 9,2 MB); Vorschaubilder WebP (≈ 55 KB statt 145 KB); **Pause-Knopf** auf Startseite und Leistungsseiten | `index.html`, `en/index.html`, `leistungen/*`, `en/leistungen/*`, `assets/site.js`, `assets/leistung.js`, `assets/site.css`, `videos/mobil/*`, `images/panel-*.webp` |
| 3 | Muster-Website im Hero verlinkt („Muster-Website ansehen“) | `index.html`, `en/index.html`, `assets/site.css` |
| 5 | Brücke zum Brief: „Post von uns bekommen? Antworte einfach mit ‚Kurz-Check‘ an …“ | dto. |
| 6 | Überschrift: „Mehr Anfragen für deinen Betrieb.“ (5 Wörter); Unterzeile nennt das junge Team aus Stuttgart | dto. |
| 7 | Pilot-Hinweis nur noch bei „Sichtbar“; Meta-Text ohne „zum Festpreis umsetzen“ | `leistungen/*`, `en/leistungen/*`, `index.html`, `en/index.html` |
| 8 | „Live-Vorschau“ → „Beispiel-Vorschau“; „Ehrlich beraten. Fair bezahlt. Messbar besser.“ → „Erst prüfen, dann bauen.“, Floskeln aus der Einleitung entfernt (DE + EN gleich) | dto. |
| 9 | Team mobil kompakt (Bild links, Text rechts, Foto füllt die Spalte) | `assets/site.css` |
| – | Header beim Scrollen mit eigener Fläche, damit kein Inhalt durchscheint | `assets/site.css` |
| – | `scripts/public-files.json`: WebP-Bilder und Handy-Videos ergänzt, JPGs ersetzt | Manifest |

**Nicht umgesetzt:** Nr. 4 (Beispiel-Kurz-Check zeigen). Das echte Check-Format muss zuerst von Calvin kommen, sonst wäre der Inhalt erfunden. Steht jetzt in `CLAUDE.md` unter „Noch offen“.

## Messungen (Browser-Pane, localhost)

| | GitHub `origin/main` | Branch `zusammenfuehrung` |
|---|---:|---:|
| Handy: Daten beim ersten Laden | ≈ 12 MB | **334 KiB** |
| Handy: Kurz-Check-Button | 701–749 px | **608–656 px** |
| Handy: Team-Sektion | 1.122 px | 918 px |
| Handy: Seitenlänge | 8.465 px | 7.999 px |
| Desktop 1440 × 900: Button | 792–840 px | 718–766 px |
| Kein horizontales Scrollen, keine Konsolenfehler, keine externen Anfragen | ja | ja |

Pause-Knopf geprüft (DE-Startseite und EN-Leistungsseite): Video hält an, `aria-pressed`/`aria-label` wechseln, der Klick öffnet nicht die Leistungsseite. Handy lädt `videos/mobil/…`, Desktop `videos/…`.

## Tests

- `python scripts/security_check.py`: 33 Assets, 0 Fehler, 1 bekannte Warnung (interne Pfade in der Git-Historie)
- `python -m unittest discover -s scripts -p "test_*.py"`: 13 Tests OK
- `python scripts/build_public.py`: Export erzeugt; jede `src`/`href`/`poster`-Referenz in allen 15 Seiten existiert im Paket
- Lighthouse: **nicht** gelaufen

## Offene Punkte / an Codex

- Nachprüfung der Zusammenführung, vor allem Menü per Tastatur auf Startseite und Leistungsseiten und der Ablauf ohne JavaScript.
- `.line-label`-Regeln im CSS werden nach Calvins Umbau nicht mehr benutzt (harmlos, kann weg).
- Entscheidung Team: Branch `origin/main-d0r92u` („Kundensicht“) übernehmen, teilweise übernehmen oder verwerfen.
- Vor einem Push auf GitHub mit Calvin absprechen, damit nicht wieder ein Stand überschrieben wird.

## Für den Rechts-Chat

1. Startseite: neue Überschrift „Mehr Anfragen für deinen Betrieb.“ (Ziel, kein Versprechen), neuer Satz „Post von uns bekommen? Antworte einfach mit ‚Kurz-Check‘ …“.
2. Pilotplätze werden nur noch bei „Sichtbar“ genannt, „Live-Vorschau“ heißt „Beispiel-Vorschau“, „Messbar besser“ ist entfernt.
3. Offen bleibt: Impressum (`[Telefonnummer]`, „GbR“), Preise vor der Gewerbeanmeldung.
