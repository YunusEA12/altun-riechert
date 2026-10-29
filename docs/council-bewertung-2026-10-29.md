# KI-Council: Kritische Bewertung der Website (29.10.2026)

**Geprüfter Stand:** `origin/main` auf GitHub (Commit `4d15b6c`, Calvin, 29.10.). Zum Vergleich gemessen: dein lokaler `main` (`4de8b22`, PR #4).
**Gutachter:** Claude (eigene Bewertung vorab) + Gemini. **GPT ist erneut ausgefallen** (Council-Konfiguration nutzt `gpt-5.4`, das mit ChatGPT-Konto nicht geht). Es war also **kein voller Council**, sondern nur ein Gutachter.
**Gesendet:** nur die öffentliche Repo-Kopie ohne Git-Historie und ohne Briefe/Firmendaten.

---

## Achtung zuerst: GitHub-`main` wurde überschrieben

Der heutige Push auf `main` war ein **Force-Push**. Dadurch fehlen auf GitHub:
- der Merge von PR #4 („animationen“) und der Merge-Commit `820b995` (Animationen + neues Menü vereint),
- die Fixes aus der Council-Runde vom 28.10.: Videos lazy und komprimiert, Team mobil kompakt, Mail-Adresse unter dem Hero-Button, „Beispiel-Vorschau“ statt „Live-Vorschau“, Pilotplätze nur bei „Sichtbar“,
- `docs/council-bewertung-2026-10-28.md` und der Abschnitt „Effekte“ in `CLAUDE.md`.

Lokal ist alles noch da. **Gemessen auf dem Handy (375 × 812):**

| | GitHub (`4d15b6c`) | lokal (`4de8b22`) |
|---|---:|---:|
| Datenmenge beim ersten Laden | **ca. 12 MB** | 564 KiB |
| Seitenlänge | 8.465 px | 6.734 px |
| Team-Sektion | 1.122 px | 643 px |

→ Mit Calvin klären und beide Stände zusammenführen. Danach Branch-Schutz auf `main` (kein Force-Push, nur PRs).

---

## Bewertung (GitHub-Stand, 1–100)

| Bereich | Claude | Gemini | **Abgeglichen** | Was die Zahl drückt |
|---|---:|---:|---:|---|
| Erster Eindruck (5 Sekunden) | 74 | 48 | **68** | H1 hat 11 Wörter (Budget 8) und ist allgemein („online nach vorn“). Kein Gesicht, kein Bezug zum Brief |
| Vertrauen & Glaubwürdigkeit | 45 | 22 | **35** | Initialen statt Fotos, Gmail, kein Telefon, Hamza ohne Rolle, keine Referenz, „Messbar besser“ ohne Beleg |
| Angebot & Preisklarheit | 72 | 62 | **65** | „3 Pilotplätze kostenlos“ steht auf allen Leistungsseiten (gilt nur für „Sichtbar“), Meta-Text sagt „zum Festpreis umsetzen“, KI-Seite bleibt vage |
| Weg zur Anfrage | 82 | 38 | **70** | Gut: mailto mit Vorlage, Header-Button, Kopieren-Knopf. Schlecht: kein Telefon/WhatsApp, Mail-Adresse nicht mehr unter dem Hero-Button |
| Wow-Effekt & Design | 70 | 65 | **68** | Videos und Panels wirken. Aber: Effekte entfernt, Laufband „Prüfen Planen Bauen“ 6× wiederholt, Muster-Website (stärkstes Stück) erst weit unten |
| Mobile & Performance | 55 | 31 | **45** | 12 MB, alle 5 Videos laden sofort, Vorschaubilder je 700 KB JPG |
| Texte & Tonalität | 65 | 52 | **60** | Floskeln: „Ehrlich beraten. Fair bezahlt. Messbar besser.“, „auf Augenhöhe“, „partnerschaftlich“ |
| Recht & Veröffentlichungsreife | 35 | 18 | **30** | Impressum `[Telefonnummer]`, „GbR“ trotz offener Rechtsform, Domain offen, „Live-Vorschau“ beim erfundenen Chat |
| Leistungsseiten | 68 | 55 | **62** | Gut gegliedert, Beispiele markiert. Alle fünf gleich gebaut, Pilot-Hinweis falsch |
| Technik & Barrierefreiheit | 78 | 58 | **70** | Ohne JS ok, keine externen Anfragen, Skip-Link. Fehlt: Pause-Knopf für Autoplay-Videos (WCAG 2.2.2) |
| **Gesamt** | **~63** | **45** | **~57** | |

Dein lokaler Stand läge bei Mobile, Technik und Recht deutlich höher; der Rückschritt kommt fast nur vom Force-Push.

---

## Maßnahmen, sortiert nach Wirkung

### A. Im Code machbar, ohne etwas zu erfinden

| # | Maßnahme | Ziel | Wirkung | Aufwand |
|---|---|---|---|---|
| 1 | **Beide Stände zusammenführen** (lokal + Calvins Leistungsseiten/Menü), danach Branch-Schutz | alles | hoch | mittel |
| 2 | **Videos:** erst laden, wenn sichtbar; die komprimierten Fassungen (1,9 MB statt 10 MB); Vorschaubilder als WebP; **Pause-Knopf** | Mobile, Recht (WCAG) | hoch | gering |
| 3 | **Muster-Website nach vorn holen:** direkt nach den Panels oder im Hero ein „So könnte deine Seite aussehen“-Teaser | Wow, Vertrauen | hoch | gering |
| 4 | **Beispiel-Kurz-Check zeigen** (deutlich als Beispiel markiert): so sieht die eine Seite aus, die der Betrieb bekommt | Vertrauen, schnelle Anfrage | hoch | mittel |
| 5 | **Brücke zum Brief:** kurzer Hinweis oben: „Post von uns bekommen? Antworte einfach mit ‚Kurz-Check‘.“ | schnelle Anfrage | hoch | gering |
| 6 | **Hero-Überschrift ≤ 8 Wörter**, konkret (z. B. wieder „Mehr Anfragen für deinen Betrieb.“), Unterzeile: wer wir sind (drei Informatiker aus Stuttgart, Startphase) | 5-Sekunden-Test | mittel | gering |
| 7 | **Pilot-Hinweis nur bei „Sichtbar“**, Meta-Text ohne „Festpreis umsetzen“, klar sagen: jetzt kostenloser Check + 3 Pilotplätze | Recht, Klarheit | mittel | gering |
| 8 | „Live-Vorschau“ → „Beispiel-Vorschau“, „Messbar besser“ und Floskeln raus | Recht, Ton | mittel | gering |
| 9 | Mail-Adresse wieder unter den Hero-Button, Team mobil kompakt (643 px) | Anfrage, Mobile | mittel | gering |
| 10 | Leistungsseiten unterscheidbarer machen, Laufband einmal statt sechsmal | Wow | niedrig | mittel |

### B. Nur das Team kann es lösen

| # | Maßnahme | Wirkung |
|---|---|---|
| 11 | **Echte Fotos** (Team + 3 Porträts). Optional ein 20-Sekunden-Video-Gruß: das stärkste Mittel gegen „Wer sind die?“ | **sehr hoch** |
| 12 | **Telefonnummer** (auch Handy): Impressum, antippbarer Link, später WhatsApp | hoch |
| 13 | **Eigene Domain + Domain-Mail** statt Gmail | hoch |
| 14 | **Rechtsform und Gewerbeanmeldung klären.** Frage an den Rechts-Chat: Dürfen Preise öffentlich stehen, solange das Gewerbe nicht angemeldet ist? | hoch |
| 15 | Hamzas Angaben, konkrete KI-Pakete (Inhalt KI-Assistent, Preis Automatisierung) | mittel |

---

## Geprüfte Kernaussagen

| Aussage | Status | Wie geprüft |
|---|---|---|
| Handy lädt beim Start ca. 12 MB, alle Videos sofort | **belegt** | Browser, `performance`-Einträge, `readyState 4` bei allen 5 Videos |
| Force-Push hat PR #4 und `820b995` von GitHub entfernt | **belegt** | `git reflog origin/main` („forced-update“), kein Branch enthält `820b995` |
| Hero-Button auf dem Handy abgeschnitten (Gemini) | **widerlegt** | gemessen bei 701–749 px von 812, im Screenshot sichtbar |
| Ladebildschirm blockiert Screenreader (Gemini) | **widerlegt** | `aria-hidden`, `pointer-events: none`, 1,2 s |
| Autoplay-Videos ohne Pause-Knopf verletzen WCAG 2.2.2 (Gemini) | **belegt** | laufen in Schleife > 5 s, kein Bedienelement; pausieren nur bei reduzierter Bewegung |
| Impressum hat `[Telefonnummer]` und nennt „GbR“ | **belegt** | Quelltext `impressum.html` |
| Art.-14-Abschnitt und Hoster stehen in der Datenschutzerklärung | **belegt** | Abschnitt mit Quellen (Impressum, Google-Profil, Verzeichnisse), GitHub Pages genannt |
| Öffentliche Preise ohne Gewerbeanmeldung = Bußgeldrisiko (Gemini) | **offen** | plausibel (§ 14 GewO), nicht geprüft → Rechts-Chat |

## Wo die Modelle abweichen

- **Gemini ist durchweg härter** (45 statt 63). Beim Vertrauen hat Gemini recht: Claude war zu mild. Bei Anfrage-Weg und Technik ist Gemini zu hart, weil es Messungen falsch gelesen hat (Hero-Button, Ladebildschirm).
- **Nicht übernommen (Minderheitsmeinung Gemini):** Ladebildschirm entfernen (Entscheidung Yunus vom 28.10.), auf „Sie“ umstellen (Entscheidung „Du“, Gemini hält Du für ein Risiko bei 55-jährigen Meistern), nur ein Kernangebot zeigen (widerspricht der 50/50-Regel), Pilot „gegen Feedback“ (muss „gegen Referenz“ heißen, LG Hildesheim).

## Offene Unsicherheiten

- Wie viele Handys ohne eingerichtete Mail-App `mailto:` ins Leere schicken: nicht gemessen.
- Ob die Du-Anrede bei der Zielgruppe Vertrauen kostet: nur durch echte Antworten auf die Briefe zu klären.

## Beitrag der Gutachter

Gemini brachte drei berechtigte Punkte, die in Claudes Bewertung fehlten: Pause-Knopf für Videos (WCAG 2.2.2), die Muster-Website als stärkstes Stück nach vorn holen, Risiko bei Preisangaben vor der Gewerbeanmeldung. GPT hat nichts beigetragen (Ausfall).

---

## Für den Rechts-Chat (kurz)

1. GitHub-`main` enthält wieder: „3 Pilotplätze kostenlos“ auf allen Leistungsseiten, „Live-Vorschau“ beim erfundenen KI-Chat, „Messbar besser“, Meta-Text „zum Festpreis umsetzen“.
2. Impressum: `[Telefonnummer]`, „GbR“ trotz offener Rechtsform.
3. Frage: Preise öffentlich vor der Gewerbeanmeldung zulässig?
4. Autoplay-Videos ohne Pause-Knopf (Barrierefreiheit).
