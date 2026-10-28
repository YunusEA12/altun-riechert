# KI-Council: Bewertung der Website (28.10.2026)

**Ablauf:** Claude hat zuerst eine eigene Bewertung (C) erstellt, dann GPT und Gemini unabhängig gefragt. Gesendet wurde nur das geprüfte öffentliche Exportpaket bzw. eine Textzusammenfassung – keine Briefe, keine Firmendaten, keine internen Dokumente.

**Ausfälle:** GPT (Codex) ist ausgefallen: In der Council-Konfiguration ist das Modell `gpt-5.4` eingestellt, das mit einem ChatGPT-Konto nicht unterstützt wird. Gemini brach im ersten Lauf ab (fehlerhafter interner Funktionsaufruf) und antwortete im zweiten Lauf. **Es war also kein voller Council, sondern nur ein Gutachter (Gemini).**

## Bewertungen

| Kategorie | Claude vorher | Gemini | Abgeglichen nach Fixes |
|-----------|--------------:|-------:|-----------------------:|
| Weg zur Anfrage | 93 | 52 | 90 |
| Verständlichkeit & Angebot | 85 | 64 | 80 |
| Vertrauen & Echtheit | 55 | 22 | 52 |
| Gestaltung & Markenbild | 85 | 55 | 82 |
| Mobile | 90 | 58 | 90 |
| Technik/Performance/Barrierefreiheit | 92 | 82 | 93 |
| Mehrsprachigkeit & Veröffentlichungsreife | 60 | 20 | 45 |
| **Gesamt** | **~80** | **48** | **~76** |

„Abgeglichen“ = Claudes Messungen plus Geminis berechtigte Kritik aus Sicht eines Handwerksmeisters (50+, Handy, misstrauisch nach Kaltakquise-Brief). Claude war beim Vertrauen zu mild.

## Geprüfte Kernaussagen

| Aussage | Status | Wie geprüft |
|---------|--------|-------------|
| Impressum hat sichtbare Platzhalter ([Telefonnummer], [USt-IdNr.]) und nennt „GbR“ | **belegt** | Quelltext `impressum.html` |
| Ohne JS gibt es mobil fehleranfällige Querscroll-Leisten (Gemini) | **widerlegt** | Mobil sind die Panels per CSS immer untereinander (`display: block`), gemessen |
| Ladebildschirm macht die Seite 1,2 s unbedienbar (Gemini) | **teilweise widerlegt** | `pointer-events: none`, darunter sofort klickbar; optisch 1,2 s verdeckt |
| Die Seite ist mobil sehr lang | **belegt** | 9.774 px gemessen; Hauptursache: **Team-Bilder 1.000 px hoch** (Bug, von keinem Gutachter gefunden) |
| Brief siezt, Website duzt, Muster-Website und Rechtstexte siezen | **belegt** | Quelltexte; Entscheidung „Du“ liegt beim Team |
| `mailto:` kann auf Handys ohne Mail-App ins Leere laufen | **offen** | plausibel, nicht auf echten Geräten getestet → Rückfall eingebaut |

## Umgesetzt

| Punkt | Quelle | Ergebnis |
|-------|--------|----------|
| Team-Bilder 4:5 statt 1.000 px hoch (`height: auto`) | Claude (beim Prüfen gefunden) | Team mobil 3.507 → 643 px, Desktop korrekt 435 × 544 |
| Team mobil kompakt (Bild links, Text rechts) | Gemini (Länge) | Seite mobil **9.774 → 6.627 px** (−32 %) |
| E-Mail-Adresse im Klartext unter dem Kurz-Check-Button | Gemini (mailto-Risiko) | im ersten Bildschirm (mobil bis 780 px, Desktop bis 840 px) |
| „Steckbrief folgt“ → „Teil des Teams Altun & Riechert“ | Gemini (Baustellen-Signal) | keine sichtbare Baustelle mehr |
| Team-Texte nutzenorientierter, nur bestätigte Fakten | Gemini (Buzzwords) | DE und EN |
| Panel-Bilder mobil 160 → 120 px, Footer mobil kompakter | Gemini (Länge) | – |
| Hero-Animation auf Touch-Geräten ~30 fps | Gemini (Akku) | – |

## Bewusst nicht umgesetzt (Minderheitsmeinung Gemini)

| Vorschlag | Grund |
|-----------|-------|
| Ladebildschirm entfernen | Ausdrückliche Entscheidung Yunus (28.10.) |
| Englische Version entfernen | Entscheidung Yunus („Englisch ja“) |
| Kontaktformular | Projektregel: kein Formular, keine Fremddienste |
| Auf „Sie“ umstellen | Entscheidung Yunus („Du“) – **Gemini hält das für das größte Vertrauensrisiko; Entscheidung liegt beim Team** |

## Tests nach den Änderungen

