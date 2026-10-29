# CLAUDE.md – Website Altun & Riechert

Regelwerk für alle Arbeiten an diesem Projekt. Gilt für jede Session. Bei Konflikten gilt diese Datei vor allgemeinen Gewohnheiten.
Stand der Fakten: Übergabe vom 25.10.2026.

---

## 1. Projekt in einem Satz

Eine **kurze, knappe, knackige Website** für **Altun & Riechert**. Sie soll vor allem **Vertrauen schaffen**, wenn ein Betrieb uns nach unserem Brief googelt, und ihn zur Antwort per Mail mit dem Stichwort **„Kurz-Check“** bewegen.

## 2. Wer wir sind & was wir anbieten

- **Altun & Riechert:** Yunus Altun, Calvin Riechert und **Hamza** (gehört fest zum Team, nie weglassen). Geplant ist eine GbR, die Rechtsform ist noch offen.
- **Anschrift:** Achardweg 17, 70435 Stuttgart. Der Absender auf Website und Briefen muss identisch sein (Stuttgart, **nicht** Remseck).
- **E-Mail:** altunriechert@gmail.com. Es gibt noch keine eigene Domain und kein Telefon.
- **Angebot:** Wir helfen Betrieben in der **Region Stuttgart und im Kreis Ludwigsburg**, online mehr Anfragen zu bekommen. Wir starten mit dem Handwerk und sind offen für alle Branchen.
- **Yunus:** Informatiker (B.Sc.), **studiert** KI und Data Science (M.Sc.) an der Uni Stuttgart. Den Master nie als Abschluss formulieren.
- **Calvin:** KI-Lösungen, Automatisierungen, KI-Agenten, 3D-Websites mit Blender.
- **Hamza:** [PLATZHALTER: Nachname, Schwerpunkt, 1 Satz]

### Zuständigkeiten
- **Yunus:** Online-Präsenz von Altun & Riechert, also **diese Website**. Ansprechpartner für alles in diesem Projekt.
- **Calvin:** Kundenkontakt und **Briefe** (`_briefe/`). Daran wird in diesem Projekt nichts geändert, außer Yunus sagt es ausdrücklich.
- **Hamza:** [PLATZHALTER]

### Gewichtung der Leistungen: 50 / 50
**Webseiten & Online-Präsenz** und **KI-Integration** sind gleich wichtig und bekommen auf der Seite gleich viel Raum (gleiche Kartengröße, gleiche Position in der Hierarchie). Für die KI-Seite fehlen noch konkrete Pakete und Preise → Platzhalter, nichts erfinden.

### Pakete (von Calvin bestätigt)
| Paket | Preis | Inhalt |
|-------|-------|--------|
| **Sichtbar** | 390 € | Google-Profil, Ort im Seitentitel, Telefon antippbar, Bewertungs-QR-Karte, Vorher-nachher-Bericht |
| **Neue Website** | ab 1.490 € + 29 €/Monat Hosting & Pflege | |
| **Fachkräfte** | 990 € | Karriereseite, Bewerbung in 60 Sekunden per Handy, Google Jobs |
| **Pilotplätze** | 3 × „Sichtbar“ für 99 € gegen Referenz, bis zur Gewerbeanmeldung kostenlos | |
| **KI-Assistent** | ab 49 €/Monat | [PLATZHALTER: Inhalt] |
| **KI-Integration** | [PLATZHALTER: Preis] | [PLATZHALTER: z. B. Automatisierungen, KI-Agenten] |

Preise nur aus dieser Tabelle übernehmen. Ändern sie sich, zuerst hier anpassen.
**Bis zur Gewerbeanmeldung nehmen wir kein Geld**, nur kostenlose Kurz-Checks und Pilotprojekte. Die Seite darf nichts anderes versprechen.

### Vertriebsweg (Kontext für Texte)
- Erstkontakt **nur per Brief**. Kalte Werbe-Mails sind auch an Firmen verboten (§ 7 UWG).
- Im Brief: zwei konkrete Beobachtungen zum Betrieb, ein kostenloser Kurz-Check, drei Pilotplätze.
- Der Betrieb antwortet per Mail mit „Kurz-Check“. Website-Texte und CTA müssen dazu passen.

---

## 3. Goldene Regeln (nicht verhandelbar)

