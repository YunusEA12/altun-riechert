# Sicherheitsprüfung – Altun & Riechert

Stand: 25.10.2026, lokaler Arbeitsstand nach Claudes Überarbeitung und anschließenden Sicherheitsfixes. Geprüft wurden die statischen Website-Dateien, Git-Metadaten und der bereits laufende Server unter `http://127.0.0.1:8765`. Die Erstprüfung war unverändernd; anschließend wurden S-03 und S-04 gezielt in `beispiel/index.html` behoben. Keine Angriffe gegen externe Systeme durchgeführt. Die ursprünglichen Belegzeilen unten beziehen sich auf den Stand vor diesen Fixes.

## Ergebnis

Die Website hat eine kleine Angriffsfläche: statisches HTML/CSS/JavaScript, keine Benutzerkonten, kein eigenes Backend, keine Datenbank und keine nachgeladenen Fremdskripte im geprüften Frontend. In den überprüften JavaScript-Datenflüssen wurde kein konkreter XSS-Eingabepfad gefunden. Das ist keine Zusicherung vollständiger Sicherheit.

**Größtes belegtes Risiko sind interne Daten in Git und die Veröffentlichung des gesamten Arbeitsverzeichnisses.** Das Entfernen aus dem Index allein beseitigt die Historie nicht. Vor Veröffentlichung müssen außerdem das tatsächliche Deployment und seine Response-Header geprüft werden. Ein klassischer Backend-Penetrationstest wäre im aktuellen Stand wenig aussagekräftig, weil das entsprechende Backend fehlt.

Prioritäten: P1 = vor Veröffentlichung klären; P2 = vor Veröffentlichung beheben/absichern; P3 = kleinere Robustheitsverbesserung oder zusätzliche Härtung. Die Prioritäten sind projektspezifisch und keine CVSS-Werte.

## S-01 · P1 · Briefgenerator weiterhin in Git vorhanden

**Beleg:** `git status --short` zeigt `D  _briefe/make_letters.py`: Die Entfernung ist im Index vorgemerkt, aber noch kein neuer Commit. `git cat-file -e HEAD:_briefe/make_letters.py` ist erfolgreich. Dasselbe gilt für die lokal gespeicherten Remote-Refs `origin/main` und `origin/test`. `git log --all --oneline -- _briefe` findet unter anderem Commit `2823bb1`.

Laut `CLAUDE.md` enthält dieser Generator Firmendaten und Ansprechpartner und gehört in ein privates Repository. Die betreffenden Daten werden hier bewusst nicht wiedergegeben. `CLAUDE.md` bezeichnet das GitHub-Repository als öffentlich. Der aktuelle Remote-Sichtbarkeitsstatus und Änderungen seit dem letzten lokalen Fetch wurden in dieser Prüfung nicht unabhängig abgefragt; die Remote-Refs sind lokale Kopien.

**Auswirkung:** Solange das Repository öffentlich ist und diese Commits erreichbar sind, hilft weder `.gitignore` noch das Entfernen in einem neuen Commit gegen das Lesen der früheren Versionen. Auch ein privates Repository verhindert nicht nachträglich bereits entstandene Kopien. `datenschutz.html:45` beschreibt die Firmenliste als privat; die tatsächliche Ablage muss damit übereinstimmen.

**Empfehlung:** Eigentümerentscheidung zur Sichtbarkeit und zur Bereinigung mit allen Mitwirkenden koordinieren. Interne Daten in ein privates, getrenntes Repository verschieben. Für die öffentliche Website gegebenenfalls eine saubere Veröffentlichungshistorie anlegen oder die vorhandene Historie kontrolliert bereinigen; beide Remote-Branches berücksichtigen. Bereits vorhandene Forks, Klone und Caches gesondert berücksichtigen. Falls bei einer weitergehenden Prüfung Zugangsdaten gefunden werden, diese zuerst widerrufen/rotieren. Kein automatischer Force-Push und keine Historienumschreibung durch den Wartungsagenten.

[GitHub: Entfernen sensibler Daten](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) beschreibt die notwendige Koordination und Grenzen einer Historienbereinigung.

## S-02 · P1 bei Veröffentlichung · Arbeitsverzeichnis wird vollständig ausgeliefert

**Lokal reproduziert:** Diese einfachen GET-Anfragen antworten mit HTTP 200:

