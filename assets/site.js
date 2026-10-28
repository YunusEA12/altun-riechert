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

  // Videos in den Panels: bei reduzierter Bewegung pausieren
  // Videos laden erst, wenn ihr Panel sichtbar wird (preload="none"), und laufen nur dort –
  // spart Datenvolumen auf dem Handy. Ohne JS bleibt das Vorschaubild stehen.
  var panelVideos = document.querySelectorAll(".panel__image video");
  function setVideo(v, on) {
    if (on && !calm.matches) { v.play().catch(function () {}); } else { v.pause(); }
  }
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

  // Panel Detail-Modal („Draufdrücken, dann kommt Beschreibung“)
  var modal = document.getElementById("panel-modal");
  var modalContent = document.getElementById("modal-content");
  var modalClose = document.getElementById("modal-close");

  var lastTrigger = null;   // Fokus kehrt nach dem Schließen hierher zurück

  function openPanelModal(panelId) {
    lastTrigger = document.activeElement;
    var tmpl = document.getElementById("tmpl-panel-" + panelId);
    if (!tmpl || !modal || !modalContent) return;
    modalContent.textContent = "";
    modalContent.appendChild(tmpl.content.cloneNode(true));
    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "");
    }
    root.style.overflow = "hidden";
    bindModalInteractive(panelId);
    if (modalClose) modalClose.focus();
  }

  function closePanelModal() {
    if (!modal) return;
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
    root.style.overflow = "";
  }

  if (modalClose) {
    modalClose.addEventListener("click", closePanelModal);
  }
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closePanelModal();
    });
    modal.addEventListener("close", function () {
      root.style.overflow = "";
      if (lastTrigger && typeof lastTrigger.focus === "function") lastTrigger.focus();
    });
  }

  // Interaktive Klicks auf Panels und Buttons
  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-open-panel]");
    if (trigger) {
      e.preventDefault();
      openPanelModal(trigger.getAttribute("data-open-panel"));
      return;
    }
    var panel = e.target.closest(".panel[data-panel]");
    if (panel && !e.target.closest("a") && !e.target.closest("button")) {
      openPanelModal(panel.getAttribute("data-panel"));
    }
  });

  // Interaktive Demos innerhalb des Modals
  function bindModalInteractive(panelId) {
    if (!modalContent) return;

    // 1. KI-Assistent Mini-Chat Demo
    var chatMsgs = modalContent.querySelector("#modal-chat-msgs");
    var chips = modalContent.querySelectorAll(".chat-chip");
    if (chatMsgs && chips.length) {
      // Vorbereitete Beispiel-Antworten eines erfundenen Betriebs (keine echte KI-Anbindung)
      var botAnswers = root.lang === "en" ? {
        termin: "Sure! We still have free slots for an on-site visit next week. Which day suits you best? Just leave your name and phone number.",
        angebot: "You usually receive a clear fixed-price quote within 24 to 48 hours after the site visit – no hidden costs.",
        notfall: "Yes! For urgent emergencies you can call us directly, or leave your contact details here and we'll get back to you as soon as possible."
      } : {
        termin: "Gerne! Für eine Besichtigung vor Ort haben wir nächste Woche noch freie Termine. Welcher Wochentag passt dir am besten? Hinterlasse mir einfach kurz deinen Namen und deine Telefonnummer.",
        angebot: "In der Regel erhältst du ein transparentes Festpreis-Angebot innerhalb von 24 bis 48 Stunden nach dem Besichtigungstermin – ohne versteckte Kosten.",
        notfall: "Ja! Bei dringenden Notfällen erreichst du uns direkt unter der Telefonnummer oder hinterlässt mir hier kurz deine Kontaktdaten – wir melden uns umgehend."
      };
      chips.forEach(function (btn) {
        btn.addEventListener("click", function () {
          var qKey = btn.getAttribute("data-q");
          var answer = botAnswers[qKey];
          if (!answer) return;

          var uMsg = document.createElement("div");
          uMsg.className = "chat-msg chat-msg--user";
          uMsg.textContent = btn.textContent.replace(/^[„"]|[“"]$/g, "");
          chatMsgs.appendChild(uMsg);

          var typing = document.createElement("div");
          typing.className = "chat-msg chat-msg--bot chat-typing";
          for (var i = 0; i < 3; i++) {
            typing.appendChild(document.createElement("span"));
          }
          chatMsgs.appendChild(typing);
          chatMsgs.scrollTop = chatMsgs.scrollHeight;

          setTimeout(function () {
            if (typing.parentNode) typing.parentNode.removeChild(typing);
            var bMsg = document.createElement("div");
            bMsg.className = "chat-msg chat-msg--bot";
            bMsg.textContent = answer;
            chatMsgs.appendChild(bMsg);
            chatMsgs.scrollTop = chatMsgs.scrollHeight;
          }, 600);
        });
      });
    }

    // 2. Sichtbar Vorher/Nachher Umschalter
    var compareTabs = modalContent.querySelectorAll(".compare-tab");
    var compareViews = modalContent.querySelectorAll(".compare-view");
    if (compareTabs.length && compareViews.length) {
      compareTabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var target = tab.getAttribute("data-target");
          compareTabs.forEach(function (t) { t.classList.toggle("is-active", t === tab); });
          compareViews.forEach(function (v) {
            v.hidden = (v.getAttribute("data-view") !== target);
          });
        });
      });
    }
  }

  window.addEventListener("scroll", function () { onScrollHero(); onScrollHeader(); }, { passive: true });
  window.addEventListener("resize", function () { layoutHero(); onScrollHeader(); });
  window.addEventListener("load", layoutHero);
  calm.addEventListener("change", layoutHero);
  layoutHero();
  onScrollHeader();
})();
