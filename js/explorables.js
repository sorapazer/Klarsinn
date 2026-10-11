/* Klarsinn – interaktive Grafiken („Explorables“), eine pro Woche */
(function () {
  const KS = window.KS, esc = KS.esc;
  const X = (KS.explorables = {});
  const NS = "http://www.w3.org/2000/svg";
  const svgPoint = (svg, e) => { const r = svg.getBoundingClientRect(); const vb = svg.viewBox.baseVal; return { x: (e.clientX - r.left) / r.width * vb.width, y: (e.clientY - r.top) / r.height * vb.height }; };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  function drag(svg, cb) {
    let on = false;
    const mv = (e) => { if (!on) return; e.preventDefault(); cb(svgPoint(svg, e)); };
    svg.addEventListener("pointerdown", (e) => { on = true; svg.setPointerCapture(e.pointerId); cb(svgPoint(svg, e)); });
    svg.addEventListener("pointermove", mv); svg.addEventListener("pointerup", () => (on = false)); svg.addEventListener("pointercancel", () => (on = false));
  }
  const cap = (t) => '<p class="xp-cap">' + t + "</p>";

  /* W1 · Zwei-Kontinua-Modell */
  X[1] = {
    title: "Zwei Achsen statt einer", hint: "Ziehe den Punkt in das Feld",
    mount(el) {
      const Q = { tr: ["Aufblühend", "Hohe mentale Gesundheit, keine psychische Erkrankung. Nach Keyes ist nur eine Minderheit der Erwachsenen in diesem Bereich."], tl: ["Aufblühend trotz Erkrankung", "Eine psychische Erkrankung und gleichzeitig hohes Wohlbefinden: Viele Menschen mit Diagnose führen ein erfülltes Leben."], br: ["Ermattet", "Keine Diagnose, aber wenig Lebensfreude und Sinn. Dieser Zustand (englisch „languishing“) ist ein eigener Risikofaktor."], bl: ["Belastet", "Psychische Erkrankung und niedriges Wohlbefinden. Hier ist professionelle Unterstützung besonders wichtig."] };
      el.innerHTML = '<svg viewBox="0 0 400 300" class="xp-svg" role="img" aria-label="Zwei-Kontinua-Modell, interaktiv">' +
        '<rect x="40" y="10" width="170" height="125" rx="8" fill="var(--p3)" opacity=".10"/><rect x="210" y="10" width="170" height="125" rx="8" fill="var(--p2)" opacity=".16"/><rect x="40" y="135" width="170" height="125" rx="8" fill="var(--crit)" opacity=".10"/><rect x="210" y="135" width="170" height="125" rx="8" fill="var(--glow)" opacity=".14"/>' +
        '<line x1="210" y1="10" x2="210" y2="260" stroke="var(--line)" stroke-width="2"/><line x1="40" y1="135" x2="380" y2="135" stroke="var(--line)" stroke-width="2"/>' +
        '<text x="210" y="285" text-anchor="middle" class="xp-ax">← psychische Erkrankung · keine Erkrankung →</text><text x="22" y="135" text-anchor="middle" class="xp-ax" transform="rotate(-90 22 135)">← niedriges · hohes Wohlbefinden →</text>' +
        '<text x="125" y="30" text-anchor="middle" class="xp-q">Aufblühend</text><text x="125" y="45" text-anchor="middle" class="xp-q" style="font-weight:600">trotz Erkrankung</text><text x="295" y="30" text-anchor="middle" class="xp-q">Aufblühend</text><text x="125" y="250" text-anchor="middle" class="xp-q">Belastet</text><text x="295" y="250" text-anchor="middle" class="xp-q">Ermattet</text>' +
        '<circle data-dot cx="300" cy="90" r="12" fill="var(--accent)" stroke="var(--surface)" stroke-width="3" style="cursor:grab"/></svg><div class="xp-out" data-out></div>';
      const svg = el.querySelector("svg"), dot = el.querySelector("[data-dot]"), out = el.querySelector("[data-out]");
      const set = (p) => { const x = clamp(p.x, 52, 368), y = clamp(p.y, 22, 248); dot.setAttribute("cx", x); dot.setAttribute("cy", y); const q = Q[(y < 135 ? "t" : "b") + (x > 210 ? "r" : "l")]; out.innerHTML = "<b>" + q[0] + "</b> " + q[1]; };
      drag(svg, set); set({ x: 300, y: 90 });
    }
  };

  /* W2 · Yerkes-Dodson */
  X[2] = {
    title: "Wie viel Anspannung ist gut?", hint: "Verschiebe den Regler und wechsle die Aufgabe",
    mount(el) {
      let task = "einfach";
      el.innerHTML = '<div class="seg" data-task style="margin-bottom:10px"><button type="button" class="on">Einfache Aufgabe</button><button type="button">Komplexe Aufgabe</button></div><svg viewBox="0 0 400 230" class="xp-svg" role="img" aria-label="Yerkes-Dodson-Kurve"><path data-curve fill="none" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round"/><path data-area fill="var(--accent)" opacity=".1"/><line x1="30" y1="200" x2="385" y2="200" stroke="var(--line)" stroke-width="2"/><text x="207" y="222" text-anchor="middle" class="xp-ax">Anspannung, Erregung →</text><text x="14" y="110" text-anchor="middle" class="xp-ax" transform="rotate(-90 14 110)">Leistung →</text><circle data-dot r="10" fill="var(--glow)" stroke="var(--surface)" stroke-width="3"/></svg><input type="range" min="0" max="100" value="30" aria-label="Anspannung" data-r><div class="xp-out" data-out></div>';
      const r = el.querySelector("[data-r]");
      const f = (a) => { const peak = task === "einfach" ? 60 : 40, w = task === "einfach" ? 34 : 26; return Math.exp(-((a - peak) ** 2) / (2 * w * w)); };
      const P = (a) => [30 + a * 3.5, 195 - f(a) * 160];
      const draw = () => {
        let d = ""; for (let a = 0; a <= 100; a += 2) { const [x, y] = P(a); d += (a ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1); }
        el.querySelector("[data-curve]").setAttribute("d", d); el.querySelector("[data-area]").setAttribute("d", d + " L380 200 L30 200Z");
        const a = Number(r.value), [x, y] = P(a), dot = el.querySelector("[data-dot]"); dot.setAttribute("cx", x); dot.setAttribute("cy", y);
        const peak = task === "einfach" ? 60 : 40;
        el.querySelector("[data-out]").innerHTML = a < peak - 25 ? "<b>Unterforderung.</b> Zu wenig Aktivierung macht träge und unkonzentriert. Etwas Herausforderung tut gut." : a > peak + 25 ? "<b>Überlastung.</b> Zu viel Stress verengt die Aufmerksamkeit, Fehler nehmen zu. Zeit, den Körper herunterzuregulieren." : "<b>Optimaler Bereich.</b> Moderate Anspannung schärft Fokus und Leistung. Stress ist hier ein Verbündeter.";
      };
      r.oninput = draw;
      el.querySelectorAll("[data-task] button").forEach((b, i) => (b.onclick = () => { task = i ? "komplex" : "einfach"; el.querySelectorAll("[data-task] button").forEach((x, j) => x.classList.toggle("on", j === i)); draw(); }));
      draw();
    }
  };

  /* W3 · Atemfrequenz und Herzratenvariabilität */
  X[3] = {
    title: "Dein Atem steuert dein Herz", hint: "Ändere die Atemfrequenz",
    mount(el) {
      el.innerHTML = '<svg viewBox="0 0 400 200" class="xp-svg" role="img" aria-label="Atmung und Herzfrequenz"><text x="10" y="18" class="xp-ax">Atmung</text><path data-br fill="none" stroke="var(--p2)" stroke-width="2.5"/><text x="10" y="112" class="xp-ax">Herzfrequenz</text><path data-hr fill="none" stroke="var(--crit)" stroke-width="2.5"/><line x1="0" y1="190" x2="400" y2="190" stroke="var(--line)"/><text x="395" y="186" text-anchor="end" class="xp-ax">60 Sekunden</text></svg><label class="lbl" style="font-size:.85rem">Atemzüge pro Minute: <b data-v class="num">12</b></label><input type="range" min="4" max="16" step="0.5" value="12" data-r aria-label="Atemfrequenz"><div class="xp-out" data-out></div>';
      const r = el.querySelector("[data-r]");
      const draw = () => {
        const bpm = Number(r.value), A = 3 + 22 * Math.exp(-((bpm - 6) ** 2) / 6);
        let b = "", h = ""; for (let x = 0; x <= 400; x += 2) { const t = x / 400 * 60; const ph = Math.sin(2 * Math.PI * bpm / 60 * t); b += (x ? "L" : "M") + x + " " + (55 - ph * 26).toFixed(1); h += (x ? "L" : "M") + x + " " + (150 - ph * A - Math.sin(t * 7.3) * 1.5).toFixed(1); }
        el.querySelector("[data-br]").setAttribute("d", b); el.querySelector("[data-hr]").setAttribute("d", h); el.querySelector("[data-v]").textContent = String(bpm).replace(".", ",");
        el.querySelector("[data-out]").innerHTML = bpm <= 7 ? "<b>Resonanzbereich.</b> Bei etwa 5 bis 7 Atemzügen pro Minute schwingt die Herzfrequenz am stärksten mit dem Atem. Hohe Variabilität ist ein Zeichen eines flexiblen, gut regulierten Nervensystems." : bpm <= 10 ? "<b>Langsame Atmung.</b> Unter 10 Atemzügen pro Minute zeigen Studien bereits mehr Ruhe und eine stärkere Aktivität des Parasympathikus." : "<b>Normale Ruhefrequenz.</b> Die Herzfrequenz schwankt nur wenig. Atme langsamer und beobachte die rote Kurve.";
      };
      r.oninput = draw; draw();
    }
  };

  /* W4 · Zwei-Prozess-Modell des Schlafs */
  X[4] = {
    title: "Schlafdruck und innere Uhr", hint: "Probiere ein Nickerchen oder spätes Aufstehen",
    mount(el) {
      el.innerHTML = '<svg viewBox="0 0 400 220" class="xp-svg" role="img" aria-label="Zwei-Prozess-Modell"><rect data-sleep y="15" height="170" fill="var(--accent)" opacity=".08"/><path data-c fill="none" stroke="var(--glow)" stroke-width="2.5" stroke-dasharray="6 5"/><path data-s fill="none" stroke="var(--accent)" stroke-width="3.5"/><line data-gap stroke="var(--p3)" stroke-width="5" stroke-linecap="round"/><line x1="20" y1="190" x2="390" y2="190" stroke="var(--line)"/><g class="xp-ax" data-ticks></g><text x="24" y="30" class="xp-ax" style="fill:var(--accent)">Schlafdruck (Prozess S)</text><text x="24" y="46" class="xp-ax" style="fill:var(--glow)">Wachsignal der inneren Uhr (Prozess C)</text></svg>' +
        '<div class="grid2"><label class="field"><span class="lbl" style="font-size:.85rem">Nickerchen am Nachmittag: <b data-nv>0</b> Min.</span><input type="range" min="0" max="120" step="10" value="0" data-nap></label><label class="field"><span class="lbl" style="font-size:.85rem">Aufstehen am Morgen: <b data-wv>7:00</b> Uhr</span><input type="range" min="6" max="11" step="0.5" value="7" data-wake></label></div><div class="xp-out" data-out></div>';
      const nap = el.querySelector("[data-nap]"), wk = el.querySelector("[data-wake]");
      const T = (h) => 20 + (h - 6) / 26 * 370; // 6:00 bis 8:00 Folgetag
      el.querySelector("[data-ticks]").innerHTML = [6, 12, 18, 24, 30].map((h) => '<text x="' + T(h) + '" y="206" text-anchor="middle">' + (h % 24) + ":00</text>").join("");
      const draw = () => {
        const n = Number(nap.value), w = Number(wk.value), bed = 23;
        let S = 0.15 + (w - 6) * -0.03; let d = "", c = "", Sbed = 0;
        for (let h = 6; h <= 32; h += 0.1) {
          const asleepMorning = h < w; const asleepNight = h >= bed && h < 31; const napping = n && h >= 15 && h < 15 + n / 60;
          if (asleepMorning || asleepNight || napping) S = S * Math.exp(-0.1 / 4.2); else S = 1 - (1 - S) * Math.exp(-0.1 / 18);
          if (Math.abs(h - bed) < 0.05) Sbed = S;
          const y = 185 - S * 150; d += (h === 6 ? "M" : "L") + T(h).toFixed(1) + " " + y.toFixed(1);
          const C = 0.5 + 0.32 * Math.sin((h - 9) / 24 * 2 * Math.PI); c += (h === 6 ? "M" : "L") + T(h).toFixed(1) + " " + (185 - C * 150).toFixed(1);
        }
        el.querySelector("[data-s]").setAttribute("d", d); el.querySelector("[data-c]").setAttribute("d", c);
        const sl = el.querySelector("[data-sleep]"); sl.setAttribute("x", T(bed)); sl.setAttribute("width", T(31) - T(bed));
        const Cb = 0.5 + 0.32 * Math.sin((bed - 9) / 24 * 2 * Math.PI); const g = el.querySelector("[data-gap]");
        g.setAttribute("x1", T(bed)); g.setAttribute("x2", T(bed)); g.setAttribute("y1", 185 - Sbed * 150); g.setAttribute("y2", 185 - Cb * 150);
        el.querySelector("[data-nv]").textContent = n; el.querySelector("[data-wv]").textContent = Math.floor(w) + ":" + (w % 1 ? "30" : "00");
        const pct = Math.round(Sbed * 100);
        el.querySelector("[data-out]").innerHTML = "Schlafdruck um 23 Uhr: <b class=\"num\">" + pct + " %</b>. " + (pct >= 80 ? "Der Druck ist hoch, das Einschlafen fällt leicht." : pct >= 70 ? "Etwas weniger Schlafdruck. Einschlafen kann länger dauern." : "Wenig Schlafdruck: Langes Wachliegen ist wahrscheinlich. Lange Nickerchen und spätes Aufstehen bauen den Druck ab, den du abends brauchst.") + ' <span class="faint">Vereinfachtes Modell nach Borbély.</span>';
      };
      nap.oninput = draw; wk.oninput = draw; draw();
    }
  };

  /* W5 · Spirale */
  X[5] = {
    title: "Abwärts- und Aufwärtsspirale", hint: "Wähle eine Richtung",
    mount(el) {
      const D = { down: ["Stimmung sinkt", "Weniger Antrieb", "Rückzug, weniger Aktivität", "Weniger positive Erlebnisse"], up: ["Kleine Aktivität", "Erfolg oder Freude", "Stimmung hebt sich", "Mehr Antrieb"] };
      el.innerHTML = '<div class="seg" data-dir style="margin-bottom:10px"><button type="button" class="on">Rückzug</button><button type="button">Aktivierung</button></div><svg viewBox="0 0 400 260" class="xp-svg" role="img" aria-label="Spirale der Verhaltensaktivierung"><g data-g></g></svg><div class="xp-out" data-out></div>';
      const pos = [[200, 40], [340, 130], [200, 220], [60, 130]];
      const draw = (dir) => {
        const col = dir === "down" ? "var(--crit)" : "var(--ok)"; let s = '<defs><marker id="xa' + dir + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="' + col + '"/></marker></defs>';
        pos.forEach((p, i) => { const q = pos[(i + 1) % 4]; const mx = (p[0] + q[0]) / 2 + (i === 0 || i === 3 ? 30 : -30) * (i % 2 ? -1 : 1), my = (p[1] + q[1]) / 2 + (i < 2 ? -20 : 20); s += '<path d="M' + (p[0] + (q[0] - p[0]) * .22) + " " + (p[1] + (q[1] - p[1]) * .22) + " Q" + mx + " " + my + " " + (p[0] + (q[0] - p[0]) * .78) + " " + (p[1] + (q[1] - p[1]) * .78) + '" fill="none" stroke="' + col + '" stroke-width="3" marker-end="url(#xa' + dir + ')" class="xp-flow"/>'; });
        pos.forEach((p, i) => { s += '<g class="xp-node" style="animation-delay:' + i * 0.15 + 's"><rect x="' + (p[0] - 72) + '" y="' + (p[1] - 19) + '" width="144" height="38" rx="19" fill="var(--surface)" stroke="' + col + '" stroke-width="2"/><text x="' + p[0] + '" y="' + (p[1] + 5) + '" text-anchor="middle" style="font-size:12.5px;font-weight:700;fill:var(--ink)">' + D[dir][i] + "</text></g>"; });
        el.querySelector("[data-g]").innerHTML = s;
        el.querySelector("[data-out]").innerHTML = dir === "down" ? "<b>Der Teufelskreis:</b> Wer sich schlecht fühlt, zieht sich zurück. Dadurch fehlen Erlebnisse, die guttun, und die Stimmung sinkt weiter. Warten auf Motivation hält den Kreis am Laufen." : "<b>Von außen nach innen:</b> Verhaltensaktivierung dreht die Richtung um. Du handelst zuerst, auch ohne Lust. Motivation folgt dem Handeln, nicht umgekehrt.";
      };
      el.querySelectorAll("[data-dir] button").forEach((b, i) => (b.onclick = () => { el.querySelectorAll("[data-dir] button").forEach((x, j) => x.classList.toggle("on", j === i)); draw(i ? "up" : "down"); }));
      draw("down");
    }
  };

  /* W6 · Gedankenwandern schätzen */
  X[6] = {
    title: "Wie oft ist dein Geist woanders?", hint: "Schätze zuerst, dann auflösen",
    mount(el) {
      el.innerHTML = '<div class="xp-donut"><svg viewBox="0 0 200 200" class="xp-svg" style="max-width:220px" role="img" aria-label="Anteil Gedankenwandern"><circle cx="100" cy="100" r="70" fill="none" stroke="var(--surface-2)" stroke-width="26"/><circle data-est cx="100" cy="100" r="70" fill="none" stroke="var(--accent)" stroke-width="26" stroke-dasharray="0 440" transform="rotate(-90 100 100)" opacity=".45"/><circle data-real cx="100" cy="100" r="70" fill="none" stroke="var(--glow)" stroke-width="12" stroke-dasharray="0 440" transform="rotate(-90 100 100)" style="transition:stroke-dasharray 1.2s ease"/><text x="100" y="108" text-anchor="middle" data-t style="font-family:var(--f-display);font-weight:800;font-size:30px;fill:var(--ink)">20 %</text></svg></div><label class="lbl" style="font-size:.85rem">Meine Schätzung: Anteil der wachen Zeit, in der Menschen an etwas anderes denken als an das, was sie gerade tun</label><input type="range" min="0" max="100" value="20" data-r aria-label="Schätzung"><div class="row"><button type="button" class="btn small" data-show>Auflösen</button></div><div class="xp-out" data-out></div>';
      const C = 2 * Math.PI * 70, r = el.querySelector("[data-r]");
      const est = () => { el.querySelector("[data-est]").setAttribute("stroke-dasharray", (r.value / 100 * C).toFixed(1) + " " + C); el.querySelector("[data-t]").textContent = r.value + " %"; };
      r.oninput = est; est();
      el.querySelector("[data-show]").onclick = () => { el.querySelector("[data-real]").setAttribute("stroke-dasharray", (0.469 * C).toFixed(1) + " " + C); el.querySelector("[data-t]").textContent = "47 %"; const d = Math.abs(r.value - 47); el.querySelector("[data-out]").innerHTML = (d <= 8 ? "<b>Sehr nah dran.</b> " : "<b>Deine Schätzung lag " + d + " Punkte daneben.</b> ") + "In einer Studie mit rund 2.250 Erwachsenen, die per Smartphone zufällig befragt wurden, war der Geist in knapp 47 % der Zeit woanders. Und: Beim Abschweifen waren die Menschen im Schnitt weniger glücklich. " + KS.cite("[[killingsworth2010]]"); };
    }
  };

  /* W7 · ABC-Modell */
  X[7] = {
    title: "Gleiche Situation, anderer Gedanke", hint: "Wähle einen Gedanken",
    mount(el) {
      const O = [["„Er ist sauer auf mich.“", "Angst, Kränkung", "Unruhe, Magendruck", "Grübeln, Handy ständig prüfen", "var(--crit)"], ["„Er hat bestimmt viel zu tun.“", "Gelassenheit", "Entspannt", "Etwas anderes machen, später nachfragen", "var(--ok)"], ["„Ihm ist sicher etwas passiert!“", "Panik, Sorge", "Herzrasen, Anspannung", "Mehrfach anrufen, Freunde fragen", "var(--warn)"], ["„Typisch, mich ignorieren alle.“", "Traurigkeit, Ärger", "Schwere, Kloß im Hals", "Rückzug, selbst nicht mehr melden", "var(--p3)"]];
      el.innerHTML = '<div class="xp-abc"><div class="xp-box"><span class="eyebrow">A · Situation</span><b>Ein Freund antwortet seit fünf Stunden nicht auf deine Nachricht.</b></div><div class="xp-arrow">↓</div><div class="xp-box"><span class="eyebrow">B · Bewertung</span><div class="pills" data-p>' + O.map((o, i) => '<button type="button" class="pill" data-i="' + i + '">' + o[0] + "</button>").join("") + '</div></div><div class="xp-arrow">↓</div><div class="xp-box" data-c><span class="eyebrow">C · Folgen</span><span class="faint">Wähle oben einen Gedanken.</span></div></div>';
      el.querySelector("[data-p]").onclick = (e) => { const b = e.target.closest("[data-i]"); if (!b) return; el.querySelectorAll("[data-i]").forEach((x) => x.classList.toggle("on", x === b)); const o = O[b.dataset.i]; el.querySelector("[data-c]").innerHTML = '<span class="eyebrow">C · Folgen</span><div class="xp-cgrid fade-in" style="--c:' + o[4] + '"><div><small>Gefühl</small><b>' + o[1] + "</b></div><div><small>Körper</small><b>" + o[2] + "</b></div><div><small>Verhalten</small><b>" + o[3] + '</b></div></div><p class="faint" style="margin:8px 0 0;font-size:.85rem">Nicht die Situation bestimmt das Gefühl, sondern ihre Bewertung. Das ist der Kern des kognitiven Modells.</p>'; };
    }
  };

  /* W8 · Sorgenbaum */
  X[8] = {
    title: "Der Sorgenbaum", hint: "Folge den Fragen",
    mount(el) {
      const N = { s: ["Bemerke die Sorge. Worüber genau sorge ich mich?", [["Weiter", "a"]]], a: ["Ist das ein reales Problem im Hier und Jetzt oder ein hypothetisches „Was wäre, wenn …“?", [["Reales Problem", "b"], ["Was wäre, wenn …", "h"]]], b: ["Kann ich etwas tun?", [["Ja", "c"], ["Nein", "h"]]], c: ["Kann ich es jetzt tun?", [["Ja, jetzt", "now"], ["Später", "plan"]]], now: ["Tu es jetzt. Dann lass die Sorge los und lenke die Aufmerksamkeit bewusst auf etwas anderes.", []], plan: ["Plane wann, wo und wie. Schreib es auf. Dann lass die Sorge bis dahin los.", []], h: ["Lass die Sorge los. Parke sie für die Sorgenzeit oder nimm Abstand zu ihr („Ich habe den Gedanken, dass …“). Lenke die Aufmerksamkeit auf das, was du gerade tust.", []] };
      const path = ["s"];
      const draw = () => {
        el.innerHTML = '<div class="xp-tree">' + path.map((k, i) => { const [t, opts] = N[k]; const last = i === path.length - 1; return '<div class="xp-box fade-in' + (opts.length ? "" : " xp-end") + '">' + esc(t) + (last && opts.length ? '<div class="row" style="margin-top:10px">' + opts.map(([l, to]) => '<button type="button" class="btn small chunky" data-to="' + to + '">' + l + "</button>").join("") + "</div>" : "") + "</div>" + (last ? "" : '<div class="xp-arrow">↓</div>'); }).join("") + (N[path[path.length - 1]][1].length ? "" : '<button type="button" class="btn small ghost" data-re>Noch einmal</button>') + "</div>";
        el.querySelectorAll("[data-to]").forEach((b) => (b.onclick = () => { path.push(b.dataset.to); draw(); }));
        const re = el.querySelector("[data-re]"); if (re) re.onclick = () => { path.length = 1; draw(); };
      };
      draw();
    }
  };

  /* W9 · Gefühlslandkarte (Valenz × Erregung) */
  X[9] = {
    title: "Die Landkarte der Gefühle", hint: "Tippe auf eine Stelle der Karte",
    mount(el) {
      const E = [["begeistert", 0.8, 0.8], ["freudig erregt", 0.6, 0.65], ["stolz", 0.7, 0.45], ["glücklich", 0.85, 0.35], ["zufrieden", 0.75, -0.25], ["entspannt", 0.6, -0.55], ["gelassen", 0.45, -0.7], ["ruhig", 0.3, -0.8], ["müde", -0.1, -0.85], ["gelangweilt", -0.4, -0.65], ["traurig", -0.7, -0.4], ["niedergeschlagen", -0.8, -0.6], ["einsam", -0.6, -0.2], ["enttäuscht", -0.55, 0.05], ["gereizt", -0.5, 0.5], ["wütend", -0.75, 0.75], ["ängstlich", -0.6, 0.7], ["gestresst", -0.45, 0.8], ["nervös", -0.3, 0.6], ["überrascht", 0.1, 0.85], ["neugierig", 0.45, 0.55], ["dankbar", 0.65, 0.1], ["hoffnungsvoll", 0.55, 0.25], ["frustriert", -0.65, 0.35]];
      const px = (v) => 200 + v * 175, py = (a) => 150 - a * 125;
      el.innerHTML = '<svg viewBox="0 0 400 300" class="xp-svg" role="img" aria-label="Gefühlslandkarte"><rect x="25" y="25" width="350" height="250" rx="12" fill="var(--surface-2)"/><line x1="200" y1="25" x2="200" y2="275" stroke="var(--line)" stroke-width="2"/><line x1="25" y1="150" x2="375" y2="150" stroke="var(--line)" stroke-width="2"/><text x="372" y="145" text-anchor="end" class="xp-ax">angenehm →</text><text x="30" y="145" class="xp-ax">← unangenehm</text><text x="205" y="40" class="xp-ax">viel Energie</text><text x="205" y="268" class="xp-ax">wenig Energie</text><g data-w>' + E.map((e, i) => '<text x="' + px(e[1]) + '" y="' + py(e[2]) + '" text-anchor="middle" data-i="' + i + '" class="xp-word">' + e[0] + "</text>").join("") + '</g><circle data-tap r="0" fill="var(--accent)" opacity=".25"/></svg><div class="xp-out" data-out>Gefühle lassen sich auf zwei Grunddimensionen verorten: wie angenehm und wie aktivierend sie sind. Je feiner du unterscheidest, desto besser kannst du sie regulieren.</div>';
      const svg = el.querySelector("svg");
      svg.addEventListener("click", (e) => {
        const p = svgPoint(svg, e); const v = (p.x - 200) / 175, a = (150 - p.y) / 125;
        const near = E.map((x, i) => [i, Math.hypot(x[1] - v, x[2] - a)]).sort((x, y) => x[1] - y[1]).slice(0, 3).map((x) => x[0]);
        el.querySelectorAll(".xp-word").forEach((t) => t.classList.toggle("on", near.includes(Number(t.dataset.i))));
        const c = el.querySelector("[data-tap]"); c.setAttribute("cx", p.x); c.setAttribute("cy", p.y); c.setAttribute("r", 40);
        el.querySelector("[data-out]").innerHTML = "Passende Wörter: <b>" + near.map((i) => E[i][0]).join(", ") + "</b>. Welches trifft es am genauesten? Schon das Benennen dämpft die Reaktion im Gehirn. " + KS.cite("[[lieberman2007]]");
      });
    }
  };

  /* W10 · Drei Systeme nach Gilbert */
  X[10] = {
    title: "Drei Systeme in Balance", hint: "Stelle ein, wie deine letzte Woche war",
    mount(el) {
      const S = [["Bedrohung", "Schutz, Angst, Ärger, Selbstkritik", "var(--crit)", 70], ["Antrieb", "Ziele, Leistung, Belohnung", "var(--glow)", 60], ["Beruhigung", "Sicherheit, Verbundenheit, Fürsorge", "var(--ok)", 25]];
      el.innerHTML = '<svg viewBox="0 0 400 230" class="xp-svg" role="img" aria-label="Drei Systeme der Emotionsregulation">' + S.map((s, i) => '<circle data-c="' + i + '" cx="' + [120, 280, 200][i] + '" cy="' + [90, 90, 160][i] + '" fill="' + s[2] + '" opacity=".28" stroke="' + s[2] + '" stroke-width="2.5" style="transition:r .3s"/><text x="' + [120, 280, 200][i] + '" y="' + ([90, 90, 160][i] + 5) + '" text-anchor="middle" style="font-weight:800;font-size:14px;fill:var(--ink)">' + s[0] + "</text>").join("") + '</svg><div class="grid3">' + S.map((s, i) => '<label class="field"><span class="lbl" style="font-size:.82rem">' + s[0] + ' <span class="faint">' + s[1] + '</span></span><input type="range" min="5" max="100" value="' + s[3] + '" data-r="' + i + '"></label>').join("") + '</div><div class="xp-out" data-out></div>';
      const draw = () => {
        const v = [...el.querySelectorAll("[data-r]")].map((r) => Number(r.value));
        v.forEach((x, i) => el.querySelector('[data-c="' + i + '"]').setAttribute("r", 22 + x * 0.48));
        el.querySelector("[data-out]").innerHTML = v[2] < Math.max(v[0], v[1]) - 25 ? "<b>Das Beruhigungssystem ist unterversorgt.</b> Viele Menschen leben vor allem zwischen Bedrohung und Antrieb. Selbstmitgefühl trainiert gezielt das dritte System, das Sicherheit und Ruhe vermittelt." : "<b>Recht ausgewogen.</b> Alle drei Systeme haben ihre Aufgabe. Gesund ist, flexibel zwischen ihnen wechseln zu können. " + KS.cite("[[gilbert2009]]");
      };
      el.querySelectorAll("[data-r]").forEach((r) => (r.oninput = draw)); draw();
    }
  };

  /* W11 · Reaktionsstile nach Gable */
  X[11] = {
    title: "Wie reagierst du auf gute Nachrichten?", hint: "Wähle eine Antwort",
    mount(el) {
      const A = [["„Wow, Glückwunsch! Erzähl, wie lief das Gespräch? Was hat den Ausschlag gegeben?“", "aktiv-konstruktiv", "Interesse, Begeisterung, Nachfragen. Dieser Stil stärkt Beziehungen nachweislich am meisten.", 0, 0], ["„Schön für dich.“", "passiv-konstruktiv", "Freundlich, aber knapp. Die Freude verpufft, das Gegenüber fühlt sich wenig gesehen.", 1, 0], ["„Und wer kümmert sich dann um die Kinder? Das wird stressig.“", "aktiv-destruktiv", "Problematisiert die gute Nachricht. Wirkt wie ein Dämpfer.", 0, 1], ["„Ach so. Was gibt’s zum Essen?“", "passiv-destruktiv", "Ignoriert die Nachricht und lenkt ab. Verletzt am meisten.", 1, 1]];
      el.innerHTML = '<div class="xp-box" style="margin-bottom:10px"><span class="eyebrow">Deine Partnerin erzählt</span><b>„Ich habe die neue Stelle bekommen!“</b></div><div class="stack" style="gap:6px" data-o>' + A.map((a, i) => '<button type="button" class="opt" data-i="' + i + '">' + a[0] + "</button>").join("") + '</div><div class="xp-matrix" data-m><div></div><div class="xp-mh">aktiv</div><div class="xp-mh">passiv</div><div class="xp-mh">konstruktiv</div><div data-q="0-0">aktiv-konstruktiv</div><div data-q="1-0">passiv-konstruktiv</div><div class="xp-mh">destruktiv</div><div data-q="0-1">aktiv-destruktiv</div><div data-q="1-1">passiv-destruktiv</div></div><div class="xp-out" data-out></div>';
      el.querySelector("[data-o]").onclick = (e) => { const b = e.target.closest("[data-i]"); if (!b) return; const a = A[b.dataset.i]; el.querySelectorAll("[data-o] .opt").forEach((x) => x.classList.toggle(b.dataset.i === "0" ? "right" : "wrong", x === b)); el.querySelectorAll("[data-o] .opt").forEach((x) => { if (x !== b) x.classList.remove("right", "wrong"); }); el.querySelectorAll("[data-q]").forEach((q) => q.classList.toggle("on", q.dataset.q === a[3] + "-" + a[4])); el.querySelector("[data-out]").innerHTML = "<b>" + a[1] + ":</b> " + a[2] + " " + KS.cite("[[gable2004]]"); };
    }
  };

  /* W12 · Wert oder Ziel? */
  X[12] = {
    title: "Wert oder Ziel?", hint: "Ordne jede Karte zu",
    mount(el) {
      const I = [["Einen Marathon laufen", "Ziel"], ["Gut für meinen Körper sorgen", "Wert"], ["Ein liebevoller Elternteil sein", "Wert"], ["Den Bachelor abschließen", "Ziel"], ["Neugierig bleiben und lernen", "Wert"], ["Bis Juni 5 kg abnehmen", "Ziel"], ["Ehrlich zu anderen sein", "Wert"], ["Jeden Sonntag Oma anrufen", "Ziel"]];
      let i = 0, ok = 0;
      const draw = () => {
        if (i >= I.length) { el.innerHTML = '<div class="xp-box xp-end" style="text-align:center"><b style="font-family:var(--f-display);font-size:2rem">' + ok + " / " + I.length + '</b><p style="margin:6px 0 0">Werte sind Richtungen, Ziele sind Etappen. Ziele kann man abhaken, Werte nie. Sie sagen dir, <i>warum</i> ein Ziel dir wichtig ist. ' + KS.cite("[[hayes2012]]") + '</p><button type="button" class="btn small ghost" data-re style="margin-top:10px">Noch einmal</button></div>'; el.querySelector("[data-re]").onclick = () => { i = 0; ok = 0; draw(); }; return; }
        el.innerHTML = '<div class="xp-sort"><div class="bar" style="margin-bottom:12px"><i style="width:' + i / I.length * 100 + '%"></i></div><div class="vcard fade-in"><b>' + I[i][0] + '</b></div><div class="row" style="justify-content:center;margin-top:12px"><button type="button" class="btn chunky" data-a="Wert">Wert</button><button type="button" class="btn chunky alt" data-a="Ziel">Ziel</button></div><div class="xp-out" data-out></div></div>';
        el.querySelectorAll("[data-a]").forEach((b) => (b.onclick = () => { const right = b.dataset.a === I[i][1]; if (right) ok++; el.querySelector("[data-out]").innerHTML = (right ? '<b style="color:var(--ok)">Richtig.</b> ' : '<b style="color:var(--crit)">Eher nicht.</b> ') + (I[i][1] === "Ziel" ? "Das ist ein Ziel: konkret, irgendwann erreicht." : "Das ist ein Wert: eine Richtung, die nie „fertig“ ist."); el.querySelectorAll("[data-a]").forEach((x) => (x.disabled = true)); setTimeout(() => { i++; draw(); }, 1300); }));
      };
      draw();
    }
  };

  /* Wochen-Symbole */
  const P = {
    1: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    2: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    3: '<path d="M2 12c2.5-4 5-4 7.5 0s5 4 7.5 0 3.5-3 5-1"/><path d="M2 17c2.5-3 5-3 7.5 0s5 3 7.5 0"/>',
    4: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
    5: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    6: '<circle cx="12" cy="12" r="2.5"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="9.5"/>',
    7: '<path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
    8: '<path d="M12 12a2 2 0 1 1 2-2 4 4 0 1 1-4-4 6 6 0 1 1-6 6"/>',
    9: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    10: '<path d="M4 13c0 4 3.5 7 8 7s8-3 8-7"/><path d="M12 15s-3.5-2-3.5-4.5a1.8 1.8 0 0 1 3.5-.8 1.8 1.8 0 0 1 3.5.8C15.5 13 12 15 12 15z"/>',
    11: '<circle cx="9" cy="12" r="5.5"/><circle cx="15" cy="12" r="5.5"/>',
    12: '<path d="M12 2l2.6 6.4L21 9l-5 4.3L17.5 20 12 16.6 6.5 20 8 13.3 3 9l6.4-.6z"/>'
  };
  KS.weekIcon = (n, size) => '<svg viewBox="0 0 24 24" width="' + (size || 24) + '" height="' + (size || 24) + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || "") + "</svg>";
  KS.mountExplorable = function (el, n) {
    const x = X[n]; if (!x) return false;
    el.innerHTML = '<div class="xp"><div class="xp-h"><span class="xp-badge">Interaktiv</span><h4>' + esc(x.title) + '</h4><span class="faint" style="font-size:.85rem">' + esc(x.hint) + '</span></div><div class="xp-body"></div></div>';
    try { x.mount(el.querySelector(".xp-body")); } catch (e) { console.error(e); }
    return true;
  };
  void NS; void cap;
})();