1. **Kurz schlägt vollständig.** Vertrauen statt Textwüste. Startseite mit **maximal 6 Sektionen**. Kommt eine dazu, muss eine andere weg oder zusammengelegt werden.
2. **Jede Sektion beantwortet genau eine Frage** des Kunden.
3. **Die Referenz-Website ist die Qualitäts-Untergrenze**, optisch und technisch.
4. **Nichts erfinden.** Keine erfundenen Kunden, Bewertungen, Zahlen oder Logos als echt ausgeben. **Beispiele immer sichtbar als Beispiel kennzeichnen.**
5. **Keine Erfolgsgarantien.** „Mehr Anfragen“ als Ziel formulieren, nie als Versprechen.
6. **Funktioniert ohne JavaScript.** Inhalte und Kontaktweg sind immer erreichbar; Effekte (fixierter Hero, Einblenden) schaltet `assets/site.js` nur zusätzlich ein und lässt sie bei `prefers-reduced-motion` weg.
7. **Mobile zuerst.** Handwerker sehen die Seite meist auf dem Handy.
8. **Nicht verkomplizieren.** Im Zweifel die einfachere Lösung.

---

## 4. Bestehende Website (Ausgangspunkt)

Repo **`YunusEA12/altun-riechert`** (öffentlich, GitHub Pages noch aus) liegt in diesem Ordner. **Die Website wird komplett neu gebaut, nach dieser CLAUDE.md und der Referenz.** Der alte Stand ist nur noch **Materialquelle** (Fakten, Rechtstexte, Schriften, Muster-Website). Alte Dateien, die der Neubau ersetzt, dürfen gelöscht werden. Sie bleiben in der Git-Historie erhalten.

- **Technik (entschieden 25.10.2026):** **flaches, statisches HTML/CSS/JS ohne Build-Schritt.** Texte stehen direkt in `index.html`, keine Inhaltsdatei und kein clientseitiges JSON. Ein kleines Build-Skript (für DE/EN aus einer Quelle) erst, wenn die englische Version kommt und doppelte Pflege lästig wird – nur nach Absprache.
- **Behalten bzw. inhaltlich übernehmen:** `fonts/` (Archivo + OFL-Lizenz), Fakten aus `impressum.html` und `datenschutz.html` (inkl. Art.-14-Abschnitt und Hoster-Angabe), `beispiel/` (Muster-Website).
- **`style.css` nicht löschen:** Impressum und Datenschutz nutzen es noch. Die neue Startseite nutzt `assets/site.css`.

### Ordnerstruktur
```
index.html                Startseite
assets/site.css           Styles der Startseite
assets/site.js            Effekte (optional, Seite läuft auch ohne)
brand_assets/             Logo (logo.svg) und Marken-Tokens (tokens.css) – vor jedem Design prüfen
images/                   Bilder; images/placeholder/ für Platzhalter
fonts/                    Archivo + OFL-Lizenz
beispiel/                 Muster-Website „Malerwerkstatt Musterle“ (noindex)
impressum.html, datenschutz.html, style.css   Rechtstexte (altes Stylesheet)
docs/                     Analyse, Bewertungen, Ideen
referenz/                 Material der Vorlage – nur lokal (.gitignore)
_briefe/                  Calvins Briefgenerator – nur lokal (.gitignore), gehört in ein privates Repo
.claude/launch.json       lokaler Server: http://localhost:8765
```
**Wichtig für Git:** Neue Ordner (`assets/`, `images/`, `docs/`, `brand_assets/`) müssen beim Commit mit hinein, sonst fehlen sie auf GitHub und die Seite bricht dort.

### Veröffentlichen nur über das geprüfte Exportpaket (eingerichtet von Codex)
- **Jede neue öffentliche Datei** (Bild, Video, CSS, Seite) in `scripts/public-files.json` eintragen – sonst fehlt sie im Export.
- Prüfen: `python scripts/security_check.py` · Tests: `python -m unittest discover -s scripts -p "test_*.py"`
- Export: `python scripts/build_public.py` → `dist/site-…`. **Nur dieses Paket** wird veröffentlicht, nie der Arbeitsordner.
- `scripts/`, `beispiel/`-Sicherheitslogik und die Security-Dokumente gehören Codex: nicht ändern, Befunde dort als Aufgabe melden.

