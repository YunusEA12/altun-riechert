# Abgleich: Codex- und Gemini-Bewertung (25.10.2026)

Quellen: [codex-bewertung-2026-10-25.md](codex-bewertung-2026-10-25.md), [gemini-bewertung-2026-10-25.md](gemini-bewertung-2026-10-25.md).
Jeder Befund wurde gegen den tatsächlichen Code geprüft. Grundlage ist die zuletzt bestätigte Entscheidung: **Design nach der LPAS-Startseite**, Inhalte, Texte und Bilder eigen.

---

## 1. Wo beide übereinstimmen

| Thema | Codex | Gemini | Geprüft |
|-------|-------|--------|---------|
| Interne Daten (`_briefe/`) gehören nicht ins öffentliche Repo | ✔ | ✔ | **Stimmt.** `_briefe/make_letters.py` ist in Git versioniert, das Repo ist öffentlich |
| Markenidentität fehlt, `brand_assets/` leer | ✔ | ✔ | **Stimmt.** Farben noch aus der Vorlage, Logo nur als Schriftzug |
| `CLAUDE.md` passt nicht zur echten Ordnerstruktur (`src/content/site.json`, `public/`) | ✔ | ✔ | **Stimmt.** Es gibt keine Inhaltsdatei, alles ist flaches HTML |
| Kontakt per Handy muss mit einem Tipp gehen | ✔ (CTA zu spät) | ✔ (mailto mit Betreff) | **Teilweise.** Der Kurz-Check-Link mit Betreff gab es schon im Footer, aber erst nach ca. 6.500 px |

## 2. Wo eine Bewertung falsch liegt

| Befund | Wer | Richtigstellung |
|--------|-----|-----------------|
| „Ordner `assets/` existiert nicht, Pfade auf `style.css` ändern“ | Gemini | **Falsch.** `assets/site.css` und `assets/site.js` existieren lokal. Sie sind nur **noch nicht in Git** (untracked), deshalb fehlen sie auf GitHub. Pfade auf `style.css` zu ändern würde die Seite zerstören, denn `style.css` ist das alte Stylesheet für Impressum und Datenschutz. **Richtige Maßnahme:** `assets/`, `images/`, `docs/` beim nächsten Commit mit aufnehmen. |
| „mailto mit Betreff ergänzen“ | Gemini | War im Footer schon vorhanden. Das eigentliche Problem ist die **Position** (Codex, Befund 1). |
| `site.json` + Build-Skript **oder** flache Struktur | Gemini | Codex rät von clientseitigem JSON ab. **Entscheidung:** flaches statisches HTML bleiben, `CLAUDE.md` angepasst. Ein Build-Skript erst, wenn Englisch dazukommt und doppelte Pflege lästig wird. |

## 3. Nur von Codex gefunden (alle geprüft)

| # | Befund | Art | Geprüft |
|---|--------|-----|---------|
| C1 | Kurz-Check erst bei ~5.700 px (Desktop) / ~3.900 px (Mobile) | Fehler (Vertrieb) | Stimmt |
| C2 | Mobile blendet Panel-Untertitel mit Preisen aus (`display:none`) | Fehler | Stimmt |
| C3 | Sichtbare Platzhalter in Projekten und Aktuelles, Filter filtert nicht, Zähler auf 0 | Fehler (Vertrauen) | Stimmt |
| C4 | Team-Rollen und Ablauf fehlen | Inhalt | Stimmt, kam durch den Wechsel zur LPAS-Startseite |
| C5 | 29 €/Monat fehlt, Pilotphase unklar, KI wirkt verbindlicher als bestätigt | Inhalt | Stimmt |
| C6 | „Muster-Website“ führt zum Kontakt, „Mehr zu …“ überall zum Kontakt, EN auf `#`, DE/EN verschwindet beim Scrollen, unsichtbare Fokusziele | Fehler | Stimmt |
| C7 | Preloader hängt an `site.js`, Reveal-Texte unsichtbar ohne JS, Panels ohne JS unerreichbar, reduzierte Bewegung im JS ignoriert, Menü ohne Fokusführung | Fehler (Robustheit, Barrierefreiheit) | Stimmt |
| C8 | Footer sehr groß (900 px Bild) | Designurteil | Ist 1:1 aus der Vorlage → **Entscheidung Yunus** |
| C9 | README veraltet | Fehler | Stimmt |
| C10 | Impressum nennt GbR, obwohl Rechtsform offen; Telefon/USt-Platzhalter | Recht | Stimmt → **Entscheidung Team** |
| C11 | Briefgenerator: absoluter Fontpfad, festes Datum | Calvins Bereich | Stimmt → an Calvin |
| C12 | 3 Web- und 2 KI-Panels statt 50/50 | Geschäftsentscheidung | → **Entscheidung Yunus** |

## 4. Änderungsliste mit Abnahmekriterien

**Erledigt in dieser Runde:**