| Pfad | Beobachtung |
|---|---|
| `/_briefe/make_letters.py` | Lokale interne Datei wird ausgeliefert |
| `/.git/HEAD` | Git-Metadatei wird ausgeliefert |
| `/CLAUDE.md` | Interne Projektregeln werden ausgeliefert |
| `/docs/` | Verzeichnisauflistung wird ausgeliefert |

Der laufende Python-Server ist korrekt auf **127.0.0.1** gebunden; `.claude/launch.json` enthält ebenfalls `--bind 127.0.0.1`. Das ist **kein Nachweis einer öffentlichen Erreichbarkeit** und kein Beleg, dass GitHub Pages `/.git/` ausliefern würde. Das Problem ist die Wiederverwendung des Repo-Root als öffentliches Dokumentverzeichnis, etwa über einen Tunnel oder einen anderen Hoster.

**Empfehlung:** Ein gesondertes Veröffentlichungsverzeichnis mit ausdrücklicher Dateifreigabeliste erzeugen. Erlaubt sind ausschließlich die vier HTML-Seiten, benötigte CSS/JS-Dateien, verwendete Bilder/Logos/Schriften und deren Lizenzen. `.git/`, `.claude/`, `_briefe/`, interne Markdown-Dateien, Berichte, Referenzmaterial und Vaults dürfen dort nicht vorkommen. Den lokalen Server weiterhin ausschließlich an Loopback binden. Produktionsprüfungen müssen sicherstellen, dass interne Pfade mit 404/403 antworten und kein Directory Listing angeboten wird.

`.gitignore` ist keine Zugriffskontrolle eines Webservers. Ebenso schützen `noindex` und das HTML-Attribut `hidden` keine vertraulichen Inhalte. Im aktuellen ausgeblendeten HTML wurden lediglich vorbereitete Platzhalter festgestellt, keine dort versteckten echten Kundendaten.

**Bearbeitungsstand derselben Sitzung:** Der Hauptagent hat `scripts/build_public.py` und `scripts/public-files.json` ergänzt. Die Freigabeliste umfasst 20 ausdrücklich genannte Website-Dateien und enthält keine internen Dokumente. Das ist die passende Grundlage für einen separaten Export. Die tatsächliche Hosting-Konfiguration wurde dadurch noch nicht umgestellt; die lokale Repo-Root-Auslieferung besteht weiterhin. Die erste Code-Durchsicht des Exporters ergab zusätzlich den Hinweis, interne Ordnernamen auf Windows unabhängig von Groß-/Kleinschreibung zu sperren und leere Pfade sauber abzulehnen. Laut Rückmeldung des Hauptagenten sind beide Hinweise umgesetzt und geprüft.

## S-03 · P2 · Behoben: native Übermittlung der Demoformulare

**Fix:** Beide Schaltflächen sind jetzt `type="button"` und starten die Simulation per Click-Handler. Native Submit-Ereignisse werden zusätzlich verhindert; eine frühe CSP mit `form-action 'none'` blockiert die Übermittlung auch bei abgeschaltetem oder fehlgeschlagenem JavaScript. Die CSP ergänzt außerdem `base-uri 'self'` und `object-src 'none'`. Sichtbare Hinweise erklären vor der Eingabe die Demo und bitten um Beispieldaten; `noscript` erklärt das Verhalten ohne JavaScript.

**Beleg:** `beispiel/index.html:273` und `:325` definieren Formulare mit Submit-Schaltflächen, aber ohne `method` und `action`. Erst die Listener bei `:436` und `:447` verhindern das native Abschicken mittels `preventDefault()`.

**Auswirkung:** Ist JavaScript ausgeschaltet oder bricht das Skript vorher ab, wird das Formular nativ per GET an die aktuelle Seite abgeschickt. Bei der Angebotsdemo besitzen die Leistungs-Checkboxen `name="art"`; beispielsweise kann daraus `?art=Innenanstrich` entstehen. **Name, Telefon, Ort und Datei haben aktuell kein `name` und werden deshalb bei dieser nativen Übermittlung nicht als Formularwerte mitgesendet.** Hier wird ausdrücklich kein belegter Versand dieser personenbezogenen Werte behauptet. Die Demo ist dennoch nicht zuverlässig auf rein lokale Interaktion begrenzt; neue `name`-Attribute würden den Umfang stillschweigend erhöhen.

**Empfehlung:** Demo-Schaltflächen als `type="button"` ausführen und die lokale Simulation an Click-Listener hängen; vor der Interaktion ausdrücklich erklären, dass es eine Demo ist. Zusätzlich `form-action 'none'` als CSP setzen, da diese Website keine echten Formulare absenden soll. Ohne JavaScript sollte ein `noscript`-Hinweis den Democharakter erklären. Anschließend mit abgeschaltetem JavaScript und mit einem absichtlich frühen Skriptfehler prüfen, dass keine Formularnavigation stattfindet.