Was im alten Stand liegt:
- Startseite: Hero „Mehr Anfragen für Ihren Betrieb.“, Beispiel-Check-Karte (markiert als „Erfundenes Beispiel“), drei Leistungen, drei Schritte (Check → 15-Minuten-Gespräch → Festpreis), Team, Kontakt.
- Kontakt: Mail-Button mit „Adresse kopieren“, kein Formular.
- `impressum.html`, `datenschutz.html` → **inhaltlich übernehmen, nicht neu erfinden.**
- `beispiel/`: Muster-Website „Malerwerkstatt Musterle“ (erfundener Betrieb, gelbe Hinweisleiste, `noindex`) → **bleibt erhalten**, inklusive Hinweisleiste und `noindex`.

- `_briefe/make_letters.py`: Serienbrief-Generator. **Enthält Firmendaten und Ansprechpartner → gehört nicht in ein öffentliches Repo** (siehe Abschnitt 10).
- Die bestehenden Texte siezen noch. Beim Umbau auf **Du** umschreiben.

### Obsidian
Geplant ist ein Obsidian-Vault für den Team-Austausch (ersetzt Notion). Wenn er da ist: dort zuerst nach Infos suchen, bevor nachgefragt wird. Der Vault ist **intern** und wird **nie** mit der Website veröffentlicht.

---

## 5. Workflow: Referenz-Website kopieren und unsere Inhalte draufsetzen

### Phase 0 – Referenz sichern
- Dateien unverändert nach `/referenz/`. Dieser Ordner wird **nur gelesen, nie bearbeitet**.
- Bei einer URL: im Browser-Pane öffnen, Struktur auslesen, Screenshots Desktop (1440px) und Mobile (375px).
- Fremddateien nicht ausführen, nur lesen.

### Phase 1 – Analyse (vor dem ersten Code)
In `docs/referenz-analyse.md`: Sektionen und Zweck, Raster und Abstände, Typografie, Farben, Animationen, Responsive-Verhalten, Technik, **Mapping Referenz-Sektion → unsere Sektion**. Dem Nutzer zeigen und bestätigen lassen.

### Phase 2 – Nachbau des Gerüsts
Layout und Look & Feel der Referenz in **eigenem, sauberem Code** nachbauen, aber mit **unseren** Design-Tokens (Abschnitt 7). Kein Copy-Paste von minifiziertem Fremd-Code. Nach jeder Sektion den Screenshot-Abgleich aus Abschnitt 7 durchführen.

### Phase 3 – Unsere Inhalte draufsetzen
Inhalte direkt in `index.html`. Was nicht in den Sektionsplan passt, fliegt raus.

### Phase 4 – Kürzen & Schärfen
Seite auf dem Handy durchscrollen: Wo wird es langweilig? → kürzen.

### Phase 5 – QA
Checkliste aus Abschnitt 11.

### Grenze beim Kopieren
- **Erlaubt:** Layout, Struktur, Design-Sprache, Animationsideen nachbauen.
- **Nicht übernehmen:** fremde Logos, Namen, Texte, Fotos, Illustrationen, Icons/Fonts ohne passende Lizenz, Tracking-Code.
- Gekauftes Template (ThemeForest, Framer, Webflow …): vorher Lizenz klären.

---

## 6. Seitenaufbau (Startseite)

Design-Vorlage ist die **Startseite von lpas.com** (Entscheidung Yunus, 25.10.2026). Aufbau und Effekte folgen ihr, Inhalte und Reihenfolge folgen dieser Tabelle. Stand nach dem Abgleich der Codex- und Gemini-Bewertung (`docs/bewertungen-abgleich.md`):