| # | Änderung | Abnahme |
|---|----------|---------|
| 1 | `.gitignore` mit `_briefe/`, `obsidian-vault/`, `referenz/`-Inhalten, Systemdateien; `_briefe/` aus dem Git-Index genommen (Datei bleibt lokal) | `git ls-files _briefe` ist leer |
| 2 | `brand_assets/logo.svg` (Kachel, Petrol/Amber, Zusatz) und `brand_assets/tokens.css` | Dateien vorhanden, Logo-Kachel in Header und Footer |
| 3 | `referenz/` mit README (nur lokal, nicht im Repo) | Ordner vorhanden, Inhalte ignoriert |
| 4 | Kurz-Check im Hero **und** dauerhaft im Header, mailto mit Betreff und Mail-Vorlage | CTA bei 375 × 812 und 1440 × 900 ohne Scrollen sichtbar |
| 5 | Panel-Untertitel mit Preisen auf allen Größen, 29 €/Monat ergänzt, Pilotphase genannt, KI ohne unbestätigte Leistungsversprechen | Keine ausgeblendeten Preis-/Nutzeninfos |
| 6 | Panels nach Bereich gruppiert und beschriftet („Online-Präsenz“ / „KI“) | Zuordnung sichtbar |
| 7 | Platzhalter-Projekte und Aktuelles ausgeblendet (im HTML vorbereitet), Filter entfernt, echte Vorschau der Muster-Website | Keine sichtbaren Projekt-/Datumsplatzhalter |
| 8 | Ablauf (3 Schritte) und Team (3 Karten, bestätigte Rollen) ergänzt | Sektionen vorhanden; einzige sichtbare Platzhalter: Hamzas Angaben und Fotos |
| 9 | Links: Muster-Website → `beispiel/`, Panel-Buttons → Kurz-Check mit passendem Betreff, EN als nicht klickbarer Hinweis | Jeder Link erreicht sein angekündigtes Ziel |
| 10 | DE/EN und Kurz-Check bleiben beim Scrollen sichtbar; ausgeblendetes Logo per `visibility:hidden` aus der Tab-Reihenfolge | Keine unsichtbaren Fokusziele |
| 11 | Preloader ohne JS-Abhängigkeit (reines CSS, kürzer); Reveal nur, wenn `site.js` läuft; Panels ohne JS oder bei reduzierter Bewegung als normale Scroll-Leiste | Inhalte ohne JS erreichbar |
| 12 | Menü: Fokus auf ersten Link, Hintergrund `inert`, Escape, Fokus zurück zum Button; Skip-Link | Mit Tastatur bedienbar |
| 13 | `CLAUDE.md` an echte Struktur und LPAS-Entscheidung angepasst, README neu | Keine Widersprüche mehr |

**Offen – braucht eine Entscheidung:**

| # | Frage | Wer |
|---|-------|-----|
| A | Markenfarben (Petrol/Amber) überall statt Vorlagen-Farben? | Yunus |
| B | Preloader ganz entfernen? (Empfehlung: ja) | Yunus |
| C | Footer verkleinern? | Yunus |
| D | Panels 50/50 (z. B. 3 + 3 mit „KI-Agenten“) – aber nur mit bestätigten KI-Paketen | Yunus + Calvin |
| E | Repo privat machen oder `_briefe/` aus der Git-**Historie** entfernen (Daten sind dort weiterhin sichtbar) | Yunus + Calvin |
| F | Rechtsform im Impressum (GbR ja/nein), Telefon, USt-IdNr. | Team |
| G | Hamza: Nachname, Rolle, Kurzbeschreibung, Foto | Hamza |
| H | Englische Version bauen (erst wenn Deutsch steht) | Yunus |

**Geprüft (Browser-Pane, localhost):** CTA ohne Scrollen bei 375 × 812 (Button bis 749 px), 768 × 1024 (bis 961 px), 1280 × 800 (bis 740 px), 1440 × 900 (bis 840 px); kein seitliches Scrollen bei 375/768/1280; Panel-Titel passen bei 375 px; Menü per Tastatur (Fokus, `inert`, Escape, Fokus-Rückgabe); alle Anker-Links haben ein Ziel; Seite ohne `site.js` geladen: Preloader verschwindet, Texte sichtbar, Panels als Scroll-Leiste. Einzige sichtbare Platzhalter: Hamzas Angaben.

**Nicht geprüft:** Lighthouse, Netzwerk-Audit, echte Mobilgeräte, Mail-Vorlage in echten Mail-Apps, rechtliche Freigabe.

## 5. Für die nächste Prüfung durch ChatGPT/Codex

Bitte gezielt prüfen:
1. **Lighthouse** (Mobile + Desktop) und **Netzwerk-Tab**: Gibt es irgendeine externe Anfrage?
2. **Mail-Vorlage** auf iPhone (Apple Mail), Android (Gmail) und Desktop: Kommen Betreff und Text mit Umlauten korrekt an?
3. **Text-Check gegen die Briefe:** Passt „Startphase: Kurz-Check und 3 Pilotplätze kostenlos“ zum Brieftext? Ist „Wir bringen deinen Betrieb online nach vorn“ als Ziel formuliert und nicht als Garantie?
4. **Preise:** Ist es in Ordnung, Preise (390 €, ab 1.490 € + 29 €/Monat, 990 €, ab 49 €/Monat) schon zu zeigen, obwohl bis zur Gewerbeanmeldung kein Geld genommen wird?
5. **Barrierefreiheit:** Screenreader-Test des Menüs und der Panels.
