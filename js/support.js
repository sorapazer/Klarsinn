/* Klarsinn – kostenloser Start, freiwillige Unterstützung (Spenden) */
(function () {
  const KS = window.KS, esc = KS.esc;

  /* ============ KONFIGURATION ============
     Trage hier ein, wie Menschen Klarsinn unterstützen können.
     Leere Felder werden auf der Seite nicht angezeigt. */
  KS.SUPPORT = {
    paypal: "",            // z. B. "https://paypal.me/deinname"  (Betrag wird automatisch angehängt)
    kofi: "",              // z. B. "https://ko-fi.com/deinname"
    stripe: "",            // z. B. Stripe Payment Link mit „Kunden wählen den Betrag“
    monthly: "",           // optional: Link für monatliche Unterstützung (Steady, Patreon, Stripe-Abo …)
    bank: { owner: "", iban: "", bic: "", reference: "Klarsinn" },
    amounts: [5, 10, 25, 50],
    /* Unterschriftszeile des Zertifikats (leer = nur „Programmleitung“) */
    issuer: { name: "", role: "Programmleitung" }
  };
  KS.SHOP = { issuer: KS.SUPPORT.issuer }; // Kompatibilität (Zertifikat)

  KS.licensed = () => true;
  const hasAny = () => { const S = KS.SUPPORT; return !!(S.paypal || S.kofi || S.stripe || S.monthly || (S.bank && S.bank.iban)); };
  const heart = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" fill="currentColor"/></svg>';
  KS.heart = heart;

  KS.FEATURES = {
    w12: ["12 Themen in 12 Wochen", "24 Lektionen mit Theorie und Praxis", "Täglich etwa 20 bis 30 Minuten", "Für einen konzentrierten Neustart"],
    m6: ["12 Themen in 26 Wochen", "60 Lektionen inklusive Masterclasses", "Lern- und Übungswochen im Wechsel", "Rückblick- und Abschlusswoche"],
    m12: ["Ein Thema pro Monat, 52 Wochen", "60 Lektionen, 36 Masterclasses", "Lernen, Üben, Vertiefen, Verankern", "4 Integrationswochen, Begleitung über ein Jahr"]
  };

  /* Variantenkarten (ohne Preise) */
  KS.variantCards = function (sel, compact) {
    return '<div class="prices' + (compact ? " compact" : "") + '" role="radiogroup" aria-label="Programmlänge wählen">' + Object.entries(KS.VARIANTS).map(([k, v]) =>
      '<button type="button" role="radio" aria-checked="' + (k === sel) + '" class="price' + (k === sel ? " on" : "") + '" data-pick="' + k + '">' + (k === "m6" ? '<span class="price-badge mid">Empfohlen</span>' : k === "m12" ? '<span class="price-badge">Am nachhaltigsten</span>' : '<span class="price-badge alt">Intensiv</span>') +
      '<span class="vtag">' + v.tag + '</span><b class="price-name">' + v.name + '</b><span class="price-amt num">0 €</span><span class="price-sub">' + v.per + " · kostenlos</span>" +
      (compact ? "" : '<ul class="price-feat">' + KS.FEATURES[k].map((f) => "<li>" + esc(f) + "</li>").join("") + "</ul>") + "</button>").join("") + "</div>";
  };
  KS.priceCards = KS.variantCards;

  /* Startseite (früher Kauf) */
  KS.viewCheckout = function (pre) {
    const p = KS.obj("profile"); const sel = pre || p.variant || "m6";
    const C = window.KS_CONFIG || {};
    const loginGate = KS.cloud && KS.cloud.enabled && !KS.cloud.user;
    return '<section class="checkout fade-in"><div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Kostenlos starten</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">' + (p.start ? "Programm anpassen" : "Wähle deinen Weg") + '</h2></div><span class="muted">Alle Inhalte sind vollständig kostenlos. Ohne Abo, ohne Werbung.</span></div>' +
      KS.variantCards(sel) +
      '<form class="panel stack checkout-form" id="buyForm" style="margin-top:18px"><div class="grid2"><div class="field"><label for="by-name">Wie dürfen wir dich nennen? <span class="faint">(optional)</span></label><input type="text" id="by-name" autocomplete="given-name" value="' + esc(p.name || "") + '"></div><div class="field"><label for="by-date">Startdatum</label><input type="date" id="by-date" value="' + esc(p.start || KS.today()) + '"></div></div>' +
      (loginGate ? '<div class="login-gate"><div><b>Mit Google-Konto speichern' + (C.requireLogin ? "" : " (optional)") + '</b><p class="faint" style="margin:2px 0 0;font-size:.85rem">Dann sind Fortschritt und Zertifikat auf allen Geräten verfügbar. Ohne Konto bleibt alles nur in diesem Browser.</p></div><button type="button" class="btn ghost" data-login>' + (KS.googleIcon || "") + " Mit Google anmelden</button></div>" : KS.cloud && KS.cloud.user ? '<div class="login-gate ok"><span>' + (KS.googleIcon || "") + " Angemeldet als <b>" + esc(KS.cloud.user.email || "") + "</b></span></div>" : "") +
      '<label class="row" style="gap:8px;font-size:.88rem;align-items:flex-start;flex-wrap:nowrap"><input type="checkbox" id="by-ok" style="margin-top:4px"> <span>Ich habe verstanden, dass Klarsinn ein Selbsthilfeprogramm ist und keine Diagnose oder Psychotherapie ersetzt. In einer Krise nutze ich die <a href="#hilfe">Notfallnummern</a>. Es gelten die <a href="nutzungsbedingungen.html" target="_blank">Nutzungsbedingungen</a>.</span></label>' +
      (KS.cloud && KS.cloud.user ? '<label class="row" style="gap:8px;font-size:.85rem;align-items:flex-start;flex-wrap:nowrap"><input type="checkbox" id="by-art9" style="margin-top:4px"> <span>Ich willige ein, dass meine Eingaben im Programm (z. B. Stimmung, Schlaf, Tagebuch), die Gesundheitsdaten enthalten können, in meinem Konto gespeichert werden (Art. 9 Abs. 2 lit. a DSGVO). Widerruf jederzeit unter „Meine Daten“. <a href="datenschutz.html" target="_blank">Datenschutz</a></span></label>' : "") +
      '<div class="row checkout-sum"><div><span class="faint" style="font-size:.85rem">Gewählt: <b data-sumname></b></span><div class="price-total num">0 €</div></div><button class="btn chunky big good" type="submit">' + (p.start ? "Änderungen speichern" : "Kostenlos starten") + '</button></div><div data-msg></div></form>' +
      '<p class="faint" style="font-size:.85rem;margin-top:12px">' + heart.replace("<svg", '<svg style="vertical-align:-3px;color:var(--p4)"') + ' Klarsinn finanziert sich über freiwillige Unterstützung. <a href="#unterstuetzen">Mehr erfahren</a></p></section>';
  };
  KS.bindCheckout = function () {
    const f = document.getElementById("buyForm"); if (!f) return;
    let sel = (document.querySelector("[data-pick].on") || { dataset: { pick: "m6" } }).dataset.pick;
    const upd = () => (f.querySelector("[data-sumname]").textContent = KS.VARIANTS[sel].name + " · " + KS.VARIANTS[sel].tag);
    document.querySelectorAll("[data-pick]").forEach((b) => (b.onclick = () => { sel = b.dataset.pick; document.querySelectorAll("[data-pick]").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); }); upd(); }));
    upd();
    f.onsubmit = (e) => {
      e.preventDefault();
      const msg = f.querySelector("[data-msg]"), C = window.KS_CONFIG || {};
      if (!f.querySelector("#by-ok").checked) { KS.toast("Bitte bestätige den Hinweis"); return; }
      if (KS.cloud && KS.cloud.enabled && C.requireLogin && !KS.cloud.user) { msg.innerHTML = '<div class="note">Bitte melde dich zuerst mit deinem Google-Konto an.</div>'; return; }
      const a9 = f.querySelector("#by-art9"); if (a9 && !a9.checked) { KS.toast("Bitte bestätige die Einwilligung zur Speicherung"); return; }
      const p = KS.obj("profile"), first = !p.start;
      p.name = f.querySelector("#by-name").value.trim(); p.start = f.querySelector("#by-date").value || KS.today(); p.variant = sel;
      if (a9) p.consentArt9 = new Date().toISOString();
      KS.save();
      if (first) { KS.confetti(); KS.toast("Willkommen bei Klarsinn!"); location.hash = "#woche-1"; } else { KS.toast("Gespeichert"); location.hash = "#start"; }
    };
  };

  /* Unterstützen-Seite */
  KS.viewSupport = function () {
    const S = KS.SUPPORT, b = S.bank || {};
    const amt = (base) => S.amounts.map((a) => '<a class="amt" href="' + esc(base.replace(/\/$/, "") + "/" + a + "EUR") + '" target="_blank" rel="noopener">' + a + " €</a>").join("");
    return '<section class="fade-in support"><div class="support-hero"><div class="sup-heart">' + heart.replace('width="18" height="18"', 'width="44" height="44"') + '</div><div class="eyebrow">Unterstützen</div><h2>Klarsinn ist kostenlos. Für alle.</h2><p class="lead">Psychische Gesundheit sollte keine Frage des Geldbeutels sein. Deshalb sind alle 60 Lektionen, Übungen, Prüfungen und das Zertifikat frei zugänglich, ohne Werbung und ohne Datenhandel. Wenn dir das Programm hilft, kannst du mit einem freiwilligen Beitrag dazu beitragen, dass es so bleibt und weiter wächst.</p></div>' +
      '<div class="grid3 support-why">' + [["Inhalte", "Neue Lektionen, Fallstudien und fachliche Prüfung der Inhalte."], ["Betrieb", "Domain, Server für das Konto, Sicherheit und Datenschutz."], ["Zugang für alle", "Damit niemand wegen Geld auf Unterstützung verzichten muss."]].map(([t, d]) => '<div class="panel"><h3>' + t + '</h3><p class="muted" style="margin:6px 0 0">' + d + "</p></div>").join("") + "</div>" +
      (hasAny() ? '<div class="sec-h"><h2>So kannst du unterstützen</h2></div><div class="support-ways">' +
        (S.paypal ? '<div class="panel stack"><h3>PayPal</h3><p class="muted" style="margin:0">Einmaliger Beitrag, Betrag frei wählbar.</p><div class="amts">' + amt(S.paypal) + '</div><a class="btn chunky" href="' + esc(S.paypal) + '" target="_blank" rel="noopener">Eigenen Betrag wählen</a></div>' : "") +
        (S.stripe ? '<div class="panel stack"><h3>Karte, Apple Pay, Google Pay</h3><p class="muted" style="margin:0">Sicher über Stripe, Betrag frei wählbar.</p><a class="btn chunky" href="' + esc(S.stripe) + '" target="_blank" rel="noopener">Jetzt unterstützen</a></div>' : "") +
        (S.kofi ? '<div class="panel stack"><h3>Ko-fi</h3><p class="muted" style="margin:0">Einmalig oder regelmäßig, ganz unkompliziert.</p><a class="btn chunky" href="' + esc(S.kofi) + '" target="_blank" rel="noopener">Zu Ko-fi</a></div>' : "") +
        (S.monthly ? '<div class="panel stack"><h3>Monatlich</h3><p class="muted" style="margin:0">Regelmäßige Unterstützung macht Planung möglich.</p><a class="btn chunky" href="' + esc(S.monthly) + '" target="_blank" rel="noopener">Monatlich unterstützen</a></div>' : "") +
        (b.iban ? '<div class="panel stack"><h3>Überweisung</h3><dl class="bank"><dt>Empfänger</dt><dd>' + esc(b.owner) + "</dd><dt>IBAN</dt><dd class=\"num\" style=\"user-select:all\">" + esc(b.iban) + "</dd>" + (b.bic ? "<dt>BIC</dt><dd>" + esc(b.bic) + "</dd>" : "") + "<dt>Verwendungszweck</dt><dd>" + esc(b.reference || "Klarsinn") + '</dd></dl><button type="button" class="btn ghost small" data-copyiban>IBAN kopieren</button><textarea data-fb hidden aria-label="IBAN"></textarea></div>' : "") + "</div>"
        : '<div class="note warn" style="margin-top:18px"><b>Die Unterstützungsmöglichkeiten werden gerade eingerichtet.</b> Schon jetzt hilfst du sehr, wenn du Klarsinn an Menschen weiterempfiehlst, denen es guttun könnte.</div>') +
      '<div class="sec-h"><h2>Auch ohne Geld eine große Hilfe</h2></div><div class="grid3">' + [["Weitersagen", "Teile Klarsinn mit Menschen, denen es guttun könnte."], ["Rückmeldung geben", "Was hat dir geholfen, was fehlt? Jede Rückmeldung macht das Programm besser."], ["Dranbleiben", "Der größte Gewinn ist, wenn das Programm dir wirklich hilft."]].map(([t, d]) => '<div class="panel"><h3>' + t + '</h3><p class="muted" style="margin:6px 0 0">' + d + "</p></div>").join("") + "</div>" +
      '<div class="row" style="margin-top:14px"><button type="button" class="btn ghost" data-share>Link zu Klarsinn teilen</button><textarea data-fb2 hidden aria-label="Link"></textarea></div>' +
      '<p class="faint" style="font-size:.8rem;margin-top:22px">Freiwillige Beiträge sind Schenkungen an den Betreiber (siehe <a href="impressum.html">Impressum</a>). Sie sind keine steuerlich absetzbaren Spenden, solange kein gemeinnütziger Träger dahintersteht, und kein Entgelt für Leistungen. Alle Inhalte bleiben unabhängig von einem Beitrag vollständig zugänglich.</p></section>';
  };
  KS.bindSupport = function () {
    const ci = document.querySelector("[data-copyiban]"); if (ci) ci.onclick = () => KS.copy(KS.SUPPORT.bank.iban, document.querySelector("[data-fb]"));
    const sh = document.querySelector("[data-share]"); if (sh) sh.onclick = () => { const url = location.href.split("#")[0]; if (navigator.share) navigator.share({ title: "Klarsinn", text: "Ein kostenloses, wissenschaftlich fundiertes Programm für mentale Gesundheit.", url }).catch(() => KS.copy(url, document.querySelector("[data-fb2]"))); else KS.copy(url, document.querySelector("[data-fb2]")); };
  };

  /* Dezenter Hinweis (z. B. nach Abschlüssen) */
  KS.supportNudge = function (text) {
    return '<a class="nudge" href="#unterstuetzen">' + heart + "<span>" + esc(text || "Klarsinn ist kostenlos. Wenn es dir hilft, kannst du es mit einem freiwilligen Beitrag unterstützen.") + "</span></a>";
  };
  KS.paywall = () => "";
})();