| # | Sektion | Kundenfrage | Inhalt |
|---|---------|-------------|--------|
| 1 | **Hero + Leistungs-Panels** | „Wer seid ihr, was habe ich davon, was kostet es?“ | Teamfoto, Nutzen in einem Satz, **Kurz-Check-Button ohne Scrollen sichtbar**, Hinweis Startphase. Danach 5 Panels mit Bereich (Online-Präsenz / KI-Integration), Preis und Nutzen – auf **allen** Bildschirmgrößen sichtbar |
| 2 | **Über uns** | „Wer seid ihr?“ | Kurzer Text, Link zum Ablauf |
| 3 | **Ablauf** | „Wie läuft das ab?“ | 3 Schritte: Du schreibst uns → Du bekommst deinen Check → 15 Minuten Gespräch. Keine unbestätigten Fristen |
| 4 | **Beispiel** | „Wie sieht das konkret aus?“ | Echte Vorschau der Muster-Website (als Beispiel markiert). Echte Projekte sind im HTML vorbereitet (`hidden`) und werden erst sichtbar, wenn es sie mit Freigabe gibt |
| 5 | **Team** | „Wer steckt dahinter?“ | **Yunus, Calvin, Hamza** gleichwertig mit Porträt, Rolle, 1 Satz. Echte Fotos haben hohe Priorität |
| 6 | **Kontakt + Footer** | „Wie geht es weiter?“ | Kurz-Check-Link, E-Mail (mit Betreff), „E-Mail-Adresse kopieren“, Anschrift, Impressum, Datenschutz |

*Vorbereitet, aber ausgeblendet:* „Aktuelles“ – erst zeigen, wenn es gepflegte Neuigkeiten gibt.

**Header:** Logo-Kachel links (blendet beim Scrollen aus, wie in der Vorlage). Rechts **immer sichtbar**: Sprachumschalter **„DE | EN“**, Button **„Kurz-Check“**, Menü. Kein Dropdown, keine Flaggen. Deutsch unter `/` (`index.html`), Englisch unter `/en/` (`en/index.html`). **Jede Textänderung in beiden Dateien.** `hreflang`-Links und volle `og:`-URLs kommen dazu, sobald die Domain feststeht (Kommentar im `<head>`). Rechtstexte bleiben deutsch, die englische Seite verlinkt darauf.

**Kontakt-Links:** `mailto:altunriechert@gmail.com?subject=Kurz-Check` plus Mail-Vorlage (Betrieb, Ort, Website). Auf dem Handy öffnet ein Tipp die Mail-App.
**Später:** WhatsApp-Button, sobald es eine Nummer gibt (einfacher `wa.me`-Link, kein Widget).

---

## 7. Design & Frontend-Regeln

### Marke
- **Brand-Assets zuerst prüfen:** Vor jedem Design den Ordner `brand_assets/` ansehen (Logos, Farben, Styleguides, Bilder). Was dort liegt, wird benutzt. Keine Platzhalter, wo echte Assets existieren, keine erfundenen Markenfarben.
- **Logo:** Kachel „A&R“ in Petrol `#123B40`, das &-Zeichen in Amber `#E39A2D`. Zusatz: „Digital für Betriebe · Region Stuttgart“.
- **Farben:** Petrol `#123B40` und Amber `#E39A2D` sind gesetzt (`brand_assets/tokens.css`). Alle weiteren Töne werden davon abgeleitet. **Nie** die Standard-Tailwind-Palette (`blue-600`, `indigo-500` …) verwenden. **Umgesetzt (25.10.2026):** dunkle Flächen Petrol `#0C2A2E`; Panels **Online-Präsenz in Petrol-Tönen** (`#123B40`, `#1F5A60`, `#4E6A6D`), **KI in Amber-Tönen** (`#E39A2D`, `#F1E4CE`) – so ist die 50/50-Aufteilung auch farblich sichtbar.
- **Schrift:** **Archivo** (variabel, lokal) ist die Hausschrift. Überschriften und Fließtext unterscheiden sich: entweder eine zweite Display-Schrift (lokal, SIL OFL, nur nach Absprache) oder Archivo mit klar anderem Schnitt bzw. anderer Breite. Muster-Website: **Bricolage Grotesque**. Maximal 2 Schriftfamilien.

### Referenz exakt treffen
- **Liegt eine Referenz vor** (Website oder Bild): Layout, Abstände, Typografie und Wirkung **exakt** treffen. Das Design nicht „verbessern“ und nichts hinzufügen. Farben und Schriften sind dabei unsere eigenen (siehe Marke).
- **Inhalt und Sektionen** bestimmt unser Sektionsplan (Abschnitt 6), **die Optik** bestimmt die Referenz. Hat die Referenz eine Sektion, die wir nicht brauchen, entfällt sie. Brauchen wir eine, die die Referenz nicht hat, wird sie in der Design-Sprache der Referenz gebaut.
- **Gibt es keine Referenz:** mit hohem Anspruch selbst gestalten, nach den Leitplanken unten.

