export function renderDeeperDive(container) {
  container.innerHTML = `
    <section class="deeper-dive-section">
      <h2>Deeper Dive</h2>
      <div class="deeper-dive-subtitle">
        Take a deeper look into product category and financial performance
      </div>
      <div class="deeper-dive-charts">
        <div class="deeper-dive-chart deeper-dive-pie">
          <h3>Total orders by product category</h3>
          <canvas id="deeperOrdersPieChart"></canvas>
        </div>
        <div class="deeper-dive-chart deeper-dive-bar">
          <h3>Revenue by product category</h3>
          <canvas id="deeperRevenueBarChart"></canvas>
        </div>
      </div>
    </section>
  `;

  // DADOS FICTÍCIOS
  const pieData = {
    labels: ['Doohickey', 'Gadget', 'Gizmo', 'Widget'],
    datasets: [{
      data: [3970, 4900, 4900, 5100],
      backgroundColor: ['#7C3AED', '#A5B4FC', '#67E8F9', '#2563EB'],
      borderWidth: 2,
    }]
  };

  const barData = {
    labels: ['July 2024', 'August 2024', 'September 2024', 'October 2024'],
    datasets: [
      {
        label: 'Doohickey',
        data: [8700, 7900, 8500, 8000],
        backgroundColor: '#7C3AED'
      },
      {
        label: 'Gadget',
        data: [10900, 12100, 9900, 11900],
        backgroundColor: '#A5B4FC'
      },
      {
        label: 'Gizmo',
        data: [11100, 10400, 11300, 13000],
        backgroundColor: '#67E8F9'
      },
      {
        label: 'Widget',
        data: [11500, 12000, 12300, 12800],
        backgroundColor: '#2563EB'
      }
    ]
  };

  // GRÁFICO PIE
  const pieCanvas = document.getElementById('deeperOrdersPieChart');
  if (pieCanvas) {
    const pieCtx = pieCanvas.getContext('2d');
    new Chart(pieCtx, {
      type: 'doughnut',
      data: pieData,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'left',
            labels: {
              boxWidth: 16,
              padding: 18
            }
          }
        },
        cutout: '70%',
        responsive: true
      }
    });
  } else {
    console.warn('Canvas deeperOrdersPieChart não encontrado');
  }

  // GRÁFICO BARRAS
  const barCanvas = document.getElementById('deeperRevenueBarChart');
  if (barCanvas) {
    const barCtx = barCanvas.getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: barData,
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    });
  } else {
    console.warn('Canvas deeperRevenueBarChart não encontrado');
  }
}