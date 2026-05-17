export function createClient(apiKey) {
  const baseURL = import.meta.env.VITE_API_BASE_URL ?? "http://salah-seleem-team.test/api/";

  async function request(endpoint, options = {}) {
    const res = await fetch(`${baseURL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  return {
    get(endpoint) {
      return request(endpoint, { method: "GET" });
    },
    post(endpoint, body) {
      return request(endpoint, { method: "POST", body: JSON.stringify(body) });
    },
  };
}
