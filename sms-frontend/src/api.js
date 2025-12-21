// src/api.js
const API = '/api';

export async function getJSON(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error('API error');
  return res.json();
}

export async function postJSON(path, payload) {
  const res = await fetch(`${API}${path}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function putJSON(path, payload) {
  const res = await fetch(`${API}${path}`, {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function del(path) {
  const res = await fetch(`${API}${path}`, { method: 'DELETE' });
  return res.json();
}