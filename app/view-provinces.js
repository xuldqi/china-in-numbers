// Provinces: all 31 provincial-level divisions in one table. The search box
// filters by name or region; clicking a column heading sorts by it (click again
// to reverse). Population is the 2020 census, GDP the revised 2024 figure.

import { provinces, nationalGdp2024 } from './data-provinces.js';

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const fmt = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

let sortKey = 'population';
let sortDir = -1;
let query = '';

const columns = [
  { key: 'name', label: 'Province', numeric: false },
  { key: 'region', label: 'Region', numeric: false },
  { key: 'population', label: 'Population, 2020', numeric: true },
  { key: 'gdp2024', label: 'GDP 2024, ¥ bn', numeric: true },
  { key: 'share', label: 'Share of GDP', numeric: true },
  { key: 'urbanPct', label: 'Urban share, 2022', numeric: true },
];

function rows() {
  const maxPop = Math.max(...provinces.map((p) => p.population));
  let list = provinces.map((p) => ({ ...p, share: (p.gdp2024 / nationalGdp2024) * 100 }));
  if (query) {
    const q = query.toLowerCase();
    list = list.filter((p) => p.name.toLowerCase().includes(q) || p.region.toLowerCase().includes(q));
  }
  list.sort((a, b) => {
    const av = a[sortKey], bv = b[sortKey];
    const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return cmp * sortDir;
  });
  return list.map((p) => `
    <tr>
      <td><strong>${esc(p.name)}</strong></td>
      <td>${esc(p.region)}</td>
      <td class="num bar-cell"><span class="bar" style="width:${Math.round((p.population / maxPop) * 100)}%"></span><span>${fmt(p.population)}</span></td>
      <td class="num">${fmt(p.gdp2024, 1)}</td>
      <td class="num">${fmt(p.share, 2)}%</td>
      <td class="num">${fmt(p.urbanPct, 1)}%</td>
    </tr>`).join('');
}

function regionRows() {
  const order = ['North', 'Northeast', 'East', 'South Central', 'Southwest', 'Northwest'];
  return order.map((region) => {
    const list = provinces.filter((p) => p.region === region);
    const pop = list.reduce((s, p) => s + p.population, 0);
    const gdp = list.reduce((s, p) => s + p.gdp2024, 0);
    return `<tr>
      <td><strong>${region}</strong></td>
      <td class="num">${list.length}</td>
      <td class="num">${fmt(pop / 1e6, 1)}</td>
      <td class="num">${fmt(gdp, 1)}</td>
      <td class="num">${fmt((gdp / nationalGdp2024) * 100, 1)}%</td>
    </tr>`;
  }).join('');
}

export function render(app) {
  app.innerHTML = `
    <h1>The 31 provinces</h1>
    <p class="lede">Every provincial-level division of mainland China — four municipalities,
    five autonomous regions and 22 provinces — with its census population, its 2024 output
    and how urban it is. Search, or click a heading to sort.</p>
    <div class="table-tools">
      <input type="search" id="q" placeholder="Search a province or region — try “East” or “Sichuan”" aria-label="Search provinces">
      <span class="count" id="count"></span>
    </div>
    <div class="table-wrap">
      <table class="data">
        <thead><tr>${columns.map((c) => `
          <th class="${c.numeric ? 'num' : ''}"><button data-sort="${c.key}">${c.label}<span data-arrow="${c.key}"></span></button></th>`).join('')}
        </tr></thead>
        <tbody id="tbody"></tbody>
      </table>
    </div>
    <div class="note">Guangdong's 126.0 million residents make it more populous than Japan.
    At the other end, Tibet's 3.6 million people live in an area of 1.2 million km² — three people
    per square kilometre. Shanghai is the most urban division (89.3% urban); Tibet the least (37.4%).</div>

    <h2>The six regions at a glance</h2>
    <p>The table above, rolled up into the NBS's six conventional regions. The east coast —
    seven divisions including Shanghai, Jiangsu and Zhejiang — holds 30% of the
    people and produces nearly two-fifths of the output.</p>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Region</th><th class="num">Divisions</th><th class="num">Population 2020, m</th><th class="num">GDP 2024, ¥ bn</th><th class="num">Share of GDP</th></tr></thead>
        <tbody>${regionRows()}</tbody>
      </table>
    </div>
    <p class="source" style="color:var(--ink-soft);font-size:12.5px">Sources: Seventh National Population Census (2020); NBS provincial GDP 2024 (revised); NBS urbanisation estimates (2022).</p>`;

  const tbody = app.querySelector('#tbody');
  const count = app.querySelector('#count');
  const draw = () => {
    tbody.innerHTML = rows();
    const shown = tbody.children.length;
    count.textContent = `${shown} of ${provinces.length} divisions`;
    app.querySelectorAll('[data-arrow]').forEach((el) => {
      el.textContent = el.dataset.arrow === sortKey ? (sortDir === -1 ? ' ↓' : ' ↑') : '';
    });
  };
  app.querySelector('#q').addEventListener('input', (e) => { query = e.target.value.trim(); draw(); });
  app.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.sort;
      if (key === sortKey) sortDir *= -1;
      else { sortKey = key; sortDir = key === 'name' || key === 'region' ? 1 : -1; }
      draw();
    });
  });
  draw();
}
