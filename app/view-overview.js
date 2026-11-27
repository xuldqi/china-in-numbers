// Overview: the headline numbers for the whole country, the two charts a
// visitor expects first (growth and the level of GDP), and the sector split.

import { headline, gdpGrowth, gdpLevel, sectorShares } from './data-national.js';
import { lineChart, barChart, donut } from './charts.js';

const h = headline;

function kpi(label, value, unit, sub) {
  return `<div class="kpi"><div class="kpi-label">${label}</div>
    <div class="kpi-value">${value}<span class="unit"> ${unit}</span></div>
    <div class="kpi-sub">${sub}</div></div>`;
}

export function render(app) {
  const s2024 = sectorShares[sectorShares.length - 1];
  app.innerHTML = `
    <h1>China in numbers</h1>
    <p class="lede">The headline statistics of the world's most populous economy —
    population, output, incomes and cities — drawn from China's official statistics
    and presented with the charts and tables behind each figure.</p>
    <div class="kpis">
      ${kpi('Population, end of 2024', '1,408.28', 'million', '<span class="delta-down">−1.39 million</span> in 2024 · 9.54m births, 10.93m deaths')}
      ${kpi('GDP, 2024', '¥134.81', 'trillion', '<span class="delta-up">+5.0%</span> real growth · $18.93 trillion at the average 2024 rate')}
      ${kpi('GDP per person, 2024', '¥95,749', '', 'Per-capita disposable income ¥41,314, <span class="delta-up">+5.3%</span>')}
      ${kpi('Urban share, 2024', '67.0', '%', '943.5 million urban residents, up 0.84 points in a year')}
      ${kpi('Life expectancy, 2024', '79.0', 'years', 'Up from 67.8 years in 1981')}
      ${kpi('Working-age share, 2020 census', '63.35', '%', 'Ages 15-59 · 18.70% of the population is 60 or over')}
    </div>

    <div class="card">
      <h3>Real GDP growth, 2000-2024</h3>
      <p class="card-sub">Percent change on the year before. The 2007 peak of 14.2%, the pandemic dip to 2.2% in 2020, and the 5.0% of 2024 are all in this one line.</p>
      <canvas id="growth"></canvas>
      <p class="source">Source: National Bureau of Statistics, annual GDP releases (revised series).</p>
    </div>

    <div class="two-col">
      <div class="card">
        <h3>GDP at current prices</h3>
        <p class="card-sub">Trillion yuan, benchmark years. Output has multiplied thirteen-fold since 2000.</p>
        <canvas id="level"></canvas>
        <p class="source">Source: NBS, fifth economic census revisions.</p>
      </div>
      <div class="card">
        <h3>What the economy is made of, 2024</h3>
        <p class="card-sub">Shares of GDP by sector. Services passed half of output in 2015 and keep rising.</p>
        <canvas id="sectors"></canvas>
        <div class="legend">
          <span><span class="swatch" style="background:#2e7d4f"></span>Farming &amp; primary ${s2024.primary}%</span>
          <span><span class="swatch" style="background:#2456a6"></span>Industry &amp; construction ${s2024.secondary}%</span>
          <span><span class="swatch" style="background:#c9920e"></span>Services ${s2024.tertiary}%</span>
        </div>
        <p class="source">Source: Statistical Communiqué 2024.</p>
      </div>
    </div>

    <h2>Explore the statistics</h2>
    <p>Every figure above has a page of its own.</p>
    <div class="kpis">
      ${kpi('Economy', '31', 'provinces ranked', 'Provincial GDP, sector change since 2000 and the 2024 economy in facts → <a href="#/economy">Economy</a>')}
      ${kpi('People', '1,411.8', 'million counted', 'The 2020 census: age pyramid, cities, life expectancy → <a href="#/people">People</a>')}
      ${kpi('Provinces', '126.0', 'million in Guangdong', 'All 31 provinces in one searchable, sortable table → <a href="#/provinces">Provinces</a>')}
    </div>`;

  lineChart(app.querySelector('#growth'), gdpGrowth, {
    unit: '%', color: '#b3372c', yDigits: 0,
    marks: [
      { x: 2007, label: 'Peak: 14.2%', dy: -12 },
      { x: 2020, label: 'Pandemic: 2.2%', dy: 17 },
    ],
  });
  barChart(app.querySelector('#level'), gdpLevel, { color: '#2456a6', digits: 0 });
  donut(app.querySelector('#sectors'), [
    { label: 'Primary', value: s2024.primary, color: '#2e7d4f' },
    { label: 'Secondary', value: s2024.secondary, color: '#2456a6' },
    { label: 'Services', value: s2024.tertiary, color: '#c9920e' },
  ], { centerTop: '¥134.8 tn', centerBottom: 'GDP, 2024' });
}