### Screenshot-Abgleich (Pflicht)
- **Immer über localhost** ansehen, nie über `file:///`. Dev-Server über `.claude/launch.json` starten. Läuft er schon, keinen zweiten starten.
- Screenshots im Browser-Pane machen, Desktop (1440px) und Mobile (375px), und direkt neben die Referenz legen.
- **Mindestens 2 Vergleichsrunden:** Screenshot → Unterschiede benennen → korrigieren → neuer Screenshot. Erst aufhören, wenn keine sichtbaren Unterschiede bleiben oder der Nutzer stoppt.
- Unterschiede konkret benennen, z. B. „Überschrift 32px, Referenz ca. 24px“ oder „Kartenabstand 16px statt 24px“.
- Prüfen: Abstände, Schriftgröße, -gewicht, Zeilenhöhe, Farben, Ausrichtung, Radien, Schatten, Bildgrößen.

### Leitplanken gegen „generisch“
- **Schatten:** keine flachen Standard-Schatten (`shadow-md`). Mehrlagig, leicht eingefärbt (Petrol-Ton), geringe Deckkraft.
- **Typografie:** große Überschriften mit enger Laufweite (`letter-spacing: -0.03em`), Fließtext mit großzügiger Zeilenhöhe (`1.7`).
- **Verläufe & Tiefe:** mehrere radiale Verläufe übereinander, dezente Körnung per SVG-Noise-Filter (inline, keine externe Datei). Ebenen-System: Grund → erhöht → schwebend.
- **Animationen:** nur `transform` und `opacity` animieren, **nie** `transition: all`. Federnde Easing-Kurven. `prefers-reduced-motion` respektieren.
- **Interaktive Zustände:** Jedes klickbare Element hat `hover`, `focus-visible` und `active`. Ohne Ausnahme.
- **Bilder:** Verlaufsüberlagerung von unten (dunkel, ca. 60 %) und eine Farbebene im Marken-Ton mit `mix-blend-mode: multiply`.
- **Abstände:** feste Spacing-Tokens, keine zufälligen Werte.

### Hero-Animation
- Die Höhenlinien im Hero sind ein `<canvas>` aus `assets/site.js` (Block „Hero-Hintergrund“): ruhige Bewegung, Ausweichen vor dem Mauszeiger, Puls am Gipfel.
- Pflicht bleibt: Standbild ohne JS, stehendes Bild bei `prefers-reduced-motion`, Pause außerhalb des Bildschirms. Kommt das echte Teamfoto als Hero, wird die Animation entfernt oder z. B. auf den Footer verlegt (Absprache mit Yunus).

### Effekte (Block „Effekte“ am Ende von `assets/site.js` und `assets/site.css`)
- Wortweise aufsteigende Überschriften, sich zeichnende Trennlinien, gestaffeltes Erscheinen, Fortschrittsbalken, Lichtstreifen und Welle auf Buttons, Puls am Header-Kurz-Check, federndes Detailfenster, gestaffeltes Menü.
- Nur mit echter Maus: Magnet-Buttons, Amber-Mauszeiger-Ring (der normale Zeiger bleibt), Video- und Team-Neigung zur Maus.
- Regeln: nur `transform`/`opacity`; alles hängt an der Klasse `.fx`, die nur mit JS und ohne `prefers-reduced-motion` gesetzt wird; ohne JS ist jeder Inhalt sichtbar. Geteilte Überschriften behalten ihren Text als `aria-label`.

### Videos (Panels und Leistungsseiten)
- Kein `autoplay` im HTML: `site.js` bzw. `assets/leistung.js` startet die Videos, ohne JS bleibt das Vorschaubild (WebP). Panel-Videos laden erst, wenn ein Viertel des Panels sichtbar ist.
- Zwei Fassungen: `videos/` (1280 px, volle Qualität, Entscheidung Yunus 28.10.) für Desktop, `videos/mobil/` (640 px) per `<source media="(max-width: 1023px)">` fürs Handy. Neues Video = beide Fassungen erzeugen und in `scripts/public-files.json` eintragen.
- Jedes laufende Video hat einen Pause-Knopf (`.video-toggle`, WCAG 2.2.2).
- **Sektions-Videos (29.10.2026):** Über uns, Ablauf, Beispiel (Bildschirmaufnahme der Muster-Website) und Kontakt (auch auf den Leistungsseiten) haben Videos mit `data-video`. Alle sind **selbst erstellt**, Herkunft und Neuerstellung in `docs/videos/README.md`. Keine Stock- oder KI-Clips von Dritten ohne geklärte Lizenz. Der Pause-Knopf landet über `data-video-host` nie innerhalb eines Links.

