import { APIS } from './api-config.js';

export async function fetchFromApi(apiKey, endpointKey, params) {
  const api = APIS[apiKey];
  let url = api.baseUrl + api.endpoints[endpointKey];
  // Substitui :id, :param etc em url se necessário
  Object.keys(params || {}).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  // Chamada HTTP
  const response = await fetch(url);
  const data = await response.json();
  return api.parser(data);
}