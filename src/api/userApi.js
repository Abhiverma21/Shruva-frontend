import api from "./apiClient";

export async function searchUsers(username) {
  const res = await api.get(`/users/search`, { params: { username } });
  return res.data;
}

export async function addFriend(friendId) {
  const res = await api.post(`/users/add-friend`, { friendId });
  return res.data;
}

export async function getFriends() {
  const res = await api.get(`/users/friends`);
  return res.data;
}
