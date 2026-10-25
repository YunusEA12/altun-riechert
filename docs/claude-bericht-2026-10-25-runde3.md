# Claude-Bericht Runde 3 – Selbstbewertung und Verbesserung (25.10.2026)

Auftrag von Yunus: Da ChatGPT/Codex vorerst nicht verfügbar ist, setzt Claude die Hinweise aus der Gemini- und der Codex-Bewertung selbst um, bewertet die Seite von 0 bis 100 und hebt den Wert so weit wie möglich – **ohne Geschäftsangaben zu erfinden**.

**Status:** umgesetzt und von Claude getestet. Eine unabhängige Nachprüfung durch Codex steht aus.

---

## 1. Bewertungsraster (100 Punkte)

Gleiches Raster vor und nach der Runde. Gewichtet nach dem Zweck der Seite: Ein Betrieb bekommt einen Brief, googelt uns und soll Vertrauen fassen und den Kurz-Check anfragen.

| Bereich | max. | vorher | nachher | Begründung nachher |
|---------|-----:|-------:|--------:|--------------------|
| Weg zur Anfrage | 15 | 14 | 14 | Kurz-Check im Hero und dauerhaft im Header, Mail-Vorlage, „Adresse kopieren“. Abzug: kein Telefon/WhatsApp (Geschäftsentscheidung) |
| Verständlichkeit & Angebot | 15 | 12 | 13 | Farblich getrennt: Petrol = Online-Präsenz, Amber = KI. Preise sichtbar, Pilotphase genannt, drei Antworten auf typische Fragen. Abzug: KI-Pakete noch ohne bestätigten Umfang |
| Vertrauen & Echtheit | 20 | 9 | 11 | Keine „PLATZHALTER“-Grafiken mehr sichtbar, ehrliche „Warum kostenlos?“-Antwort, echte Muster-Website-Vorschau. Abzug: **keine echten Fotos**, Hamza ohne Angaben, keine echten Referenzen, Impressum unvollständig |
| Gestaltung & Markenbild | 15 | 8 | 13 | Durchgehend Petrol/Amber, eigene Grafiken, Logo-Kachel korrekt, kein Ladebildschirm, kleinerer Footer, Link-Vorschaubild. Abzug: Grafiken sind Übergang bis zu echten Fotos |
| Mobile | 10 | 8 | 9 | CTA im ersten Bildschirm (DE 749 px, EN 730 px bei 375 × 812), alle Infos sichtbar, kein seitliches Scrollen. Abzug: Seite weiterhin lang (~9.400 px) |
| Technik, Leistung, Barrierefreiheit | 10 | 9 | 9 | Lighthouse 99–100 in Leistung, Barrierefreiheit, Best Practices; läuft ohne JS; Menü per Tastatur; niedrige Fenster geprüft. Abzug: kein echter Screenreader-/Zoom-Test |
| Mehrsprachigkeit & Veröffentlichungsreife | 15 | 5 | 11 | Englische Seite komplett, Exportpaket geprüft, Link-Vorschau vorbereitet. Abzug: Rechtsform/Telefon/USt-IdNr. fehlen, Hoster und Domain offen, Firmenliste in Git-Historie (S-01) |
| **Gesamt** | **100** | **65** | **80** | |

**Ehrliche Einordnung:** Ohne eure Angaben ist ungefähr **80–82** die Obergrenze. Die restlichen Punkte hängen an Dingen, die kein Agent seriös erfinden darf (Abschnitt 4).

## 2. Was in dieser Runde geändert wurde

