import sendRequest from './send-request';
const BASE_URL = '/api/list';

export function indexList(payload) {
  return sendRequest(`${BASE_URL}/index`, 'GET', payload);
}

export function createList(payload) {
  return sendRequest(`${BASE_URL}/create`, 'POST', payload);
}

export function getList(id) {
  return sendRequest(`${BASE_URL}/detail/${id}`, 'GET');
}

export function deleteList(id) {
  return sendRequest(`${BASE_URL}/delete/${id}`, 'DELETE');
}
