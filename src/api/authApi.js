import api from "./apiClient";

export async function login({ email, password }) {
  const res = await api.post(`/auth/login`, { email, password });
  return res.data;
}

export async function signup(payload) {
  const res = await api.post(`/auth/register`, payload);
  return res.data;
}
