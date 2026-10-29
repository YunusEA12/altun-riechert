# Claude-Bericht 29.10.2026 – Kundensicht in PR #5 übernommen, Calvins PR #6 integriert

**Auftrag Yunus:** Kundensicht (`main-d0r92u`) in den Stand von PR #5 übernehmen, Effekte nach dem Mittelweg, offene Maßnahmen B1–B6 aus `docs/council-bewertung-2026-10-29.md`.
**Basis:** `zusammenfuehrung` = `main` (`74801ca`, PR #5 ist bereits gemergt). Während der Arbeit kam **Calvins PR #6** (`claude/seite-ueberarbeitung`, `56e9e6d`) dazu. Auf Wunsch von Yunus eingebaut, damit sich nichts überschreibt.

## Merge-Entscheidungen

| Stelle | Übernommen von | Ergebnis |
|---|---|---|
| H1, Unterzeile, „Post von uns bekommen? …“, Link zur Muster-Website, Video-Technik, Header-Fläche | PR #5 | unverändert |
| „Festpreis“ → „einmalig“ (Panels), Ablauf 3: „Den Preis kennst du vorher.“ | Kundensicht | DE + EN |
| Über uns: „Drei Leute aus Stuttgart, ein Ansprechpartner für dich“ + Satz mit Yunus, Calvin, Hamza | Kundensicht | ersetzt „Erst prüfen, dann bauen.“ |
| Eyebrows ohne Nummern-Chips, kein Laufband, Mail-Adresse unter jedem Haupt-Button | Kundensicht | alle 12 Seiten |
| Chat-Titel „Beispiel-Vorschau“ | PR #5 | |
| Videos Über uns, Ablauf, Beispiel, Kontakt; Fehlerbehebungen; Hoster IONOS | PR #6 (Calvin) | unverändert übernommen |
| Leere Video-Flächen (Sichtbar, Fachkräfte, Automatisierung) | PR #6 + eigene Ergänzung | Übergangsgrafik statt leerer Fläche (CLAUDE.md Abschnitt 8) |

**Effekte (Mittelweg):** Klickbar mit Effekt: Buttons (Lichtstreifen, Welle, Magnet), Panels (Zoom, Plus-Knopf, Video folgt der Maus), Muster-Website-Vorschau (hebt sich, Parallaxe), „Weitere Leistungen“-Karten, Menü, Mauszeiger-Ring, aufsteigende Überschriften. Ohne Kippen/Schweben: Pfeiler, Ablauf-Schritte, Team (3D-Neigung entfernt), „Das ist drin“, Video-Rahmen und Preis-Badge auf den Leistungsseiten.

## Aufgabe B

| # | Maßnahme | Stand |
|---|---|---|
| 1 | Vorschaubild Muster-Website | **durch PR #6 erledigt:** `images/beispiel-muster.webp` + Video zeigen das aktuelle Design mit gelber Beispiel-Leiste. Altes `images/beispiel-musterle.png` („Festpreis-Angebot“) gelöscht und aus `scripts/public-files.json` entfernt |
| 2 | Leistungsseiten unterscheidbar | Das eigene Beispiel-Modul (Geräte, Profil-Vergleich, Bewerbung, Chat, Beleg-Ablauf) steht jetzt direkt unter dem Hero statt an dritter Stelle. Keine neue Sektion |
| 3 | Fotos vorbereiten | `images/team/portrait-*.webp` (800 × 1000, aus Calvins Initialen-Grafiken). Echtes Foto = Datei gleichen Namens überschreiben. Alt-Text ist neutral („Yunus Altun“), passt für beides. Teamfoto: Hero-Tausch braucht Absprache (Animation) |
| 4 | Beispiel-Kurz-Check | `<figure class="step__example" hidden></figure>` in Ablauf-Schritt 2, DE + EN, ohne Inhalt |
| 5 | Aufräumen | entfernt: `.line-label` (CSS + JS), Detailfenster-Animationen, `.pillar__icon`, `.eyebrow b`, `.lang__opt.is-disabled`, `.t-l`, Konfliktmarker. Prüfskript: keine weiteren ungenutzten Klassen |
| 6 | QA | siehe unten |

## Weitere Fehler gefunden und behoben
- Leistungsseiten: Skip-Link setzte den Fokus nicht in den Inhalt (`<main>` ohne `tabindex="-1"`).
- Pause-Knöpfe lagen in Containern mit `aria-hidden="true"` (Lighthouse `aria-hidden-focus`). `aria-hidden` jetzt nur am Video bzw. Preis-Badge.
- Kontrast der Bereichszeile auf den „Weitere Leistungen“-Karten (Lighthouse `color-contrast`).
- Fehlende `active`-/`hover`-Zustände an Logo, Sprachwahl, Skip-Link, Panel-Links, Fußzeilen-Links, „Nach oben“.

## Messwerte (localhost, Playwright/Chromium)

| | Wert |
|---|---:|
| Startseite Handy: Seitenlänge | 8.135 px (DE), 8.028 px (EN) |
| Startseite Handy: Daten beim ersten Laden | 110 KiB |
| Startseite Desktop: Daten beim ersten Laden | 3,0 MiB (Panel-Video Webseiten in voller Qualität, Entscheidung 28.10.) |
| Leistungsseite Webseiten: Handy / Desktop | 381 KiB / 3,0 MiB |
| Kurz-Check-Button 375 × 812 | Unterkante 656 px (sichtbar) |
| Kurz-Check-Button 1440 × 900 | Unterkante 766 px (sichtbar) |
| Leistungsseiten: Button 375 × 812 / 1440 × 900 | 626–666 px / 715–757 px |

**Lighthouse 12** (Handy / Desktop):

| Seite | Performance | Barrierefreiheit | Best Practices | SEO |
|---|---:|---:|---:|---:|
| Start DE | 95 / 99 | 100 / 100 | 100 / 100 | 63 / 63 |
| Start EN | 96 / 99 | 100 / 100 | 100 / 100 | 63 / 63 |
| Leistung Webseiten | 97 / 100 | 100 / 100 | 100 / 100 | 60 / 60 |
| Leistung Sichtbar | 97 / 100 | 100 / 100 | 100 / 100 | 63 / 63 |

SEO liegt **nur wegen `noindex`** darunter (einziger fehlgeschlagener Prüfpunkt: `is-crawlable`). Gewollt bis zum Go-live.

## Tests / QA (CLAUDE.md Abschnitt 11)
- 15 Seiten × 375 / 768 / 1280 / 1440 px: kein horizontales Scrollen, Button ohne Scrollen sichtbar, keine Konsolenfehler, **keine externen Anfragen**, keine 404, keine toten Anker.
- Ohne JavaScript (Start DE/EN, 2 Leistungsseiten): kein Inhalt unsichtbar, Mail-Link vorhanden, Ladebildschirm blendet aus.
- `prefers-reduced-motion`: kein fixierter Hero, keine `.fx`-Effekte, kein Video läuft, kein Ladebildschirm.
- Tastatur (Start DE, 2 Leistungsseiten, je 375 + 1440): Skip-Link → Inhalt; Menü öffnet mit Fokus im Menü, Hintergrund `inert`, Escape schließt, Fokus zurück auf den Menü-Knopf.
- Jedes klickbare Element auf 7 Seiten hat hover, active und (global) focus-visible; kein `transition: all`.
- `python scripts/security_check.py`: 33 Assets, 0 Fehler, 1 bekannte Warnung (Git-Historie).
- `python -m unittest discover -s scripts -p "test_*.py"`: 13 Tests OK.
- `python scripts/build_public.py`: Export erzeugt, alle Verweise der 15 Seiten im Paket vorhanden, altes PNG nicht mehr enthalten.
- Nicht geprüft: echte Geräte, Safari/iOS (Testbrowser ohne H.264, siehe PR #6).

## Selbstbewertung (1–100, Format wie `council-bewertung-2026-10-29.md`)

| Bereich | 29.10. früh | **jetzt** | Was hält die Note unten | Lösbar im Code? |
|---|---:|---:|---|---|
| Erster Eindruck (5 Sekunden) | 68 | **78** | Kein Gesicht im Hero, nur Grafik | nein, Teamfoto |
| Vertrauen & Glaubwürdigkeit | 35 | **48** | Initialen statt Fotos, Gmail, kein Telefon, Hamza ohne Rolle, keine Referenz | nein, Team |
| Angebot & Preisklarheit | 65 | **76** | KI-Assistent-Inhalt und Automatisierungs-Preis offen; Preis-Frage vor Gewerbeanmeldung ungeklärt | nein, Team + Rechts-Chat |
| Weg zur Anfrage | 70 | **80** | Nur Mail, kein Telefon/WhatsApp | nein, Nummer fehlt |
| Wow-Effekt & Design | 68 | **76** | Drei Panels noch ohne Video; Leistungsseiten weiter gleich aufgebaut (nur Reihenfolge/Modul unterscheiden sich) | teils (Videos: Calvin) |
| Mobile & Performance | 45 | **88** | Desktop lädt 3 MiB (volles Panel-Video) | ja, falls Yunus kleinere Fassung erlaubt |
| Texte & Tonalität | 60 | **74** | Brief siezt, Website duzt; Hero-Unterzeile lang | teils |
| Recht & Veröffentlichungsreife | 30 | **38** | Impressum `[Telefonnummer]`, „GbR“, USt-IdNr., Repo-Historie mit `_briefe/` | nein, Team + Rechts-Chat |
| Leistungsseiten | 62 | **72** | Aufbau ähnlich; drei Seiten mit Grafik statt Video | teils |
| Technik & Barrierefreiheit | 70 | **92** | Kein Test auf echten Geräten/Safari | Test nötig |
| **Gesamt** | **~57** | **~72** | Der Rest liegt fast nur noch beim Team: Fotos, Telefon, Rechtsform, Domain | |

Ehrlich: Die großen Sprünge (Mobile, Technik) kommen aus PR #5 und PR #6 zusammen mit den Fixes dieser Runde. Über ~75 kommt die Seite nur mit echten Fotos, Telefonnummer und geklärtem Impressum.

## Offen / Fragen
- **An Calvin:** Herkunft und Lizenz der Videos `panel-webseiten.mp4` und `panel-ki-assistent.mp4` (wirken KI-generiert, „AI Agent Network“). Für die neuen Videos aus PR #6 ist die Herkunft in `docs/videos/README.md` dokumentiert.
- **Git:** Calvins Commits (PKF-Wulf-Adresse) und ältere Uni-Adressen stehen in der Historie. Nicht umgeschrieben. Vorschlag für künftige Commits: `git config user.email "<id>+<login>@users.noreply.github.com"` (GitHub → Settings → Emails → „Keep my email addresses private“).
- PR #5 ist schon gemergt. Diese Runde liegt auf `zusammenfuehrung` und braucht einen **neuen PR**. Sie enthält Calvins PR #6; wird PR #6 zuerst gemergt, bleibt dieser PR konfliktfrei.
- Desktop-Datenmenge (3 MiB): kleinere Desktop-Fassung des Webseiten-Videos nur mit Freigabe (Entscheidung „volle Qualität“ vom 28.10.).

## Für den Rechts-Chat
1. Über uns: „Drei Leute aus Stuttgart, ein Ansprechpartner für dich“ / „Wir sind Yunus, Calvin und Hamza. Wir schauen uns an, wo dein Betrieb online Kunden verliert, und kümmern uns darum: Website, Google-Profil oder KI fürs Büro.“ (EN entsprechend)
2. Panels: „390 € einmalig“, „990 € einmalig“, „Ab 1.490 €“ (kein „Festpreis“ mehr).
3. Ablauf Schritt 3: „Per Telefon oder vor Ort. Danach entscheidest du, ob wir etwas umsetzen. Den Preis kennst du vorher.“
4. Leistungsseiten: unter dem Button „Oder direkt per Mail: altunriechert@gmail.com“.
5. Aus PR #6 (Calvin): Datenschutzerklärung nennt jetzt **IONOS** als Hoster statt GitHub Pages – bitte prüfen (Anschrift, AV-Vertrag, Drittland).
6. Unverändert offen: Impressum (Telefon, „GbR“, USt-IdNr.), Preise vor der Gewerbeanmeldung, 99-€-Pilotpreis steht nirgends auf der Seite.
