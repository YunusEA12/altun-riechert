# Codex-Bewertung für die Übergabe an Claude

Stand: 25.10.2026. Dies ist ausschließlich die Bewertung von Codex. Eine Bewertung von Gemini liegt nicht vor und wurde nicht simuliert. Die Website wurde nicht verändert.

## Gesamturteil

**4/10 für den aktuellen Stand als Kundenwebsite.** Das ist eine qualitative Bewertung, kein gemessener Lighthouse- oder Conversion-Score. Der Entwurf hat eine brauchbare technische Grundlage und gestalterischen Anspruch, erfüllt den eigentlichen Vertriebszweck aber noch schwach. Ein Betrieb soll nach einem Brief schnell verstehen, wer dahintersteht, was der kostenlose Kurz-Check liefert und wie er ihn anfragt. Der aktuelle Aufbau verlangt dafür sehr viel Scrollen und zeigt überwiegend unfertige Inhalte.

Die wichtigste Entscheidung für Claude: Die Referenz darf die visuelle Sprache prägen. Ob ihre Dramaturgie mit fünf bildlastigen Panels und großem Projektportfolio für ein junges regionales Team funktioniert, muss separat entschieden werden. Echte Bilder allein lösen die fehlende Kontaktpriorität nicht.

| Bereich | Bewertung | Begründung |
|---|---:|---|
| Gestaltung im aktuellen Zustand | 5/10 | Klare Typografiestufen und Raster; fast nur Platzhalter, wenig eigene Markenidentität |
| Verständlichkeit und Angebot | 4/10 | Webseiten und KI erkennbar, Leistungsumfang und Kosten unvollständig |
| Vertrauen | 3/10 | Teamnamen vorhanden, aber keine Gesichter, Rollen oder belastbaren Kundenbeispiele |
| Weg zur Anfrage | 3/10 | Kurz-Check fehlt im ersten Bildschirm und im Header |
| Mobile Nutzung | 4/10 | Layout passt grundsätzlich in die Breite, ist aber lang und blendet wichtige Inhalte aus |
| Technische Grundlage | 6/10 | Wenig Abhängigkeiten, lokale Assets; mehrere Robustheits- und Bedienungsprobleme |
| Veröffentlichungsreife | 2/10 | Sichtbare Platzhalter, offene Unternehmensangaben, fehlendes Englisch und ungeklärte interne Dateien |

## Prüfumfang und Grenzen

Gelesen: Startseite, aktives CSS/JS, Projektregeln, README, Referenzanalyse, Ideen, Impressum, Datenschutz und Teile der Muster-Website einschließlich ihres JavaScripts. Asset- und Git-Dateiliste geprüft. Briefgenerator nur hinsichtlich Struktur und Ablage eingeordnet, nicht ausgeführt und nicht inhaltlich vollständig geprüft.

Browserprüfung über den bereits laufenden Server auf localhost: Startseite und Muster-Website, Ansichten bei 375 und 1440 Pixeln, zusätzliche Breitenmessung bei 768 und 1280 Pixeln, Menü/Kontaktnavigation und E-Mail-Kopierfunktion. Der Kopierbutton bestätigte „Kopiert.“; das tatsächliche Clipboard wurde nicht ausgelesen. Keine Warnungen oder Fehler in den abgefragten Browserlogs der Startseite.

Kein vollständiger Accessibility-Audit, kein Lighthouse-Lauf, kein Netzwerkaudit, kein Test auf echten Mobilgeräten, kein pixelgenauer Vergleich mit der aktuellen externen Referenz. Rechtstexte wurden nur auf Platzhalter und Widersprüche zum Projektbriefing geprüft, nicht rechtlich freigegeben. Aktueller öffentlicher Repository- und Hostingstatus wurde nicht verifiziert.

## Was gut ist und erhalten bleiben sollte

- Statisches HTML/CSS/JS passt zur Aufgabe. Für diese Website ist kein großes Framework erforderlich.
- Archivo und Bricolage liegen lokal samt OFL-Lizenztexten vor. Die geprüften Seiten benötigen keine eingebundenen Font-CDNs.
- Region, Leistungsrichtungen und alle drei Teammitglieder werden genannt.
- Die Muster-Website ist sichtbar als erfundener Betrieb gekennzeichnet und besitzt weiterhin `noindex`.
- Bildabmessungen, Lazy Loading im unteren Seitenbereich, ein globaler Fokusstil und eine Live-Region für Kopierrückmeldungen sind vorhanden.
- Der Mail-Link für den Kurz-Check enthält den passenden Betreff.
- Die Muster-Website erklärt Nutzen, Ablauf und nächste Handlung wesentlich konkreter. Diese kommunikative Klarheit ist ein gutes internes Vorbild.

