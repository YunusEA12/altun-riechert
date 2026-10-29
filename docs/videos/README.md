# Videos: Herkunft und Neuerstellung

Alle Videos aus der Runde vom 29.10.2026 sind **selbst erstellt**. Die drei Panel-Videos (Sichtbar, Fachkräfte, Automatisierung) bauen auf den bisherigen Panel-Bildern aus dem Repo auf (erstes Bild der alten Clips als `first-<name>.png`, gerendert mit `render-panels.html`). Es gibt keine fremden Aufnahmen, keine Stock-Clips und keine Musik.
Damit gibt es auch keine Lizenz- oder Abmahnrisiken durch Dritte.

| Datei | Inhalt | Entstehung |
|---|---|---|
| `videos/ueber-uns.mp4` | Höhenlinien der Region, Punkte (Betriebe) verbinden sich mit Stuttgart | Canvas-Animation `scenes.js`, Szene `ueber` |
| `videos/ablauf.mp4` | E-Mail → Check-Liste → 15-Minuten-Gespräch | Canvas-Animation `scenes.js`, Szene `ablauf` |
| `videos/kontakt.mp4` | Höhenlinien mit Amber-Puls am Gipfel | Canvas-Animation `scenes.js`, Szene `kontakt` |
| `videos/beispiel-muster.mp4` | Durchscrollen der eigenen Muster-Website `beispiel/` | Bildschirmaufnahme `rec_beispiel.js` |
| `videos/panel-sichtbar.mp4` | Handy im Transporter: Pin fällt auf die Karte, fünf Sterne füllen sich | Animation `scenes2.js` über Calvins Panel-Bild |
| `videos/panel-fachkraefte.mp4` | Handwerker am Handy: Formular füllt sich, Bewerbungs-Karten steigen auf | Animation `scenes2.js` über Calvins Panel-Bild |
| `videos/panel-automatisierung.mp4` | Laptop: Datenpakete laufen durch den Ablauf, Knoten leuchten | Animation `scenes2.js` über Calvins Panel-Bild |

Jeweils auch in `videos/mobil/` (640 px). Vorschaubilder: `images/<name>.webp`.

## Neu erzeugen

Benötigt: Node mit Playwright, ffmpeg, `d3-contour` (für `render.html` als `d3c.js` gebündelt, z. B. mit esbuild), lokaler Server auf Port 8765 für die Muster-Website.

```bash
node rend.js ablauf 1280 720 9 frames-ablauf          # Szenen: ueber (10 s), kontakt (10 s), ablauf (9 s)
ffmpeg -framerate 30 -i frames-ablauf/f%04d.png -c:v libx264 -preset slow -crf 27 -tune animation -pix_fmt yuv420p -movflags +faststart -an ablauf.mp4
ffmpeg -framerate 30 -i frames-ablauf/f%04d.png -vf scale=640:360 -c:v libx264 -preset slow -crf 28 -tune animation -pix_fmt yuv420p -movflags +faststart -an mobil/ablauf.mp4
node rec_beispiel.js frames-beispiel                  # 14 s, 1280 × 800
```

Die Animationen laufen als nahtlose Schleife (alle Bewegungen sind periodisch in der Zeit).
