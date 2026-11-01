/* Anfrage-Formular: Ein Klick auf „Kurz-Check anfragen“ / „Anfrage stellen“ öffnet ein Formular
   statt des E-Mail-Programms. Es sendet an kontakt.php (eigener Webserver, kein fremder Dienst).
   Ohne JavaScript bleiben die Links normale mailto-Links – der Kontaktweg funktioniert immer.
   Klappt das Senden nicht, öffnet sich wie bisher das E-Mail-Programm mit dem ursprünglichen Link. */
(function () {
  "use strict";
  if (!window.HTMLDialogElement || !window.fetch || !window.FormData) return;

  var script = document.currentScript;
  var base = script ? new URL("../", script.src) : new URL("./", location.href);
  var en = document.documentElement.lang === "en";
  var T = en ? {
    title: "Request your free quick check", lead: "Tell us briefly who you are. We will reply by email.",
    name: "Your name", email: "Email for our reply", betrieb: "Business (optional)", tel: "Phone (optional)",
    web: "Website (optional)", msg: "What is it about? (optional)", msgPh: "e.g. We want more enquiries via Google.",
    consent: 'I agree that Altun &amp; Riechert may use my details to answer my request. Details in the <a href="' + base + 'datenschutz.html" target="_blank" rel="noopener">privacy policy</a> (German).',
    send: "Send request", sending: "Sending…", close: "Close",
    done: "Thank you! Your request has arrived. We have sent you a confirmation by email and will get back to you shortly.",
    errName: "Please enter your name.", errMail: "Please enter a valid email address so we can reply.",
    errOk: "Please confirm that we may use your details to answer your request.",
    fallback: "Sending did not work. Your email program is opening instead.", topic: "Topic"
  } : {
    title: "Kostenlosen Kurz-Check anfragen", lead: "Sag uns kurz, wer du bist. Wir antworten per E-Mail.",
    name: "Dein Name", email: "E-Mail für unsere Antwort", betrieb: "Betrieb (optional)", tel: "Telefon (optional)",
    web: "Website (optional)", msg: "Worum geht es? (optional)", msgPh: "z. B. Wir wollen mehr Anfragen über Google.",
    consent: 'Ich bin einverstanden, dass Altun &amp; Riechert meine Angaben nutzt, um meine Anfrage zu beantworten. Details in der <a href="' + base + 'datenschutz.html" target="_blank" rel="noopener">Datenschutzerklärung</a>.',
    send: "Anfrage senden", sending: "Wird gesendet …", close: "Schließen",
    done: "Danke! Deine Anfrage ist bei uns angekommen. Du bekommst gleich eine Bestätigung per E-Mail, und wir melden uns zeitnah bei dir.",
    errName: "Bitte gib deinen Namen an.", errMail: "Bitte gib eine gültige E-Mail-Adresse an, damit wir antworten können.",
    errOk: "Bitte bestätige, dass wir deine Angaben für die Antwort nutzen dürfen.",
    fallback: "Das Senden hat nicht geklappt. Dein E-Mail-Programm öffnet sich stattdessen.", topic: "Thema"
  };

  var dlg = document.createElement("dialog");
  dlg.className = "anfrage";
  dlg.setAttribute("aria-labelledby", "anfrage-title");
  dlg.innerHTML =
    '<form class="anfrage__form" novalidate>' +
      '<button class="anfrage__close" type="button" aria-label="' + T.close + '"><svg viewBox="0 0 19 19" width="19" height="19" aria-hidden="true"><path d="M4 4l11 11M15 4L4 15" stroke="currentColor" stroke-width="1.6"/></svg></button>' +
      '<h2 class="anfrage__title" id="anfrage-title">' + T.title + '</h2>' +
      '<p class="anfrage__lead">' + T.lead + '</p>' +
      '<p class="anfrage__topic" hidden></p>' +
      '<div class="anfrage__grid">' +
        '<label class="anfrage__field"><span>' + T.name + ' *</span><input name="name" autocomplete="name" required maxlength="120"></label>' +
        '<label class="anfrage__field"><span>' + T.email + ' *</span><input name="email" type="email" autocomplete="email" required maxlength="200"></label>' +
        '<label class="anfrage__field"><span>' + T.betrieb + '</span><input name="betrieb" autocomplete="organization" maxlength="150"></label>' +
        '<label class="anfrage__field"><span>' + T.tel + '</span><input name="telefon" type="tel" autocomplete="tel" maxlength="60"></label>' +
        '<label class="anfrage__field anfrage__full"><span>' + T.web + '</span><input name="website" inputmode="url" maxlength="200"></label>' +
        '<label class="anfrage__field anfrage__full"><span>' + T.msg + '</span><textarea name="nachricht" rows="3" maxlength="3000" placeholder="' + T.msgPh + '"></textarea></label>' +
      '</div>' +
      '<div class="anfrage__hp" aria-hidden="true"><label>Bitte leer lassen<input name="homepage" tabindex="-1" autocomplete="off"></label></div>' +
      '<label class="anfrage__consent"><input type="checkbox" name="ok"><span>' + T.consent + '</span></label>' +
      '<p class="anfrage__state" role="status" aria-live="polite"></p>' +
      '<button class="btn btn--accent anfrage__send" type="submit">' + T.send + '</button>' +
    '</form>';
  document.body.appendChild(dlg);

  var form = dlg.querySelector("form"), state = dlg.querySelector(".anfrage__state");
  var topicEl = dlg.querySelector(".anfrage__topic"), sendBtn = dlg.querySelector(".anfrage__send");
  var openedAt = 0, bereich = "", mailtoHref = "", opener = null;

  function topicFrom(href) {
    var m = /[?&]subject=([^&]*)/.exec(href);
    if (!m) return "";
    var s = decodeURIComponent(m[1].replace(/\+/g, " "));
    return s.replace(/^(Kurz-Check|Anfrage|Request|Quick check)\s*:\s*/i, "").replace(/^Kurz-Check$/i, "").trim();
  }
  function reset() {
    form.reset(); state.textContent = ""; state.className = "anfrage__state";
    form.classList.remove("is-done"); sendBtn.disabled = false; sendBtn.textContent = T.send;
  }
  function open(link) {
    reset();
    opener = link; mailtoHref = link.getAttribute("href"); bereich = topicFrom(mailtoHref);
    topicEl.hidden = !bereich; topicEl.textContent = bereich ? T.topic + ": " + bereich : "";
    openedAt = Date.now();
    dlg.showModal();
    form.querySelector('[name="name"]').focus();
  }
  function close() { dlg.close(); }
  dlg.addEventListener("close", function () { if (opener && opener.focus) opener.focus(); });
  dlg.querySelector(".anfrage__close").addEventListener("click", close);
  dlg.addEventListener("click", function (e) { if (e.target === dlg) close(); });   // Klick auf den Hintergrund

  // Alle Anfrage-Buttons (mailto mit Betreff), aber nicht die reine E-Mail-Adresse als Text.
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="mailto:altunriechert@gmail.com?"]');
    if (!a || /@/.test(a.textContent) || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();   // Panels öffnen sonst ihre Leistungsseite
    open(a);
  }, true);

  function fail(msg) { state.textContent = msg; state.className = "anfrage__state is-err"; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var v = function (n) { return form.elements[n].value.trim(); };
    if (!v("name")) return fail(T.errName);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) return fail(T.errMail);
    if (!form.elements.ok.checked) return fail(T.errOk);
    var data = new FormData(form);
    data.delete("ok");
    data.append("einwilligung", "1");
    data.append("bereich", bereich);
    data.append("sprache", en ? "en" : "de");
    data.append("t", String(openedAt));
    sendBtn.disabled = true; sendBtn.textContent = T.sending; state.textContent = ""; state.className = "anfrage__state";
    fetch(new URL("kontakt.php", base), { method: "POST", body: data, headers: { Accept: "application/json" } })
      .then(function (r) { return r.json().catch(function () { return { ok: false, fallback: true }; }).then(function (j) { return { status: r.status, body: j }; }); })
      .then(function (res) {
        if (res.body && res.body.ok) {
          form.classList.add("is-done");
          state.textContent = T.done; state.className = "anfrage__state is-ok";
          sendBtn.textContent = T.close; sendBtn.disabled = false;
          sendBtn.addEventListener("click", function once(ev) { ev.preventDefault(); sendBtn.removeEventListener("click", once); close(); });
          return;
        }
        sendBtn.disabled = false; sendBtn.textContent = T.send;
        if (res.status === 422 || res.status === 429) return fail(res.body.fehler || T.errMail);
        fail(T.fallback); setTimeout(function () { location.href = mailtoHref; }, 900);
      })
      .catch(function () { sendBtn.disabled = false; sendBtn.textContent = T.send; fail(T.fallback); setTimeout(function () { location.href = mailtoHref; }, 900); });
  });
})();