## Wichtigste Befunde und konkrete Aufgaben

### 1. Der Kurz-Check kommt zu spät — hohe Priorität

Bei 375 × 812 lag der erste Link „Kurz-Check anfragen“ ungefähr bei Dokumentposition **3.927 px**, der Mail-Link „Kurz-Check“ bei **6.527 px**. Die Seite war ungefähr **7.318 px** hoch. Bei 1440 × 900 lag der erste Link bei **5.693 px**; der Hero-Bereich inklusive Scrollstrecke war **5.205 px** hoch. Werte sind Momentaufnahmen, abhängig von Viewport und Schriftlayout. Das Menü bietet einen kürzeren Weg zum Kontakt, aber keinen gleichwertig sichtbaren Kurz-Check-CTA.

**Aufgabe:** Kurz-Check direkt im Hero und als erreichbare Header-Aktion anbieten. In einem kurzen Satz erklären, was der Interessent erhält. Scrollanimation darf optional bleiben, aber den Kontaktweg nicht bestimmen. Die fünf mobilen Panels sind zusammen bereits 2.600 px hoch.

### 2. Mobile blendet entscheidende Informationen aus — hohe Priorität

`assets/site.css:334` setzt `.panel__subtitle` auf `display:none`. Dadurch verschwinden unter anderem „Ab 1.490 €“, Google-Profil/Bewertungen und die kurze Erklärung des KI-Assistenten. Große Überschriften und Platzhalterbilder bleiben stehen.

**Aufgabe:** Nutzen und Preisbestandteile auf allen Bildschirmgrößen erhalten. Panels kompakter machen. Lange Wörter prüfen: „Automatisierung“ war bei 375 px breiter als seine Textbox, auch wenn dadurch kein horizontaler Seiten-Overflow entstand.

### 3. Portfolio und Neuigkeiten vermitteln Unfertigkeit — hohe Priorität

Fünf Projektkarten enthalten sichtbare Platzhalter; hinzu kommen unvollständige Neuigkeiten und `[DATUM]`. Vier Schwerpunktzähler stehen auf null. „Alle Neuigkeiten“ springt lediglich zum bestehenden Abschnitt, und die optisch filterartige Leiste filtert nicht.

**Aufgabe:** Nicht verfügbare Referenzen und Neuigkeiten ausblenden. Ein überzeugend dargestelltes, klar als Beispiel gekennzeichnetes Musterprojekt reicht vorerst. Dafür eine echte Vorschau der vorhandenen Muster-Website einsetzen. Keine Kunden, Resultate oder Bewertungen erfinden. „Aktuelles“ erst zeigen, wenn es tatsächlich gepflegte Inhalte gibt.

### 4. Team und Ablauf fehlen als Vertrauensbelege — hohe Priorität

Der Teamabsatz nennt Yunus, Calvin und Hamza, erklärt aber weder ihre Rollen noch Qualifikation und Zuständigkeit. „Prüfen. Planen. Umsetzen.“ ersetzt nicht die konkrete Erklärung von Kurz-Check, Gespräch und Angebot.

**Aufgabe:** Echte Fotos und bestätigte Rollen einbauen; Yunus' Masterstudium nicht als abgeschlossenen Master darstellen. Hamzas fehlende Angaben offen einholen. Drei kurze Schritte erklären: Was muss der Betrieb senden? Was bekommt er? Was geschieht danach? Keine unbestätigten Lieferfristen hinzufügen.

### 5. Angebot und Preise sind unvollständig — hohe Priorität

Die Website nennt „Ab 1.490 € zum Festpreis“, lässt die laut Briefing vorgesehenen **29 €/Monat Hosting & Pflege** aber weg. Sichtbar/Fachkräfte sind nicht als verständliche Pakete erläutert. Die Grenze „bis zur Gewerbeanmeldung nur kostenlose Checks und Pilotprojekte“ ist auf der Seite nicht klar genug. Die KI-Pakete sind laut Briefing noch offen, während die Website schon konkrete Leistungen suggeriert.

**Aufgabe:** Bestätigte Preise und wiederkehrende Kosten vollständig nennen; aktuelle kostenlose Pilotphase und spätere Angebote deutlich auseinanderhalten. KI-Umfang erst nach fachlicher Bestätigung als verbindliches Angebot formulieren. Zwei gleichgewichtige Bereiche für Online-Präsenz und KI wären näher am 50/50-Briefing als die aktuelle Verteilung auf drei Web- und zwei KI-Panels.

