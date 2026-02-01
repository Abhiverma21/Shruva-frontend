import api from "./apiClient";

export async function getMessages(chatId) {
  const res = await api.get(`/messages/${chatId}`);
  return res.data;
}

export async function sendMessage({ chatId, text }) {
  const res = await api.post(`/messages`, { chatId, text });
  return res.data;
}

export async function markMessageSeen(messageId) {
  const res = await api.post(`/messages/mark-seen/${messageId}`);
  return res.data;
}
