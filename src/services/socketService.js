import io from 'socket.io-client';

let socket = null;
let messageListeners = [];

export const initSocket = (userId) => {
  if (socket && socket.connected) {
    console.log('Socket already connected');
    return socket;
  }

  const socketUrl = import.meta.env.VITE_SOCKET_URL || window.location.origin;
  
  socket = io(socketUrl, {
    auth: {
      token: localStorage.getItem('token'),
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
    // Join room with userId
    socket.emit('addUser', userId);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  // Re-attach all listeners when reconnecting
  socket.on('reconnect', () => {
    console.log('Socket reconnected');
    socket.emit('addUser', userId);
    messageListeners.forEach(listener => {
      socket.on('newMessage', listener);
    });
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    messageListeners = [];
  }
};

export const onNewMessage = (callback) => {
  if (!socket) {
    console.warn('Socket not initialized');
    return;
  }
  
  // Store listener for reconnection
  messageListeners.push(callback);
  socket.on('newMessage', callback);
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

