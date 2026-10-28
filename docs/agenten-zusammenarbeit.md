# Zusammenarbeit: Claude, Codex und Sicherheitsprüfung

Eingerichtet auf Wunsch von Yunus am 25.10.2026. Die Dateien sind die gemeinsame Übergabe; eine direkte Verbindung zu einer laufenden Claude-Session ist hier nicht eingerichtet. Die Prüfung darf keine angeblich erfolgte Kommunikation mit Claude behaupten.

## Zuständigkeiten

- **Claude:** Gestaltung, Inhalte und Umsetzung der offenen Website-Aufgaben. Bestehende LPAS-Entscheidung berücksichtigen; keine Geschäftsangaben erfinden.
- **Codex:** unabhängige Abnahme, Regressionsprüfung, reproduzierbare Fehler und nachvollziehbare Rückmeldung an Claude.
- **Sicherheitsprüfung:** Code/Release-Risiken untersuchen, lokale Prüfungen ausführen, bestätigte Sicherheitsfehler klein und nachvollziehbar beheben; Ergebnis von anderem Agenten prüfen lassen.
- **Yunus/Team:** Unternehmensangaben, Fotos, Angebotsumfang, Hosting und Freigabe zur Veröffentlichung.

## Übergabe pro Runde

1. Implementierer beschreibt geänderte Dateien, Zweck, Tests und offene Punkte in einem datierten Bericht.
2. Prüfer liest den tatsächlichen neuen Code, nicht nur die Erfolgsmeldung. Befunde enthalten Reproduktion, Auswirkung, Dateistelle und Abnahmekriterium.
3. Keine parallelen Schreibarbeiten in denselben Dateien. Vor Änderungen Dateiinhalt/Git-Diff erneut prüfen. Bei fremden Änderungen eigenen Patch neu prüfen; nichts zurücksetzen.
4. Kleine bestätigte Sicherheitsfixes sind lokal erlaubt. Designentscheidungen kommen als Aufgaben an Claude. Keine automatischen Pushes, Deployments oder Git-Historienänderungen.
5. Nach Fix: Befund als behoben erst nach unabhängiger Nachprüfung markieren. Kritisch, mittel, niedrig und reine Härtung klar unterscheiden.

## Aktuelle Aufgaben an Claude

| ID | Aufgabe | Abnahme |
|---|---|---|
| UI-01 | Logo-Kachel reparieren: `inline-grid` verteilt A, & und R derzeit auf verschiedene Zeilen. | Header und Footer zeigen A&R in einer Zeile innerhalb der Kachel. |
| UI-02 | Feste Header und Menüs bei geringer Bildschirmhöhe/Zoom prüfen. | Alle sieben Menülinks erreichbar, kein verdeckter Fokus. |
| UI-03 — erledigt | Formular-Demo ist vor Interaktion als Simulation markiert; Sicherheitsagent hat echte Übermittlung blockiert. | Beide Demo-Aktionen im Browser geprüft; beim Nachrüsten echter Übertragung neues Sicherheitsreview. |
| CONTENT-01 | Echte Fotos und Hamzas bestätigte Angaben ergänzen. | Keine sichtbaren Team-/Bildplatzhalter. |
| CONTENT-02 | Englische Version und Rechtsform/Kontaktdaten vor Go-live fertigstellen. | Keine Attrappen oder offenen rechtlichen Platzhalter. |
| DESIGN-01 | Lange Scrollstrecke und großen Footer mit Yunus entscheiden. | Bewusste Entscheidung; kein automatisches Verwerfen des Referenzdesigns. |
| RELEASE-01 | Hosting auf geprüftes Exportpaket ausrichten. | Nur Manifest-Dateien online; interne Pfade liefern 404/403. |

## Wiederkehrender Sicherheitscheck

Die Codex-Automation **Website-Sicherheitsprüfung** ist täglich um 09:00 geplant und an diese Aufgabe gebunden. Sie läuft über die lokale App-Automation; dies ist kein ständig aktiver Schutzdienst. Sie prüft neue Änderungen und meldet nur neue handlungsrelevante Befunde oder Fehler, keine täglichen Wiederholungen bekannter Punkte.

Der Prüfer führt `python scripts/security_check.py` aus und bewertet Warnungen im Codekontext. Geprüfter Stand und neue Ergebnisse stehen in `docs/security-monitor.md`. Keine Aussage „sicher“ allein wegen eines grünen Skripts: Heuristiken finden nur einen Teil möglicher Fehler.

Scope: eigener lokaler Code und localhost. Erst nach geklärtem Hosting echte Produktions-Header/TLS prüfen. Lasttests, fremde Ziele und aktive öffentliche Penetrationstests sind nicht Teil dieser Automation. Derzeit existieren kein eigenes Backend, Login oder eine Datenbank, die man sinnvoll auf SQL-Injection oder Kontenübernahme testen könnte.

## Website-Dateien getrennt exportieren

`python scripts/build_public.py` erzeugt einen neuen Ordner unter `dist/site-...`. Nur die exakten Dateien in `scripts/public-files.json` werden kopiert. Neue öffentliche Assets ausdrücklich dort aufnehmen. Interne Berichte, `.git`, `.env`, `_briefe`, Werkzeuge und lokale Konfiguration bleiben draußen. Bestehende Exporte und Quelldateien werden nicht gelöscht.

**Noch kein Deployment:** Das Exportskript ändert weder GitHub Pages noch das öffentliche Repository. Vor Veröffentlichung das konkrete Paket prüfen und nur dieses deployen. Branch-Hosting direkt aus dem Repo-Root umgeht diesen Schutz. `.gitignore` schützt ebenfalls nicht vor direkter HTTP-Auslieferung des Arbeitsordners.

Lokal zur Vorschau des Exportpakets: `python -m http.server 8766 --bind 127.0.0.1 --directory dist/site-...` (den tatsächlich erzeugten Ordner einsetzen). Den Arbeitsordner-Server niemals über einen öffentlichen Tunnel freigeben.

Die Firmenliste bleibt in alten Git-Commits. Ein bereinigter Export beseitigt diese Historie nicht. Remote-Sichtbarkeit, Bereinigung oder Privatschaltung muss mit Yunus und Calvin abgestimmt werden.
