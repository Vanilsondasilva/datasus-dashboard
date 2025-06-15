// FilterBox.js - Versão completa com dados fictícios e dropdowns

// Dados fictícios para os filtros
const filterData = {
    'date-range': [
        { value: 'today', label: 'Hoje' },
        { value: 'yesterday', label: 'Ontem' },
        { value: 'last-7-days', label: 'Últimos 7 dias' },
        { value: 'last-30-days', label: 'Últimos 30 dias' },
        { value: 'last-90-days', label: 'Últimos 90 dias' },
        { value: 'this-month', label: 'Este mês' },
        { value: 'last-month', label: 'Mês passado' },
        { value: 'this-year', label: 'Este ano' },
        { value: 'custom', label: 'Período personalizado' }
    ],
    'date-grouping': [
        { value: 'daily', label: 'Diário' },
        { value: 'weekly', label: 'Semanal' },
        { value: 'monthly', label: 'Mensal' },
        { value: 'quarterly', label: 'Trimestral' },
        { value: 'yearly', label: 'Anual' }
    ],
    'product-category': [
        { value: 'electronics', label: 'Eletrônicos' },
        { value: 'clothing', label: 'Roupas e Acessórios' },
        { value: 'home-garden', label: 'Casa e Jardim' },
        { value: 'books', label: 'Livros' },
        { value: 'sports', label: 'Esportes e Lazer' },
        { value: 'health-beauty', label: 'Saúde e Beleza' },
        { value: 'automotive', label: 'Automotivo' },
        { value: 'toys-games', label: 'Brinquedos e Jogos' },
        { value: 'food-beverages', label: 'Alimentos e Bebidas' },
        { value: 'office-supplies', label: 'Material de Escritório' }
    ],
    'vendor': [
        { value: 'amazon', label: 'Amazon Brasil' },
        { value: 'mercado-livre', label: 'Mercado Livre' },
        { value: 'magazine-luiza', label: 'Magazine Luiza' },
        { value: 'americanas', label: 'Americanas' },
        { value: 'casas-bahia', label: 'Casas Bahia' },
        { value: 'extra', label: 'Extra' },
        { value: 'submarino', label: 'Submarino' },
        { value: 'shoptime', label: 'Shoptime' },
        { value: 'carrefour', label: 'Carrefour' },
        { value: 'walmart', label: 'Walmart' },
        { value: 'ponto-frio', label: 'Ponto Frio' },
        { value: 'fast-shop', label: 'Fast Shop' }
    ]
};

// Estado global dos filtros
let activeFilters = {
    'date-range': null,
    'date-grouping': 'monthly',
    'product-category': null,
    'vendor': null
};

export function renderFilterBox(container) {
    container.innerHTML = `
        <section class="dashboard-filters">
            <div class="filter-dropdown-container">
                <button class="filter-btn" data-filter="date-range">
                    <i class="fas fa-calendar-alt"></i>
                    <span class="filter-label">Date Range</span>
                    <i class="fas fa-chevron-down chevron"></i>
                </button>
                <div class="filter-dropdown" data-filter="date-range"></div>
            </div>
            
            <div class="filter-dropdown-container">
                <button class="filter-btn" data-filter="date-grouping">
                    <i class="fas fa-clock"></i>
                    <span class="filter-label">Date Grouping</span>
                    <i class="fas fa-chevron-down chevron"></i>
                </button>
                <div class="filter-dropdown" data-filter="date-grouping"></div>
            </div>
            
            <div class="filter-dropdown-container">
                <button class="filter-btn" data-filter="product-category">
                    <i class="fas fa-tag"></i>
                    <span class="filter-label">Product Category</span>
                    <i class="fas fa-chevron-down chevron"></i>
                </button>
                <div class="filter-dropdown" data-filter="product-category"></div>
            </div>
            
            <div class="filter-dropdown-container">
                <button class="filter-btn" data-filter="vendor">
                    <i class="fas fa-store"></i>
                    <span class="filter-label">Vendor</span>
                    <i class="fas fa-chevron-down chevron"></i>
                </button>
                <div class="filter-dropdown" data-filter="vendor"></div>
            </div>
        </section>
    `;
    
    // Inicializar interações após renderizar
    initializeFilterInteractions(container);
    
    // Definir valores padrão
    updateFilterLabel('date-grouping', 'monthly');
}

