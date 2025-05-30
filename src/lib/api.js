export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
  const res = await fetch(url, { ...options, headers });
  let data;
  try {
    data = await res.clone().json();
  } catch (e) {
    data = await res.clone().text();
  }
  if (!res.ok) {
    console.error('API error:', { url, status: res.status, data });
    throw new Error((data && data.message) || data || "API request failed");
  }
  return data;
} 