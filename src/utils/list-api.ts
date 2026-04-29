import sendRequest from './send-request.js';

const BASE_URL = '/api/list';

export function indexList(payload: Record<string, string | number>) {
  return sendRequest(`${BASE_URL}/index`, 'GET', payload);
}

export function createList(listData: { [key: string]: string }) {
  return sendRequest(`${BASE_URL}/create`, 'POST', listData);
}

export function getList(id: string) {
  return sendRequest(`${BASE_URL}/detail/${id}`, 'GET');
}

export function deleteList(id: string) {
  return sendRequest(`${BASE_URL}/delete/${id}`, 'DELETE');
}

export function getListName(list_id:string){
  return sendRequest(`${BASE_URL}/${list_id}`, 'GET');
}