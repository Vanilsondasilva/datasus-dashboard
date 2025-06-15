// DashboardMedicamentos.js - painel de medicamentos (dados fakes por enquanto)

export function renderDashboardMedicamentos(container) {
    container.insertAdjacentHTML('beforeend', `
        <section id="dashboard-medicamentos">
            <h3>Medicamentos ANVISA</h3>
            <div>
                <p>Total de medicamentos: <span id="total-medicamentos">0</span></p>
                <button id="btn-carregar-dados">Carregar Dados Fakes</button>
            </div>
            <div id="medicamentos-lista"></div>
        </section>
    `);

    document.getElementById('btn-carregar-dados').onclick = () => {
        const fakeData = [
            { nome: 'Paracetamol', laboratorio: 'EMS', preco: 12.5 },
            { nome: 'Ibuprofeno', laboratorio: 'Eurofarma', preco: 21.3 },
            { nome: 'Amoxicilina', laboratorio: 'Pfizer', preco: 35.8 },
        ];
        document.getElementById('total-medicamentos').textContent = fakeData.length;
        document.getElementById('medicamentos-lista').innerHTML = `
            <ul>
                ${fakeData.map(m => `<li>${m.nome} - ${m.laboratorio} - R$ ${m.preco.toFixed(2)}</li>`).join('')}
            </ul>
        `;
    };
}