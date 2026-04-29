import sendRequest from './send-request.js';

const BASE_URL = '/api/user';

interface UserData {
  [key: string]: string;
}

export function signUp(userData: UserData) {
  return sendRequest(`${BASE_URL}/register`, 'POST', userData);
}

export function login(userData: UserData) {
  return sendRequest(`${BASE_URL}/login`, 'POST', userData);
}

export function forgotPassword(userData: UserData) {
  return sendRequest(`${BASE_URL}/forgot-password`, 'POST', userData);
}

export function resetPassword(userData: UserData, token: string) {
  return sendRequest(`${BASE_URL}/change-password/${token}`, 'POST', userData);
}

export function cycleToken(userData: UserData) {
  return sendRequest(`${BASE_URL}/cycle-token`, 'POST', userData);
}

export function logout() {
  return sendRequest(`${BASE_URL}/logout`, 'POST');
}

export function getMe() {
  return sendRequest(`${BASE_URL}/me`);
}

export function updateUsername(userData: UserData) {
  return sendRequest(`${BASE_URL}/change/username`, 'PUT', userData);
}

export function updateEmailRequest(userData: UserData) {
  return sendRequest(`${BASE_URL}/change/email`, 'PATCH', userData);
}

export function deleteUser(userData: UserData) {
  return sendRequest(`${BASE_URL}/account/delete`, 'DELETE', userData);
}

export function updateEmailConfirm(userData: UserData) {
  return sendRequest(`${BASE_URL}/change/email/confirm`, `PUT`, userData);
}
