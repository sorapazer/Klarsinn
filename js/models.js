/* Klarsinn – interaktive Modell-Diagramme (Kreislauf, Abfolge, Matrix, Ebenen, Kontinuum) und Lektionsbibliothek */
(function () {
  const KS = window.KS, esc = KS.esc;

  KS.modelDiagram = function (el, m) {
    if (!m || !m.nodes || !m.nodes.length) { el.innerHTML = ""; return; }
    const N = m.nodes; let fig = "";
    if (m.type === "cycle") {
      const n = N.length, cx = 200, cy = 150, R = 105;
      const P = N.map((_, i) => { const a = -Math.PI / 2 + i * 2 * Math.PI / n; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R]; });
      fig = '<svg viewBox="0 0 400 300" class="xp-svg md-cycle" role="img" aria-label="' + esc(m.title) + '"><defs><marker id="mda" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--ph,var(--accent))"/></marker></defs><circle cx="200" cy="150" r="105" fill="none" stroke="var(--line)" stroke-width="1.5" stroke-dasharray="3 5"/>' +
        P.map((p, i) => { const q = P[(i + 1) % n]; const a1 = Math.atan2(p[1] - cy, p[0] - cx) + 0.32, a2 = Math.atan2(q[1] - cy, q[0] - cx) - 0.32; const s = [cx + Math.cos(a1) * R, cy + Math.sin(a1) * R], e = [cx + Math.cos(a2) * R, cy + Math.sin(a2) * R]; return '<path d="M' + s[0].toFixed(1) + " " + s[1].toFixed(1) + " A" + R + " " + R + " 0 0 1 " + e[0].toFixed(1) + " " + e[1].toFixed(1) + '" fill="none" stroke="var(--ph,var(--accent))" stroke-width="2.5" marker-end="url(#mda)" class="xp-flow"/>'; }).join("") +
        P.map((p, i) => '<g class="md-node" data-i="' + i + '" tabindex="0" role="button"><rect x="' + (p[0] - 62) + '" y="' + (p[1] - 18) + '" width="124" height="36" rx="18"/><text x="' + p[0] + '" y="' + (p[1] + 4.5) + '" text-anchor="middle">' + esc(N[i].label) + "</text></g>").join("") +
        '<text x="200" y="154" text-anchor="middle" class="xp-ax" style="font-weight:800">' + esc((m.center || "").slice(0, 24)) + "</text></svg>";
    } else if (m.type === "matrix") {
      const ax = m.axes || { x: ["", ""], y: ["", ""] };
      fig = '<div class="md-matrix"><span class="md-y">' + esc(ax.y[1] || "") + '</span><div class="md-grid">' + N.slice(0, 4).map((n, i) => '<button type="button" class="md-node md-cell" data-i="' + i + '">' + esc(n.label) + "</button>").join("") + '</div><span class="md-y bottom">' + esc(ax.y[0] || "") + '</span><div class="md-x"><span>' + esc(ax.x[0] || "") + "</span><span>" + esc(ax.x[1] || "") + "</span></div></div>";
    } else if (m.type === "layers") {
      fig = '<div class="md-layers">' + N.map((n, i) => '<button type="button" class="md-node md-layer" data-i="' + i + '" style="width:' + (55 + i * (45 / Math.max(1, N.length - 1))) + '%">' + esc(n.label) + "</button>").join("") + "</div>";
    } else if (m.type === "scale") {
      fig = '<div class="md-scale"><div class="md-track"></div><div class="md-points" style="grid-template-columns:repeat(' + N.length + ',minmax(0,1fr))">' + N.map((n, i) => '<button type="button" class="md-node md-pt" data-i="' + i + '"><i></i><span>' + esc(n.label) + "</span></button>").join("") + "</div></div>";
    } else {
      fig = '<div class="md-steps">' + N.map((n, i) => '<button type="button" class="md-node md-step" data-i="' + i + '"><b class="num">' + (i + 1) + "</b><span>" + esc(n.label) + "</span></button>" + (i < N.length - 1 ? '<span class="md-arrow" aria-hidden="true">→</span>' : "")).join("") + "</div>";
    }
    el.innerHTML = '<div class="xp md"><div class="xp-h"><span class="xp-badge">Modell</span><h4>' + esc(m.title) + '</h4><span class="faint" style="font-size:.85rem">' + esc(m.caption || "Tippe auf die Elemente") + '</span></div><div class="md-fig">' + fig + '</div><div class="md-detail" data-detail></div><div class="row"><button type="button" class="btn small ghost" data-prev>←</button><span class="faint num" data-pos style="font-size:.85rem"></span><button type="button" class="btn small ghost" data-nextn>→</button></div></div>';
    let cur = 0;
    const sel = (i) => {
      cur = (i + N.length) % N.length;
      el.querySelectorAll(".md-node").forEach((x) => x.classList.toggle("on", Number(x.dataset.i) === cur));
      el.querySelector("[data-detail]").innerHTML = '<div class="fade-in"><b>' + esc(N[cur].label) + "</b><p>" + KS.cite(esc(N[cur].text)) + "</p></div>";
      el.querySelector("[data-pos]").textContent = cur + 1 + " / " + N.length;
    };
    el.querySelectorAll(".md-node").forEach((x) => { x.addEventListener("click", () => sel(Number(x.dataset.i))); x.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); sel(Number(x.dataset.i)); } }); });
    el.querySelector("[data-prev]").onclick = () => sel(cur - 1);
    el.querySelector("[data-nextn]").onclick = () => sel(cur + 1);
    sel(0);
  };

  /* Masterclass-Quelle für den Lektions-Player */
  KS.masterAll = () => (window.KS_MASTER || []).slice().sort((a, b) => a.n - b.n);
  KS.masterSource = function (id) {
    for (const m of KS.masterAll()) for (const l of m.lessons) if (l.id === id) {
      const w = (window.KS_WEEKS || []).find((x) => x.n === m.n) || { phase: 1 };
      return Object.assign({ n: m.n, phase: w.phase, master: true, myth: null, takeaways: null }, l);
    }
    return null;
  };

  /* Alle Lektionen eines Moduls */
  KS.lessonsOf = function (n) {
    const w = (window.KS_WEEKS || []).find((x) => x.n === n); const out = [];
    if (w) out.push({ key: String(n), mode: "", kind: "Grundlagen", title: w.title, sub: w.subtitle, cards: KS.buildCards(w).length });
    const d = KS.deepSource && KS.deepSource(n); if (d) out.push({ key: n + "d", mode: "deep", kind: "Vertiefung", title: "Vertiefung: " + w.title, sub: d.input.map((c) => c.h).slice(0, 2).join(" · "), cards: KS.buildCards(d, "deep").length });
    const M = KS.masterAll().find((m) => m.n === n);
    if (M) M.lessons.forEach((l) => out.push({ key: l.id, mode: "master", kind: "Masterclass", title: l.title, sub: l.theory ? l.theory + " · " + l.subtitle : l.subtitle, cards: KS.buildCards(KS.masterSource(l.id), "master").length }));
    return out;
  };
  KS.lessonStatus = function (key) { const L = KS.obj("lessons")[key]; return !L ? "neu" : L.done ? "fertig" : (L.pos || 0) > 0 ? "begonnen" : "neu"; };
  KS.lessonTile = function (n, l, locked) {
    const st = KS.lessonStatus(l.key);
    return '<button type="button" class="ltile ' + st + (locked ? " locked" : "") + '" ' + (locked ? 'data-go="kaufen"' : 'data-lesson="' + n + '" data-mode="' + l.mode + '" data-key="' + l.key + '"') + '><span class="ltile-kind">' + l.kind + "</span><b>" + esc(l.title) + '</b><span class="ltile-sub">' + esc(l.sub || "") + '</span><span class="ltile-foot"><span class="num">' + l.cards + " Karten</span>" + (locked ? '<span class="chip">Gesperrt</span>' : st === "fertig" ? '<span class="chip ok">Abgeschlossen</span>' : st === "begonnen" ? '<span class="chip glow">Begonnen</span>' : '<span class="chip accent">Neu</span>') + "</span></button>";
  };
  KS.viewLibrary = function () {
    const W = (window.KS_WEEKS || []).slice().sort((a, b) => a.n - b.n); const lic = KS.licensed();
    const all = W.flatMap((w) => KS.lessonsOf(w.n).map((l) => [w, l]));
    const done = all.filter(([, l]) => KS.lessonStatus(l.key) === "fertig").length;
    const PHN = { 1: "Fundament", 2: "Lebensstil", 3: "Gedanken & Gefühle", 4: "Verbindung & Richtung" };
    return '<div class="sec-h" style="margin-top:6px"><div><div class="eyebrow">Lektionsbibliothek</div><h2 style="font-size:clamp(1.9rem,4vw,2.8rem)">' + all.length + ' Lektionen</h2></div><div class="row">' + KS.ring(all.length ? done / all.length : 0, done + " / " + all.length) + "</div></div>" +
      '<p class="reading muted" style="margin-top:-6px">Jedes Thema hat eine Grundlagen-Lektion, eine Vertiefung und drei Masterclasses, in denen eine zentrale Theorie mit Modell, Forschung, Kritik und Übung durchgearbeitet wird. Alle Lektionen funktionieren Karte für Karte mit Fragen und sofortigem Feedback.</p>' +
      '<div class="row" style="margin:10px 0 4px" data-lf><button type="button" class="pill on" data-ph="0">Alle</button>' + [1, 2, 3, 4].map((p) => '<button type="button" class="pill" data-ph="' + p + '">' + PHN[p] + "</button>").join("") + "</div>" +
      W.map((w) => '<div class="lib-mod" data-phase="' + w.phase + '" style="--ph:var(--p' + w.phase + ')"><div class="lib-head"><span class="wicon">' + KS.weekIcon(w.n, 20) + '</span><div><div class="eyebrow" style="color:var(--ph)">Modul ' + w.n + " · " + PHN[w.phase] + "</div><h3>" + esc(w.title) + '</h3></div></div><div class="lib-row">' + KS.lessonsOf(w.n).map((l, i) => KS.lessonTile(w.n, l, !lic && !(w.n === 1 && i === 0))).join("") + "</div></div>").join("");
  };
  KS.bindLibrary = function () {
    const f = document.querySelector("[data-lf]"); if (!f) return;
    f.onclick = (e) => { const b = e.target.closest("[data-ph]"); if (!b) return; f.querySelectorAll(".pill").forEach((x) => x.classList.toggle("on", x === b)); document.querySelectorAll(".lib-mod").forEach((m) => (m.hidden = b.dataset.ph !== "0" && m.dataset.phase !== b.dataset.ph)); };
  };
})();
