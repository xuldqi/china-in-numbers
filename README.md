# china-in-numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/xuldqi/china-in-numbers/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/xuldqi/china-in-numbers/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

China in Numbers is a national statistics site for China: the headline figures of the world's most populous economy — population, GDP, incomes, cities — presented with the charts and tables behind each number. Five sections (Overview, Economy, People, Provinces, Sources) cover real GDP growth since 2000, the 2020 census age pyramid, the move to the cities, all 31 provinces in a searchable and sortable table, and a sources page that names the official series behind every figure (National Bureau of Statistics communiqués, the 2020 census, and the fifth economic census revisions). Plain static files, no build step, no network calls: every chart is drawn by the site's own code from data held in the repository.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in a browser.

## Screenshots

The four files in `screenshots/` are real captures of the running site (taken 2026-11-27), not mock-ups:

- `1-overview.jpg` — the Overview page (`#/`)
- `2-economy.jpg` — the Economy page (`#/economy`)
- `3-provinces.jpg` — the Provinces page (`#/provinces`)
- `4-overview-phone.jpg` — the Overview page at phone size (`#/`)

`shots.json` declares which view each file shows. After every build, `main.ts` verifies that the dossier it wrote lists exactly these files and that each one is under the 256 KiB cap, and prints a one-line summary of the check.

---
<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
