export function renderHeader(container, activeTab = "overview") {
    container.innerHTML = `
        <header class="main-header">
            <h2>E-commerce Insights</h2>
            <nav>
                <a href="#" class="nav-link${activeTab === 'overview' ? ' active' : ''}" data-tab="overview">Overview</a>
                <a href="#" class="nav-link${activeTab === 'portfolio' ? ' active' : ''}" data-tab="portfolio">Portfolio Performance</a>
                <a href="#" class="nav-link${activeTab === 'website' ? ' active' : ''}" data-tab="website">Website Analysis</a>
            </nav>

            <div class="header-actions">
                <button class="icon-btn"><i class="fas fa-pen"></i></button>
                <button class="icon-btn"><i class="fas fa-upload"></i></button>
                <button class="icon-btn"><i class="fas fa-share-alt"></i></button>
                <button class="icon-btn"><i class="fas fa-info-circle"></i></button>
                <button class="icon-btn"><i class="fas fa-ellipsis-v"></i></button>
            </div>
        </header>
    `;

    // Adiciona eventos para troca de aba
    const navLinks = container.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            renderHeader(container, link.dataset.tab);
            // Aqui você renderizaria o conteúdo da aba selecionada também!
        });
    });
}