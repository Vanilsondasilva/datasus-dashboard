// Dados fictícios para o gráfico
const chartData = {
    labels: ['Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
             'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023',
             'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024',
             'Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024'],
    revenue: [2.7, 3.7, 7.7, 11.1, 13.0, 18.6, 20.6, 24.2, 28.5, 32.1, 38.6, 37.1,
              44.3, 47.7, 45.2, 41.8, 43.9, 46.1, 48.3, 50.2, 49.8, 47.2],
    orders: [318, 445, 520, 680, 750, 890, 1020, 1150, 1280, 1420, 1580, 1650,
             1780, 1920, 2100, 2250, 2380, 2500, 2650, 2800, 2950, 3100]
};

export function renderDashboard(container) {
    container.insertAdjacentHTML('beforeend', `
        <section class="dashboard-section">
            <h3>Anvisa - Medicamentos</h3>
            <p class="subtitle">This is where we monitor the health of our business, along with our progress against <em>key metrics</em></p>
            <div class="main-section">
                <div class="chart-section">
                    <div class="chart-header">
                        <h4>Revenue and orders over time</h4>
                        <div class="legend">
                            <span class="legend-item">
                                <span class="legend-dot revenue"></span>
                                Revenue
                            </span>
                            <span class="legend-item">
                                <span class="legend-dot orders"></span>
                                Orders
                            </span>
                        </div>
                    </div>
                    <div class="chart-container">
                        <canvas id="revenueChart"></canvas>
                    </div>
                </div>
                <div class="metrics-sidebar">
                    <div class="metric-cards-container" id="metric-cards-area"></div>
                </div>
            </div>
        </section>
    `);

    // Inicializar o gráfico após garantir que o DOM esteja pronto
    const initialize = () => {
        if (typeof Chart === 'undefined') {
            console.error('Chart.js não foi carregado. Verifique se o script está incluído no HTML.');
            return;
        }
        const ctx = document.getElementById('revenueChart');
        if (!ctx) {
            console.error('Canvas revenueChart não encontrado');
            return;
        }
        initializeChart(ctx);
    };
    requestAnimationFrame(initialize);

    // Renderizar os cards
    renderMetricCards(document.getElementById('metric-cards-area'));
}

function initializeChart(ctx) {
    // Validação básica dos dados
    if (!chartData.labels.length || !chartData.revenue.length || !chartData.orders.length) {
        console.error('Dados do gráfico inválidos');
        return;
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    type: 'line',
                    label: 'Revenue',
                    data: chartData.revenue,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    yAxisID: 'y'
                },
                {
                    type: 'bar',
                    label: 'Orders',
                    data: chartData.orders,
                    backgroundColor: '#6366f1',
                    borderColor: '#4f46e5',
                    borderWidth: 1,
                    borderRadius: 2,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#e5e7eb',
                    borderWidth: 1,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.label === 'Revenue') {
                                return `Revenue: $${context.parsed.y}k`;
                            } else {
                                return `Orders: ${context.parsed.y}`;
                            }
                        }
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { maxRotation: 45, color: '#666', font: { size: 11 } } },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: { display: true, text: 'Revenue ($k)', color: '#10b981', font: { weight: 'bold' } },
                    ticks: { color: '#666', callback: value => '$' + value + 'k' },
                    grid: { color: '#f3f4f6' }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: { display: true, text: 'Orders', color: '#6366f1', font: { weight: 'bold' } },
                    ticks: { color: '#666' },
                    grid: { drawOnChartArea: false }
                }
            }
        }
    });
}

function renderMetricCards(container) {
    container.innerHTML = `
        <div class="revenue-card">
            <div class="metric-header">
                <h4 class="metric-title">Revenue Per Quarter</h4>
            </div>
            <div class="metric-value">$132,631.24</div>
            <div class="metric-period">Q3 2024</div>
            <div class="metric-comparisons">
                <div class="comparison-item">
                    <span class="comparison-label">vs. previous quarter</span>
                    <span class="comparison-value">
                        <span class="comparison-change positive">↑ 7.06%</span>
                        <span class="comparison-baseline">$123.9k</span>
                    </span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-label">vs. Q3 2023</span>
                    <span class="comparison-value">
                        <span class="comparison-change positive">↑ 133.97%</span>
                        <span class="comparison-baseline">$56,686.65</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="revenue-card">
            <div class="metric-header">
                <h4 class="metric-title">Orders This Month</h4>
            </div>
            <div class="metric-value">2,847</div>
            <div class="metric-period">Oct 2024</div>
            <div class="metric-comparisons">
                <div class="comparison-item">
                    <span class="comparison-label">vs. last month</span>
                    <span class="comparison-value">
                        <span class="comparison-change positive">↑ 5.8%</span>
                        <span class="comparison-baseline">2,691</span>
                    </span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-label">vs. Oct 2023</span>
                    <span class="comparison-value">
                        <span class="comparison-change positive">↑ 95.5%</span>
                        <span class="comparison-baseline">1,456</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="revenue-card">
            <div class="metric-header">
                <h4 class="metric-title">Average Order Value</h4>
            </div>
            <div class="metric-value">$17.54</div>
            <div class="metric-period">Last 30 days</div>
            <div class="metric-comparisons">
                <div class="comparison-item">
                    <span class="comparison-label">vs. previous month</span>
                    <span class="comparison-value">
                        <span class="comparison-change positive">↑ 3.8%</span>
                        <span class="comparison-baseline">$16.89</span>
                    </span>
                </div>
                <div class="comparison-item">
                    <span class="comparison-label">vs. last year</span>
                    <span class="comparison-value">
                        <span class="comparison-change positive">↑ 15.2%</span>
                        <span class="comparison-baseline">$15.23</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="revenue-card">
            <div class="metric-header">
                <h4 class="metric-title">Revenue Goal For This Quarter</h4>
            </div>
            <div class="metric-value">$142,403</div>
            <div class="goal-container">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: 70%;"></div>
                </div>
                <div class="progress-labels">
                    <span>0</span>
                    <span>Goal $250,000</span>
                </div>
            </div>
        </div>
    `;
}