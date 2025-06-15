export const APIS = {
  ANVISA_MEDICAMENTOS: {
    name: "Medicamentos ANVISA",
    baseUrl: "https://api.anvisa.gov.br/medicamentos",
    endpoints: {
      list: "/list",
      details: "/details/:id"
    },
    parser: (data) => { /* função para padronizar dados */ }
  },
  DATASUS_MORTALIDADE: {
    name: "Sistema de Mortalidade",
    baseUrl: "https://api.datasus.gov.br/mortalidade",
    endpoints: { ... },
    parser: (data) => { ... }
  }
  // Adicione quantas precisar
};