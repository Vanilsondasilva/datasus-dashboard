import { buscarDadosMedicamentos } from './api.js';
import { criarGraficosMedicamentos } from './charts.js';

let dadosMedicamentos = [];

export async function carregarDadosMedicamentos() {
    mostrarLoading('medicamentos', true);
    try {
        dadosMedicamentos = await buscarDadosMedicamentos();
        // popular filtros, atualizar estatísticas, etc...
        criarGraficosMedicamentos(dadosMedicamentos);
    } catch (e) {
        alert('Erro ao carregar dados');
    } finally {
        mostrarLoading('medicamentos', false);
    }
}

export function aplicarFiltrosMedicamentos() {
    // filtra e atualiza os gráficos
}