### 6. Konkrete Link- und Sprachfehler — mittlere bis hohe Priorität

- `index.html:81`: „Muster-Website“ führt zum Kontakt statt zu `beispiel/`.
- „Mehr zu …“ führt überall zum Kontakt; es gibt dort keine passende Leistungserklärung. Beschriftung oder Ziel anpassen.
- EN führt auf `#`. `aria-disabled` allein verhindert keine Linkaktion. Eine englische Seite fehlt.
- `assets/site.css:89–90`: Logo und Sprachumschalter verschwinden nach 40 px Scrollen. Das widerspricht der Vorgabe, die Sprachwahl immer sichtbar zu halten.
- Mit `opacity:0` und `pointer-events:none` verschwinden Links nicht automatisch aus der Tastaturreihenfolge. Unsichtbare Fokusziele vermeiden.

**Aufgabe:** Linkziele semantisch passend machen, Englisch richtig umsetzen oder den Zwischenstand klar als nicht verfügbare Funktion darstellen. Keine scheinbar fertigen Bedienelemente ohne Funktion.

### 7. Animation und JavaScript brauchen robustere Rückfallebenen — mittlere Priorität

- Der Preloader wartet auf `window.load` plus 900 ms, danach dauert die Ausblendung nochmals 600 ms. Das verzögert den Zugriff ohne inhaltlichen Mehrwert.
- Wenn das Inline-Script die Klasse `js` gesetzt hat, aber `assets/site.js` nicht lädt, fehlt die Freigabe des vollflächigen Preloaders. Auch Reveal-Texte bleiben dann unsichtbar.
- Ohne JavaScript erhalten Desktop-Panels keine scrollgesteuerte Bewegung; große Teile liegen außerhalb des versteckten Hero-Überlaufs.
- `prefers-reduced-motion` deaktiviert CSS-Animationen, aber die JavaScript-Scrollbewegung der Panels läuft weiterhin. Die Aussage in der Referenzanalyse, Bewegungsreduktion werde respektiert, ist daher zu pauschal.
- Das vollflächige Menü hat keine erkennbare Fokusführung oder Hintergrund-Deaktivierung. Escape ist vorhanden; das allein löst die Tastaturbedienung nicht vollständig.

**Aufgabe:** Inhalt standardmäßig zugänglich halten, Preloader möglichst entfernen, JS nur als Erweiterung verwenden. Reduzierte Bewegung auch im JS berücksichtigen. Menüöffnung, Fokuswechsel, Schließen und Fokus-Rückgabe explizit testen. Zusätzliche Skip-Navigation vorsehen.

### 8. Gestaltung hat noch keine klare eigene Identität — mittlere Priorität

Die aktive Palette übernimmt laut CSS-Kommentar und Referenzanalyse die Referenzfarben; Petrol/Amber sind noch nicht konsequent umgesetzt. Das Logo ist lediglich ein kleiner Schriftzug statt der beschriebenen Kachel. Der Footer ist mit 900 px Bildbereich plus weiterem Kontaktbereich unverhältnismäßig groß. Wiederholte identische Bildplatzhalter verstärken die Leere.

**Aufgabe:** Typografie, Raster und ausgewählte Bewegungen als visuelle Grundlage behalten; Markenfarben und reale Inhalte konsequent einsetzen. Footer auf Kontakt und Orientierung konzentrieren. Zuerst Informationshierarchie lösen, danach Effekte verfeinern. `brand_assets/` war beim Prüfen leer.

### 9. Projektregeln und Dokumentation widersprechen sich — mittlere Priorität

`CLAUDE.md` verlangt sechs kundenorientierte Bereiche, eigene Markenfarben, dauerhaft sichtbares DE/EN und Inhalte aus `src/content/site.json`. Die jüngere Referenzanalyse beschreibt dagegen fünf Panels, Referenzfarben, einen verschwindenden Sprachumschalter sowie Projekte/Aktuelles. Die Inhaltsdatei existiert nicht; Texte stehen direkt im HTML. Die Referenzanalyse berichtet eine spätere Nutzerentscheidung zugunsten der Referenz-Startseite. Deshalb nicht jede Abweichung automatisch als Missachtung einer aktuellen Entscheidung werten.

**Aufgabe:** Vor größeren Umbauten die geltenden Entscheidungen in einem konsistenten Briefing zusammenführen. Funktionale Fehler können unabhängig davon korrigiert werden. Eine Inhaltsdatei nur mit einem einfachen, nachvollziehbaren Verfahren einführen; sichtbare Kerninhalte sollten nicht ausschließlich von einem clientseitigen JSON-Ladevorgang abhängen.

