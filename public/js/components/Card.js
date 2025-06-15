// src/js/components/card.js

class MetricCards {
    constructor(container) {
        this.container = container;
        this.metrics = [
            {
                title: "Revenue per quarter",
                value: "$132,631.24",
                period: "Q3 2024",
                icon: "dollar-sign",
                comparisons: [
                    { label: "vs. previous quarter", baseline: "$123.9k", change: 7.06, isPositive: true },
                    { label: "vs. Q3 2023", baseline: "$56,686.65", change: 133.97, isPositive: true }
                ]
            },
            {
                title: "Orders this month",
                value: "2,847",
                period: "October 2024",
                icon: "shopping-cart",
                comparisons: [
                    { label: "vs. last month", baseline: "2,691", change: 5.8, isPositive: true },
                    { label: "vs. Oct 2023", baseline: "1,456", change: 95.5, isPositive: true }
                ]
            },
            {
                title: "Average order value",
                value: "$17.54",
                period: "Last 30 days",
                icon: "target",
                comparisons: [
                    { label: "vs. previous month", baseline: "$16.89", change: 3.8, isPositive: true },
                    { label: "vs. last year", baseline: "$15.23", change: 15.2, isPositive: true }
                ]
            },
            {
                title: "Revenue goal for this quarter",
                value: "$142,403",
                period: "Q3 2024",
                icon: "trending-up",
                isGoal: true,
                goalTotal: 250000,
                goalProgress: 142403
            }
        ];
    }

    getIcon(iconName) {
        const icons = {
            'dollar-sign': `<svg class="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="1" x2="12" y2="23"></line>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>`,
            'shopping-cart': `<svg class="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="m1 1 4 4 13 5-3 7H6"></path>
            </svg>`,
            'target': `<svg class="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
            </svg>`,
            'trending-up': `<svg class="metric-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
                <polyline points="16,7 22,7 22,13"></polyline>
            </svg>`,
            'arrow-up': `<svg class="comparison-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="19" x2="12" y2="5"></line>
                <polyline points="5,12 12,5 19,12"></polyline>
            </svg>`,
            'arrow-down': `<svg class="comparison-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19,12 12,19 5,12"></polyline>
            </svg>`
        };
        return icons[iconName] || '';
    }

    createComparisonItem(comparison) {
        const arrow = comparison.isPositive ? this.getIcon('arrow-up') : this.getIcon('arrow-down');
        const changeClass = comparison.isPositive ? 'positive' : 'negative';
        
        return `
            <div class="comparison-item">
                <span class="comparison-label">${comparison.label}:</span>
                <div class="comparison-value">
                    <span class="comparison-baseline">${comparison.baseline}</span>
                    <div class="comparison-change ${changeClass}">
                        ${arrow}
                        ${comparison.change}%
                    </div>
                </div>
            </div>
        `;
    }

    createGoalProgress(metric) {
        const progressPercentage = (metric.goalProgress / metric.goalTotal) * 100;
        
        return `
            <div class="goal-container">
                <div class="goal-title">Revenue goal for this quarter</div>
                <div class="goal-amount">$${metric.goalProgress.toLocaleString()}</div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercentage}%"></div>
                </div>
                <div class="progress-labels">
                    <span>0</span>
                    <span>Goal $${metric.goalTotal.toLocaleString()}</span>
                </div>
            </div>
        `;
    }

    createCard(metric) {
        const icon = this.getIcon(metric.icon);
        
        if (metric.isGoal) {
            return `
                <div class="metric-card">
                    <div class="metric-header">
                        ${icon}
                        <span class="metric-title">${metric.title}</span>
                    </div>
                    ${this.createGoalProgress(metric)}
                </div>
            `;
        }

        const comparisons = metric.comparisons
            .map(comp => this.createComparisonItem(comp))
            .join('');

        return `
            <div class="metric-card">
                <div class="metric-header">
                    ${icon}
                    <span class="metric-title">${metric.title}</span>
                </div>
                <div class="metric-value">${metric.value}</div>
                <div class="metric-period">${metric.period}</div>
                <div class="metric-comparisons">
                    ${comparisons}
                </div>
            </div>
        `;
    }

    render() {
        if (!this.container) {
            console.error('Container não encontrado');
            return;
        }

        const cardsHTML = this.metrics
            .map(metric => this.createCard(metric))
            .join('');

        this.container.innerHTML = `
            <div class="metric-cards-container">
                ${cardsHTML}
            </div>
        `;
    }

    // Método para atualizar dados dinamicamente
    updateMetric(index, newData) {
        if (this.metrics[index]) {
            this.metrics[index] = { ...this.metrics[index], ...newData };
            this.render();
        }
    }

    // Método para adicionar nova métrica
    addMetric(metric) {
        this.metrics.push(metric);
        this.render();
    }
}

// Função auxiliar para renderizar os cards
export function renderMetricCards(containerId) {
    const metricCards = new MetricCards(containerId); 
    metricCards.render();
    return metricCards;
}

// Exportar a classe para uso em outros módulos
export default MetricCards;