/* Altun & Riechert – Leistungs-Unterseiten. Alles hier ist Zusatz: Inhalte und Kontaktweg
   funktionieren auch ohne dieses Skript. */
(function () {
  var root = document.documentElement;
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

  // Header: Logo blendet beim Scrollen aus
  function onScroll() { topbar.classList.toggle("is-compact", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Einblenden beim Scrollen
  if ("IntersectionObserver" in window && !calm.matches) {
    root.classList.add("reveal-ready");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll("[data-reveal]").forEach(function (el) { io.observe(el); });
  }

  // Hero-Video bei reduzierter Bewegung anhalten
  var video = document.querySelector(".shero__frame video");
  if (video) {
    var sync = function () { if (calm.matches) video.pause(); else video.play().catch(function () {}); };
    sync();
    calm.addEventListener("change", sync);
  }

  // Sichtbar: Mit/ohne Profil
  var tabs = document.querySelectorAll(".cmp__tab");
  var views = document.querySelectorAll(".cmp__list");
  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.getAttribute("data-target");
      tabs.forEach(function (t) {
        t.classList.toggle("is-active", t === tab);
        t.setAttribute("aria-selected", String(t === tab));
      });
      views.forEach(function (v) { v.hidden = v.getAttribute("data-view") !== target; });
    });
  });

  // KI-Assistent: Beispiel-Dialog mit festen Antworten
  var msgs = document.getElementById("chat-msgs");
  if (msgs) {
    document.querySelectorAll(".chat-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var user = document.createElement("div");
        user.className = "msg msg--user";
        user.textContent = chip.textContent;
        msgs.appendChild(user);
        var typing = document.createElement("div");
        typing.className = "msg msg--bot typing";
        for (var i = 0; i < 3; i++) typing.appendChild(document.createElement("span"));
        msgs.appendChild(typing);
        msgs.scrollTop = msgs.scrollHeight;
        setTimeout(function () {
          typing.remove();
          var bot = document.createElement("div");
          bot.className = "msg msg--bot";
          bot.textContent = chip.getAttribute("data-a");
          msgs.appendChild(bot);
          msgs.scrollTop = msgs.scrollHeight;
        }, calm.matches ? 0 : 700);
      });
    });
  }
})();
