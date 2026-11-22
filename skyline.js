/* ============================================================
   Dallas skyline silhouette — drawn into any element with
   data-skyline. Towers and a lit ball tower. Windows light up once when the page loads.
   ============================================================ */
(function () {
  const W = 1440, H = 300, GROUND = 290;
  const NS = "http://www.w3.org/2000/svg";

  // [x, width, top, shape]
  const towers = [
    [0, 70, 232], [62, 92, 202], [150, 58, 218], [205, 80, 158, "stepped"],
    [345, 70, 188], [410, 54, 132, "spire"], [466, 92, 92, "prism"], [556, 60, 150],
    [614, 86, 58, "crown"], [700, 70, 120], [768, 52, 172], [818, 96, 138, "slant"],
    [912, 60, 198], [970, 78, 176], [1046, 70, 150, "spire"], [1114, 92, 196],
    [1204, 62, 122, "stepped"], [1264, 100, 182], [1362, 78, 214]
  ];

  // Lighter towers behind the main skyline, for depth
  const backTowers = [
    [30, 80, 196], [120, 60, 170], [180, 70, 210], [250, 50, 150], [372, 64, 110], [520, 56, 104],
    [585, 50, 140], [690, 64, 84], [740, 48, 128], [870, 70, 112], [940, 58, 150], [1010, 66, 120],
    [1090, 56, 160], [1160, 70, 104], [1236, 50, 150], [1310, 66, 136], [1390, 50, 170]
  ];

  function el(name, attrs) {
    const n = document.createElementNS(NS, name);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  const rand = (a, b) => a + Math.random() * (b - a);

  function windows(g, x, w, top) {
    for (let cx = x + 9; cx < x + w - 10; cx += 12) {
      for (let cy = top + 16; cy < GROUND - 14; cy += 16) {
        if (Math.random() < 0.22) {
          const r = el("rect", { x: cx, y: cy, width: 5, height: 8, class: "win" });
          r.style.setProperty("--o", rand(0.55, 1).toFixed(2));
          r.style.animationDelay = rand(0.2, 2.2).toFixed(2) + "s";
          g.appendChild(r);
        }
      }
    }
  }

  function draw(host) {
    const svg = el("svg", { viewBox: `0 0 ${W} ${H}`, preserveAspectRatio: "xMidYMax slice", role: "img", "aria-label": "Dallas skyline at dusk" });
    const back = el("g", { fill: "#C9D6E4" });
    backTowers.forEach(([x, w, top]) => back.appendChild(el("rect", { x, y: top, width: w, height: H })));
    svg.appendChild(back);
    const city = el("g", { fill: "#4F6B8A" });
    const lights = el("g");

    towers.forEach(([x, w, top, shape]) => {
      if (shape === "stepped") {
        city.appendChild(el("rect", { x, y: top + 40, width: w, height: H }));
        city.appendChild(el("rect", { x: x + 10, y: top + 18, width: w - 20, height: H }));
        city.appendChild(el("rect", { x: x + 22, y: top, width: w - 44, height: H }));
      } else if (shape === "spire") {
        city.appendChild(el("rect", { x, y: top, width: w, height: H }));
        city.appendChild(el("polygon", { points: `${x},${top} ${x + w / 2},${top - 44} ${x + w},${top}` }));
      } else if (shape === "prism") {
        city.appendChild(el("polygon", { points: `${x},${H} ${x},${top + 46} ${x + w * 0.55},${top} ${x + w},${top + 26} ${x + w},${H}` }));
      } else if (shape === "crown") {
        city.appendChild(el("rect", { x, y: top, width: w, height: H }));
        city.appendChild(el("rect", { x: x + 12, y: top - 16, width: w - 24, height: 20 }));
        city.appendChild(el("rect", { x: x + 26, y: top - 30, width: w - 52, height: 20 }));
        city.appendChild(el("rect", { x: x + w / 2 - 2, y: top - 70, width: 4, height: 44 }));
      } else if (shape === "slant") {
        city.appendChild(el("polygon", { points: `${x},${H} ${x},${top} ${x + w},${top + 34} ${x + w},${H}` }));
      } else {
        city.appendChild(el("rect", { x, y: top, width: w, height: H }));
      }
      windows(lights, x, w, shape === "slant" ? top + 34 : shape === "prism" ? top + 46 : top);
    });

    // Ball tower: three legs and a lit sphere
    const bx = 300, by = 92;
    city.appendChild(el("polygon", { points: `${bx - 14},${H} ${bx - 6},${by + 20} ${bx + 6},${by + 20} ${bx + 14},${H}` }));
    city.appendChild(el("circle", { cx: bx, cy: by, r: 31 }));
    city.appendChild(el("rect", { x: bx - 1.5, y: by - 46, width: 3, height: 18 }));
    [[0, 1], [11, 8], [21, 14]].forEach(([r, n]) => {
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2;
        const d = el("circle", { cx: bx + Math.cos(a) * r, cy: by + Math.sin(a) * r, r: 2.6, class: "win" });
        d.style.setProperty("--o", "1");
        d.style.animationDelay = (1 + i * 0.05).toFixed(2) + "s";
        lights.appendChild(d);
      }
    });

    // Ground + river bank
    city.appendChild(el("rect", { x: 0, y: GROUND, width: W, height: H - GROUND }));
    svg.appendChild(city);
    svg.appendChild(lights);

    host.appendChild(svg);
    requestAnimationFrame(() => requestAnimationFrame(() => host.classList.add("lit")));
  }

  document.querySelectorAll("[data-skyline]").forEach(draw);
})();
