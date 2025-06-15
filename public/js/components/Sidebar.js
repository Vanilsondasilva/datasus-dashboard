// Sidebar.js - Componente completo de navegação lateral

export function renderSidebar(container) {
    container.innerHTML = `
        <div class="sidebar-header">
            <h1>📊 DATASUS</h1>
            <p>Analytics em Saúde Pública</p>
        </div>
        <nav class="sidebar-nav">
            <div class="nav-section">
                <div class="nav-section-title">Dashboards</div>
                <div class="nav-item active" data-panel="medicamentos">
                    <span class="nav-item-icon">💊</span>
                    <span class="nav-item-text">Medicamentos</span>
                    <span class="nav-item-badge">ANVISA</span>
                </div>
                <div class="nav-item" data-panel="mortalidade">
                    <span class="nav-item-icon">📊</span>
                    <span class="nav-item-text">Mortalidade</span>
                    <span class="nav-item-badge">SIM</span>
                </div>
                <div class="nav-item" data-panel="hospitalar">
                    <span class="nav-item-icon">🏥</span>
                    <span class="nav-item-text">Hospitalar</span>
                    <span class="nav-item-badge">EM BREVE</span>
                </div>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Análises</div>
                <div class="nav-item" data-panel="correlacao">
                    <span class="nav-item-icon">🔗</span>
                    <span class="nav-item-text">Correlações</span>
                </div>
                <div class="nav-item" data-panel="tendencias">
                    <span class="nav-item-icon">📈</span>
                    <span class="nav-item-text">Tendências</span>
                </div>
            </div>
            
            <div class="nav-section">
                <div class="nav-section-title">Ferramentas</div>
                <div class="nav-item" data-panel="configuracoes">
                    <span class="nav-item-icon">⚙️</span>
                    <span class="nav-item-text">Configurações</span>
                </div>
                <div class="nav-item" data-panel="ajuda">
                    <span class="nav-item-icon">❓</span>
                    <span class="nav-item-text">Ajuda</span>
                </div>
            </div>
        </nav>
    `;

    // Adiciona evento para navegação de painel
    const navItems = container.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            // Dispara evento customizado para informar o painel selecionado
            const panel = this.getAttribute('data-panel');
            container.dispatchEvent(new CustomEvent('panelchange', { detail: { panel } }));
        });
    });
}