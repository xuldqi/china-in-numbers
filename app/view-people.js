// People: the 2020 census in charts — the age pyramid, the age structure, the
// move to the cities and the lengthening of lives — plus the vital statistics
// of the most recent year.

import { pyramid2020, ageStructure2020, urbanisation, lifeExpectancy, headline, populationTotal, births } from './data-national.js';
import { pyramid, hbarChart, lineChart, barChart } from './charts.js';

export function render(app) {
  const ageRows = ageStructure2020.map((a) => [`Age ${a.band}`, a.pct]);
  app.innerHTML = `
    <h1>People</h1>
    <p class="lede">The seventh national census counted 1,411.8 million people on the mainland
    on 1 November 2020. It found a country that is older, far more urban and better educated
    than the one counted in 2010 — and, since 2022, a population that has begun to shrink.</p>

    <div class="card">
      <h3>A peak, then a turn: total population since 2000</h3>
      <p class="card-sub">Millions at each year end. Growth slowed through the 2010s, the total peaked
      at 1,412.6 million at the end of 2021, and it has fallen three years in a row since —
      by 1.39 million in 2024 alone, as deaths (10.93m) outran births (9.54m).</p>
      <canvas id="poptotal"></canvas>
      <p class="source">Source: NBS annual population estimates; 2020 aligned to the census.</p>
    </div>

    <div class="card">
      <h3>The population pyramid, 2020</h3>
      <p class="card-sub">Millions by five-year age band. The bulge now aged 30-39 is the last large
      generation; the bands beneath it narrow quickly, and the small cohorts born after 2016 are visible at the base.</p>
      <canvas id="pyramid"></canvas>
      <p class="source">Source: Seventh National Population Census, age and sex table (rounded).</p>
    </div>

    <div class="two-col">
      <div class="card">
        <h3>Age structure, 2020</h3>
        <p class="card-sub">Percent of the population. One person in five is over 60 by the broader measure used internationally.</p>
        <canvas id="ages"></canvas>
        <p class="source">Source: 2020 census communiqué. The 65+ band overlaps the 60+ band.</p>
      </div>
      <div class="card">
        <h3>Life expectancy</h3>
        <p class="card-sub">Years at birth. Eleven years of life have been added since 1981.</p>
        <canvas id="life"></canvas>
        <p class="source">Source: census years and the National Health Commission estimate for 2024.</p>
      </div>
    </div>

    <div class="card">
      <h3>The move to the cities</h3>
      <p class="card-sub">Urban share of the population, percent. In 1978 one Chinese resident in six lived in a town or city; in 2024 it is two in three — the largest urban migration in history, still running.</p>
      <canvas id="urban"></canvas>
      <p class="source">Source: NBS annual population estimates.</p>
    </div>

    <div class="card">
      <h3>Births, 2016-2024</h3>
      <p class="card-sub">Millions of babies born each year. The universal two-child policy made
      2016 the recent peak; births then halved in seven years, before a small rise in 2024,
      a dragon year — traditionally a popular one to be born in.</p>
      <canvas id="births"></canvas>
      <p class="source">Source: Statistical Communiqués 2016-2024.</p>
    </div>

    <h2>The census in facts</h2>
    <div class="card">
      <ul class="facts">
        <li><span>Sex ratio (men per 100 women), 2020</span><span>105.07</span></li>
        <li><span>Average household size, 2020</span><span>2.62 people</span></li>
        <li><span>Population with university education, 2020</span><span>218.4 million</span></li>
        <li><span>Internal migrants living away from their registration, 2020</span><span>492.8 million</span></li>
        <li><span>Births, 2024</span><span>${headline.birthsMillions} million</span></li>
        <li><span>Deaths, 2024</span><span>${headline.deathsMillions} million</span></li>
        <li><span>Population change, 2024</span><span>−1.39 million</span></li>
        <li><span>Marriages registered, 2024</span><span>6.11 million couples</span></li>
      </ul>
      <p class="source">Sources: 2020 census communiqué; Statistical Communiqué 2024; Ministry of Civil Affairs marriage statistics.</p>
    </div>`;

  lineChart(app.querySelector('#poptotal'), populationTotal, {
    color: '#17233b', yDigits: 0, yMin: 1200,
    marks: [{ x: 2021, label: 'Peak: 1,412.6m, end of 2021', dy: -12 }],
  });
  pyramid(app.querySelector('#pyramid'), pyramid2020);
  hbarChart(app.querySelector('#ages'), ageRows, { color: '#c9920e', digits: 2, unit: '%' });
  lineChart(app.querySelector('#life'), lifeExpectancy, { color: '#2e7d4f', unit: '', yDigits: 0, height: 210 });
  lineChart(app.querySelector('#urban'), urbanisation, { color: '#2456a6', unit: '%', yDigits: 0 });
  barChart(app.querySelector('#births'), births, { color: '#b3372c', digits: 2, unit: 'm' });
}