### Technische Vorgaben
- **Keine CDNs.** Tailwind höchstens als lokaler Build (Ergebnis-CSS liegt im Repo), sonst eigenes CSS. Kein `cdn.tailwindcss.com`.
- **Platzhalter-Bilder lokal** unter `images/placeholder/` (z. B. selbst erzeugte SVGs), **kein** `placehold.co` oder andere externe Bilddienste.
- Mobile-first. Breakpoints prüfen: **375 / 768 / 1280 / 1440 px**. Kein horizontales Scrollen.
- Bilder als WebP/AVIF mit `width`/`height`, Lazy Loading unterhalb des ersten Bildschirms.
- Kontraste nach WCAG AA.

---

## 8. Platzhalter-System

- Fehlende Texte: `[PLATZHALTER: Beschreibung]`. Platzhalter-Bilder unter `images/placeholder/`.
- **Unfertige Bereiche nicht zeigen:** Was es noch nicht gibt (echte Projekte, Neuigkeiten), steht vorbereitet im HTML mit dem Attribut `hidden`. Sichtbar schalten = `hidden` entfernen.
- **Keine sichtbaren „PLATZHALTER“-Texte oder -Kästen.** Wo Fotos fehlen, stehen eigene Übergangs-Grafiken aus `images/grafik/` (Höhenlinien, Strichmotive, Initialen). Sie werden durch echte Fotos ersetzt (Dateinamen: `docs/bild-video-prompts.md`, Abschnitt 7).
- Fehlende Personenangaben ehrlich benennen („Steckbrief folgt“), nie erfinden.
- Vor dem Go-live: Suche nach `PLATZHALTER` liefert 0 sichtbare Treffer.

### Echte Referenz hinzufügen
1. In `index.html` im Bereich `#beispiel` eine `img-card` mit Bild, Betriebsname, Ort füllen.
2. Nur mit **Freigabe** des Betriebs (Name, Logo, Zahlen). Nur echte Werte, keine Erfolgsgarantien.
3. `hidden` an der Reihe entfernen.

---

## 9. Texte

- **Sprache:** Deutsch (Hauptsprache) + Englisch, jeder Text in beiden Sprachen.
- **Anrede:** **Du**, locker, aber professionell. Einheitlich auf der ganzen Seite (Rechtstexte ausgenommen).
- **Text-Budget:** Headline max. 8 Wörter, Unterzeile max. 25 Wörter, Karten-Text max. 30 Wörter.
- Kurz, aktiv, konkret. Handwerker-tauglich, kein Agentur-Sprech („innovativ“, „ganzheitlich“, „Synergien“, „maßgeschneidert“).
- Keine Erfolgsgarantien, keine Superlative ohne Beleg.
- Der CTA nennt das Stichwort „Kurz-Check“, damit es zum Brief passt.

---

## 10. Recht (verbindlich)

