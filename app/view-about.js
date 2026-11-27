// Sources and methods: exactly which official series each page uses, so any
// figure on the site can be traced back to its publication.

export function render(app) {
  app.innerHTML = `
    <h1>Sources and methods</h1>
    <p class="lede">Every figure on this site comes from a published official series.
    This page names them, series by series, so nothing here has to be taken on trust.</p>

    <h2>Principal sources</h2>
    <div class="card">
      <ul class="facts">
        <li><span>Statistical Communiqué on National Economic and Social Development</span><span>NBS, annual (2024 edition, Feb 2025)</span></li>
        <li><span>Seventh National Population Census</span><span>NBS, 2020 (counted 1 Nov 2020)</span></li>
        <li><span>Fifth National Economic Census revisions</span><span>NBS, 2024</span></li>
        <li><span>Provincial GDP and population tables</span><span>NBS provincial releases, 2024 / 2022</span></li>
        <li><span>Life expectancy for 2024</span><span>National Health Commission</span></li>
        <li><span>Marriage registrations</span><span>Ministry of Civil Affairs, 2024</span></li>
      </ul>
    </div>

    <h2>How the figures are used</h2>
    <p><strong>GDP levels</strong> are the revised series published after the fifth economic census;
    the 2024 national figure is ¥134.81 trillion. Growth rates are the published real
    (inflation-adjusted) rates for each year. Dollar conversions use the official annual
    average exchange rate for 2024, 7.1217 yuan per US dollar.</p>
    <p><strong>Population</strong> on the Overview and People pages is the year-end NBS estimate
    (1,408.28 million at the end of 2024). Provincial populations are the census counts of
    1 November 2020, the most recent complete enumeration; the two bases differ slightly
    and are labelled wherever they appear.</p>
    <p><strong>Provincial GDP</strong> figures are the revised 2024 values in current prices.
    Their sum differs from the national figure by the usual statistical discrepancy;
    shares on the Provinces page are computed against the national total and shown to
    two decimals.</p>
    <p><strong>Urban shares</strong> by province are the NBS mid-2022 estimates. The national
    urbanisation series is the annual year-end estimate.</p>
    <p><strong>The age pyramid</strong> is drawn from the 2020 census age-and-sex table,
    rounded to the nearest hundred thousand per band; band totals therefore differ
    trivially from the census headline.</p>
    <p><strong>The population, births and income series</strong> are the annual figures
    published in each year's Statistical Communiqué: year-end population (2020 aligned
    to the census), registered births for the year, and per-capita disposable income
    from the integrated household survey, which begins in 2013. The six-region table on
    the Provinces page is a sum of that page's own provincial figures, nothing more.</p>

    <div class="note">China in Numbers is an independent presentation of public statistics.
    It is not affiliated with the National Bureau of Statistics or any government body.
    Where an official figure is later revised, the revised value is the one shown.</div>`;
}
