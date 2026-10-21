"""Serienbriefe Altun & Riechert: eine HTML-Datei, daraus ein PDF (A4, DIN 5008 Form B, Fensterumschlag)."""
import html, os

BASE = os.path.dirname(os.path.abspath(__file__))
FONT = "file:///tmp/claude-0/-home-claude/1ac1014e-45b4-58d4-9b5c-b09e9a4741b7/scratchpad/site-gh/fonts/archivo-var.woff2"
DATUM = "21.10.2026"
ABS_STRASSE = "Achardweg 17"
ABS_ORT = "70435 Stuttgart"
MAIL = "altunriechert@gmail.com"

FIRMEN = [
    dict(name="Elektro Seifert e. K.", zusatz="Herrn Karsten Seifert", str="Markgröninger Str. 43", ort="71634 Ludwigsburg",
         anrede="Sehr geehrter Herr Seifert,", gewerk="einen Elektriker",
         b=["Ihre Website wurde laut eigener Angabe zuletzt im Dezember 2020 geändert. Auf der Startseite haben wir weder Kundenstimmen noch ein Anfrageformular gefunden.",
            "Sie haben 8 Google-Bewertungen mit 5,0 Sternen. Andere Elektriker in Ludwigsburg haben 30 bis 53. Wer sucht, sieht diese Betriebe zuerst."]),
    dict(name="Platten Heinze GmbH & Co. KG", zusatz="", str="Friedenstraße 88", ort="71636 Ludwigsburg",
         anrede="Sehr geehrte Damen und Herren,", gewerk="einen Fliesenleger",
         b=["Ihr Google-Schnitt liegt bei 4,4 Sternen aus 61 Bewertungen. Andere Fliesenbetriebe in der Umgebung liegen bei 4,9 bis 5,0.",
            "Schon wenige zusätzliche Bewertungen zufriedener Kunden und Antworten auf kritische Stimmen heben den Schnitt sichtbar."]),
    dict(name="Remsecker Automobile", zusatz="", str="Bernhardslaicher Weg 12", ort="71686 Remseck am Neckar",
         anrede="Sehr geehrte Damen und Herren,", gewerk="eine Werkstatt",
         b=["Auf der Startseite Ihrer Website haben wir keine Telefonnummer zum Antippen gefunden. Wer mit einer Panne am Handy sucht, ruft dann eher die nächste Werkstatt an.",
            "Sie haben 172 Google-Bewertungen mit 4,6 Sternen. Auf der Website sieht man davon nichts, und der Seitentitel lautet nur „Home“."]),
    dict(name="Schneck Stuckateurbetrieb", zusatz="", str="Ludwigsburger Str. 36", ort="71696 Möglingen",
         anrede="Sehr geehrte Damen und Herren,", gewerk="einen Stuckateur",
         b=["Ihr Google-Eintrag hat 4 Bewertungen mit einem Schnitt von 4,0 Sternen.",
            "Andere Stuckateure in Asperg, Schwieberdingen und Ludwigsburg haben 33 bis 40 Bewertungen mit 4,8 bis 5,0 Sternen. Wer sucht, sieht diese Betriebe zuerst."]),
    dict(name="Rainer Krause GmbH", zusatz="Maler- und Stukkateurbetrieb", str="Erdmannhäuser Str. 3", ort="71672 Marbach am Neckar",
         anrede="Sehr geehrte Damen und Herren,", gewerk="einen Maler",
         b=["Ihr Google-Eintrag hat erst 3 Bewertungen.",
            "Andere Malerbetriebe in Marbach und Freiberg haben 17 bis 72. Wer „Maler Marbach“ sucht, sieht diese Betriebe zuerst."]),
    dict(name="Sanitär Vöhringer GmbH", zusatz="", str="Teinacher Str. 41", ort="71634 Ludwigsburg",
         anrede="Sehr geehrte Damen und Herren,", gewerk="einen Sanitär- und Heizungsbetrieb",
         b=["Ihr Google-Schnitt liegt bei 4,5 Sternen aus 41 Bewertungen. Andere Sanitär- und Heizungsbetriebe in Ludwigsburg liegen bei 4,9.",
            "Mit Antworten auf kritische Bewertungen und mehr Stimmen zufriedener Kunden lässt sich das gezielt ändern."]),
    dict(name="Pulvermüller Stuckateur GmbH", zusatz="", str="Bahnhofstraße 17", ort="71696 Möglingen",
         anrede="Sehr geehrte Damen und Herren,", gewerk="einen Stuckateur",
         b=["Ihr Google-Eintrag hat 4 Bewertungen.",
            "Andere Stuckateure in der Umgebung haben 33 bis 40. Wer sucht, sieht diese Betriebe zuerst."]),
    dict(name="Stuber + Bergmann GmbH", zusatz="", str="Jägerstraße 77", ort="70806 Kornwestheim",
         anrede="Sehr geehrte Damen und Herren,", gewerk="einen Maler",
         b=["Sie haben 11 Google-Bewertungen mit 5,0 Sternen, also nur zufriedene Kunden.",
            "Andere Maler in Kornwestheim haben 30 bis 37 Bewertungen und stehen deshalb bei „Maler Kornwestheim“ vor Ihnen."]),
    dict(name="Kornwestheim-Fliesen FDT", zusatz="", str="Zeppelinstraße 68", ort="70806 Kornwestheim",
         anrede="Sehr geehrte Damen und Herren,", gewerk="einen Fliesenleger",
         b=["Ihr Google-Eintrag hat erst eine Bewertung.",
            "Andere Fliesenbetriebe in der Umgebung haben 13 bis 30. Wer sucht, sieht diese Betriebe zuerst."]),
    dict(name="Schreinerei Thomas Schmid", zusatz="", str="Strombergstraße 17", ort="71636 Ludwigsburg",
         anrede="Sehr geehrte Damen und Herren,", gewerk="einen Schreiner",
         b=["Ihr Google-Eintrag hat 6 Bewertungen mit 4,5 Sternen.",
            "Andere Schreinereien in Ludwigsburg und Remseck haben 29 bis 37. Schreinerarbeiten verkaufen sich über Bilder: Fotos Ihrer Projekte bei Google und auf der Website wirken stark."]),
]