| Hinweis aus | Änderung |
|-------------|----------|
| Codex 8, Gemini 2 | **Markenfarben überall**: dunkle Flächen (Hero, Menü, Footer, Pillen) Petrol `#0C2A2E`; Panels Online-Präsenz in Petrol-Tönen (`#123B40`, `#1F5A60`, `#4E6A6D`), KI in Amber-Tönen (`#E39A2D`, `#F1E4CE`). Neue Tokens in `brand_assets/tokens.css` |
| Codex 3/8 | **Eigene Übergangs-Grafiken** statt Platzhalter-Kästen: `images/grafik/` (Hero und Footer mit Höhenlinien, 5 Panel-Motive, Initialen-Kacheln fürs Team). Keine KI-Bilder, keine fremden Motive, kein Text in den Grafiken |
| Codex 7 | **Ladebildschirm entfernt** (HTML und CSS) |
| Codex 8, DESIGN-01 | **Footer kleiner** (Bildbereich ~600 px statt 900 px), **Scrollweg der Panels** um ca. 20 % verkürzt (Faktor 0,85 statt 1,075) |
| Codex 6, CONTENT-02 | **Englische Version** `en/index.html`, Umschalter DE/EN funktioniert in beide Richtungen; Menü- und Kopier-Texte über `data-`Attribute übersetzt. Impressum/Datenschutz bleiben deutsch und sind so beschriftet |
| Lighthouse | Logo-Link: sichtbarer Text „A&R“ jetzt im zugänglichen Namen (`label-content-name-mismatch` behoben) |
| Codex 4 | Hamza: statt sichtbarer `[PLATZHALTER]` jetzt „Steckbrief folgt“ |
| Ideen #5/#6 | Drei kurze Antworten im Ablauf: Kosten, Kaufzwang, „Warum kostenlos?“ – nur bestätigte Fakten |
| Ideen | Link-Vorschaubild `images/og-image.png` (1200 × 630) + Open-Graph-Tags |
| Codex 7 | Unbenutzte Platzhalter (`team.svg`, `portrait.svg`, `footer.svg`) gelöscht; Manifest `scripts/public-files.json` um alle neuen öffentlichen Dateien ergänzt |

## 3. Tests

**Lighthouse 12.2.1 (lokal, `localhost:8765`):**

| Lauf | Leistung | Barrierefreiheit | Best Practices | SEO |
|------|---------:|-----------------:|---------------:|----:|
| vorher, DE Mobile | 100 | 100 | 100 | 63 |
| nachher, DE Mobile | 99 | 100 | 100 | 63 |
| nachher, DE Desktop | 100 | 100 | 100 | 63 |
| nachher, EN Mobile | 99 | 100 | 100 | 63 |

- SEO 63 kommt **nur** von `noindex` – bis zum Go-live gewollt.
- Restliche Lighthouse-Hinweise sind Sache des Hosters (Textkomprimierung, Cache-Dauer) bzw. 4 KB CSS-Minify.
- LCP Mobile 2,1 s (gut, < 2,5 s), CLS 0.

**Browser (Browser-Pane):** CTA ohne Scrollen bei 375 × 812 (DE 749 px, EN 730 px) und 1440 × 900 (840 px); kein seitlicher Überlauf; alle Panel-Titel passen bei 375 px (DE und EN); alle Untertitel/Preise sichtbar; EN-Menü „Menu/Close“, Fokus auf „Home“, Escape zurück; keine Anker ohne Ziel; Logo einzeilig; Konsole fehlerfrei; nur Anfragen an localhost.

**Skripte:** `unittest` 13 OK · `test_demo_security.cjs` PASS · `security_check.py` 21 Assets, 0 Fehler, 1 Warnung (S-01, bekannt) · Export `dist/site-20261025-184703-67e3db6e` mit `--strict`: 0 Fehler, 0 Warnungen · Verweis-Prüfung Export (inkl. `en/`): 70 Verweise, 0 fehlend.

**Hinweis für Codex:** `docs/security-baseline.json` ist veraltet (absichtliche Änderungen an `index.html`, `assets/*`, Manifest, neue Dateien).

## 4. Was für 90+ fehlt – nur ihr könnt es liefern

| Punkte | Was | Wer |
|-------:|-----|-----|
| +5 | Echtes Teamfoto und drei Porträts (ersetzt `images/grafik/hero.svg` und Initialen-Kacheln) | Team |
| +2 | Hamzas Nachname, Rolle, ein Satz | Hamza |
| +3 | Impressum vollständig (Rechtsform, Telefon, ggf. USt-IdNr.), Hoster + Domain gewählt | Team |
| +2 | KI-Pakete mit bestätigtem Umfang und Preis | Calvin |
| +2 | Erste echte Referenz aus einem Pilotprojekt (mit Freigabe) | Team |
| +1 | Telefonnummer / WhatsApp | Team |
| +2 | S-01 gelöst (Repo privat oder Historie bereinigt), danach `noindex` raus → SEO ~100 | Yunus + Calvin |

Damit sind realistisch **93–95** erreichbar. 100 setzt zusätzlich echte Nutzer- und Screenreader-Tests voraus.

## 5. Wichtig ab jetzt

- **Zwei Sprachen = zwei Dateien.** Jede Textänderung in `index.html` **und** `en/index.html`.
- Sobald die Domain steht: `og:image`/`og:url` als volle URL und `hreflang`-Links eintragen (Kommentar im `<head>` beider Seiten).
