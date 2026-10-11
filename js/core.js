/* Klarsinn – Kern: Speicher, Hilfsfunktionen, Zitate, Diagramme */
(function () {
  const KS = (window.KS = window.KS || {});
  const KEY = "klarsinn.v1";

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; }
  }
  KS.data = load();
  KS.storageOk = (function () {
    try { localStorage.setItem(KEY + ".t", "1"); localStorage.removeItem(KEY + ".t"); return true; } catch (e) { return false; }
  })();
  KS.save = function () {
    try { localStorage.setItem(KEY, JSON.stringify(KS.data)); } catch (e) { /* Speicher nicht verfügbar */ }
  };
  KS.replaceData = function (obj) { KS.data = obj || {}; KS.save(); };
  KS.list = function (name) { if (!Array.isArray(KS.data[name])) KS.data[name] = []; return KS.data[name]; };
  KS.obj = function (name) { if (!KS.data[name] || typeof KS.data[name] !== "object" || Array.isArray(KS.data[name])) KS.data[name] = {}; return KS.data[name]; };
  KS.uid = function () { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); };
  KS.add = function (name, obj) {
    const e = Object.assign({ id: KS.uid(), at: new Date().toISOString() }, obj);
    KS.list(name).unshift(e); KS.save(); return e;
  };
  KS.remove = function (name, id) { KS.data[name] = KS.list(name).filter((e) => e.id !== id); KS.save(); };

  /* Datum */
  KS.dkey = function (d) { d = d || new Date(); const z = (n) => String(n).padStart(2, "0"); return d.getFullYear() + "-" + z(d.getMonth() + 1) + "-" + z(d.getDate()); };
  KS.today = function () { return KS.dkey(new Date()); };
  KS.parseD = function (s) { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
  const MON = ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."];
  KS.fmtD = function (s) { const d = s.length > 10 ? new Date(s) : KS.parseD(s); return d.getDate() + ". " + MON[d.getMonth()]; };
  KS.fmtDT = function (iso) { const d = new Date(iso); return KS.fmtD(KS.dkey(d)) + ", " + String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); };
  KS.daysBetween = function (a, b) { return Math.round((KS.parseD(b) - KS.parseD(a)) / 86400000); };

  /* Text */
  KS.esc = function (s) { return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); };
  KS.nl2br = function (s) { return KS.esc(s).replace(/\n/g, "<br>"); };

  /* Zitate: [[key]] oder [[a]][[b]] → (Autor, Jahr; Autor, Jahr) */
  KS.cite = function (html) {
    return String(html || "").replace(/(\[\[[a-z0-9]+\]\][\s,;]*)+/g, function (m) {
      const keys = [...m.matchAll(/\[\[([a-z0-9]+)\]\]/g)].map((x) => x[1]);
      const trail = /\s$/.test(m) ? " " : "";
      const parts = keys.map((k) => {
        const r = (window.KS_REFS || {})[k];
        return '<button type="button" class="cite" data-ref="' + k + '">' + KS.esc(r ? r.c : k) + "</button>";
      });
      return "(" + parts.join("; ") + ")" + trail;
    });
  };
  KS.refLink = function (key) {
    const r = window.KS_REFS[key]; if (!r) return "";
    const plain = r.r.replace(/<[^>]+>/g, "");
    const title = plain.replace(/^.*?\(\d{4}[a-z]?\)\.\s*/, "").split(/\.\s/)[0];
    if (r.pmid) return '<a href="https://pubmed.ncbi.nlm.nih.gov/' + r.pmid + '/" target="_blank" rel="noopener">PubMed</a>';
    return '<a href="https://scholar.google.com/scholar?q=' + encodeURIComponent(title) + '" target="_blank" rel="noopener">Google Scholar</a>';
  };

  /* Toast */
  let tt;
  KS.toast = function (msg) {
    const t = document.getElementById("toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show"); clearTimeout(tt);
    tt = setTimeout(() => t.classList.remove("show"), 2200);
  };

  /* Kopieren */
  KS.copy = function (text, fallbackEl) {
    const done = () => KS.toast("In die Zwischenablage kopiert");
    const fail = () => {
      if (fallbackEl) { fallbackEl.hidden = false; fallbackEl.value = text; fallbackEl.select(); }
      KS.toast("Text markiert. Mit Strg+C bzw. ⌘+C kopieren");
    };
    try { navigator.clipboard.writeText(text).then(done, fail); } catch (e) { fail(); }
  };

  /* Klang: weiche Klangschale per WebAudio */
  let actx;
  KS.bell = function (soft) {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const now = actx.currentTime;
      [[432, 1], [864, 0.35], [1296, 0.15]].forEach(([f, g]) => {
        const o = actx.createOscillator(); const v = actx.createGain();
        o.type = "sine"; o.frequency.value = soft ? f * 0.75 : f;
        v.gain.setValueAtTime(0, now); v.gain.linearRampToValueAtTime((soft ? 0.08 : 0.22) * g, now + 0.02);
        v.gain.exponentialRampToValueAtTime(0.0001, now + (soft ? 1.2 : 5));
        o.connect(v).connect(actx.destination); o.start(now); o.stop(now + (soft ? 1.3 : 5.2));
      });
    } catch (e) { /* kein Audio */ }
  };

  /* Bildschirm wach halten (optional) */
  let wl = null;
  KS.wake = async function (on) {
    try {
      if (on && navigator.wakeLock) wl = await navigator.wakeLock.request("screen");
      else if (!on && wl) { await wl.release(); wl = null; }
    } catch (e) { wl = null; }
  };

  /* Liniendiagramm (SVG). series: [{values:[{x:dateKey,y}], color, label}] */
  KS.lineChart = function (series, opt) {
    opt = Object.assign({ w: 640, h: 220, min: 0, max: 10, ticks: [0, 5, 10], days: 28 }, opt || {});
    const pad = { l: 30, r: 14, t: 12, b: 26 };
    const end = KS.parseD(opt.end || KS.today());
    const start = new Date(end); start.setDate(end.getDate() - (opt.days - 1));
    const X = (dk) => pad.l + ((KS.parseD(dk) - start) / 86400000) / Math.max(1, opt.days - 1) * (opt.w - pad.l - pad.r);
    const Y = (v) => pad.t + (1 - (v - opt.min) / (opt.max - opt.min)) * (opt.h - pad.t - pad.b);
    let s = '<svg class="chart" viewBox="0 0 ' + opt.w + " " + opt.h + '" role="img" aria-label="' + KS.esc(opt.label || "Verlauf") + '"><g class="grid">';
    opt.ticks.forEach((t) => { s += '<line x1="' + pad.l + '" x2="' + (opt.w - pad.r) + '" y1="' + Y(t) + '" y2="' + Y(t) + '"/><text x="' + (pad.l - 8) + '" y="' + (Y(t) + 4) + '" text-anchor="end">' + t + "</text>"; });
    s += "</g>";
    const lab = [0, Math.floor((opt.days - 1) / 2), opt.days - 1];
    lab.forEach((i) => { const d = new Date(start); d.setDate(start.getDate() + i); const k = KS.dkey(d); s += '<text x="' + X(k) + '" y="' + (opt.h - 6) + '" text-anchor="' + (i === 0 ? "start" : i === opt.days - 1 ? "end" : "middle") + '">' + KS.fmtD(k) + "</text>"; });
    series.forEach((se) => {
      const pts = se.values.filter((p) => KS.parseD(p.x) >= start && KS.parseD(p.x) <= end).sort((a, b) => (a.x < b.x ? -1 : 1));
      if (!pts.length) return;
      const d = pts.map((p, i) => (i ? "L" : "M") + X(p.x).toFixed(1) + " " + Y(p.y).toFixed(1)).join(" ");
      if (se.area && pts.length > 1) {
        s += '<path d="' + d + " L" + X(pts[pts.length - 1].x).toFixed(1) + " " + Y(opt.min) + " L" + X(pts[0].x).toFixed(1) + " " + Y(opt.min) + ' Z" fill="' + se.color + '" opacity=".12"/>';
      }
      s += '<path d="' + d + '" fill="none" stroke="' + se.color + '" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"' + (se.dash ? ' stroke-dasharray="5 5"' : "") + "/>";
      pts.forEach((p, i) => { const last = i === pts.length - 1; s += '<circle cx="' + X(p.x).toFixed(1) + '" cy="' + Y(p.y).toFixed(1) + '" r="' + (last ? 5 : 3) + '" fill="' + (last ? se.color : "var(--surface)") + '" stroke="' + se.color + '" stroke-width="2"><title>' + KS.fmtD(p.x) + ": " + p.y + "</title></circle>"; });
    });
    return s + "</svg>";
  };

  /* Fortschrittsring */
  KS.ring = function (pct, label) {
    const r = 46, c = 2 * Math.PI * r, off = c * (1 - Math.max(0, Math.min(1, pct)));
    return '<svg class="ring" viewBox="0 0 110 110" role="img" aria-label="' + Math.round(pct * 100) + ' Prozent"><circle cx="55" cy="55" r="' + r + '" fill="none" stroke="var(--surface-2)" stroke-width="9"/><circle cx="55" cy="55" r="' + r + '" fill="none" stroke="var(--glow)" stroke-width="9" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + off.toFixed(1) + '" transform="rotate(-90 55 55)"/><text x="55" y="' + (label ? 56 : 61) + '" text-anchor="middle" font-size="24">' + Math.round(pct * 100) + '%</text>' + (label ? '<text x="55" y="74" text-anchor="middle" font-size="10" font-weight="600" style="fill:var(--ink-faint)">' + label + "</text>" : "") + "</svg>";
  };

  KS.check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
})();
