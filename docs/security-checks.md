# Wiederholbare lokale Sicherheitspruefung

Stand: 25.10.2026. Der Pruefer benoetigt Python >= 3.9 und nur die Standardbibliothek. Fuer die Git-Pruefung muss Git verfuegbar sein. Er fuehrt keinen Website-Code aus, macht keine Netzwerkanfragen und veraendert weder Website noch Git-Historie.

Im Projektverzeichnis ausfuehren:

```powershell
python scripts/security_check.py
python scripts/security_check.py --strict
python -m unittest discover -s scripts -p "test_security_check.py"
```

Ein exportiertes Verzeichnis oder eine Testfixture pruefen:

```powershell
python scripts/security_check.py --root "C:\Pfad\zum\Website-Export" --no-git
```

## Umfang

- Liest HTML, CSS, JavaScript (einschliesslich Inline-Bloecken) und SVG. Interne Verzeichnisse wie `docs`, `scripts`, `_briefe`, `referenz`, `.git`, `obsidian-vault` und `dist` sind von der Asset-Analyse ausgenommen.
- Ist `scripts/public-files.json` vorhanden, analysiert er die dort aufgefuehrten Web-Assets und prueft, ob lokale verlinkte Dateien ebenfalls im Manifest stehen. Andere Web-Assets werden als bewusst auszuschliessen oder nachzutragen gemeldet. Ohne Manifest werden alle nicht ausgeschlossenen Web-Assets geprueft.
- Fehlende lokale Link-/Ressourcenziele, Ziele ausserhalb des Roots und nicht erlaubte externe Einbindungen sind Fehler. Normale externe Navigationslinks und Mail-/Telefonlinks bleiben erlaubt. URL-Parameter und Fragmente werden fuer Dateiexistenz ignoriert. Anker-IDs werden nicht geprueft.
- Prueft `src`, `href`, `poster`, `srcset`, CSS-`url()`/`@import` und einige woertliche JS-Import-/Netzwerk-URLs. Externe eingebundene Ressourcen widersprechen der Projektregel aus `CLAUDE.md`.
- Meldet gefaehrliche/ungepruefte URL-Schemas, Inline-Eventhandler, dynamische HTML-Zuweisungen und einige Code-/HTML-Ausfuehrungsstellen als **Warnungen zur manuellen Pruefung**. Ein Fund belegt kein XSS. Vollstaendige konstante String-Zuweisungen wie `thumbs.innerHTML = ""` ergeben keine Warnung.
- Sucht in den geprueften Web-Assets nach wenigen bekannten Schluesselformaten und verdaechtigen Credential-Zuweisungen. Ausgabe enthaelt Dateipfad/Zeile und Regel, niemals den gefundenen Wert oder den URL-Inhalt. Das ist kein vollstaendiger Secret-Scan.
- Prueft bekannte interne Pfade (`_briefe/`, `obsidian-vault/`, `.env`, `.claude/settings.local.json`) im Git-Index und in der lokal verfuegbaren Git-Historie aller lokalen Referenzen. Die Anzahl wird gemeldet, ohne Dateninhalte auszugeben. Es erfolgt kein Fetch, Push, Loeschen oder Umschreiben der Historie. Unbekannte interne Verzeichnisse werden nicht automatisch als vertraulich erkannt.

## Ausgabe und Exitcodes

Jeder Fund enthaelt Schweregrad, Regelkennung, Datei, Zeile und Beschreibung. Sortierung ist deterministisch. Abschliessend erscheinen Asset-, Fehler- und Warnungszahl.

| Exitcode | Bedeutung |
| --- | --- |
| 0 | Keine Fehler; Warnungen koennen vorhanden sein |
| 1 | Mindestens ein Fehler; mit `--strict` auch bei Warnungen |
| 2 | Ungueltiger Aufruf, zum Beispiel nicht existierender Root |

`INFO GIT_SKIPPED` bedeutet, dass das Ziel kein Git-Root ist. `--no-git` laesst diese Pruefung explizit aus. Auch ein leeres Asset-Verzeichnis ergibt einen Fehler. Der Strict-Modus eignet sich als Freigabepruefung, nachdem offene Warnungen fachlich bearbeitet sind; Warnungen nicht allein fuer einen gruenen Lauf unterdruecken.

## Grenzen und naechste Pruefebene

Regulaere Ausdruecke ersetzen keinen JavaScript-/CSS-Parser und keine Datenflussanalyse. Kommentare, komplizierte Strings und Vorlagen koennen Fehlalarme verursachen; verschleierte, zusammengesetzte oder zur Laufzeit erzeugte URLs/Sinks koennen uebersehen werden. Dynamische lokale JS-URLs werden nur zur manuellen Pruefung gemeldet, weil ihre Dokument-Basis nicht zwingend der Skriptpfad ist. `base`, `srcdoc`, Weiterleitungen und komplexe `srcset`-Listen mit Data-URLs erfordern manuelle Pruefung. SVGs und Data-URLs werden nicht auf jede aktive Moeglichkeit analysiert. URLs und Dateinamen sind auf dem lokalen Dateisystem geprueft; Gross-/Kleinschreibungsprobleme auf einem anderen Hoster koennen bestehen bleiben.

Keine Pruefung von HTTP-Headern, TLS, DNS, Hosting-Konfiguration, Benutzerkonten, Backend, CORS, Rate-Limits, Browser-Laufzeitverhalten oder allen Dateien/alten Commits auf Secrets. Ein flacher Git-Clone zeigt nur seine vorhandene Historie. Die Ausgabe garantiert weder Sicherheit noch Datenschutzkonformitaet. Ein echter Penetrationstest benoetigt die konkrete eigene Zielumgebung und einen abgegrenzten Testumfang.

Vor einer Veroeffentlichung zusaetzlich im Browser das Netzwerk, die Konsole und Links pruefen; danach HTTPS und Sicherheitsheader am tatsaechlichen Hoster kontrollieren. Interne Daten in frueheren oeffentlichen Commits werden durch `.gitignore` oder den sauberen Website-Export nicht entfernt. Die Entscheidung ueber Repository-Sichtbarkeit, Git-Historie und bereits bestehende Kopien bleibt gesondert zu bearbeiten.
