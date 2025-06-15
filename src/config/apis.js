export const APIS = {
  anvisaMedicamentos: {
    name: "Medicamentos ANVISA",
    baseUrl: "https://api.anvisa.gov.br/medicamentos",
    endpoints: {
      list: "/list",
      details: "/details/:id"
    },
    parser: (data) => { /* padroniza os dados */ }
  },
  datasusMortalidade: {
    name: "Sistema Mortalidade",
    baseUrl: "https://api.datasus.gov.br/mortalidade",
    endpoints: {
      list: "/list",
      byId: "/details/:id"
    },
    parser: (data) => { /* padroniza os dados */ }
  }
};