e = html.escape


def letter(f):
    to = [f["name"]] + ([f["zusatz"]] if f["zusatz"] else []) + [f["str"], f["ort"]]
    bullets = "".join(f"<li>{e(x)}</li>" for x in f["b"])
    return f"""
<section class="page">
  <header class="head">
    <div class="mark">A<span>&amp;</span>R</div>
    <div class="firm"><b>Altun <span>&amp;</span> Riechert</b><small>DIGITAL FÜR BETRIEBE · REGION STUTTGART</small></div>
    <div class="contact">Yunus Altun<br>{e(ABS_STRASSE)}<br>{e(ABS_ORT)}<br>{e(MAIL)}</div>
  </header>
  <div class="window">
    <div class="sender">Altun &amp; Riechert · {e(ABS_STRASSE)} · {e(ABS_ORT)}</div>
    <div class="to">{'<br>'.join(e(x) for x in to)}</div>
  </div>
  <div class="date">Stuttgart, {DATUM}</div>
  <h1>Zwei Beobachtungen zu Ihrem Google-Auftritt</h1>
  <div class="body">
    <p>{e(f['anrede'])}</p>
    <p>wir sind Altun &amp; Riechert aus Stuttgart, zwei Informatiker, die Handwerksbetrieben im Kreis Ludwigsburg helfen, online besser gefunden zu werden. Wir haben uns Ihren Auftritt angesehen. Zwei Dinge sind uns aufgefallen:</p>
    <ul>{bullets}</ul>
    <p>Wer heute {e(f['gewerk'])} sucht, vergleicht zuerst bei Google. Betriebe mit vielen guten Bewertungen und einer Website fürs Handy bekommen dort die meisten Anfragen.</p>
    <p class="offer"><b>Unser Angebot:</b> Wir nehmen gerade drei Pilotbetriebe auf. Für sie bringen wir Google-Profil, Bewertungen und die wichtigsten Punkte der Website kostenlos in Ordnung. Im Gegenzug dürfen wir Sie danach als Referenz nennen.</p>
    <p>Interesse? Eine kurze Mail an <b>{e(MAIL)}</b> mit dem Stichwort „Kurz-Check“ genügt. Dann schicken wir Ihnen die vollständige Auswertung.</p>
    <p>Mit freundlichen Grüßen</p>
    <p class="sign">Yunus Altun</p>
  </div>
  <footer>Ihre Anschrift stammt aus öffentlichen Quellen (Google-Unternehmensprofil, Website), die genannten Zahlen aus Google Maps (Stand {DATUM}). Sie möchten keine Post mehr von uns? Eine kurze Mail an {e(MAIL)} genügt, dann löschen wir Ihre Daten bis auf einen Sperrvermerk. Verantwortlich: Yunus Altun, {e(ABS_STRASSE)}, {e(ABS_ORT)}.</footer>
</section>"""


