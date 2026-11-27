// The 31 provincial-level divisions of mainland China.
// population: Seventh National Population Census, 1 November 2020 (persons).
// gdp2024: gross regional product 2024, billion yuan, revised after the fifth
//   national economic census (National Bureau of Statistics).
// urbanPct: urban share of the population, percent, mid-2022 NBS estimates.
// region: the conventional six-region grouping used by the NBS.

export const provinces = [
  { name: 'Guangdong', region: 'South Central', population: 126012510, gdp2024: 14148.9, urbanPct: 74.5 },
  { name: 'Shandong', region: 'East', population: 101527453, gdp2024: 9840.7, urbanPct: 64.5 },
  { name: 'Henan', region: 'South Central', population: 99365519, gdp2024: 6355.7, urbanPct: 55.7 },
  { name: 'Jiangsu', region: 'East', population: 84748016, gdp2024: 13669.7, urbanPct: 74.4 },
  { name: 'Sichuan', region: 'Southwest', population: 83674866, gdp2024: 6453.8, urbanPct: 58.3 },
  { name: 'Hebei', region: 'North', population: 74610235, gdp2024: 4744.8, urbanPct: 61.7 },
  { name: 'Hunan', region: 'South Central', population: 66444864, gdp2024: 5308.5, urbanPct: 60.3 },
  { name: 'Zhejiang', region: 'East', population: 64567588, gdp2024: 9000.7, urbanPct: 73.4 },
  { name: 'Anhui', region: 'East', population: 61027171, gdp2024: 5064.7, urbanPct: 60.2 },
  { name: 'Hubei', region: 'South Central', population: 58300000, gdp2024: 5964.4, urbanPct: 64.7 },
  { name: 'Guangxi', region: 'South Central', population: 50126804, gdp2024: 2869.4, urbanPct: 55.7 },
  { name: 'Yunnan', region: 'Southwest', population: 47209277, gdp2024: 3142.3, urbanPct: 51.7 },
  { name: 'Jiangxi', region: 'East', population: 45188635, gdp2024: 3422.8, urbanPct: 62.1 },
  { name: 'Liaoning', region: 'Northeast', population: 42591407, gdp2024: 3254.1, urbanPct: 73.0 },
  { name: 'Fujian', region: 'East', population: 41540086, gdp2024: 5747.7, urbanPct: 70.1 },
  { name: 'Shaanxi', region: 'Northwest', population: 39528999, gdp2024: 3543.7, urbanPct: 64.0 },
  { name: 'Guizhou', region: 'Southwest', population: 38562148, gdp2024: 2264.6, urbanPct: 54.8 },
  { name: 'Shanxi', region: 'North', population: 34915616, gdp2024: 2535.4, urbanPct: 63.9 },
  { name: 'Chongqing', region: 'Southwest', population: 32054159, gdp2024: 3204.7, urbanPct: 71.0 },
  { name: 'Heilongjiang', region: 'Northeast', population: 31850088, gdp2024: 1647.8, urbanPct: 66.2 },
  { name: 'Xinjiang', region: 'Northwest', population: 25852345, gdp2024: 2049.2, urbanPct: 57.9 },
  { name: 'Gansu', region: 'Northwest', population: 25019831, gdp2024: 1302.1, urbanPct: 54.2 },
  { name: 'Shanghai', region: 'East', population: 24870895, gdp2024: 5376.0, urbanPct: 89.3 },
  { name: 'Jilin', region: 'Northeast', population: 24073453, gdp2024: 1430.5, urbanPct: 63.7 },
  { name: 'Inner Mongolia', region: 'North', population: 24049155, gdp2024: 2633.7, urbanPct: 68.6 },
  { name: 'Beijing', region: 'North', population: 21893095, gdp2024: 4967.0, urbanPct: 87.6 },
  { name: 'Tianjin', region: 'North', population: 13866009, gdp2024: 1793.1, urbanPct: 85.1 },
  { name: 'Hainan', region: 'South Central', population: 10081232, gdp2024: 797.3, urbanPct: 61.4 },
  { name: 'Ningxia', region: 'Northwest', population: 7202654, gdp2024: 552.0, urbanPct: 66.3 },
  { name: 'Qinghai', region: 'Northwest', population: 5923957, gdp2024: 396.6, urbanPct: 61.5 },
  { name: 'Tibet', region: 'Southwest', population: 3648100, gdp2024: 278.9, urbanPct: 37.4 },
];

export const nationalGdp2024 = 134806.6; // billion yuan, for share calculations