- **Schriften nur lokal**, kein Google-Fonts-CDN (LG München I, 3 O 17493/20). Lizenz SIL OFL, **Lizenztext mitliefern**. Bei IBM Plex Vorsicht: Der Name ist geschützt, eine verkleinerte Schrift darf nicht „Plex“ heißen.
- **Keine Cookies, kein Tracking, keine externen Einbindungen** (Fonts, Icons, Karten, Videos, Formular-Dienste). Sonst müssen Banner und Datenschutzerklärung angepasst werden.
- **Impressum nach § 5 DDG.** Es fehlen noch Telefonnummer, Rechtsform und ggf. USt-IdNr. **Ohne diese Angaben geht die Seite nicht online.**
- **Datenschutzerklärung:** Der Abschnitt nach **Art. 14 DSGVO** für angeschriebene Firmen (Quellen, Zweck, Speicherdauer, Widerspruch) **muss bleiben**. Der Hoster muss genannt sein.
- **Kein Kontaktformular**, nur Mail-Button.
- **Öffentliches Repo = öffentliche Daten.** Mit `.nojekyll` liefert GitHub Pages **jede** Datei im Repo aus, auch `_briefe/` und einen Obsidian-Vault. Firmenlisten, Briefe, Ansprechpartner und interne Notizen gehören in ein **privates** Repo. Die Datenschutzerklärung verspricht ein „privates, nicht öffentliches Repository“, das muss stimmen.
- **Bewertungen nie als Gegenleistung verlangen** (LG Hildesheim, 11 O 12/21). Pilotplätze gibt es „gegen Referenz“, nicht gegen Bewertung.
- Beispiele immer als Beispiel kennzeichnen. Die Muster-Website behält Hinweisleiste und `noindex`.
- Kundennamen/-logos nur mit Freigabe.

---

## 11. Qualitäts-Checkliste (vor jedem „fertig“)

- [ ] 5-Sekunden-Test: wer, was, warum wir, nächster Schritt
- [ ] Kurz-Check-Button bei **375 × 812** und **1440 × 900** ohne Scrollen sichtbar
- [ ] Preise und Nutzen auf allen Größen sichtbar (nichts per `display:none` versteckt)
- [ ] Seite ohne JavaScript benutzbar; bei reduzierter Bewegung kein fixierter Hero
- [ ] Menü per Tastatur: Fokus hinein, Escape schließt, Fokus zurück; Skip-Link funktioniert
- [ ] Keine Bedienelemente ohne Funktion, jeder Link erreicht sein angekündigtes Ziel
- [ ] Max. 6 Sektionen, Text-Budget eingehalten
- [ ] Mobile (375px): kein horizontales Scrollen, alles gut tippbar
- [ ] Mindestens 2 Screenshot-Vergleichsrunden mit der Referenz (Desktop + Mobile), keine sichtbaren Unterschiede mehr
- [ ] Kein `transition: all`, jedes klickbare Element hat hover, focus-visible und active
- [ ] Lighthouse ≥ 90 in allen Kategorien
- [ ] Mail-Button und „Adresse kopieren“ funktionieren, alle Links/Anker ok
- [ ] **Keine einzige externe Anfrage** im Netzwerk-Tab (Fonts, Icons, Skripte alles lokal)
- [ ] Preise und Pakete stimmen mit Abschnitt 2 überein
- [ ] Jede Zahl und jedes Beispiel ist echt oder als Beispiel markiert
- [ ] Anschrift überall Stuttgart
- [ ] Impressum vollständig, Art.-14-Abschnitt in der Datenschutzerklärung vorhanden
- [ ] OFL-Lizenztext der Schriften liegt bei
- [ ] Alt-Texte, Meta-Titel, Beschreibung gesetzt; keine Konsolenfehler

---

## 12. Arbeitsweise für Claude

