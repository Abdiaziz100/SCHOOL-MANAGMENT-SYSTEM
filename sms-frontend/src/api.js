// Enhanced API with search and filtering
export const API_BASE = '';

export async function getJSON(endpoint, params = {}) {
  const url = new URL(`/api${endpoint}`, window.location.origin);
  Object.keys(params).forEach(key => {
    if (params[key]) url.searchParams.append(key, params[key]);
  });
  
  const response = await fetch(url);
  if (!response.ok) throw new Error('API error');
  return response.json();
}

export async function postJSON(endpoint, data) {
  const response = await fetch(`/api${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('API error');
  return response.json();
}

export async function putJSON(endpoint, data) {
  const response = await fetch(`/api${endpoint}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) throw new Error('API error');
  return response.json();
}

export async function del(endpoint) {
  const response = await fetch(`/api${endpoint}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('API error');
  return response.json();
}

// Search and filter utilities
export function searchItems(items, searchTerm, fields) {
  if (!searchTerm) return items;
  
  return items.filter(item =>
    fields.some(field =>
      String(item[field] || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}

export function filterItems(items, filters) {
  return items.filter(item =>
    Object.entries(filters).every(([key, value]) =>
      !value || item[key] === value
    )
  );
}