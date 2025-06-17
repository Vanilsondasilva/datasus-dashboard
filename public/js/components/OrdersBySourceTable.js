import * as XLSX from "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/+esm";

export function renderOrdersBySourceTable(container) {
  // Dados de exemplo
  const columns = [
    "Date", "Affiliate", "Facebook", "Google", "Organic", "Twitter", "LinkedIn", "Instagram", "Reddit", "YouTube", "Row totals"
  ];
  const rows = [
    ["Q2 2022", "$604.78", "$323.49", "$821.35", "$767.35", "$734.19", "$222.10", "$100.00", "$150.00", "$200.00", "$3,923.26"],
    ["Q3 2022", "$2,373.82", "$3,144.64", "$2,701.21", "$2,120.95", "$3,194.43", "$1,100.00", "$500.00", "$300.00", "$400.00", "$15,835.05"],
    ["Q4 2022", "$4,911.67", "$4,172.14", "$4,938.26", "$4,320.61", "$5,372.74", "$2,000.00", "$900.00", "$800.00", "$700.00", "$28,115.42"],
    ["Q1 2023", "$6,414.82", "$8,212.57", "$6,302.38", "$6,779.43", "$7,348.29", "$3,000.00", "$1,200.00", "$1,000.00", "$900.00", "$41,157.49"],
    ["Q2 2023", "$7,909.77", "$9,428.63", "$8,266.63", "$9,298.75", "$7,545.83", "$4,200.00", "$1,500.00", "$1,200.00", "$1,100.00", "$50,389.61"],
    ["Q3 2023", "$10,897.61", "$10,652.00", "$12,211.56", "$10,648.20", "$10,069.40", "$5,500.00", "$2,100.00", "$1,500.00", "$1,300.00", "$65,878.77"],
    ["Q4 2023", "$11,310.47", "$14,220.55", "$13,035.58", "$13,572.71", "$13,205.74", "$6,400.00", "$2,600.00", "$2,000.00", "$1,600.00", "$78,945.05"],
    ["Q1 2024", "$18,478.06", "$23,037.56", "$20,729.70", "$20,989.27", "$23,301.54", "$8,500.00", "$3,200.00", "$2,400.00", "$2,100.00", "$122,736.13"],
    ["Q2 2024", "$21,513.83", "$25,680.32", "$22,949.31", "$23,761.29", "$24,738.20", "$10,200.00", "$4,000.00", "$2,900.00", "$2,400.00", "$138,883.95"],
    ["Q3 2024", "$23,966.70", "$24,583.81", "$26,848.70", "$26,332.24", "$25,082.21", "$11,300.00", "$4,400.00", "$3,100.00", "$2,700.00", "$148,363.66"],
    ["Q4 2024", "$25,000.00", "$25,000.00", "$28,000.00", "$27,000.00", "$26,500.00", "$12,000.00", "$4,800.00", "$3,500.00", "$3,000.00", "$154,800.00"],
    ["Q1 2025", "$25,500.00", "$26,500.00", "$29,500.00", "$28,000.00", "$27,800.00", "$13,000.00", "$5,000.00", "$3,900.00", "$3,200.00", "$162,400.00"],
    ["Q2 2025", "$26,500.00", "$27,200.00", "$30,000.00", "$29,000.00", "$28,500.00", "$13,600.00", "$5,300.00", "$4,100.00", "$3,400.00", "$167,600.00"],
  ];

  function generateTableHTML() {
    return `
      <table class="orders-by-source-table">
        <thead>
          <tr>
            ${columns.map(col => `<th>${col}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows.map(row => `
            <tr>
              ${row.map((cell, j) =>
                j === row.length - 1
                  ? `<td class="row-total">${cell}</td>`
                  : `<td>${cell}</td>`
              ).join("")}
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }

  container.innerHTML = `
    <section class="orders-by-source-section">
      <div class="orders-by-source-card">
        <div class="orders-by-source-card-header">
          <h3>Orders according to sources per quarter</h3>
          <div class="orders-by-source-download">
            <button id="download-xlsx" title="Download as XLSX" class="download-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 10V3a1 1 0 0 0-2 0v7H8l3 4 3-4h-2zm-8 5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 1 0-2 0v1H7v-1a1 1 0 0 0-2 0v1z"/></svg>
              XLSX
            </button>
            <button id="download-csv" title="Download as CSV" class="download-btn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 10V3a1 1 0 0 0-2 0v7H8l3 4 3-4h-2zm-8 5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 1 0-2 0v1H7v-1a1 1 0 0 0-2 0v1z"/></svg>
              CSV
            </button>
          </div>
        </div>
        <div class="orders-by-source-table-wrapper">
          ${generateTableHTML()}
        </div>
      </div>
    </section>
  `;

  // Download CSV
  container.querySelector("#download-csv").onclick = function() {
    let csv = columns.join(",") + "\n" +
      rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(",")).join("\n");
    let blob = new Blob([csv], { type: 'text/csv' });
    let a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = "orders-by-source.csv";
    a.click();
  };

  // Download XLSX
  container.querySelector("#download-xlsx").onclick = function() {
    let ws = XLSX.utils.aoa_to_sheet([columns, ...rows]);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    XLSX.writeFile(wb, "orders-by-source.xlsx");
  };
}