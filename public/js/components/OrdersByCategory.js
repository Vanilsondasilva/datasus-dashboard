export function renderOrdersByCategory(container) {
  container.innerHTML = `
    <section class="orders-by-category-section">
      <div class="orders-by-category-card">
        <h3>Orders by product category</h3>
        <canvas id="ordersByCategoryLineChart"></canvas>
      </div>
    </section>
  `;

  // Dados de exemplo, adapte conforme necessário!
  const labels = [
    'Q2 2022', 'Q3 2022', 'Q4 2022', 'Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023',
    'Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'
  ];
  const data = {
    labels,
    datasets: [
      {
        label: 'Doohickey',
        data: [15, 51, 111, 192, 224, 243, 262, 309, 371, 392, 415],
        borderColor: '#7C3AED',
        backgroundColor: 'rgba(124,58,237,0.08)',
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#7C3AED',
      },
      {
        label: 'Gadget',
        data: [0, 51, 111, 133, 167, 224, 243, 262, 320, 333, 333],
        borderColor: '#A5B4FC',
        backgroundColor: 'rgba(165,180,252,0.08)',
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#A5B4FC',
      },
      {
        label: 'Gizmo',
        data: [0, 0, 51, 111, 167, 243, 324, 371, 392, 415, 415],
        borderColor: '#67E8F9',
        backgroundColor: 'rgba(103,232,249,0.08)',
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#67E8F9',
      },
      {
        label: 'Widget',
        data: [0, 15, 51, 133, 192, 224, 324, 309, 320, 333, 333],
        borderColor: '#2563EB',
        backgroundColor: 'rgba(37,99,235,0.08)',
        fill: false,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#2563EB',
      },
      {
        label: 'Goal',
        data: [100, 150, 200, 250, 300, 350, 400, 400, 400, 400, 400],
        borderColor: '#888',
        borderDash: [6, 6],
        pointRadius: 0,
        fill: false,
        borderWidth: 2,
        type: 'line'
      }
    ]
  };

  const ctx = document.getElementById('ordersByCategoryLineChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      plugins: {
        legend: {
          display: true,
          position: 'top',
          labels: {
            usePointStyle: true,
            padding: 20
          }
        },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          beginAtZero: true,
          grid: { color: '#f0f0f0' }
        }
      },
      elements: {
        line: {
          borderWidth: 3
        }
      }
    }
  });
}