[MDN: Standardmethode GET](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/method), [MDN: CSP form-action](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/form-action).

## S-04 · P3 · Behoben: unbeschränkte Dateivorschau und veraltete Ergebnisse

**Fix:** Vor dem Einlesen wird die gesamte Auswahl geprüft: maximal sechs JPG-, PNG- oder WebP-Dateien, je maximal 5 MiB, insgesamt maximal 20 MiB. Ungültige Auswahlen werden vollständig abgelehnt und das Dateifeld geleert. Beim Wechsel der Auswahl werden aktive Reader abgebrochen; eine Generationsnummer verwirft verspätete Reader- und Bildlade-Ergebnisse. Ladefehler werden mit `textContent` im Statusfeld angezeigt. Die Demo zählt nur fertig geladene Vorschaubilder. Grenzen: MIME-Prüfung ist keine Inhaltsprüfung, und ein Dateigrößenlimit begrenzt nicht exakt den Speicherbedarf eines decodierten Bildes; es gibt weiterhin keinen Server-Upload.

**Beleg:** `beispiel/index.html:426–434`: Bis zu sechs frei ausgewählte Dateien werden mit `FileReader.readAsDataURL()` vollständig in den Speicher eingelesen. Es gibt keine Dateigrößenprüfung; `accept="image/*"` ist lediglich eine Auswahlhilfe. Alte Reader werden bei einer neuen Auswahl nicht abgebrochen.

**Auswirkung:** Große Bilder können die Registerkarte insbesondere auf Mobilgeräten verlangsamen oder zum Absturz bringen. Mehrere schnelle Auswahlen können veraltete Vorschaubilder nachträglich anhängen. Das ist eine lokale Robustheitsschwäche, kein belegter Remote-Angriff und kein Server-Upload. Ein SVG als `img` ist hier auch nicht automatisch ein belegter XSS-Pfad.

**Empfehlung:** Dateianzahl und Größenbudget vor dem Einlesen begrenzen, nur unterstützte Bildtypen akzeptieren und bei neuer Auswahl alte Ergebnisse verwerfen. Bei Object-URLs diese nach Nutzung widerrufen. Fehlermeldungen über `textContent` ausgeben. Die Begrenzung für ein echtes späteres Upload-Backend müsste zusätzlich serverseitig erfolgen.

## S-05 · P3 / Produktionsprüfung offen · Browser-Härtung noch nicht festgelegt

Die Startseite und die beiden Rechtstexte enthalten keine Content Security Policy. Die Musterseite besitzt nach dem S-03-Fix eine ergänzende Meta-CSP für Formularnavigation, Basis-URLs und Objekte; sie ist noch keine umfassende Skript-/Ressourcen-Policy. Der lokale Python-Server liefert unter anderem `Content-Type`, `Content-Length` und `Last-Modified`, aber keine CSP-Response-Header, kein `X-Content-Type-Options`, keine Referrer-Policy und keinen Frame-Schutz. Das ist bei diesem lokalen Entwicklungsserver erwartbar; **die Header eines zukünftigen Produktionshosters lassen sich daraus nicht ableiten.**

**Empfehlung für das tatsächliche Deployment:** HTTPS samt Weiterleitung prüfen, `X-Content-Type-Options: nosniff`, eine geeignete `Referrer-Policy`, CSP und bei fehlendem Einbettungsbedarf `frame-ancestors 'none'` einrichten. Für diese Website ist `form-action 'none'` sinnvoll. Die Musterseite verwendet Inline-JavaScript und Inline-Styles; eine CSP muss diese gezielt berücksichtigen, etwa durch ausgelagertes Skript oder Hashes. Nicht pauschal `script-src 'unsafe-inline'` als Dauerlösung hinzufügen. Für die lokale Foto-Vorschau muss die gewählte Bildquelle (`data:` oder `blob:`) ausdrücklich abgedeckt sein.

`frame-ancestors` wirkt nicht in einem Meta-Tag; dafür sind echte HTTP-Header erforderlich. Diese Einschränkung muss bei der Hosterwahl berücksichtigt werden. Fehlende Härtungsheader sind hier allein noch kein Beweis einer ausnutzbaren XSS-Lücke. [MDN: frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors).

## Weitere Prävention