CSS = f"""
@font-face {{ font-family: "Archivo"; src: url("{FONT}") format("woff2"); font-weight: 400 850; font-stretch: 100% 115%; }}
@page {{ size: A4; margin: 0; }}
* {{ box-sizing: border-box; }}
body {{ margin: 0; font-family: "Archivo", "Liberation Sans", Arial, sans-serif; color: #1E2B2D; font-size: 10.5pt; line-height: 1.45; }}
.page {{ width: 210mm; height: 297mm; position: relative; padding: 0 20mm 0 25mm; page-break-after: always; overflow: hidden; }}
.head {{ position: absolute; top: 12mm; left: 25mm; right: 20mm; display: flex; align-items: center; gap: 4mm; }}
.mark {{ width: 16mm; height: 14mm; white-space: nowrap; background: #123B40; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 820; font-stretch: 108%; font-size: 12pt; }}
.mark span, .firm span {{ color: #E39A2D; }}
.firm b {{ display: block; font-size: 15pt; font-weight: 780; font-stretch: 106%; color: #123B40; line-height: 1.1; }}
.firm small {{ font-size: 6.5pt; letter-spacing: 0.08em; color: #4E6A6D; }}
.contact {{ margin-left: auto; text-align: right; font-size: 8pt; line-height: 1.4; color: #4E6A6D; }}
.window {{ position: absolute; top: 45mm; left: 20mm; width: 85mm; height: 45mm; padding: 0 5mm; }}
.sender {{ font-size: 6.5pt; color: #4E6A6D; border-bottom: 0.3pt solid #9DB2B0; padding-bottom: 1mm; margin-bottom: 3mm; white-space: nowrap; overflow: hidden; }}
.to {{ font-size: 10.5pt; line-height: 1.35; }}
.date {{ position: absolute; top: 97mm; right: 20mm; font-size: 10pt; }}
h1 {{ position: absolute; top: 103mm; left: 25mm; right: 20mm; margin: 0; font-size: 12pt; font-weight: 720; font-stretch: 104%; color: #123B40; }}
.body {{ position: absolute; top: 114mm; left: 25mm; right: 20mm; }}
.body p {{ margin: 0 0 3.2mm; }}
.body ul {{ margin: 0 0 3.2mm; padding-left: 5mm; }}
.body li {{ margin-bottom: 1.6mm; }}
.offer {{ background: #FBF1E1; padding: 2.5mm 3.5mm; border-left: 1mm solid #E39A2D; }}
.sign {{ margin-top: 8mm !important; font-weight: 650; }}
footer {{ position: absolute; bottom: 12mm; left: 25mm; right: 20mm; font-size: 7pt; line-height: 1.4; color: #6B8285; border-top: 0.3pt solid #D3DEDC; padding-top: 2mm; }}
"""

doc = "<!doctype html><html lang='de'><head><meta charset='utf-8'><title>Briefe Altun &amp; Riechert</title><style>" + CSS + "</style></head><body>" + "".join(letter(f) for f in FIRMEN) + "</body></html>"
path = os.path.join(BASE, "briefe.html")
open(path, "w", encoding="utf-8").write(doc)

# Klartext des ersten Briefs für die Test-Mail
f = FIRMEN[0]
txt = f"""{f['anrede']}

wir sind Altun & Riechert aus Stuttgart, zwei Informatiker, die Handwerksbetrieben im Kreis Ludwigsburg helfen, online besser gefunden zu werden. Wir haben uns Ihren Auftritt angesehen. Zwei Dinge sind uns aufgefallen:

- {f['b'][0]}
- {f['b'][1]}

Wer heute {f['gewerk']} sucht, vergleicht zuerst bei Google. Betriebe mit vielen guten Bewertungen und einer Website fürs Handy bekommen dort die meisten Anfragen.

Unser Angebot: Wir nehmen gerade drei Pilotbetriebe auf. Für sie bringen wir Google-Profil, Bewertungen und die wichtigsten Punkte der Website kostenlos in Ordnung. Im Gegenzug dürfen wir Sie danach als Referenz nennen.

Interesse? Eine kurze Mail an {MAIL} mit dem Stichwort „Kurz-Check“ genügt. Dann schicken wir Ihnen die vollständige Auswertung.

Mit freundlichen Grüßen
Yunus Altun"""
open(os.path.join(BASE, "brief1.txt"), "w", encoding="utf-8").write(txt)
print("ok", len(FIRMEN))
