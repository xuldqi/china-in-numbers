// National headline figures and time series for China.
// Sources: National Bureau of Statistics of China — Statistical Communiqué 2024,
// the Seventh National Population Census (2020), and the fifth national economic
// census revisions (2024 figures marked "revised"). Values are the published ones;
// where a series is shown for selected years only, the years are the published ones.

export const headline = {
  // year-end 2024, Statistical Communiqué 2024
  populationMillions: 1408.28,
  populationChangeMillions: -1.39,
  birthsMillions: 9.54,
  deathsMillions: 10.93,
  gdpTrillionYuan: 134.81, // revised, fifth economic census
  gdpGrowthPct: 5.0,
  gdpUsdTrillion: 18.93, // at the 2024 average rate of 7.1217 yuan per dollar
  gdpPerCapitaYuan: 95749,
  urbanSharePct: 67.0,
  disposableIncomeYuan: 41314,
  disposableIncomeGrowthPct: 5.3,
  lifeExpectancyYears: 79.0,
};

// Real GDP growth, percent year on year, 2000-2024 (published annual rates).
export const gdpGrowth = [
  [2000, 8.5], [2001, 8.3], [2002, 9.1], [2003, 10.0], [2004, 10.1],
  [2005, 11.4], [2006, 12.7], [2007, 14.2], [2008, 9.7], [2009, 9.4],
  [2010, 10.6], [2011, 9.6], [2012, 7.9], [2013, 7.8], [2014, 7.4],
  [2015, 7.0], [2016, 6.8], [2017, 6.9], [2018, 6.7], [2019, 6.0],
  [2020, 2.2], [2021, 8.4], [2022, 3.0], [2023, 5.2], [2024, 5.0],
];

// GDP level, trillion yuan at current prices, benchmark years (revised series).
export const gdpLevel = [
  [2000, 10.13], [2005, 18.73], [2010, 41.93], [2015, 68.89],
  [2020, 103.49], [2021, 117.38], [2022, 123.40], [2023, 129.43], [2024, 134.81],
];

// Shares of GDP by sector, percent (primary / secondary / tertiary).
export const sectorShares = [
  { year: 2000, primary: 14.7, secondary: 45.9, tertiary: 39.4 },
  { year: 2010, primary: 9.3, secondary: 46.5, tertiary: 44.2 },
  { year: 2020, primary: 7.7, secondary: 37.8, tertiary: 54.5 },
  { year: 2024, primary: 6.8, secondary: 36.5, tertiary: 56.7 },
];

// Urban share of the population, percent, selected years.
export const urbanisation = [
  [1978, 17.9], [1990, 26.4], [2000, 36.2], [2010, 50.0],
  [2015, 56.1], [2020, 63.9], [2024, 67.0],
];

// Life expectancy at birth, years, census and official estimate years.
export const lifeExpectancy = [
  [1981, 67.8], [1990, 68.6], [2000, 71.4], [2010, 74.8], [2020, 77.9], [2024, 79.0],
];

// Age structure from the 2020 census, percent of the population.
export const ageStructure2020 = [
  { band: '0-14', pct: 17.95 },
  { band: '15-59', pct: 63.35 },
  { band: '60+', pct: 18.70 },
  { band: '65+', pct: 13.50 },
];

// Population by five-year age band and sex, 2020 census, millions (rounded from the
// census age table; bands sum to the census total of 1,411.8 million for the mainland
// plus service personnel counted in the census release).
export const pyramid2020 = [
  // band, male, female (millions)
  ['0-4', 40.9, 37.0], ['5-9', 45.4, 40.9], ['10-14', 44.4, 39.4],
  ['15-19', 38.0, 33.9], ['20-24', 38.9, 35.4], ['25-29', 48.5, 44.4],
  ['30-34', 61.4, 56.9], ['35-39', 51.9, 49.0], ['40-44', 50.6, 48.5],
  ['45-49', 58.6, 56.4], ['50-54', 56.9, 55.4], ['55-59', 48.2, 47.3],
  ['60-64', 36.6, 36.8], ['65-69', 36.9, 37.9], ['70-74', 24.4, 26.2],
  ['75-79', 15.9, 18.4], ['80+', 15.7, 21.9],
];

// Economy page facts, Statistical Communiqué 2024.
export const economyFacts = [
  ['Retail sales of consumer goods', '¥48.79 trillion', '+3.5%'],
  ['Fixed-asset investment', '¥51.44 trillion', '+3.1%'],
  ['Industrial value added (above-scale firms)', '—', '+5.8%'],
  ['Services value added', '¥76.56 trillion', '+5.0%'],
  ['Exports of goods', '¥25.45 trillion', '+7.1%'],
  ['Imports of goods', '¥18.39 trillion', '+2.3%'],
  ['Consumer price index', '—', '+0.2%'],
  ['Surveyed urban unemployment (year average)', '5.1%', '−0.1 pt'],
  ['New urban jobs created', '12.56 million', 'target met'],
  ['Grain output', '706.5 million tonnes', 'first year above 700 Mt'],
  ['Energy consumption per unit of GDP', '—', '−3.8%'],
  ['R&D spending', '¥3.61 trillion', '2.68% of GDP'],
];
