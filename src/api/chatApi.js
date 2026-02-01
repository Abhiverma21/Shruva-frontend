import api from "./apiClient";

export async function getChats() {
  const res = await api.get(`/chats`);
  return res.data;
}

export async function pinChat(chatId) {
  const res = await api.put(`/chats/${chatId}/pin`);
  return res.data;
}

export async function unpinChat(chatId) {
  const res = await api.put(`/chats/${chatId}/unpin`);
  return res.data;
}

export async function muteChat(chatId) {
  const res = await api.put(`/chats/${chatId}/mute`);
  return res.data;
}

export async function unmuteChat(chatId) {
  const res = await api.put(`/chats/${chatId}/unmute`);
  return res.data;
}

export async function archiveChat(chatId) {
  const res = await api.put(`/chats/${chatId}/archive`);
  return res.data;
}

export async function deleteChat(chatId) {
  const res = await api.delete(`/chats/${chatId}`);
  return res.data;
}
