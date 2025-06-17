import { renderHeader } from './components/Header.js';
import { renderFilterBox } from './components/FilterBox.js';
import { renderDashboard } from './components/Dashboard.js';
import { renderMetricCards } from './components/Card.js';
import { renderDeeperDive } from './components/DeeperDive.js';
import { renderOrdersByCategory } from './components/OrdersByCategory.js';
import { renderOrdersBySourceTable } from './components/OrdersBySourceTable.js';



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
    const metricCardsContainer = document.createElement('div');
    const deeperDiveContainer = document.createElement('div');
    const ordersByCategoryContainer = document.createElement('div');
    const ordersBySourceTableContainer = document.createElement('div');



    // Renderize cada bloco no seu container
    renderHeader(headerContainer);
    renderFilterBox(filterContainer);
    renderDashboard(dashboardContainer);

    // Monte na ordem correta
    main.appendChild(headerContainer);
    main.appendChild(filterContainer);
    main.appendChild(dashboardContainer);
    main.appendChild(deeperDiveContainer);
    main.appendChild(ordersByCategoryContainer);
    main.appendChild(ordersBySourceTableContainer);


    // Agora sim, renderize o Deeper Dive (com canvas já no DOM)
    renderDeeperDive(deeperDiveContainer);
    renderOrdersByCategory(ordersByCategoryContainer);
    renderOrdersBySourceTable(ordersBySourceTableContainer);

     // Renderize os metric cards DENTRO do dashboard, no local correto
    const metricCardsArea = dashboardContainer.querySelector('#metric-cards-area');
    if (metricCardsArea) {
        renderMetricCards(metricCardsArea);
    }
});