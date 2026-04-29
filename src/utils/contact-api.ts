import sendRequest from './send-request.js';

const BASE_URL = '/api/subscriber';

interface SubscriberPayload {
  [key: string]: string;
}

export function contactSubscribe(payload: SubscriberPayload, listId: string) {
  return sendRequest(`${BASE_URL}/signup/${listId}`, 'POST', payload);
}

export function contactSubscribeConfirm(payload: SubscriberPayload) {
  return sendRequest(`${BASE_URL}/signup/confirm`, 'GET', payload);
}

export function contactUnsubscribe(payload: SubscriberPayload, listId: string) {
  return sendRequest(`${BASE_URL}/remove/${listId}`, 'DELETE', payload);
}
