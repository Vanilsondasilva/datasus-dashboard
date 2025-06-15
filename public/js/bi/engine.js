export function runCalculation(data, config) {
  // config = { groupBy: 'lab', aggregate: { price: 'avg' }, filter: { tipo: 'Genérico' } }
  let filtered = data;
  if (config.filter) {
    filtered = data.filter(item => Object.entries(config.filter)
      .every(([k, v]) => item[k] === v));
  }
  // Implemente groupBy, aggregate, etc
  // ...
  return resultado;
}