Lighthouse Mobile 99/100/100/63, Desktop 100/100/100/63 (SEO nur wegen `noindex`, TBT 0 ms) · `unittest` 13 OK · Demo-Test PASS · Sicherheitscheck 0 Fehler · Export `--strict` 0/0.

## Runde 2: nach Calvins Videos und Detail-Fenstern (Ziel Yunus: jede Kategorie über 70)

Calvin hat auf `main` Videos für alle 5 Panels, Detail-Fenster pro Leistung und eine Chat-Demo ergänzt. Zusammengeführt mit dieser Runde, danach geprüft und überarbeitet:

| Änderung | Grund |
|----------|-------|
| Erfolgsversprechen umformuliert: „Ganz oben in Maps“, „Top-3 in Google Maps“, „Regelmäßig 5 Sterne“, „Unter 1 Sekunde Ladezeit“, „100 % DSGVO-konform“ → Ziele statt Garantien; Vorher/Nachher als „Beispiel, kein Ergebnisversprechen“ gekennzeichnet | CLAUDE.md Regel 5 (keine Erfolgsgarantien), Abmahnrisiko |
| EN: „€99 in exchange for a review“ → „free of charge in exchange for a reference“ | Bewertungen nie als Gegenleistung (LG Hildesheim, 11 O 12/21) |
| Pilotplätze nur noch bei „Sichtbar“ (nicht bei Webseiten), „kostenlos gegen Referenz“ wie im Hero | CLAUDE.md Abschnitt 2 |
| „Live-Vorschau“ → „Beispiel-Vorschau mit vorbereiteten Antworten eines erfundenen Betriebs“; Chat antwortet auf der EN-Seite englisch | keine Täuschung, Beispiele kennzeichnen |
| Detail-Knöpfe erst mit JS sichtbar, ohne JS bleibt der Kurz-Check-Link; Fokus kehrt nach dem Schließen zum Knopf zurück | Regel 6 (ohne JS benutzbar), Tastaturbedienung |
| Videos ohne Tonspur, 960 px, `faststart`: 10,1 MB → 1,9 MB; Vorschaubilder 2,1 MB → 0,2 MB; Videos laden erst, wenn ein Viertel des Panels sichtbar ist | Datenvolumen am Handy: Startgewicht 961 → 395 KiB |
| Fixierter Hero wird schon im `<head>` entschieden | behebt Layoutverschiebung (Desktop CLS 0,126 → 0) |

**Nicht übernommen:** Branch `test` (älterer Umbau mit Sie-Anrede, PHP-Kontaktformular, „Preise immer auf Anfrage“ – widerspricht den aktuellen Regeln). Darin steht die Domain `bal-mio.de` – mit dem Team klären.

**Tests:** Lighthouse Mobile 95/100/100/63 (CLS 0), Desktop 100/100/100/63 · `unittest` 13 OK · Demo-Test PASS · Sicherheitscheck 0 Fehler · Export `--strict` 0/0 · Browser: Detail-Fenster DE/EN, Fokus, Beispiel-Hinweis, keine verbotenen Aussagen mehr im HTML, fixierter Hero.

### Bewertung nach Runde 2

| Kategorie | vorher | jetzt | Was die Zahl noch begrenzt |
|-----------|-------:|------:|----------------------------|
| Weg zur Anfrage | 90 | **92** | kein Telefon / WhatsApp |
| Verständlichkeit & Angebot | 80 | **88** | KI-Umfang „auf Anfrage“ |
| Vertrauen & Echtheit | 52 | **64** | keine Teamfotos, Gmail-Adresse, Impressum-Platzhalter, Hamza ohne Angaben |
| Gestaltung & Markenbild | 82 | **86** | Team noch mit Initialen |
| Mobile | 90 | **92** | – |
| Technik/Performance/Barrierefreiheit | 93 | **95** | kein Test mit echtem Screenreader/Gerät |
| Mehrsprachigkeit & Veröffentlichungsreife | 45 | **50** | Impressum unvollständig, Hoster/Domain offen, Repo öffentlich |
| **Gesamt** | **~76** | **~81** | |

**Ehrlich:** Zwei Kategorien liegen noch unter 70. Beide lassen sich nicht im Code heben, ohne Angaben zu erfinden:
- **Vertrauen → über 70:** Teamfoto + Porträts (+6), Domain-E-Mail statt Gmail (+3), Hamzas Angaben (+2).
- **Veröffentlichungsreife → über 70:** Impressum vollständig (+12), Hoster + Domain festgelegt und in der Datenschutzerklärung (+8), Repo privat (+3).

## Was für 90+ fehlt (nur mit dem Team)

Echte Fotos · Impressum vollständig · eigene Domain + Domain-Mail · Telefonnummer · Hamzas Angaben · konkrete KI-Pakete · erste echte Referenz · Entscheidung Sie/Du.
