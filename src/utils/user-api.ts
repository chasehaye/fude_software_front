import sendRequest from './send-request';
const BASE_URL = '/api/user';

export function signUp(userData) {
  return sendRequest(`${BASE_URL}/register`, 'POST', userData);
}

export function login(userData) {
  return sendRequest(`${BASE_URL}/login`, 'POST', userData);
}

export function forgotPassword(userData) {
  return sendRequest(`${BASE_URL}/forgot-password`, 'POST', userData);
}

export function resetPassword(userData, token) {
  return sendRequest(`${BASE_URL}/change-password/${token}`, 'POST', userData);
}

export function cycleToken(userData) {
  return sendRequest(`${BASE_URL}/cycle-token`, 'POST', userData);
}

export function logout() {
  return sendRequest(`${BASE_URL}/logout`, 'POST');
}

export function getMe() {
  return sendRequest(`${BASE_URL}/me`);
}
