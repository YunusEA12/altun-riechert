(function () {
  var root = document.documentElement;
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

  window.addEventListener("scroll", function () { onScrollHero(); onScrollHeader(); }, { passive: true });
  window.addEventListener("resize", function () { layoutHero(); onScrollHeader(); });
  window.addEventListener("load", layoutHero);
  calm.addEventListener("change", layoutHero);
  layoutHero();
  onScrollHeader();
})();
