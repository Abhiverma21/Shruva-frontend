import io from 'socket.io-client';

let socket = null;

export const initSocket = (userId) => {
  if (socket) return socket;

  socket = io(import.meta.env.VITE_SOCKET_URL || 'https://shruva-backend.onrender.com', {
    auth: {
      token: localStorage.getItem('token'),
    },
  });

  socket.on('connect', () => {
    // Join room with userId
    socket.emit('addUser', userId);
  });

  socket.on('disconnect', () => {
    // Silent disconnect
  });

  socket.on('connect_error', () => {
    // Silent error handling
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const onNewMessage = (callback) => {
  if (socket) {
    socket.on('newMessage', callback);
  }
};

export const onFriendAdded = (callback) => {
  if (socket) {
    socket.on('friendAdded', callback);
  }
};

export const offNewMessage = () => {
  if (socket) {
    socket.off('newMessage');
  }
};

export const offFriendAdded = () => {
  if (socket) {
    socket.off('friendAdded');
  }
};
