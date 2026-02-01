import io from 'socket.io-client';

let socket = null;
let messageListeners = [];
let currentChatId = null;

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
    transports: ['websocket', 'polling'],
  });

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
    socket.emit('addUser', userId);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  socket.on('reconnect', () => {
    console.log('Socket reconnected');
    socket.emit('addUser', userId);
    // Re-join current chat if exists
    if (currentChatId) {
      socket.emit('joinChat', currentChatId);
    }
    // Re-attach all listeners
    messageListeners.forEach(listener => {
      socket.on('newMessage', listener);
    });
  });

  return socket;
};

export const getSocket = () => socket;

export const joinChat = (chatId) => {
  if (!socket) {
    console.warn('Socket not initialized');
    return;
  }
  currentChatId = chatId;
  socket.emit('joinChat', chatId);
  console.log('Joined chat room:', chatId);
};

export const leaveChat = (chatId) => {
  if (!socket) return;
  socket.emit('leaveChat', chatId);
  if (currentChatId === chatId) {
    currentChatId = null;
  }
  console.log('Left chat room:', chatId);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    messageListeners = [];
    currentChatId = null;
  }
};

export const onNewMessage = (callback) => {
  if (!socket) {
    console.warn('Socket not initialized');
    return;
  }
  
  messageListeners.push(callback);
  socket.on('newMessage', callback);
  console.log('Message listener attached');
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

