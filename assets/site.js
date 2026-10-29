(function () {
  var root = document.documentElement;
  root.classList.add("js");   // Bedienelemente, die nur mit JS funktionieren, werden erst jetzt gezeigt
  var desktop = window.matchMedia("(min-width: 1024px)");
  var calm = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Menü: Fokus hinein, Hintergrund inert, Escape schließt, Fokus zurück zum Button
  var topbar = document.getElementById("topbar");
  var btn = topbar.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  var label = btn.querySelector(".menu-btn__text");
  var openLabel = label.textContent;
  var closeLabel = btn.getAttribute("data-close-label") || "Schließen";
  var background = [document.querySelector("main"), document.querySelector("footer"), document.querySelector(".skip-link")];

  function setMenu(open) {
    menu.hidden = !open;
    btn.setAttribute("aria-expanded", String(open));
    label.textContent = open ? closeLabel : openLabel;
    root.style.overflow = open ? "hidden" : "";
    background.forEach(function (el) { if (el) el.inert = open; });
    if (open) menu.querySelector("a").focus();
  }
  btn.addEventListener("click", function () { setMenu(menu.hidden); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !menu.hidden) { setMenu(false); btn.focus(); }
  });

  // Hero: auf Desktop fixiert, die Leistungs-Panels fahren beim Scrollen von rechts herein.
  // Ohne JS, auf Mobile oder bei reduzierter Bewegung bleibt die normale Scroll-Leiste.
  var pin = document.querySelector(".hero-pin");
  var strip = pin.querySelector(".hero__strip");
  var panels = strip.querySelectorAll(".panel:not(.panel--last)");
  var distance = 0;

  function layoutHero() {
    // Bei wenig Höhe (kleines Fenster, Zoom) passt der fixierte Hero nicht → normale Scroll-Leiste
    var usePin = desktop.matches && !calm.matches && window.innerHeight >= 640;
    pin.classList.toggle("is-pinned", usePin);
    root.classList.toggle("pin-ok", usePin);   // gleiche Entscheidung wie das Inline-Skript im <head>
    if (!usePin) {
      pin.style.height = "";
      strip.style.transform = "";
      distance = 0;
      return;
    }
    var vw = window.innerWidth;
    // Ende wie in der Referenz: das letzte Panel steht bei ca. 21 % vom linken Rand
    distance = strip.offsetLeft + panels.length * panels[0].offsetWidth - vw * 0.748;
    pin.style.height = window.innerHeight + distance * 0.85 + "px";
    onScrollHero();
  }

  function onScrollHero() {
    if (!distance) return;
    var p = Math.min(1, Math.max(0, (window.scrollY - pin.offsetTop) / (distance * 0.85)));
    strip.style.transform = "translate3d(" + (-p * distance) + "px,0,0)";
  }

  // Header: oben hell über dem Hero; beim Scrollen blendet nur das Logo aus,
  // Sprache, Kurz-Check und Menü bleiben sichtbar
  function onScrollHeader() {
    var scrolled = window.scrollY > 40;
    var heroBottom = pin.querySelector(".hero__main").getBoundingClientRect().bottom;
    topbar.classList.toggle("is-compact", scrolled);
    topbar.classList.toggle("is-light", heroBottom > 60 && !(pin.classList.contains("is-pinned") && scrolled));
  }

  // Einblenden beim Scrollen – nur wenn dieses Skript läuft und Bewegung erlaubt ist
  if ("IntersectionObserver" in window && !calm.matches) {
    root.classList.add("reveal-ready");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
  }

  // Videos laden erst, wenn ihr Panel sichtbar wird (preload="none"), und laufen nur dort –
  // spart Datenvolumen auf dem Handy. Ohne JS bleibt das Vorschaubild stehen.
  // Dazu kommen die Videos in Über uns, Ablauf, Beispiel und Kontakt (data-video).
  var panelVideos = document.querySelectorAll(".panel__image video, video[data-video]");
  var videosStopped = false;   // Pause-Knopf: hält alle Panel-Videos an (WCAG 2.2.2)
  function setVideo(v, on) {
    if (on && !calm.matches && !videosStopped) { v.play().catch(function () {}); } else { v.pause(); }
  }
  var en = root.lang === "en";
  var pauseLabel = en ? "Pause videos" : "Videos anhalten", playLabel = en ? "Play videos" : "Videos abspielen";
  var toggles = [];
  function syncToggles() {
    toggles.forEach(function (b) {
      b.setAttribute("aria-pressed", String(videosStopped));
      b.setAttribute("aria-label", videosStopped ? playLabel : pauseLabel);
      b.classList.toggle("is-paused", videosStopped);
    });
  }
  panelVideos.forEach(function (v) {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "video-toggle";
    b.innerHTML = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path class="video-toggle__pause" d="M5 3v10M11 3v10" stroke="currentColor" stroke-width="2"/><path class="video-toggle__play" d="M5 3l8 5-8 5z" fill="currentColor"/></svg>';
    b.addEventListener("click", function () {
      videosStopped = !videosStopped;
      panelVideos.forEach(function (x) { setVideo(x, x.dataset.visible === "1"); });
      syncToggles();
    });
    (v.closest("[data-video-host]") || v.parentNode).appendChild(b);   // nie innerhalb eines Links
    toggles.push(b);
  });
  syncToggles();
  if ("IntersectionObserver" in window) {
    var videoIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.dataset.visible = e.isIntersecting ? "1" : ""; setVideo(e.target, e.isIntersecting); });
    }, { threshold: 0.25 });   // erst laden, wenn ein Viertel des Panels sichtbar ist
    panelVideos.forEach(function (v) { videoIo.observe(v); });
  }
  calm.addEventListener("change", function () {
    panelVideos.forEach(function (v) { setVideo(v, v.dataset.visible === "1"); });
  });

  // Hero-Hintergrund: Höhenlinien bewegen sich ruhig und weichen dem Mauszeiger aus.
  // Ohne JS bleibt das statische images/grafik/hero.svg, bei reduzierter Bewegung ein stehendes Bild.
  (function heroLines() {
    var main = document.querySelector(".hero__main");
    var img = main && main.querySelector(".hero__bg");
    var canvas = document.createElement("canvas");
    if (!img || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    canvas.className = "hero__canvas";
    canvas.setAttribute("aria-hidden", "true");
    img.after(canvas);
    main.classList.add("has-canvas");

    var MIST = "211, 222, 220", AMBER = "227, 154, 45";
    var w = 0, h = 0, dpr = 1, s = 1, start = performance.now();
    var running = false, onScreen = true;
    var mouse = { x: 0, y: 0, tx: 0, ty: 0, active: 0, target: 0 };

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      s = Math.max(w / 1600, h / 1000);   // wie object-fit: cover beim SVG
      if (!running) draw(calm.matches ? 0 : (performance.now() - start) / 1000);
    }

    // Ein „Hügel“ aus n Ringen; Koordinaten wie im SVG (1600 × 1000)
    function hill(t, X, Y, n, rx0, ry0, stepX, stepY, alpha, seed) {
      var ox = (w - 1600 * s) / 2, oy = (h - 1000 * s) / 2;
      // leichte Parallaxe: der Hügel folgt der Maus ein Stück
      var cx = ox + X * s + (mouse.x - w / 2) * 0.03 * mouse.active;
      var cy = oy + Y * s + (mouse.y - h / 2) * 0.03 * mouse.active;
      var reach = Math.max(140, 230 * s);
      ctx.lineWidth = 1.4;
      for (var k = 0; k < n; k++) {
        var breathe = 1 + 0.02 * Math.sin(t * 0.8 - k * 0.45);   // Welle läuft nach außen
        var rx = (rx0 + k * stepX) * s * breathe, ry = (ry0 + k * stepY) * s * breathe;
        var pts = [];
        for (var i = 0; i < 120; i++) {
          var a = i * Math.PI / 60;
          var wob = 1 + 0.06 * Math.sin(3 * a + k * 0.7 + seed + t * 0.35)
                      + 0.04 * Math.sin(5 * a - k * 0.4 + seed * 2 - t * 0.25);
          var px = cx + rx * wob * Math.cos(a), py = cy + ry * wob * Math.sin(a);
          if (mouse.active > 0.01) {   // Linien weichen dem Zeiger weich aus
            var dx = px - mouse.x, dy = py - mouse.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
            if (d < reach) {
              var f = 1 - d / reach, push = f * f * 38 * mouse.active;
              px += dx / d * push; py += dy / d * push;
            }
          }
          pts.push(px, py);
        }
        ctx.strokeStyle = "rgba(" + MIST + "," + (alpha * (1 - k / (n * 1.4))).toFixed(3) + ")";
        ctx.beginPath();
        var lx = pts[pts.length - 2], ly = pts[pts.length - 1];
        ctx.moveTo((lx + pts[0]) / 2, (ly + pts[1]) / 2);
        for (var j = 0; j < pts.length; j += 2) {   // weiche Kurve durch die Mittelpunkte
          var nx = pts[(j + 2) % pts.length], ny = pts[(j + 3) % pts.length];
          ctx.quadraticCurveTo(pts[j], pts[j + 1], (pts[j] + nx) / 2, (pts[j + 1] + ny) / 2);
        }
        ctx.stroke();
      }
      return { x: cx, y: cy };
    }

    function draw(t) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var bg = ctx.createLinearGradient(0, 0, w, h);
      bg.addColorStop(0, "#0C2A2E");
      bg.addColorStop(1, "#123B40");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      var top = hill(t, 1180, 430, 16, 70, 40, 62, 38, 0.55, 1);
      hill(t, 1480, 900, 8, 90, 50, 70, 40, 0.25, 3);

      var glow = ctx.createRadialGradient(top.x, top.y, 0, top.x, top.y, 800 * s);
      glow.addColorStop(0, "rgba(" + AMBER + ", .20)");
      glow.addColorStop(1, "rgba(" + AMBER + ", 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Ortungs-Puls am Gipfel, alle 4 Sekunden
      var phase = (t % 4) / 4;
      if (t > 0) {
        ctx.strokeStyle = "rgba(" + AMBER + "," + (0.45 * (1 - phase)).toFixed(3) + ")";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(top.x, top.y, 8 + phase * 110 * s, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = "rgb(" + AMBER + ")";
      ctx.beginPath();
      ctx.arc(top.x, top.y, 7 * s * (1 + 0.12 * Math.sin(t * 2)), 0, Math.PI * 2);
      ctx.fill();
    }

    // Auf Touch-Geräten nur jedes zweite Bild zeichnen (~30 fps) – schont den Akku
    var coarse = window.matchMedia("(pointer: coarse)").matches, tick = 0;

    function frame(now) {
      if (!onScreen || document.hidden || calm.matches) { running = false; return; }
      if (coarse && (tick++ & 1)) { requestAnimationFrame(frame); return; }
      mouse.active += (mouse.target - mouse.active) * 0.06;
      mouse.x += (mouse.tx - mouse.x) * 0.12;
      mouse.y += (mouse.ty - mouse.y) * 0.12;
      draw((now - start) / 1000);
      requestAnimationFrame(frame);
    }
    function play() {
      if (running || !onScreen || document.hidden || calm.matches) return;
      running = true;
      requestAnimationFrame(frame);
    }

    main.addEventListener("pointermove", function (e) {
      if (e.pointerType === "touch") return;   // auf dem Handy nur die ruhige Bewegung
      var r = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - r.left;
      mouse.ty = e.clientY - r.top;
      if (mouse.target === 0) { mouse.x = mouse.tx; mouse.y = mouse.ty; }
      mouse.target = 1;
    });
    main.addEventListener("pointerleave", function () { mouse.target = 0; });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        onScreen = entries[0].isIntersecting;
        play();
      }).observe(main);
    }
    document.addEventListener("visibilitychange", play);
    calm.addEventListener("change", function () { resize(); play(); });
    // Größe folgt dem Element (auch wenn der Hero zwischen fixiert/normal wechselt)
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener("resize", resize);
    resize();
    play();
  })();

  // E-Mail-Adresse kopieren
  var copy = document.getElementById("copy-mail");
  var state = document.getElementById("copy-state");
  copy.addEventListener("click", function () {
    var text = copy.getAttribute("data-mail");
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { state.textContent = copy.getAttribute("data-copied") || "Kopiert."; },
        function () { state.textContent = text; });
    } else {
      state.textContent = text;
    }
  });

  // Ganzes Panel anklickbar: führt zur Leistungs-Unterseite (die Links im Panel funktionieren auch ohne JS)
  document.querySelectorAll(".panel[data-href]").forEach(function (panel) {
    panel.addEventListener("click", function (e) {
      if (e.target.closest("a, button")) return;
      window.location.href = panel.getAttribute("data-href");
    });
  });

  window.addEventListener("scroll", function () { onScrollHero(); onScrollHeader(); }, { passive: true });
  window.addEventListener("resize", function () { layoutHero(); onScrollHeader(); });
  window.addEventListener("load", layoutHero);
  calm.addEventListener("change", layoutHero);
  layoutHero();
  onScrollHeader();
})();

