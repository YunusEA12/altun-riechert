# Diagramme als Inline-SVG im Markenstil (Petrol, Amber), alle Werte direkt beschriftet.
PET='#1F5A60'; AMB='#E39A2D'; MUTE='#B9C9CA'; INK='#123B40'; INK2='#4E6A6D'; GRID='#E3EAE9'
FONT="font-family=\"Archivo, Arial, sans-serif\""

def esc(s): return str(s).replace('&','&amp;').replace('<','&lt;')

def hbar(rows, vmax, width=640, bar=20, gap=12, label_w=230, unit=' %', fmt=lambda v: f'{v:g}'.replace('.',','), note=None):
    """rows: (label, value, color)"""
    h = len(rows)*(bar+gap)+10
    plot = width-label_w-60
    out=[f'<svg viewBox="0 0 {width} {h}" width="100%" role="img" xmlns="http://www.w3.org/2000/svg">']
    for i,(lab,v,col) in enumerate(rows):
        y=i*(bar+gap)+4; w=max(2,plot*v/vmax)
        out.append(f'<text x="{label_w-12}" y="{y+bar/2+4.5}" text-anchor="end" {FONT} font-size="12.5" fill="{INK}">{esc(lab)}</text>')
        out.append(f'<rect x="{label_w}" y="{y}" width="{w:.1f}" height="{bar}" rx="4" fill="{col}"/>')
        out.append(f'<text x="{label_w+w+8:.1f}" y="{y+bar/2+4.5}" {FONT} font-size="12.5" font-weight="700" fill="{INK}">{fmt(v)}{unit}</text>')
    out.append('</svg>'); return ''.join(out)

def vbar(cols, vmax, width=640, height=230, unit=' %', fmt=lambda v: f'{v:g}'.replace('.',',')):
    """cols: (label, sublabel, value, color)"""
    n=len(cols); base=height-44; top=18; slot=(width-20)/n; bw=min(70,slot*0.55)
    out=[f'<svg viewBox="0 0 {width} {height}" width="100%" role="img" xmlns="http://www.w3.org/2000/svg">']
    out.append(f'<line x1="10" x2="{width-10}" y1="{base}" y2="{base}" stroke="{MUTE}" stroke-width="1"/>')
    for i,(lab,sub,v,col) in enumerate(cols):
        cx=10+slot*i+slot/2; hh=(base-top)*v/vmax
        out.append(f'<path d="M{cx-bw/2},{base} v{-hh+4} q0,-4 4,-4 h{bw-8} q4,0 4,4 v{hh-4} z" fill="{col}"/>')
        out.append(f'<text x="{cx}" y="{base-hh-7}" text-anchor="middle" {FONT} font-size="15" font-weight="800" fill="{INK}">{fmt(v)}{unit}</text>')
        out.append(f'<text x="{cx}" y="{base+17}" text-anchor="middle" {FONT} font-size="12" font-weight="700" fill="{INK}">{esc(lab)}</text>')
        if sub: out.append(f'<text x="{cx}" y="{base+32}" text-anchor="middle" {FONT} font-size="10.5" fill="{INK2}">{esc(sub)}</text>')
    out.append('</svg>'); return ''.join(out)

def effects(rows, width=640):
    """rows: (label, value, text) – Effekte in %, negativ = weniger Zeit"""
    bar=18; gap=11; lw=250; h=len(rows)*(bar+gap)+28; x0=lw+150; scale=(width-x0-70)/45
    out=[f'<svg viewBox="0 0 {width} {h}" width="100%" role="img" xmlns="http://www.w3.org/2000/svg">']
    out.append(f'<line x1="{x0}" x2="{x0}" y1="0" y2="{h-22}" stroke="{INK2}" stroke-width="1"/>')
    for i,(lab,v,txt,col) in enumerate(rows):
        y=i*(bar+gap)+4; w=abs(v)*scale; x=x0 if v>=0 else x0-w
        out.append(f'<text x="10" y="{y+bar/2+4.5}" {FONT} font-size="12" fill="{INK}">{esc(lab)}</text>')
        out.append(f'<rect x="{x:.1f}" y="{y}" width="{w:.1f}" height="{bar}" rx="4" fill="{col}"/>')
        tx = x0+w+8 if v>=0 else x0+8; anc='start'
        out.append(f'<text x="{tx:.1f}" y="{y+bar/2+4.5}" text-anchor="{anc}" {FONT} font-size="12.5" font-weight="700" fill="{INK}">{esc(txt)}</text>')
    out.append(f'<text x="{x0}" y="{h-6}" text-anchor="middle" {FONT} font-size="10" fill="{INK2}">0</text>')
    out.append('</svg>'); return ''.join(out)

