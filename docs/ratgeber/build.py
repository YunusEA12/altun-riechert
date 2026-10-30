from charts import *
S = lambda n: f'<sup class="ref">[{n}]</sup>'
LOGO = '''<svg viewBox="0 0 520 96" width="260" height="48" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Altun &amp; Riechert">
<rect width="96" height="96" fill="#123B40"/><text x="48" y="58" text-anchor="middle" font-family="Archivo" font-size="34" font-weight="800" fill="#fff" letter-spacing="-1">A<tspan fill="#E39A2D">&amp;</tspan>R</text>
<rect x="25" y="72" width="14" height="4" fill="#E39A2D"/><rect x="42" y="72" width="14" height="4" fill="#E39A2D" fill-opacity=".65"/><rect x="59" y="72" width="12" height="4" fill="#E39A2D" fill-opacity=".35"/>
<text x="120" y="48" font-family="Archivo" font-size="34" font-weight="780" fill="{c}">Altun <tspan fill="#E39A2D">&amp;</tspan> Riechert</text>
<text x="121" y="78" font-family="Archivo" font-size="13" letter-spacing="1.6" fill="{s}">DIGITAL FÜR BETRIEBE · REGION STUTTGART</text></svg>'''
MAIL = 'mailto:altunriechert@gmail.com?subject=Kurz-Check'

c_luecke = hbar([('Gesell:innen', 78.9, PET), ('Fortbildungsabsolvent:innen', 10.3, PET), ('Meister:innen', 8.15, PET)], 85, unit=' Tsd.', label_w=200)
c_nutzung = vbar([('2024','Unternehmen ab 20 MA',20,PET),('2025','Unternehmen ab 20 MA',36,PET),('2026','Unternehmen ab 20 MA',57,PET),('2025','Handwerksbetriebe',4,AMB)], 60)
c_groesse = hbar([('10–49 Beschäftigte',17,PET),('50–249 Beschäftigte',28,PET),('250 und mehr',48,PET)], 55, label_w=170)
c_effekte = effects([
  ('Texte schreiben – benötigte Zeit [10]', -40, '−40 %', PET),
  ('Texte schreiben – Qualität [10]', 18, '+18 %', PET),
  ('Kundensupport – Fälle pro Stunde [11]', 14, '+14 %', PET),
  ('… davon Berufseinsteiger [11]', 34, '+34 %', AMB),
  ('Beratung – Aufgaben erledigt [12]', 12.2, '+12,2 %', PET),
  ('Beratung – Tempo [12]', 25.1, '+25,1 %', PET),
  ('Beratung – Qualität [12]', 40, '+40 %', PET),
  ('Aufgabe jenseits der KI-Grenze [12]', -19, '−19 Pp. richtige Lösungen', '#8C9A9B'),
])
c_hemm = hbar([('Fehlendes technisches Know-how',85,PET),('Rechtsunsicherheit, unklare Regeln',66,PET),('Kosten schwer kalkulierbar',63,PET),('Fehlende personelle Ressourcen',51,PET),('Fehlende Daten',40,PET),('Keine Anwendungsfälle erkannt',30,PET)], 95, label_w=250)
c_matrix = matrix([
  ('Anfragen sortieren und beantworten',0.24,0.82,20,'start'),
  ('Angebots- und Leistungstexte',0.46,0.88,20,'start'),
  ('Baustellen-Doku per Sprache',0.30,0.60,20,'start'),
  ('Stellenanzeigen, Social Media',0.12,0.40,20,'start'),
  ('Belege und Rechnungen vorbereiten',0.72,0.70,-20,'end'),
  ('Telefon- und Terminassistent',0.84,0.50,-20,'end'),
])
c_time = timeline([('01.08.2024','KI-Verordnung|tritt in Kraft',False),('02.02.2025','Verbote und|KI-Kompetenz (Art. 4)',False),('27.07.2026','Digital-Omnibus:|Art. 4 abgeschwächt',False),('02.08.2026','Transparenz-|pflichten (Art. 50)',True),('02.12.2027','Hochrisiko-|Regeln (Anhang III)',False)])
c_flow = flow([('1  Anfrage kommt','E-Mail, Formular|oder Anrufnotiz','ki'),('2  KI bereitet vor','sortiert, fasst zusammen,|schreibt einen Entwurf','ki'),('3  Mensch prüft','ergänzt Preis, Termin,|Fachwissen','mensch'),('4  Antwort geht raus','der Betrieb sendet –|nicht die KI','mensch')], height=110)