// Effekte: Überschriften, Staffelung, Fortschritt, Magnet-Buttons, Mauszeiger, Neigung, Parallaxe.
// Nur mit JS und ohne prefers-reduced-motion; Inhalte bleiben ohne JS unverändert sichtbar.
(function () {
  var root = document.documentElement;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
  root.classList.add("fx");
  var fine = window.matchMedia("(pointer: fine)").matches;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -12% 0px" });

  // Überschriften in Wörter teilen; Screenreader lesen weiter den ganzen Satz
  function split(el) {
    var text = el.textContent.trim();
    el.setAttribute("aria-label", text);
    el.removeAttribute("data-reveal");
    el.textContent = "";
    text.split(/\s+/).forEach(function (word, i) {
      var outer = document.createElement("span");
      outer.className = "split-word";
      outer.setAttribute("aria-hidden", "true");
      var inner = document.createElement("span");
      inner.textContent = word;
      inner.style.setProperty("--i", i);
      outer.appendChild(inner);
      el.appendChild(outer);
      el.appendChild(document.createTextNode(" "));
    });
    el.classList.add("is-split");
  }
  var heroTitle = document.querySelector(".hero__title");
  if (heroTitle) {
    split(heroTitle);
    setTimeout(function () { heroTitle.classList.add("is-in"); }, 950);   // nach dem Ladebildschirm
  }
  document.querySelectorAll(".sec__title, .footer__title").forEach(function (el) {
    el.removeAttribute("data-reveal");   // die Wörter steigen selbst auf
    split(el);
    io.observe(el);
  });

  // Listen nacheinander erscheinen lassen
  [".pillars > .pillar", ".steps__list > .step", ".faq__item", ".team__list > .person", ".panel"].forEach(function (sel) {
    if (sel === ".panel" && window.matchMedia("(min-width: 1024px)").matches) return;   // Desktop: Panels fahren ohnehin herein
    document.querySelectorAll(sel).forEach(function (el, i) {
      el.removeAttribute("data-reveal");
      el.setAttribute("data-stagger", "");
      el.style.setProperty("--i", sel === ".panel" ? 0 : i);
      io.observe(el);
    });
  });
  document.querySelectorAll(".menu__list li").forEach(function (li, i) { li.style.setProperty("--i", i); });

  // Fortschrittsbalken
  var bar = document.createElement("div");
  bar.className = "scroll-progress";
  bar.setAttribute("aria-hidden", "true");
  document.body.appendChild(bar);
  var feature = document.querySelector(".browser img, .browser__media");
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
      if (feature) {   // Parallaxe der Muster-Website-Vorschau
        var r = feature.parentNode.getBoundingClientRect();
        var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        feature.style.setProperty("--py", (p * -20).toFixed(1) + "px");
      }
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Welle beim Klick
  document.addEventListener("pointerdown", function (e) {
    var t = e.target.closest(".btn, .topbar__cta, .menu-btn, .btn-circle");
    if (!t) return;
    var r = t.getBoundingClientRect(), size = Math.max(r.width, r.height) * 2.2;
    var dot = document.createElement("span");
    dot.className = "fx-ripple";
    dot.style.width = dot.style.height = size + "px";
    dot.style.left = (e.clientX - r.left - size / 2) + "px";
    dot.style.top = (e.clientY - r.top - size / 2) + "px";
    if (getComputedStyle(t).position === "static") t.style.position = "relative";
    t.style.overflow = "hidden";
    t.appendChild(dot);
    setTimeout(function () { dot.remove(); }, 650);
  });

  if (!fine) return;   // Ab hier nur mit echter Maus

  // Magnet-Buttons
  document.querySelectorAll(".btn--accent, .topbar__cta, .btn-circle, .btn-arrow__icon").forEach(function (el) {
    el.classList.add("fx-magnet");
    el.addEventListener("pointermove", function (e) {
      var r = el.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) / r.width, y = (e.clientY - r.top - r.height / 2) / r.height;
      el.style.translate = (x * 10).toFixed(1) + "px " + (y * 8).toFixed(1) + "px";
    });
    el.addEventListener("pointerleave", function () { el.style.translate = ""; });
  });

  // Mausbewegung als --mx/--my (-0,5 … 0,5) für die Panels
  function track(sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.addEventListener("pointermove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
        el.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
      });
      el.addEventListener("pointerleave", function () { el.style.setProperty("--mx", 0); el.style.setProperty("--my", 0); });
    });
  }
  track(".panel");

  // Mauszeiger-Begleiter
  var ring = document.createElement("div");
  ring.className = "fx-cursor";
  ring.setAttribute("aria-hidden", "true");
  document.body.appendChild(ring);
  var cx = 0, cy = 0, tx = 0, ty = 0, moving = false;
  document.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse") return;
    tx = e.clientX; ty = e.clientY;
    if (!ring.classList.contains("is-visible")) { cx = tx; cy = ty; ring.classList.add("is-visible"); }
    ring.classList.toggle("is-hover", !!e.target.closest("a, button, .panel"));
    if (!moving) { moving = true; requestAnimationFrame(follow); }
  });
  document.addEventListener("pointerleave", function () { ring.classList.remove("is-visible"); });
  function follow() {
    cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
    ring.style.transform = "translate(" + cx.toFixed(1) + "px," + cy.toFixed(1) + "px)";
    if (Math.abs(tx - cx) > 0.3 || Math.abs(ty - cy) > 0.3) requestAnimationFrame(follow);
    else moving = false;
  }
})();
