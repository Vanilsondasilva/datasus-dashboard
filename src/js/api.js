export async function buscarDadosMedicamentos() {
    const url = "URL_DA_API_ANVISA"; // substitua pelo endpoint real
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro na API');
        return await response.json();
    } catch (e) {
        // fallback para dados fictícios se desejar
        return gerarDadosExemplo();
    }
}

function gerarDadosExemplo() {
    // ... mesma lógica anterior, mas exportada daqui ...
}