export default async function sendRequest(endpoint, method = 'GET', payload = null) {
  const BACKEND_URL = 'http://localhost:8080';
  let url = `${BACKEND_URL}${endpoint}`;
  const options = { 
    method,
    credentials: 'include' 
  };

  if (payload) {
    if (method.toUpperCase() === 'GET') {
      const queryString = new URLSearchParams(payload).toString();
      url += `?${queryString}`;
    } else {
      options.headers = { 'Content-Type': 'application/json' };
      options.body = JSON.stringify(payload);
    }
  }
  const res = await fetch(url, options);
  if (res.ok) return res.json();
  const err = await res.json();
  throw new Error(err.message || 'Bad Request');
}