def matrix(points, width=640, height=380):
    """points: (label, x 0..1 Aufwand, y 0..1 Nutzen)"""
    L,T,R,B=70,20,20,46; pw=width-L-R; ph=height-T-B
    out=[f'<svg viewBox="0 0 {width} {height}" width="100%" role="img" xmlns="http://www.w3.org/2000/svg">']
    out.append(f'<rect x="{L}" y="{T}" width="{pw/2}" height="{ph/2}" fill="#F6EBD8"/>')
    out.append(f'<text x="{L+10}" y="{T+18}" {FONT} font-size="11" font-weight="700" fill="#8A5A10">GUTER EINSTIEG</text>')
    for k in (0,.5,1):
        out.append(f'<line x1="{L+pw*k}" x2="{L+pw*k}" y1="{T}" y2="{T+ph}" stroke="{GRID}"/><line x1="{L}" x2="{L+pw}" y1="{T+ph*k}" y2="{T+ph*k}" stroke="{GRID}"/>')
    out.append(f'<text x="{L+pw/2}" y="{height-10}" text-anchor="middle" {FONT} font-size="11.5" fill="{INK2}">Aufwand für die Einführung  →</text>')
    out.append(f'<text transform="translate(18 {T+ph/2}) rotate(-90)" text-anchor="middle" {FONT} font-size="11.5" fill="{INK2}">Entlastung im Alltag  →</text>')
    for i,(lab,x,y,dx,anc) in enumerate(points):
        cx=L+pw*x; cy=T+ph*(1-y)
        out.append(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="13" fill="{PET}" stroke="#fff" stroke-width="2"/>')
        out.append(f'<text x="{cx:.1f}" y="{cy+4.5:.1f}" text-anchor="middle" {FONT} font-size="12" font-weight="800" fill="#fff">{i+1}</text>')
        out.append(f'<text x="{cx+dx:.1f}" y="{cy+4.5:.1f}" text-anchor="{anc}" {FONT} font-size="12" fill="{INK}">{esc(lab)}</text>')
    out.append('</svg>'); return ''.join(out)

def timeline(items, width=640, height=150):
    L,R=30,30; y=60; out=[f'<svg viewBox="0 0 {width} {height}" width="100%" role="img" xmlns="http://www.w3.org/2000/svg">']
    out.append(f'<line x1="{L}" x2="{width-R}" y1="{y}" y2="{y}" stroke="{MUTE}" stroke-width="3" stroke-linecap="round"/>')
    n=len(items)
    for i,(date,txt,hl) in enumerate(items):
        x=L+(width-L-R)*(i/(n-1))
        out.append(f'<circle cx="{x}" cy="{y}" r="9" fill="{AMB if hl else PET}" stroke="#fff" stroke-width="3"/>')
        anc='start' if i==0 else ('end' if i==n-1 else 'middle')
        out.append(f'<text x="{x}" y="{y-20}" text-anchor="{anc}" {FONT} font-size="12.5" font-weight="800" fill="{INK}">{esc(date)}</text>')
        for k,line in enumerate(txt.split('|')):
            out.append(f'<text x="{x}" y="{y+30+k*15}" text-anchor="{anc}" {FONT} font-size="11" fill="{INK2}">{esc(line)}</text>')
    out.append('</svg>'); return ''.join(out)

def flow(steps, width=640, height=120):
    n=len(steps); gap=22; bw=(width-gap*(n-1))/n; out=[f'<svg viewBox="0 0 {width} {height}" width="100%" role="img" xmlns="http://www.w3.org/2000/svg">']
    for i,(t,s,who) in enumerate(steps):
        x=i*(bw+gap); col = AMB if who=='mensch' else PET
        out.append(f'<rect x="{x}" y="10" width="{bw}" height="{height-20}" rx="12" fill="#fff" stroke="{col}" stroke-width="2"/>')
        out.append(f'<rect x="{x}" y="10" width="{bw}" height="6" rx="3" fill="{col}"/>')
        out.append(f'<text x="{x+12}" y="42" {FONT} font-size="12.5" font-weight="800" fill="{INK}">{esc(t)}</text>')
        for k,line in enumerate(s.split('|')):
            out.append(f'<text x="{x+12}" y="{62+k*15}" {FONT} font-size="10.8" fill="{INK2}">{esc(line)}</text>')
        if i<n-1: out.append(f'<path d="M{x+bw+5},{height/2} l12,0 m-5,-5 l5,5 l-5,5" stroke="{INK2}" stroke-width="1.8" fill="none"/>')
    out.append('</svg>'); return ''.join(out)