export function initializeFilterInteractions(container) {
    const filterButtons = container.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });
    
    // Inicializar handler para cliques fora
    initializeOutsideClickHandler();
}

function handleFilterClick(event) {
    event.stopPropagation();
    const button = event.currentTarget;
    const filterType = button.dataset.filter;
    const container = button.closest('.filter-dropdown-container');
    const dropdown = container.querySelector('.filter-dropdown');
    
    // Fechar outros dropdowns
    closeAllDropdowns();
    
    // Toggle do dropdown atual
    const isOpen = button.classList.contains('open');
    
    if (!isOpen) {
        button.classList.add('open');
        dropdown.classList.add('show');
        renderDropdownContent(dropdown, filterType);
    }
}

function renderDropdownContent(dropdown, filterType) {
    const options = filterData[filterType] || [];
    const currentValue = activeFilters[filterType];
    
    dropdown.innerHTML = `
        <div class="dropdown-content">
            ${options.map(option => `
                <div class="dropdown-item ${currentValue === option.value ? 'selected' : ''}" 
                     data-value="${option.value}" 
                     data-filter="${filterType}">
                    ${option.label}
                    ${currentValue === option.value ? '<i class="fas fa-check"></i>' : ''}
                </div>
            `).join('')}
        </div>
    `;
    
    // Adicionar event listeners aos itens
    dropdown.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', handleDropdownItemClick);
    });
}

function handleDropdownItemClick(event) {
    event.stopPropagation();
    const item = event.currentTarget;
    const filterType = item.dataset.filter;
    const value = item.dataset.value;
    const label = item.textContent.trim();
    
    // Atualizar estado
    activeFilters[filterType] = value;
    
    // Atualizar label do botão
    updateFilterLabel(filterType, value);
    
    // Fechar dropdown
    closeAllDropdowns();
    
    // Disparar evento personalizado
    dispatchFilterChange(filterType, value, label);
}

function updateFilterLabel(filterType, value) {
    const button = document.querySelector(`[data-filter="${filterType}"]`);
    if (!button) return;
    
    const labelSpan = button.querySelector('.filter-label');
    const option = filterData[filterType]?.find(opt => opt.value === value);
    
    if (option && labelSpan) {
        labelSpan.textContent = option.label;
        button.classList.add('active');
    }
}

function closeAllDropdowns() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('open');
    });
    document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
        dropdown.classList.remove('show');
    });
}

function dispatchFilterChange(filterType, value, label) {
    const event = new CustomEvent('filterChange', {
        detail: {
            filterType,
            value,
            label,
            allFilters: { ...activeFilters }
        }
    });
    document.dispatchEvent(event);
    
    console.log('Filter changed:', { filterType, value, label, allFilters: activeFilters });
}

// Utilitário para fechar dropdowns ao clicar fora
export function initializeOutsideClickHandler() {
    document.addEventListener('click', (event) => {
        const isFilterElement = event.target.closest('.filter-dropdown-container');
        
        if (!isFilterElement) {
            closeAllDropdowns();
        }
    });
}

// Função para obter valores atuais dos filtros
export function getCurrentFilters() {
    return { ...activeFilters };
}

// Função para resetar todos os filtros
export function resetAllFilters() {
    activeFilters = {
        'date-range': null,
        'date-grouping': 'monthly',
        'product-category': null,
        'vendor': null
    };
    
    // Resetar labels dos botões
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const filterType = btn.dataset.filter;
        const labelSpan = btn.querySelector('.filter-label');
        
        if (filterType === 'date-grouping') {
            labelSpan.textContent = 'Mensal';
            btn.classList.add('active');
        } else {
            const defaultLabels = {
                'date-range': 'Date Range',
                'product-category': 'Product Category',
                'vendor': 'Vendor'
            };
            labelSpan.textContent = defaultLabels[filterType];
            btn.classList.remove('active');
        }
    });
    
    closeAllDropdowns();
}