- Die anfänglich festgestellte Gitignore-Lücke für `.env.local` und `.env.production` wurde durch den Hauptagenten in derselben Sitzung mit `.env.*` geschlossen; eine bewusst geheimnisfreie `.env.example` bleibt erlaubt. Bereits getrackte Dateien würden von einer neuen Ignore-Regel nicht automatisch entfernt. Es wurde kein aktueller Geheimnisfund aus dieser Präventionslücke behauptet.
- Ein einfacher Musterabgleich in acht ausgewählten Frontend-Dateien fand keine PEM-Privatschlüssel, GitHub-Token, AWS-Access-Key-IDs oder OpenAI-artigen Schlüssel. **Kein vollständiger Secret-Scan:** Git-Historie, Binärdateien, alle Tokenformate und lokale Kontenkonfigurationen waren davon nicht abgedeckt.
- Ein wiederkehrender Agent sollte Prüfergebnisse und Minimal-Fixes versionierbar vorbereiten. Neue Befunde müssen Datei, Zeile, Reproduktion und Auswirkung enthalten. Änderungen an Sichtbarkeit, Git-Historie, echten Kundendaten oder Produktiv-Deployments benötigen gesonderte bewusste Behandlung; sie gehören nicht in eine unbeaufsichtigte Reparaturschleife.

## Positiv geprüft

- In Startseite, Rechtstexten, Musterseite und den gesichteten CSS-/JS-Dateien wurden keine aktiven externen Ressourcen, Tracking-Aufrufe, API-Anfragen, `eval`, `document.write` oder aus URL-Parametern gespeiste HTML-Senken festgestellt.
- Dynamische Bestätigungen und Kopierstatus verwenden `textContent`. Das ursprüngliche `thumbs.innerHTML = ""` setzte ebenfalls keine Benutzereingabe als HTML ein und wurde beim Fix durch `textContent = ""` ersetzt.
- Kontakt der Hauptseite erfolgt über fest hinterlegte `mailto:`-Links. Es existiert dort kein Formular-Backend und keine Upload-API.
- Schriften und Bilder sind lokal referenziert; der lokale Entwicklungsserver lauscht nur auf Loopback.

## Verifikation der Fixes

`node scripts/test_demo_security.cjs` läuft erfolgreich. Die lokalen Regressionstests prüfen die Syntax des gesamten Inline-Skripts, die CSP und nicht sendenden Buttons, Zurückweisung von zu vielen/zu großen/falschen Dateitypen, Abbruch alter Reader, Verwerfen verspäteter Reader- und Bild-Callbacks, Fehlerstatus, Bestätigungen und beide Submit-Guards. Der Verhaltenstest nutzt DOM-/Reader-Mocks und ersetzt keine echte Browserprüfung der CSP.

Der Hauptagent hat anschließend im Browser unabhängig beide Demos erfolgreich betätigt: Die Angebotsbestätigung nennt Auswahl, Umfang und Fotoanzahl sowie „Hier wird nichts gesendet“; die Bewerbung zeigt ihre Demo-Bestätigung. Dabei keine Warnungen oder Fehler in der Browserkonsole. Ein expliziter Browser-Test mit deaktiviertem JavaScript bzw. ein erzwungener nativer Submit war bei Abschluss dieses Berichts noch nicht als durchgeführt gemeldet. Die vorhandenen Exportpakete müssen nach der HTML-Änderung neu erzeugt werden.

## Grenzen und nächste Abnahme

Diese Prüfung ist ein Code-Review mit gezielten lokalen HTTP-Abfragen, kein vollständiger Penetrationstest. Keine Prüfung von TLS, DNS, Domainübernahme, produktiven Headern, Hosting-Konten, MFA, GitHub-Berechtigungen, E-Mail-Sicherheit, externen Abhängigkeiten eines späteren Backends oder DDoS-Abwehr. Kein Lasttest und kein Browser-Exploit-Test. Rechtsangaben wurden nur auf Widersprüche zur technischen Ablage betrachtet, nicht rechtlich bewertet.

Vor Freigabe: S-01 entscheiden und nachweisbar bereinigen; Veröffentlichung tatsächlich auf den geprüften Export beschränken; native Formularnavigation im Browser auch ohne JavaScript gegenprüfen; anschließend das echte Deployment auf interne Dateipfade, Header, HTTPS und unerwartete Netzwerkanfragen prüfen. Eine Zahl wie „100 % sicher“ wäre dafür keine belastbare Schlussfolgerung.
