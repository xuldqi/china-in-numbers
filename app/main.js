// Router: one hash route per section, each view in its own module, loaded only
// when visited so the first load stays small.
//   #/            overview      #/economy    the economy
//   #/people      people        #/provinces  the 31 provinces, searchable
//   #/about       sources and methods
// window.__shotReady is false while a page renders and true once it is on
// screen, so a screenshot script knows when to capture.

const routes = {
  '': ['overview', () => import('./view-overview.js')],
  economy: ['economy', () => import('./view-economy.js')],
  people: ['people', () => import('./view-people.js')],
  provinces: ['provinces', () => import('./view-provinces.js')],
  about: ['about', () => import('./view-about.js')],
};

const app = document.getElementById('app');

async function render() {
  window.__shotReady = false;
  const key = location.hash.replace(/^#\//, '').split('/')[0];
  const route = routes[key] || routes[''];
  const [name, load] = route;
  document.querySelectorAll('.site-nav a').forEach((a) => {
    a.classList.toggle('active', a.dataset.nav === name);
  });
  const mod = await load();
  app.innerHTML = '';
  mod.render(app);
  window.scrollTo(0, 0);
  requestAnimationFrame(() => requestAnimationFrame(() => { window.__shotReady = true; }));
}

window.addEventListener('hashchange', render);
render();