HTML = f'''<!doctype html><html lang="de"><head><meta charset="utf-8"><title>KI im Handwerksbetrieb – A&amp;R Praxiswissen 01</title>
<style>
@font-face{{font-family:Archivo;src:url(archivo-var.woff2) format("woff2");font-weight:100 900;font-stretch:62% 125%}}
@page{{size:A4;margin:20mm 18mm 20mm 18mm}}
@page:first{{margin:0}}
*{{box-sizing:border-box}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{margin:0;font-family:Archivo,Arial,sans-serif;color:#1E2B2C;font-size:10.4pt;line-height:1.58}}
h1,h2,h3{{color:#123B40;letter-spacing:-.02em;line-height:1.15;margin:0}}
h2{{font-size:20pt;font-weight:800;margin:0 0 10pt}} h2 .no{{color:#E39A2D;margin-right:8pt}}
h3{{font-size:12pt;font-weight:750;margin:14pt 0 5pt}}
p{{margin:0 0 7pt}} a{{color:#123B40}}
.page{{break-before:page}}
.ref{{font-size:7pt;color:#8A5A10;font-weight:700}}
.eyebrow{{font-size:8pt;letter-spacing:.14em;text-transform:uppercase;color:#8A5A10;font-weight:800;margin-bottom:4pt}}
.lead{{font-size:11.5pt;color:#2E4446}}
figure{{margin:10pt 0 12pt;padding:12pt 14pt 10pt;border:1px solid #DCE5E3;border-radius:10pt;break-inside:avoid;background:#fff}}
figcaption{{font-size:8.4pt;color:#4E6A6D;margin-top:6pt;line-height:1.45}}
figcaption b{{color:#123B40}}
.fig-title{{font-size:10pt;font-weight:800;color:#123B40;margin-bottom:6pt}}
.facts{{display:grid;grid-template-columns:repeat(3,1fr);gap:8pt;margin:10pt 0}}
.fact{{background:#F3F6F5;border-radius:9pt;padding:10pt 11pt;border-top:3pt solid #E39A2D}}
.fact b{{display:block;font-size:20pt;font-weight:850;color:#123B40;letter-spacing:-.02em;line-height:1.1}}
.fact span{{font-size:8.6pt;color:#4E6A6D;line-height:1.35;display:block;margin-top:3pt}}
.box{{background:#F6EBD8;border-radius:10pt;padding:11pt 13pt;margin:10pt 0;break-inside:avoid}}
.box.petrol{{background:#123B40;color:#E9F0EF}} .box.petrol h3{{color:#fff;margin-top:0}} .box.petrol a{{color:#F2B357}}
.box h3{{margin-top:0}}
ul,ol{{margin:0 0 8pt;padding-left:15pt}} li{{margin-bottom:3pt}}
table{{width:100%;border-collapse:collapse;font-size:8.9pt;margin:8pt 0;break-inside:avoid}}
th{{text-align:left;background:#123B40;color:#fff;padding:6pt 7pt;font-weight:700}}
td{{padding:6pt 7pt;border-bottom:1px solid #DCE5E3;vertical-align:top}}
tr:nth-child(even) td{{background:#F7F9F9}}
.two{{display:grid;grid-template-columns:1fr 1fr;gap:12pt}}
.check li{{list-style:none;position:relative;padding-left:4pt}} .check li::before{{content:"✓";position:absolute;left:-13pt;color:#E39A2D;font-weight:900}}
.steps{{counter-reset:s;display:grid;gap:7pt;margin:8pt 0}}
.step{{display:grid;grid-template-columns:26pt 1fr;gap:8pt;align-items:start;break-inside:avoid}}
.step i{{counter-increment:s;width:24pt;height:24pt;border-radius:50%;background:#123B40;color:#fff;font-style:normal;font-weight:800;display:flex;align-items:center;justify-content:center;font-size:11pt;box-shadow:0 0 0 2pt #fff,0 0 0 3.5pt #E39A2D}}
.step i::before{{content:counter(s)}}
.step b{{color:#123B40}}
.sources{{font-size:8.1pt;line-height:1.42;padding-left:20pt}} .sources li{{margin-bottom:4pt;word-break:break-word}}
.small{{font-size:8.3pt;color:#4E6A6D}}
/* Titelseite */
.cover{{height:297mm;width:210mm;background:#0C2A2E;color:#fff;position:relative;overflow:hidden;padding:22mm 20mm}}
.cover .lines{{position:absolute;inset:0;opacity:.55}}
.cover .glow{{position:absolute;right:-60mm;top:40mm;width:170mm;height:170mm;border-radius:50%;background:radial-gradient(circle,rgba(227,154,45,.35),rgba(227,154,45,0) 65%)}}
.cover .in{{position:relative;height:100%;display:flex;flex-direction:column}}
.cover .issue{{margin-top:48mm;font-size:9pt;letter-spacing:.2em;text-transform:uppercase;color:#F2B357;font-weight:800}}
.cover h1{{color:#fff;font-size:38pt;font-weight:850;letter-spacing:-.035em;margin:8pt 0 12pt;line-height:1.03}}
.cover .sub{{font-size:13.5pt;color:#CFDCDA;max-width:140mm;line-height:1.45}}
.cover .kf{{margin-top:auto;display:grid;grid-template-columns:repeat(3,1fr);gap:10pt}}
.cover .kf div{{border-top:1.5pt solid rgba(255,255,255,.3);padding-top:8pt}}
.cover .kf b{{display:block;font-size:24pt;font-weight:850;color:#F2B357;letter-spacing:-.02em}}
.cover .kf span{{font-size:8.6pt;color:#CFDCDA;line-height:1.35;display:block}}
.cover .foot{{margin-top:12mm;font-size:8.5pt;color:#9FB4B2;display:flex;justify-content:space-between}}
.toc{{margin:6pt 0 0;padding:0;list-style:none;columns:2;column-gap:14pt}} .toc li{{padding:4pt 0;border-bottom:1px dotted #C9D5D3;font-size:9.6pt}} .toc li b{{color:#E39A2D;margin-right:6pt}}
</style></head><body>

<section class="cover">
  <svg class="lines" viewBox="0 0 800 1130" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">{''.join(f'<ellipse cx="610" cy="330" rx="{40+i*34}" ry="{28+i*25}" fill="none" stroke="#D3DEDC" stroke-opacity="{0.05+0.012*(13-i)}" stroke-width="1.2" transform="rotate({-18+i*2} 610 330)"/>' for i in range(14))}</svg>
  <div class="glow"></div>
  <div class="in">
    {LOGO.format(c='#FFFFFF', s='#9FB4B2')}
    <div class="issue">A&amp;R Praxiswissen · Ausgabe 01 · November 2026</div>
    <h1>KI im Handwerks&shy;betrieb</h1>
    <p class="sub">Was heute schon funktioniert, was die Forschung über den Nutzen sagt und wo die Grenzen liegen. Ein Überblick mit Zahlen, Quellen und einem Fahrplan für den Einstieg.</p>
    <div class="kf">
      <div><b>57 %</b><span>der Unternehmen ab 20 Beschäftigten nutzen KI (2026){S(4)}</span></div>
      <div><b>4 %</b><span>der Handwerksbetriebe nutzten KI im Jahr 2025{S(6)}</span></div>
      <div><b>≈ 97.000</b><span>Stellen im Handwerk ohne passend qualifizierte Arbeitslose (2025){S(1)}</span></div>
    </div>
    <div class="foot"><span>Altun &amp; Riechert · Achardweg 17 · 70435 Stuttgart</span><span>Kostenlos · Weitergabe erwünscht</span></div>
  </div>
</section>

<section class="page">
  <div class="eyebrow">Auf einen Blick</div>
  <h2>Die fünf wichtigsten Punkte</h2>
  <div class="steps">
    <div class="step"><i></i><div><b>Die Lücke ist groß.</b> Unter Unternehmen ab 20 Beschäftigten ist KI inzwischen Mehrheitsthema (57 % im Jahr 2026){S(4)}. Im Handwerk nutzten 2025 nur 4 % der Betriebe KI{S(6)}. Wer jetzt anfängt, ist nicht spät, sondern früh.</div></div>
    <div class="step"><i></i><div><b>Der Nutzen ist belegt, aber begrenzt.</b> In kontrollierten Studien wurden Schreib- und Büroaufgaben deutlich schneller erledigt, zum Teil mit besserer Qualität{S(10)}{S(11)}{S(12)}. Auf der Baustelle ersetzt KI keine Hand – sie entlastet das Büro.</div></div>
    <div class="step"><i></i><div><b>Der Engpass ist Zeit, nicht Technik.</b> Fachkräfte fehlen{S(1)}, Dokumentationspflichten wachsen{S(2)}. Jede Stunde, die KI im Büro spart, kann auf die Baustelle oder zum Kunden.</div></div>
    <div class="step"><i></i><div><b>Klein anfangen schlägt Großprojekt.</b> Ein einzelner, häufiger Ablauf – etwa Anfragen beantworten oder Angebotstexte – ist der beste Einstieg. Die Kontrolle bleibt beim Menschen.</div></div>
    <div class="step"><i></i><div><b>Datenschutz und Recht sind lösbar.</b> Mit den richtigen Werkzeugen, klaren Regeln im Team und Grundwissen zur KI-Verordnung{S(13)}{S(14)} lassen sich die größten Hürden{S(4)} vermeiden.</div></div>
  </div>
  <h3>Inhalt</h3>
  <ul class="toc">
    <li><b>1</b>Ausgangslage im Handwerk</li><li><b>2</b>Wo die Betriebe bei KI stehen</li><li><b>3</b>Was die Forschung zum Nutzen sagt</li><li><b>4</b>Sechs Einsatzfelder im Betrieb</li>
    <li><b>5</b>Grenzen und Risiken</li><li><b>6</b>Rechtlicher Rahmen</li><li><b>7</b>In vier Schritten starten</li><li><b>8</b>So helfen wir bei der Automatisierung</li>
    <li><b>9</b>Quellen und Hinweise</li>
  </ul>
  <div class="box" style="margin-top:14pt"><h3>Für wen ist dieser Ratgeber?</h3><p style="margin:0">Für Inhaberinnen und Inhaber kleiner und mittlerer Betriebe – besonders im Handwerk –, die wissen wollen, ob sich KI für sie lohnt, ohne sich durch Fachliteratur zu arbeiten. Alle Zahlen sind belegt; die Quellen stehen am Ende. Wo wir selbst einschätzen statt messen, sagen wir das dazu.</p></div>
</section>

<section class="page">
  <h2><span class="no">1</span>Ausgangslage im Handwerk</h2>
  <p class="lead">Viele Betriebe haben mehr Aufträge als Hände. Gleichzeitig wächst der Aufwand im Büro.</p>
  <p>Das Kompetenzzentrum Fachkräftesicherung (KOFA) beziffert die Fachkräftelücke im Handwerk für 2025 auf rund 97.300 Stellen – also offene Stellen, für die es bundesweit keine passend qualifizierten Arbeitslosen gibt{S(1)}. Damit konnte fast jede zweite offene Stelle im Handwerk rechnerisch nicht besetzt werden. Von 115 untersuchten Handwerksberufen waren 59 von Engpässen betroffen, 35 davon schon seit mindestens zehn Jahren. Am größten ist die Lücke in der Bauelektrik; auch Sanitär-, Heizungs- und Klimatechnik, Dachdeckerei, Metallbau und Kfz-Technik zählen zu den Engpassberufen{S(1)}.</p>
  <figure><div class="fig-title">Abb. 1 · Fachkräftelücke im Handwerk 2025 nach Qualifikation</div>{c_luecke}
  <figcaption><b>Lesehilfe:</b> Offene Stellen, für die keine passend qualifizierten Arbeitslosen zur Verfügung standen, Jahresdurchschnitt 2025, gerundet. Summe ≈ 97.300. Quelle: KOFA/IW (2026){S(1)}; eigene Darstellung.</figcaption></figure>
  <h3>Mehr Verwaltung, weniger Zeit für Kunden</h3>
  <p>In einer Umfrage des Zentralverbands des Deutschen Handwerks (ZDH) mit über 10.600 Betrieben nannten 76 % die ständige Anpassung an neue Vorschriften als größte Belastung, 54 % die Nachweis- und Dokumentationspflichten; 74 % gaben an, die Bürokratie sei in den letzten fünf Jahren gewachsen{S(2)}. In Baden-Württemberg berichteten rund 64 % der befragten Betriebe, dass ihnen dadurch weniger Zeit für Kunden bleibt{S(3)}.</p>
  <div class="facts">
    <div class="fact"><b>≈ 47 %</b><span>der offenen Stellen im Handwerk rechnerisch nicht besetzbar (2025){S(1)}</span></div>
    <div class="fact"><b>54 %</b><span>empfinden Nachweis- und Dokumentationspflichten als Belastung{S(2)}</span></div>
    <div class="fact"><b>≈ 64 %</b><span>der Betriebe in Baden-Württemberg haben weniger Zeit für Kunden{S(3)}</span></div>
  </div>
  <p><b>Was das für KI bedeutet:</b> Künstliche Intelligenz kann keine Fachkraft auf dem Dach ersetzen. Sie kann aber Aufgaben im Büro verkürzen – genau dort, wo Inhaber und Meister heute Abende und Wochenenden verlieren.</p>
</section>

<section class="page">
  <h2><span class="no">2</span>Wo die Betriebe bei KI stehen</h2>
  <p class="lead">In größeren Unternehmen ist KI in drei Jahren vom Experiment zur Normalität geworden. Das Handwerk steht noch am Anfang.</p>
  <p>Nach repräsentativen Befragungen des Digitalverbands Bitkom nutzten 2024 noch 20 % der Unternehmen ab 20 Beschäftigten KI, 2025 bereits 36 % und 2026 erstmals eine Mehrheit von 57 %{S(4)}{S(5)}. Nur noch 4 % halten KI 2026 für kein Thema{S(4)}. Im Handwerk sah es 2025 anders aus: 4 % der Betriebe nutzten KI, weitere 9 % planten es{S(6)}. Gleichzeitig sehen 89 % der Handwerksbetriebe die Digitalisierung als Chance und 35 % erwarten einen Wettbewerbsvorteil für diejenigen, die KI früh einsetzen{S(6)}.</p>
  <figure><div class="fig-title">Abb. 2 · Anteil der Unternehmen, die KI nutzen</div>{c_nutzung}
  <figcaption><b>Methodischer Hinweis:</b> Die ersten drei Werte beziehen sich auf Unternehmen ab 20 Beschäftigten (Bitkom, n ≈ 600 je Jahr){S(4)}{S(5)}, der vierte auf Handwerksbetriebe ab einem Beschäftigten (Bitkom, n = 504, 2025){S(6)}. Die Gruppen sind nicht direkt vergleichbar – kleinere Betriebe nutzen neue Technik generell seltener. Die Größenordnung des Abstands ist dennoch deutlich. Eigene Darstellung.</figcaption></figure>
  <h3>Je kleiner der Betrieb, desto seltener KI</h3>
  <p>Auch die amtliche Statistik zeigt den Größeneffekt: 2024 nutzten 17 % der Unternehmen mit 10 bis 49 Beschäftigten KI, aber 48 % der Unternehmen ab 250 Beschäftigten{S(7)}. Für generative KI (z. B. Textassistenten) ermittelte das IAB für 2025 eine Nutzung bei 21 % der Betriebe mit weniger als 10 Beschäftigten und bei 48 % der Betriebe ab 200 Beschäftigten{S(9)}. Europaweit nutzten 2025 rund 20 % der Unternehmen ab 10 Beschäftigten KI, in Deutschland rund 26 %{S(8)}.</p>
  <figure><div class="fig-title">Abb. 3 · KI-Nutzung nach Unternehmensgröße, Deutschland 2024</div>{c_groesse}
  <figcaption>Unternehmen ab 10 Beschäftigten, Anteil mit KI-Nutzung. Quelle: Statistisches Bundesamt (Destatis), Pressemitteilung Nr. 444 vom 25.11.2024{S(7)}; Datenlizenz Deutschland – Namensnennung – Version 2.0; eigene Darstellung.</figcaption></figure>
</section>

<section class="page">
  <h2><span class="no">3</span>Was die Forschung zum Nutzen sagt</h2>
  <p class="lead">Drei viel zitierte Experimente zeigen große Effekte – aber nur bei passenden Aufgaben.</p>
  <p><b>Schreibaufgaben:</b> In einem Experiment mit 453 Fachkräften (u. a. Marketing, Personal, Beratung) brauchten Teilnehmende mit ChatGPT rund 40 % weniger Zeit für berufstypische Texte; unabhängige Bewertende stuften die Qualität um rund 18 % höher ein (Noy &amp; Zhang, <i>Science</i> 2023){S(10)}.</p>
  <p><b>Kundenservice:</b> Bei 5.179 Servicemitarbeitenden stieg die Zahl gelöster Anfragen pro Stunde mit einem KI-Assistenten im Schnitt um 14 %, bei weniger erfahrenen Mitarbeitenden um 34 % (Brynjolfsson, Li &amp; Raymond, <i>Quarterly Journal of Economics</i> 2025){S(11)}.</p>
  <p><b>Beratung:</b> 758 Beraterinnen und Berater der Boston Consulting Group erledigten mit GPT-4 12,2 % mehr Aufgaben, 25,1 % schneller und mit über 40 % höherer Qualität – solange die Aufgabe innerhalb der Fähigkeiten der KI lag. Bei einer Aufgabe außerhalb dieser „gezackten Grenze“ kamen KI-Nutzende um 19 Prozentpunkte seltener zur richtigen Lösung (Dell’Acqua et al. 2023){S(12)}.</p>
  <figure><div class="fig-title">Abb. 4 · Gemessene Effekte von KI-Assistenten in drei Studien</div>{c_effekte}
  <figcaption>Veränderung gegenüber Kontrollgruppen ohne KI. Balken nach links: weniger benötigte Zeit bzw. weniger richtige Lösungen (Pp. = Prozentpunkte). Studien aus Büro- und Wissensarbeit in den USA; die Effekte lassen sich nicht eins zu eins auf Handwerksbetriebe übertragen. Quellen: [10], [11], [12]; eigene Darstellung.</figcaption></figure>
  <div class="box"><h3 style="font-size:11pt">Was das für Betriebe heißt</h3>
  <ul style="margin:0">
    <li>Die Studien messen <b>Büroarbeit</b>: Texte, Antworten, Analysen. Genau diese Aufgaben gibt es auch im Handwerk – Anfragen, Angebote, Berichte, Stellenanzeigen.</li>
    <li>Der Nutzen ist bei <b>wiederkehrenden, gut beschriebenen</b> Aufgaben am größten, und Einsteiger profitieren besonders{S(11)}{S(12)}.</li>
    <li>Außerhalb der Stärken der KI drohen <b>Fehler mit überzeugender Sprache</b>{S(12)}. Deshalb prüft immer ein Mensch, bevor etwas den Betrieb verlässt.</li>
  </ul></div>
</section>

<section class="page">
  <h2><span class="no">4</span>Sechs Einsatzfelder im Betrieb</h2>
  <p class="lead">Wofür KI im Alltag eines kleinen Betriebs heute realistisch eingesetzt werden kann.</p>
  <table>
    <tr><th style="width:23%">Einsatzfeld</th><th style="width:33%">Was die KI übernimmt</th><th style="width:24%">Was beim Menschen bleibt</th><th>Datenschutz-Hinweis</th></tr>
    <tr><td><b>1 · Anfragen</b></td><td>sortiert E-Mails, fasst zusammen, fragt fehlende Angaben (Maße, Fotos, Termin) ab, schreibt Antwortentwürfe</td><td>Freigabe, Preis, Zusage</td><td>Kundendaten nur in Werkzeugen mit Vertrag zur Auftragsverarbeitung</td></tr>
    <tr><td><b>2 · Angebots- und Leistungstexte</b></td><td>formuliert Positionen und Beschreibungen aus Stichworten, prüft auf Vollständigkeit</td><td>Mengen, Preise, Fachentscheidung</td><td>gering, wenn ohne Personenbezug gearbeitet wird</td></tr>
    <tr><td><b>3 · Baustellen-Dokumentation</b></td><td>macht aus Sprachnotizen und Fotos einen strukturierten Bericht</td><td>Kontrolle der Fakten</td><td>Fotos ohne erkennbare Personen bevorzugen</td></tr>
    <tr><td><b>4 · Stellenanzeigen, Social Media</b></td><td>Entwürfe für Anzeigen, Posts und Antworten auf Bewertungen</td><td>Ton, Wahrheit, Freigabe</td><td>keine Bewerberdaten in frei zugängliche Werkzeuge</td></tr>
    <tr><td><b>5 · Belege und Rechnungen</b></td><td>liest Belege aus, ordnet zu, bereitet Buchungen vor</td><td>Prüfung, Freigabe, Steuerberatung</td><td>nur geprüfte Lösungen, Aufbewahrungspflichten beachten</td></tr>
    <tr><td><b>6 · Telefon und Termine</b></td><td>nimmt Anliegen auf, schlägt Termine vor, erinnert</td><td>Zusage, Sonderfälle</td><td>Hinweis auf KI im Gespräch nötig (Art. 50 KI-VO){S(13)}</td></tr>
  </table>
  <figure><div class="fig-title">Abb. 5 · Aufwand und Entlastung der Einsatzfelder</div>{c_matrix}
  <figcaption><b>Einschätzung von Altun &amp; Riechert, keine Messung.</b> Die Lage hängt stark vom Betrieb ab: von der Zahl der Anfragen, den vorhandenen Programmen und davon, wie einheitlich Abläufe schon sind. Oben links liegen typische Einstiegsfelder.</figcaption></figure>
  <figure><div class="fig-title">Abb. 6 · Beispiel: Anfrage mit KI-Unterstützung beantworten</div>{c_flow}
  <figcaption>Petrol: Schritte, die KI vorbereitet. Amber: Schritte, die beim Betrieb bleiben. Eigene Darstellung.</figcaption></figure>
</section>

<section class="page">
  <h2><span class="no">5</span>Grenzen und Risiken</h2>
  <p class="lead">KI ist ein Werkzeug mit typischen Schwächen. Wer sie kennt, kann sie gut beherrschen.</p>
  <div class="two">
    <div><h3>Überzeugend falsch</h3><p>Sprachmodelle formulieren auch dann flüssig, wenn Inhalte nicht stimmen. In der BCG-Studie sank bei einer Aufgabe außerhalb der KI-Stärken die Trefferquote um 19 Prozentpunkte{S(12)}. Preise, Normen, Fristen und Rechtsfragen gehören deshalb immer in menschliche Hand.</p></div>
    <div><h3>Datenschutz</h3><p>Personenbezogene Daten von Kunden oder Beschäftigten dürfen nur verarbeitet werden, wenn die DSGVO eingehalten ist – etwa mit einem Vertrag zur Auftragsverarbeitung und Anbietern mit Datenverarbeitung in der EU. Die Datenschutzkonferenz hat dazu eine Orientierungshilfe veröffentlicht{S(16)}.</p></div>
    <div><h3>Abhängigkeit und Kosten</h3><p>Viele Werkzeuge werden monatlich bezahlt und ändern Funktionen oder Preise. Sinnvoll ist, vorher zu messen, wie viel Zeit ein Ablauf heute kostet, und nach einigen Wochen zu vergleichen.</p></div>
    <div><h3>Akzeptanz im Team</h3><p>42 % der KI-nutzenden Unternehmen nennen fehlende Akzeptanz bei Beschäftigten als Hürde{S(4)}. Wer das Team früh einbindet und zeigt, dass KI lästige Arbeit abnimmt, vermeidet Widerstand.</p></div>
  </div>
  <figure><div class="fig-title">Abb. 7 · Warum Unternehmen (noch) keine KI nutzen, 2026</div>{c_hemm}
  <figcaption>Unternehmen ab 20 Beschäftigten, die KI nicht nutzen; Mehrfachnennungen. Quelle: Bitkom (2026){S(4)}; eigene Darstellung.</figcaption></figure>
  <p>Die häufigste Hürde ist fehlendes Know-how – nicht fehlendes Geld{S(4)}. Das deckt sich mit der amtlichen Statistik: 71 % der Unternehmen ohne KI nannten 2024 fehlendes Wissen als Grund{S(7)}.</p>
</section>

<section class="page">
  <h2><span class="no">6</span>Rechtlicher Rahmen</h2>
  <p class="lead">Die EU-Verordnung über künstliche Intelligenz (KI-VO) betrifft auch kleine Betriebe, die KI nur nutzen – meist aber mit überschaubaren Pflichten.</p>
  <figure><div class="fig-title">Abb. 8 · Wichtige Daten der KI-Verordnung</div>{c_time}
  <figcaption>Quellen: Verordnung (EU) 2024/1689{S(13)}; KPMG (2026) zum Digital-Omnibus, Verordnung (EU) 2026/1744{S(14)}; Fraunhofer Academy (2026){S(15)}. Vereinfachte Darstellung.</figcaption></figure>
  <h3>Was für Betriebe als Nutzer wichtig ist</h3>
  <ul>
    <li><b>KI-Kompetenz (Art. 4):</b> Seit 2. Februar 2025 sollen Unternehmen, die KI einsetzen, die KI-Kompetenz ihrer Beschäftigten fördern. Mit dem Digital-Omnibus wurde die Pflicht seit 27. Juli 2026 abgeschwächt: Ein bestimmtes Kompetenzniveau muss nicht mehr garantiert werden{S(14)}. Eine kurze interne Einweisung bleibt trotzdem sinnvoll.</li>
    <li><b>Transparenz (Art. 50):</b> Seit 2. August 2026 müssen Menschen erkennen können, wenn sie mit einem KI-System sprechen, etwa mit einem Chat oder Telefonassistenten{S(13)}{S(15)}. Wer KI-erzeugte Texte veröffentlicht, um die Öffentlichkeit über Themen von öffentlichem Interesse zu informieren, muss das kennzeichnen – außer der Text wurde von Menschen geprüft und redaktionell verantwortet{S(15)}.</li>
    <li><b>Hochrisiko-Anwendungen</b> (z. B. automatisierte Auswahl von Bewerbenden) unterliegen strengen Regeln; die Fristen wurden auf Dezember 2027 bzw. August 2028 verschoben{S(14)}. Für die typischen Einsatzfelder aus Kapitel 4 spielt das in der Regel keine Rolle, solange die KI keine Personalentscheidungen trifft.</li>
    <li><b>DSGVO</b> gilt unabhängig von der KI-VO weiter – für Kundendaten, Bewerbungen und Fotos von Personen{S(16)}.</li>
  </ul>
  <p class="small">Dieser Überblick ersetzt keine Rechtsberatung. Bei Einzelfragen helfen Handwerkskammern, Fachverbände sowie Rechtsanwältinnen und Rechtsanwälte.</p>
</section>

<section class="page">
  <h2><span class="no">7</span>In vier Schritten starten</h2>
  <div class="steps">
    <div class="step"><i></i><div><b>Einen Ablauf auswählen.</b> Welche Büroaufgabe kommt jede Woche vor, folgt immer demselben Muster und nervt? Typisch sind Anfragen beantworten, Angebotstexte oder Berichte.</div></div>
    <div class="step"><i></i><div><b>Ausgangszeit messen.</b> Zwei Wochen lang grob notieren, wie lange dieser Ablauf dauert. Ohne Ausgangswert lässt sich später kein Nutzen belegen.</div></div>
    <div class="step"><i></i><div><b>Klein testen, mit Regeln.</b> Ein Werkzeug, ein Ablauf, klare Regeln: keine Kundendaten in Gratis-Werkzeuge, jede Ausgabe wird geprüft, KI-Telefon und -Chat werden als KI gekennzeichnet.</div></div>
    <div class="step"><i></i><div><b>Vergleichen und entscheiden.</b> Nach vier bis sechs Wochen Zeit und Qualität vergleichen. Lohnt es sich, wird der Ablauf fest eingeführt und das Team eingewiesen; wenn nicht, wird er eingestellt.</div></div>
  </div>
  <h3>Checkliste vor dem Start</h3>
  <ul class="check">
    <li>Ein konkreter Ablauf mit Ausgangszeit ist festgelegt.</li>
    <li>Es ist geklärt, welche Daten in das Werkzeug dürfen – und welche nicht.</li>
    <li>Für personenbezogene Daten gibt es einen Vertrag zur Auftragsverarbeitung.</li>
    <li>Eine Person im Betrieb ist zuständig und kennt die Grenzen der KI.</li>
    <li>Kunden erkennen, wenn sie mit einer KI kommunizieren.</li>
    <li>Nichts verlässt den Betrieb ohne menschliche Freigabe.</li>
  </ul>

  <div class="box petrol" style="margin-top:14pt">
    <div class="eyebrow" style="color:#F2B357">In eigener Sache</div>
    <h3><span style="color:#E39A2D">8</span>&nbsp; So helfen wir bei der Automatisierung</h3>
    <p>Wir sind Altun &amp; Riechert, ein junges Team aus Stuttgart: Yunus Altun, Calvin Riechert und Hamza. Wir helfen Betrieben in der Region Stuttgart und im Kreis Ludwigsburg, online besser gefunden zu werden und wiederkehrende Büroarbeit mit KI zu verkürzen. Dabei gehen wir genau so vor, wie in diesem Ratgeber beschrieben:</p>
    <ol style="margin-bottom:6pt">
      <li><b>Kurz-Check:</b> Du schreibst uns, wir schauen uns deinen Online-Auftritt und einen Ablauf an und schicken dir das Ergebnis auf einer Seite.</li>
      <li><b>Ablauf aufnehmen:</b> Gemeinsam halten wir fest, wie die Aufgabe heute läuft und wie lange sie dauert.</li>
      <li><b>Automatisierung bauen:</b> Wir richten eine Lösung ein, die zu deinen vorhandenen Programmen passt – mit Datenschutz von Anfang an und der Freigabe immer bei dir.</li>
      <li><b>Testen und begleiten:</b> Wir messen gemeinsam, ob es Zeit spart, passen an und erklären es deinem Team.</li>
    </ol>
    <p style="margin:0">In unserer Startphase ist der Kurz-Check kostenlos und unverbindlich. Schreib uns einfach mit dem Stichwort <b>„Kurz-Check“</b> an <a href="{MAIL}">altunriechert@gmail.com</a>.</p>
  </div>
</section>

<section class="page">
  <h2><span class="no">9</span>Quellen und Hinweise</h2>
  <ol class="sources">
    <li>Malin, L. (2026): <i>Fachkräftesicherung im Handwerk: Ausbildung zwischen Krise und Renaissance.</i> KOFA Kompakt 7/2026, Kompetenzzentrum Fachkräftesicherung im Institut der deutschen Wirtschaft, im Auftrag des BMWE. DOI 10.67087/2.21430. https://www.kofa.de/media/Publikationen/KOFA_Kompakt/KOFA_Kompakt_07.2026_Handwerk.pdf</li>
    <li>Zentralverband des Deutschen Handwerks (2023): <i>Sonderumfrage Bürokratiebelastung im Handwerk</i> (1. Quartal 2023, n = 10.630). https://www.zdh.de/ueber-uns/fachbereich-wirtschaft-energie-umwelt/sonderumfragen/sonderumfrage-buerokratiebelastung-im-handwerk/</li>
    <li>Handwerk BW (2023): Pressemitteilung Nr. 21 vom 24.04.2023 zur Bürokratiebelastung. https://handwerk-bw.de/fileadmin/media/Pressemitteilungen/2023/PM_21_Buerokratie.pdf</li>
    <li>Bitkom e. V. (2026): Presseinformation vom 14.09.2026 zur KI-Nutzung in der deutschen Wirtschaft, repräsentative Befragung von 603 Unternehmen ab 20 Beschäftigten; zitiert nach DATEV. https://www.datev.de/web/de/berufsgruppenuebergreifend/nachrichten/ndsr/wirtschaft/Mehrheit-Unternehmen-KI</li>
    <li>Bitkom e. V. (2025): Presseinformation vom 15.09.2025 zur KI-Nutzung in der deutschen Wirtschaft, 604 Unternehmen ab 20 Beschäftigten, KW 27–32/2025. https://www.bitkom.org/Presse/Presseinformation/Durchbruch-Kuenstliche-Intelligenz</li>
    <li>Bitkom e. V. (2025): Presseinformation vom 28.08.2025 zur Digitalisierung im Handwerk, 504 Handwerksbetriebe, KW 23–29/2025. https://www.bitkom.org/Presse/Presseinformation/Handwerk-Azubis-Betriebe-Digitalisierung</li>
    <li>Statistisches Bundesamt (Destatis) (2024): Pressemitteilung Nr. 444 vom 25.11.2024 „Jedes fünfte Unternehmen nutzt künstliche Intelligenz“. https://www.destatis.de/DE/Presse/Pressemitteilungen/2024/11/PD24_444_52911.html – Datenlizenz Deutschland – Namensnennung – Version 2.0.</li>
    <li>Eurostat (2025): <i>Use of artificial intelligence in enterprises</i>, Datenstand Dezember 2025. https://ec.europa.eu/eurostat/statistics-explained/index.php/Use_of_artificial_intelligence_in_enterprises – Werte für EU und Deutschland nach Berichterstattung in Cyprus Mail (12.12.2025) und implicator.ai.</li>
    <li>Institut für Arbeitsmarkt- und Berufsforschung (IAB) (2026): IAB-Betriebspanel 2025 zur Nutzung generativer KI; zitiert nach dpa/CIO vom 05.05.2026. https://www.cio.de/article/4167077/nutzung-von-ki-in-unternehmen-sprunghaft-gestiegen.html</li>
    <li>Noy, S.; Zhang, W. (2023): Experimental evidence on the productivity effects of generative artificial intelligence. <i>Science</i> 381(6654), 187–192. DOI 10.1126/science.adh2586</li>
    <li>Brynjolfsson, E.; Li, D.; Raymond, L. R. (2025): Generative AI at Work. <i>The Quarterly Journal of Economics</i> 140(2), 889–942. NBER Working Paper 31161. https://www.nber.org/papers/w31161</li>
    <li>Dell’Acqua, F.; McFowland III, E.; Mollick, E.; Lifshitz-Assaf, H.; Kellogg, K. C.; Rajendran, S.; Krayer, L.; Candelon, F.; Lakhani, K. R. (2023): Navigating the Jagged Technological Frontier. Harvard Business School Working Paper 24-013.</li>
    <li>Verordnung (EU) 2024/1689 des Europäischen Parlaments und des Rates vom 13. Juni 2024 (Verordnung über künstliche Intelligenz), ABl. L, 12.07.2024. https://eur-lex.europa.eu/eli/reg/2024/1689/oj</li>
    <li>KPMG Austria (2026): Digital Omnibus on AI (Insights, Juli 2026). https://kpmg.com/at/de/insights/2026/07/digital-omnibus-on-ai.html</li>
    <li>Fraunhofer Academy (2026): EU AI Act Art. 50 – Transparenzpflichten kommen ab 2. August 2026 hinzu (Blogbeitrag). https://blog.academy.fraunhofer.de/blogbeitraege/transparenzpflicht/</li>
    <li>Datenschutzkonferenz (DSK) (2024): Orientierungshilfe „Künstliche Intelligenz und Datenschutz“, Version 1.0, Mai 2024. https://www.datenschutzkonferenz-online.de</li>
  </ol>
  <p class="small">Alle Internetquellen abgerufen am 30.10.2026. Alle Abbildungen sind eigene Darstellungen auf Grundlage der genannten Zahlen; es wurden keine fremden Grafiken übernommen.</p>
  <div class="two" style="margin-top:10pt">
    <div class="box" style="margin:0"><h3>Herausgeber</h3><p class="small" style="margin:0;color:#1E2B2C">Altun &amp; Riechert<br>Yunus Altun und Calvin Riechert<br>Achardweg 17, 70435 Stuttgart<br>altunriechert@gmail.com<br>Verantwortlich für den Inhalt: Yunus Altun und Calvin Riechert (Anschrift wie oben)<br>Vollständiges Impressum auf unserer Website.</p></div>
    <div class="box" style="margin:0;background:#F3F6F5"><h3>Hinweise</h3><p class="small" style="margin:0;color:#1E2B2C">Stand: 30.10.2026. Bei der Recherche und beim Entwurf dieses Ratgebers wurde KI eingesetzt; alle Inhalte wurden von den Herausgebern geprüft und redaktionell verantwortet. Der Ratgeber dient der allgemeinen Information und ersetzt keine Rechts-, Steuer- oder Datenschutzberatung. Die genannten Studienergebnisse sind keine Zusage für Ergebnisse in einzelnen Betrieben. Weitergabe in unveränderter Form erwünscht.</p></div>
  </div>
</section>
</body></html>'''
open('ki-ratgeber.html','w').write(HTML)
print('html ok')
