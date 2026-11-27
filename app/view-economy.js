// Economy: where output is produced (provinces ranked by GDP), how the sector
// mix has changed since 2000, and the 2024 economy as a fact sheet.

import { sectorShares, economyFacts } from './data-national.js';
import { provinces, nationalGdp2024 } from './data-provinces.js';
import { hbarChart } from './charts.js';

export function render(app) {
  const top = [...provinces].sort((a, b) => b.gdp2024 - a.gdp2024).slice(0, 12);
  const topRows = top.map((p) => [p.name, Math.round(p.gdp2024)]);
  const sectorRows = sectorShares.map((s) => `
    <tr><td>${s.year}</td><td class="num">${s.primary.toFixed(1)}%</td>
    <td class="num">${s.secondary.toFixed(1)}%</td><td class="num">${s.tertiary.toFixed(1)}%</td></tr>`).join('');
  const facts = economyFacts.map((f) => `
    <li><span>${f[0]}</span><span>${f[1] === '—' ? f[2] : `${f[1]} · ${f[2]}`}</span></li>`).join('');

  app.innerHTML = `
    <h1>The economy</h1>
    <p class="lede">China produced ¥134.81 trillion of output in 2024 — about $18.93 trillion.
    Two coastal provinces, Guangdong and Jiangsu, account for a fifth of it between them,
    and services now outweigh farming and industry combined.</p>

    <div class="card">
      <h3>Gross regional product by province, 2024 — top 12</h3>
      <p class="card-sub">Billion yuan at current prices, revised after the fifth economic census.
      Guangdong alone (¥14,148.9 bn) is a top-ten world economy standing by itself.</p>
      <canvas id="prov-gdp"></canvas>
      <p class="source">Source: NBS provincial GDP, 2024 revised. Full table on the <a href="#/provinces">Provinces</a> page.</p>
    </div>

    <h2>From farms and factories to services</h2>
    <p>In 2000 one worker in seven was in farming and industry was close to half the economy.
    By 2024 farming was under 7% and services — retail, finance, software, health, education —
    were 56.7% of everything produced.</p>
    <div class="table-wrap">
      <table class="data">
        <thead><tr><th>Year</th><th class="num">Farming &amp; primary</th><th class="num">Industry &amp; construction</th><th class="num">Services</th></tr></thead>
        <tbody>${sectorRows}</tbody>
      </table>
    </div>

    <h2>The 2024 economy in facts</h2>
    <p>The year's headline indicators, from the Statistical Communiqué published in February 2025.</p>
    <div class="card">
      <ul class="facts">${facts}</ul>
      <p class="source">Source: Statistical Communiqué of the People's Republic of China on National Economic and Social Development, 2024.</p>
    </div>

    <div class="note">Provincial GDP figures are the revised 2024 values. Provincial shares of the
    national total are computed against the revised national GDP of ¥${nationalGdp2024.toLocaleString('en-US')} billion;
    because of statistical discrepancy the provincial figures do not sum exactly to the national one.</div>`;

  hbarChart(app.querySelector('#prov-gdp'), topRows, { color: '#2456a6', digits: 0, unit: '' });
}
