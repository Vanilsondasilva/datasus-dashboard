import { renderHeader } from './components/Header.js';
import { renderFilterBox } from './components/FilterBox.js';
import { renderDashboard } from './components/Dashboard.js';
//import { renderMetricCards } from './components/Card.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    app.innerHTML = `
        <div class="app-container">
            <main id="main-content"></main>
        </div>
    `;
    const main = document.getElementById('main-content');

    // Crie containers separados
    const headerContainer = document.createElement('div');
    const filterContainer = document.createElement('div');
    const dashboardContainer = document.createElement('div');
   // const metricCardsContainer = document.createElement('div');

    // Renderize cada bloco no seu container
    renderHeader(headerContainer);
    renderFilterBox(filterContainer);
    renderDashboard(dashboardContainer);
  //  renderMetricCards(metricCardsContainer);

    // Monte na ordem correta
    main.appendChild(headerContainer);
    main.appendChild(filterContainer);
    main.appendChild(dashboardContainer);
  //  main.appendChild(metricCardsContainer);
});