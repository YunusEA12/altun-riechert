# Codex-Nachprüfung nach Claudes Überarbeitung

25.10.2026. Geprüft: aktueller lokaler Arbeitsstand, Claudes Bewertungsabgleich, Startseite im Browser bei 375 × 812 und 1440 × 900 sowie unabhängiges Sicherheitsreview durch einen zweiten Agenten. Qualitatives Gesamturteil: **6,5/10**, vorher 4/10. Die Verbesserung betrifft vor allem Verständlichkeit und den Weg zur Anfrage; die Website ist noch nicht veröffentlichungsreif.

## Bestätigte Verbesserungen

| Vorher | Jetzt geprüft |
|---|---|
| Kurz-Check erst weit unten | Header-Link direkt sichtbar; Hero-CTA bei Mobile y=701–749 px und Desktop y=792–840 px, jeweils im ersten Bildschirm |
| Preise mobil ausgeblendet | Alle fünf Panel-Untertitel sichtbar; 29 €/Monat enthalten |
| Platzhalter-Portfolio und Nachrichten | Ausgeblendet; konkrete Vorschau der existierenden Muster-Website |
| Team und Ablauf fehlen | Drei Schritte und drei Personen mit Rollen vorhanden; fehlende Hamza-Daten ausdrücklich markiert |
| Falscher Muster-Link / EN-Scheinlink | Muster-Link korrekt; EN ist nun nicht klickbarer Hinweis |
| Menü ohne Fokusführung | Öffnen fokussiert „Start“, Escape schließt und setzt Fokus auf Menübutton zurück; Hintergrund wird inert gesetzt |
| JS-abhängiger Preloader / unerreichbare Panels | Preloader blendet per CSS aus; normale horizontale Panel-Leiste als Fallback; reduzierte Bewegung wird im JS berücksichtigt |
| Firmenliste im künftigen Git-Stand | Löschung aus Index vorgemerkt, Ignore-Regeln ergänzt; Historie bleibt separates offenes Risiko |

Die Aussagen zu No-JS/Bewegungsreduktion sind hier am Code nachvollzogen, kein unabhängiger vollständiger Browserdurchlauf mit abgeschaltetem JavaScript. Claudes dokumentierter Test wird dadurch nicht als eigener Test ausgegeben.

## Noch offen und neu gefunden

1. **Logo-Darstellung ist defekt.** Im Desktop-Screenshot stehen A, & und R untereinander. `.logo-tile` verwendet `inline-grid`; Textknoten und das innere `span` werden zu mehreren Grid-Items. Ein gemeinsamer Textwrapper oder eine bewusst horizontale Flex-Anordnung löst das. Auch Footer prüfen.
2. **Echte Inhalte bleiben der größte Hebel.** Team-/Leistungsbilder sind weiterhin Platzhalter; Hamzas Nachname, Rolle und Beschreibung fehlen. Diese Angaben kann ein Agent nicht seriös erfinden.
3. **Die Website ist weiterhin lang.** Gemessen ca. 9.509 px mobil und 10.262 px Desktop. Das ist durch Team/Ablauf sogar mehr als zuvor, aber der Kontakt ist jetzt jederzeit erreichbar. Lange Seite nicht pauschal als Fehler behandeln: Qualität und Nutzen der Inhalte entscheiden. Fünf Bildpanels und großer Footer bleiben bewusste Designentscheidungen mit Yunus.
4. **Sprache und Veröffentlichung fehlen.** Englisch noch nicht implementiert. Unternehmensangaben in Rechtstexten bleiben offen; keine rechtliche Freigabe erfolgt.
5. **Schmale/kurze Displays und Zoom weiter prüfen.** Menü mit sieben Links braucht eine erreichbare Scroll-Rückfallebene. Der neue Fokusfluss ist besser, ersetzt aber keinen Screenreader-/Zoom-Audit.
6. **Kein automatischer 50/50-Nachbau mit erfundenem Paket.** Drei Web- und zwei KI-Panels sind weiterhin so vorhanden. Ein drittes KI-Angebot nur mit bestätigten Inhalten ergänzen.
7. **Marken-Tokens sind doppelt gepflegt.** `brand_assets/tokens.css` existiert, wird von der Startseite aber nicht eingebunden; `assets/site.css` definiert eigene Variablen. Noch kein Sicherheitsproblem, aber unnötige Divergenzgefahr.

## Sicherheitsurteil

Die statische Architektur ist günstig: kein eigenes Login, Backend oder Datenbank. In den gesichteten Datenflüssen wurde kein konkreter XSS-Angriffspfad festgestellt. Wichtigste Risiken liegen aktuell in Git-Historie und Veröffentlichung interner Dateien, nicht in einem nicht vorhandenen Login-System. Details und Status: `docs/security-review-2026-10-25.md` und `docs/security-monitor.md`.

Auf Wunsch wurden zwei Codex-Unteragenten eingesetzt: unabhängiges Sicherheitsreview und wiederholbarer Sicherheitscheck. Ein täglich geplanter lokaler Check wurde eingerichtet. Das ist kein ständig laufender Schutz und kein Ersatz für die spätere Prüfung des tatsächlichen Hostings.

## Arbeitsteilung für die nächste Runde

Claude erhält die Aufgaben aus `docs/agenten-zusammenarbeit.md`: Logo, finale Inhalte, Darstellung und Veröffentlichungsintegration. Codex übernimmt unabhängige Nachprüfung und Sicherheitswerkzeuge. Kleine bestätigte Sicherheitsprobleme werden lokal behoben und danach geprüft. Eine direkte laufende Verbindung zu Claude ist nicht vorhanden; die gemeinsamen Dateien dienen als Übergabe.

## Grenzen dieser Bewertung

Kein Lighthouse-Score erhoben, kein kompletter Netzwerk-Trace, kein echter Screenreader-Test, keine Mail-Apps auf iOS/Android, keine öffentlichen Penetrationstests. Kein Live-Remote-Abgleich der GitHub-Sichtbarkeit. Diese Punkte bleiben offen, statt sie mit erfundenen Erfolgswerten abzuhaken.
