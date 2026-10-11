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