- **Kommunikation auf Deutsch.**
- Der Nutzer diktiert oft per Spracheingabe. Bei seltsamen Begriffen **nachfragen statt raten**.
- **Erst analysieren, dann bauen.**
- Neue Sektionen, Libraries, externe Dienste oder Preisänderungen **vorher abstimmen**.
- Nach jeder Phase das Ergebnis im Browser-Pane zeigen.
- Es gibt einen zweiten Chat, der die Seite **rechtlich prüft und mit den Briefen abgleicht**. Nach größeren Änderungen eine kurze Liste schreiben, was sich geändert hat, damit der Nutzer sie dorthin weitergeben kann.
- **Zusammenarbeit mit Codex:** Aufgaben stehen in `docs/agenten-zusammenarbeit.md`. Vor Änderungen prüfen, ob jemand anderes die Datei geändert hat; nichts Fremdes zurücksetzen. Nach jeder Runde einen datierten Bericht `docs/claude-bericht-JJJJ-MM-TT-….md` mit geänderten Dateien, Tests und offenen Punkten. Eigene Fixes nie selbst als „behoben“ abhaken – das macht Codex nach der Nachprüfung.
- **Git:** Kein Force-Push auf `main`. Änderungen über einen Branch und einen PR, vorher den aktuellen `origin/main` hineinmergen (am 29.10. hat ein Force-Push PR #4 von GitHub entfernt).
- Diese Datei aktuell halten.

---

## 13. Offene Punkte

**Geklärt:** Repo wird übernommen · Hamza gehört dazu · Anrede Du · Englisch ja · Web und KI 50/50 · Mail-Button, kein Formular · Schriften lokal, keine externen Dienste · WhatsApp später · Hosting kommt nach der Entwicklung.

**Erledigt (25.10.2026):**
- [x] Referenz-Website: **lpas.com** (Startseite), Analyse in `docs/referenz-analyse.md`
- [x] `brand_assets/logo.svg` und `brand_assets/tokens.css` angelegt
- [x] `referenz/` angelegt (nur lokal)
- [x] `.gitignore` angelegt; `_briefe/` aus dem Git-Index genommen (Datei liegt lokal unverändert)
- [x] Technik entschieden: flaches statisches HTML (Abschnitt 4)
- [x] Codex- und Gemini-Bewertung abgeglichen und umgesetzt (`docs/bewertungen-abgleich.md`)

**Erledigt in Runde 3 (Auftrag Yunus: selbst verbessern, Bewertung 65 → 80/100, siehe `docs/claude-bericht-2026-10-25-runde3.md`):**
- [x] Markenfarben überall, eigene Übergangs-Grafiken statt Platzhalter
- [x] Footer verkleinert, Scrollweg der Panels verkürzt
- [x] **Ladebildschirm bleibt** (Entscheidung Yunus, 28.10.2026): „Prüfen. Planen. Bauen. Begleiten.“ bzw. „Check. Plan. Build. Support.“ – nur CSS, blendet nach ca. 1,2 s aus, blockiert keine Klicks, bei reduzierter Bewegung gar nicht sichtbar
- [x] Englische Version `en/index.html`
- [x] Link-Vorschaubild `images/og-image.png` + Open-Graph-Tags
- [x] Drei Antworten auf typische Fragen im Ablauf

**Noch offen:**
- [ ] **Panels 50/50:** derzeit 3 × Online-Präsenz, 2 × KI. Drittes KI-Panel erst mit bestätigtem Paket (Yunus + Calvin)
- [ ] **Fotos:** Teamfoto, 3 Porträts (4:5), 5 Panel-Motive, Footer-Motiv → in `brand_assets/` legen
- [ ] **`_briefe/` aus der Git-Historie bzw. von GitHub entfernen** oder Repo privat machen – der Index-Eintrag ist weg, aber die Daten liegen noch in alten Commits und auf GitHub (Yunus + Calvin). Kein Push, kein Umschreiben der Historie ohne Absprache
- [ ] **Briefgenerator** (Calvin): absoluter Fontpfad in alte `/tmp/claude-0/…`-Umgebung, festes Datum
- [ ] **Obsidian-Vault:** in einem privaten Repo, nicht im Website-Repo
- [ ] **Domain:** danach `hreflang` und volle `og:`-URLs eintragen, `noindex` erst zum Go-live entfernen
- [ ] **Hamza:** Nachname, Schwerpunkt, Kurzbeschreibung
- [ ] **KI-Pakete:** Inhalte und Preise
- [ ] **Briefe:** Sie siezen, die Website duzt. So gewollt?
- [ ] **Impressum:** Telefonnummer, Rechtsform, ggf. USt-IdNr. Impressum und Datenschutz nennen bereits „GbR“, obwohl die Rechtsform offen ist – klären. Hamza im Team heißt nicht automatisch Gesellschafter
- [ ] **Hosting & Domain:** Die Seite liegt bei IONOS (bal-mio.de), die Datenschutzerklärung nennt seit 29.10. IONOS statt GitHub Pages. Offen: Auftragsverarbeitungsvertrag im IONOS-Kundenbereich abschließen; Domain-Zuordnung.
- [ ] **Teamfotos** und Rollentitel
- [ ] **Echte Referenzen** aus den Pilotprojekten
- [ ] **Beispiel-Kurz-Check** zeigen (als Beispiel markiert), sobald Calvins echtes Check-Format feststeht
- [ ] **Gewerberecht:** Dürfen Preise öffentlich stehen, solange das Gewerbe nicht angemeldet ist? (Rechts-Chat)
