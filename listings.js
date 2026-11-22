/* ============================================================
   Homes for sale: sample listings + filters
   (ZIP code, max price, bedrooms, sort)
   ============================================================ */
(function () {
  const HOMES = [
    { hood: "Oak Cliff", price: 329000, beds: 3, baths: 2, sqft: 1640, addr: "1412 Bluebonnet Way, Dallas, TX 75224", note: "1950s brick ranch with original hardwood floors and a pecan tree out back.", tag: "Open house Saturday", style: "ranch", wall: "#9A7562", roof: "#3A3E42", sky: "#DCE5EE" },
    { hood: "Oak Cliff", price: 389000, beds: 3, baths: 2, sqft: 1780, addr: "508 Redbud Ct, Dallas, TX 75208", note: "Craftsman bungalow with a deep front porch, a few minutes from Bishop Arts.", style: "bungalow", wall: "#E9E1D3", roof: "#4F6B8A", sky: "#F3E6CF" },
    { hood: "Lake Highlands", price: 419000, beds: 3, baths: 2, sqft: 1850, addr: "9340 Pecan Grove Dr, Dallas, TX 75238", note: "Mid-century ranch with big windows, close to the White Rock Lake trails.", style: "ranch", wall: "#F4F1EC", roof: "#6F87A3", sky: "#E3EAF1" },
    { hood: "Lake Highlands", price: 349000, beds: 2, baths: 2, sqft: 1320, addr: "10115 Sunflower Ln, Dallas, TX 75243", note: "Updated townhome with a private patio and an attached garage.", tag: "Price improved", style: "townhome", wall: "#FFFFFF", roof: "#3A3E42", sky: "#DCE5EE" },
    { hood: "Garland", price: 289500, beds: 2, baths: 2, sqft: 1280, addr: "615 Cedar Crest Ct, Garland, TX 75040", note: "Low-maintenance starter home on a quiet cul-de-sac.", tag: "Under $300K", style: "cottage", wall: "#FFFFFF", roof: "#3A3E42", sky: "#F3E6CF" },
    { hood: "Garland", price: 315000, beds: 3, baths: 2, sqft: 1560, addr: "2814 Prairie Rose Dr, Garland, TX 75044", note: "One-story home with a large backyard and a two-car garage.", style: "ranch", wall: "#C9B8A3", roof: "#4F6B8A", sky: "#E3EAF1" },
    { hood: "Richardson", price: 415000, beds: 3, baths: 2.5, sqft: 1920, addr: "1907 Magnolia Lane, Richardson, TX 75080", note: "Two-story home near parks and a short drive to UT Dallas.", tag: "New listing", style: "twostory", wall: "#FFFFFF", roof: "#6F87A3", sky: "#DCE5EE" },
    { hood: "Richardson", price: 449000, beds: 4, baths: 2.5, sqft: 2240, addr: "2530 Lantana Dr, Richardson, TX 75081", note: "Four bedrooms with a home office and an updated kitchen.", style: "twostory", wall: "#E9E1D3", roof: "#3A3E42", sky: "#F3E6CF" },
    { hood: "Mesquite", price: 274900, beds: 3, baths: 2, sqft: 1490, addr: "433 Live Oak Trl, Mesquite, TX 75150", note: "Brick home on a large corner lot with mature shade trees.", tag: "Under $300K", style: "ranch", wall: "#9A7562", roof: "#6F87A3", sky: "#E3EAF1" },
    { hood: "Mesquite", price: 339000, beds: 4, baths: 2, sqft: 2050, addr: "1716 Bluestem Dr, Mesquite, TX 75149", note: "Room to grow: four bedrooms and a flexible second living area.", style: "twostory", wall: "#C9B8A3", roof: "#4F6B8A", sky: "#DCE5EE" },
    { hood: "Irving", price: 335000, beds: 3, baths: 2, sqft: 1610, addr: "1120 Windmill Way, Irving, TX 75060", note: "Updated ranch with an easy commute to Las Colinas and DFW Airport.", tag: "Open house Sunday", style: "bungalow", wall: "#FFFFFF", roof: "#4F6B8A", sky: "#F3E6CF" }
  ];

  const $ = id => document.getElementById(id);
  const grid = $("homeGrid");
  if (!grid) return;
  const money = n => "$" + n.toLocaleString("en-US");
  const state = { zip: "", max: Infinity, beds: 0, sort: "low" };

  /* ---------- Simple house drawings (one per listing) ---------- */
  function art(h, i) {
    const g = "#8F9A82", win = "#E6E9EC", door = h.roof;
    const tree = `<circle cx="${i % 2 ? 352 : 52}" cy="208" r="24" fill="#7F8A73"/>`;
    const shapes = {
      ranch: `<polygon points="70,152 200,104 330,152" fill="${h.roof}"/><rect x="84" y="150" width="232" height="84" fill="${h.wall}"/>
              <rect x="186" y="182" width="28" height="52" fill="${door}"/><rect x="106" y="170" width="46" height="30" fill="${win}"/><rect x="248" y="170" width="46" height="30" fill="${win}"/>`,
      bungalow: `<polygon points="96,150 200,92 304,150" fill="${h.roof}"/><rect x="108" y="148" width="184" height="86" fill="${h.wall}"/>
              <rect x="100" y="182" width="200" height="8" fill="${h.roof}" opacity=".85"/><rect x="112" y="190" width="6" height="44" fill="${h.roof}"/><rect x="282" y="190" width="6" height="44" fill="${h.roof}"/>
              <rect x="188" y="196" width="24" height="38" fill="${door}"/><rect x="130" y="158" width="36" height="20" fill="${win}"/><rect x="234" y="158" width="36" height="20" fill="${win}"/>`,
      townhome: `<polygon points="80,138 150,96 220,138" fill="${h.roof}"/><polygon points="180,138 250,96 320,138" fill="${h.roof}"/>
              <rect x="92" y="136" width="116" height="98" fill="${h.wall}"/><rect x="192" y="136" width="116" height="98" fill="#F1EDE6"/>
              <rect x="138" y="190" width="24" height="44" fill="${door}"/><rect x="238" y="190" width="24" height="44" fill="${door}"/>
              <rect x="110" y="150" width="30" height="24" fill="${win}"/><rect x="160" y="150" width="30" height="24" fill="${win}"/><rect x="210" y="150" width="30" height="24" fill="${win}"/><rect x="260" y="150" width="30" height="24" fill="${win}"/>`,
      cottage: `<polygon points="118,150 200,98 282,150" fill="${h.roof}"/><rect x="130" y="148" width="140" height="86" fill="${h.wall}"/>
              <rect x="188" y="182" width="24" height="52" fill="${door}"/><rect x="146" y="166" width="28" height="24" fill="${win}"/><rect x="226" y="166" width="28" height="24" fill="${win}"/>
              <circle cx="318" cy="70" r="24" fill="#E3C27F"/>`,
      twostory: `<polygon points="96,104 200,62 304,104" fill="${h.roof}"/><rect x="108" y="102" width="184" height="132" fill="${h.wall}"/>
              <rect x="108" y="166" width="184" height="4" fill="${h.roof}" opacity=".35"/>
              <rect x="128" y="118" width="34" height="30" fill="${win}"/><rect x="183" y="118" width="34" height="30" fill="${win}"/><rect x="238" y="118" width="34" height="30" fill="${win}"/>
              <rect x="128" y="184" width="34" height="30" fill="${win}"/><rect x="238" y="184" width="34" height="30" fill="${win}"/><rect x="188" y="184" width="24" height="50" fill="${door}"/>`
    };
    return `<svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="400" height="300" fill="${h.sky}"/><rect y="232" width="400" height="68" fill="${g}"/>${tree}${shapes[h.style]}
      <rect x="186" y="234" width="28" height="66" fill="#D6CBB8"/></svg>`;
  }

  // Stable index (keeps each drawing the same) + ZIP pulled from the address
  HOMES.forEach((h, i) => { h.i = i; h.zip = h.addr.slice(-5); });

  function render() {
    let list = HOMES.filter(h =>
      h.zip.startsWith(state.zip) && h.price <= state.max && h.beds >= state.beds);
    list.sort((a, b) => state.sort === "low" ? a.price - b.price : state.sort === "high" ? b.price - a.price : b.sqft - a.sqft);

    $("homeCount").textContent = list.length === HOMES.length
      ? `Showing all ${HOMES.length} homes`
      : `Showing ${list.length} of ${HOMES.length} homes`;
    $("clearFilters").hidden = !list.length || (state.zip === "" && state.max === Infinity && state.beds === 0);

    if (!list.length) {
      grid.innerHTML = `<div class="empty"><strong>No homes match these filters.</strong>
        <p>Try another ZIP code, a higher price, or fewer bedrooms.</p>
        <button type="button" class="btn btn-line" data-clear>Clear filters</button></div>`;
      grid.querySelector("[data-clear]").addEventListener("click", clear);
      return;
    }
    grid.innerHTML = list.map(h => `
      <article class="home-card">
        <div class="house-art">${art(h, h.i)}${h.tag ? `<span class="sign">${h.tag}</span>` : ""}</div>
        <span class="hood-name">${h.hood}</span>
        <div class="price">${money(h.price)}</div>
        <div class="addr">${h.addr}</div>
        <div class="facts">${h.beds} bed, ${h.baths} bath, ${h.sqft.toLocaleString("en-US")} sq ft</div>
        <p class="blurb">${h.note}</p>
      </article>`).join("");
  }

  /* ---------- Controls ---------- */
  const zip = $("zipInput");
  $("zipList").innerHTML = [...new Set(HOMES.map(h => h.zip))].sort().map(z => `<option value="${z}">`).join("");
  zip.addEventListener("input", () => {
    zip.value = zip.value.replace(/\D/g, "").slice(0, 5);
    state.zip = zip.value;
    render();
  });
  $("maxPrice").addEventListener("change", e => { state.max = e.target.value === "any" ? Infinity : +e.target.value; render(); });
  $("minBeds").addEventListener("change", e => { state.beds = +e.target.value; render(); });
  $("sortBy").addEventListener("change", e => { state.sort = e.target.value; render(); });

  function clear() {
    zip.value = ""; $("maxPrice").value = "any"; $("minBeds").value = "0";
    state.zip = ""; state.max = Infinity; state.beds = 0;
    render();
  }
  $("clearFilters").addEventListener("click", clear);

  render();
})();
