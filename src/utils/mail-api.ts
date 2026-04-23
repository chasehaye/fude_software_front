import sendRequest from './send-request';

const BASE_URL = '/api/mail';

interface Payload {
  [key: string]: string;
}

export function sendMail(payload: Payload, listId: string) {
  return sendRequest(`${BASE_URL}/send/${listId}`, 'POST', payload);
}