README ist veraltet, etwa hinsichtlich Calvins Nachname und aktivem Stylesheet. `style.css` nicht einfach löschen: Impressum und Datenschutz verwenden diese Datei weiterhin. Der neue Stand enthält zudem mehrere unversionierte Verzeichnisse; vor Veröffentlichung sicherstellen, dass benötigte Assets tatsächlich im Deployment landen.

### 10. Veröffentlichung und interne Daten — vor Go-live klären

Impressum und Datenschutz nennen bereits eine GbR, obwohl die Rechtsform im Briefing noch als offen beschrieben ist. Das Impressum enthält sichtbare Telefon- und Umsatzsteuer-Platzhalter. Hamzas Teammitgliedschaft bedeutet nicht automatisch, dass er Gesellschafter ist; tatsächliche Unternehmensrollen klären.

`_briefe/make_letters.py` ist laut `git ls-files` versioniert und enthält eine Firmenliste. Die Datenschutzerklärung beschreibt eine private Ablage. Ob diese Daten aktuell öffentlich zugänglich sind, wurde nicht geprüft. Vor Veröffentlichung öffentliche Webdateien und interne Arbeitsdateien sauber trennen und gegebenenfalls die bisherige Veröffentlichung überprüfen. `noindex` ist keine Zugriffssperre. Keine Git-Historie ohne abgestimmtes Vorgehen umschreiben.

Der Briefgenerator enthält außerdem einen absoluten Fontpfad in eine frühere `/tmp/claude-0/...`-Umgebung und ein festes Datum. Seine lokale Portabilität ist damit fraglich. Das ist ein separater Befund für Calvin; am Briefprozess wurde nichts verändert.

`noindex` auf der unfertigen Website ist derzeit sinnvoll. Zur Veröffentlichung bewusste Indexierungsentscheidung für Hauptseiten treffen; die erfundene Musterseite soll nach Briefing weiterhin ausgeschlossen bleiben. SEO-Titel und Beschreibung sind vorhanden, ersetzen aber keine klare sichtbare Unternehmensidentität und vollständige Sprachversionen.

## Empfohlene Reihenfolge für Claude

1. Briefingkonflikte sichtbar auflösen und verbindlichen Seitenaufbau festhalten.
2. Kurz-Check im ersten Bildschirm zugänglich machen; Mobilinhalte und falsche Links korrigieren.
3. Leere Referenzen/Neuigkeiten ausblenden, vorhandenes Musterprojekt überzeugend darstellen.
4. Angebot, Pilotphase, laufende Kosten, Team und Ablauf mit bestätigten Angaben vervollständigen.
5. Markenbild umsetzen und unnötige Scrollstrecken reduzieren.
6. Preloader-/JS-Rückfallebenen, Bewegungsreduktion, Menüfokus und Sprache korrigieren.
7. Unternehmensangaben, interne Dateien und Deployment separat vor Go-live prüfen.

Abnahme: CTA bei 375 × 812 und 1440 × 900 ohne Scrollen sichtbar; keine ausgeblendeten wesentlichen Preis-/Nutzeninformationen; Links erreichen ihr angekündigtes Ziel; keine sichtbaren Projekt-/Datumsplatzhalter; Bedienung mit Tastatur; Inhalte bei fehlendem JS erreichbar; reduzierte Bewegung auch für Panels; Englisch vollständig; Tests bei 375/768/1280/1440; danach Lighthouse und Netzwerkprüfung mit dokumentierten Ergebnissen. Keine unbelegten Scores behaupten.

## Text zum Zusammenführen mit Gemini

> Claude: Hier sind zwei unabhängige Bewertungen derselben Website, eine von Codex und eine von Gemini. Vergleiche ihre konkreten Befunde mit dem aktuellen Code. Trenne nachgewiesene Fehler, subjektive Designurteile und offene Geschäftsentscheidungen. Fasse übereinstimmende Punkte zusammen, benenne Widersprüche und priorisiere nach Wirkung auf Vertrauen, mobile Nutzung und Kurz-Check-Anfragen. Berücksichtige die jüngsten bestätigten Designentscheidungen. Erfinde keine Teamdaten, Preise, Referenzen oder Leistungszusagen. Liefere zuerst eine konsistente Änderungsliste mit Abnahmekriterien. Die Codex-Bewertung liegt in docs/codex-bewertung-2026-10-25.md. Geminis Originalbewertung folgt separat.

Geminis Beitrag ist noch offen. Ein gemeinsames Modellurteil liegt deshalb derzeit nicht vor.
