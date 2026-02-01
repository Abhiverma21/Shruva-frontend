import React, { useState, useEffect, useRef, useContext } from 'react';
import { FiPhone, FiVideo, FiInfo, FiMoreVertical, FiArrowLeft } from 'react-icons/fi';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { getMessages, sendMessage } from '../../api/messageApi';
import { AuthContext } from '../../context/AuthContext';
import { getSocket, onNewMessage, offNewMessage, joinChat, leaveChat } from '../../services/socketService';

export default function ChatWindow({ chat, onBackClick }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const { user } = useContext(AuthContext);

  // Fetch messages from API
  useEffect(() => {
    const loadMessages = async () => {
      setLoading(true);
      try {
        const { messages: fetchedMessages } = await getMessages(chat.chatId || chat._id);
        setMessages(fetchedMessages || []);
      } catch (err) {
        console.error("Failed to load messages", err);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    if (chat && (chat.chatId || chat._id)) {
      loadMessages();
      // Join chat room for real-time updates
      joinChat(chat.chatId || chat._id);
    }

    return () => {
      // Leave chat room when component unmounts or chat changes
      if (chat && (chat.chatId || chat._id)) {
        leaveChat(chat.chatId || chat._id);
      }
    };
  }, [chat]);

  // Socket.io real-time message listener
  useEffect(() => {
    const socket = getSocket();
    if (!socket) {
      console.warn('Socket not available');
      return;
    }

    const handleNewMessage = (data) => {
      console.log('New message received:', data);
      const { chatId, message } = data;
      if (chatId === (chat.chatId || chat._id)) {
        setMessages(prev => {
          // Check if message already exists to prevent duplicates
          const isDuplicate = prev.some(m => m._id === message._id);
          if (isDuplicate) {
            return prev;
          }
          return [...prev, message];
        });
      }
    };

    onNewMessage(handleNewMessage);

    return () => {
      offNewMessage();
    };
  }, [chat, chat._id, chat.chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // Create an optimistic message to show immediately
    const optimisticMessage = {
      _id: `temp-${Date.now()}`,
      text: text.trim(),
      senderId: {
        _id: user.id,
        username: user.username,
        fullName: user.fullName,
      },
      chatId: chat.chatId || chat._id,
      createdAt: new Date().toISOString(),
      isSeen: false,
      isOptimistic: true,
    };

    // Add optimistic message immediately to UI
    setMessages(prev => [...prev, optimisticMessage]);

    try {
      const { message } = await sendMessage({
        chatId: chat.chatId || chat._id,
        text,
      });
      
      // Replace optimistic message with real message from server
      setMessages(prev => {
        return prev.map(msg => 
          msg._id === optimisticMessage._id ? message : msg
        );
      });
    } catch (err) {
      console.error("Failed to send message", err);
      // Remove optimistic message on error
      setMessages(prev => 
        prev.filter(msg => msg._id !== optimisticMessage._id)
      );
      const errorMsg = err.response?.data?.message || err.message || 'Failed to send message';
      alert(`Error: ${errorMsg}`);
    }
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg._id !== messageId));
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading messages...</p>
      </div>
    );
  }

  const friend = chat.friend || {};

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-2 md:p-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <div className="flex items-center gap-1 md:gap-3 flex-1 min-w-0">
          <button 
            onClick={onBackClick}
            className="md:hidden p-1.5 hover:bg-gray-100 rounded-full transition-colors text-purple-600 flex-shrink-0"
          >
            <FiArrowLeft size={18} />
          </button>
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-sm md:text-lg text-white font-semibold shadow-md flex-shrink-0">
            {friend.fullName?.charAt(0).toUpperCase() || '?'}
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900 text-xs md:text-sm truncate">{friend.fullName || 'Unknown'}</h2>
            <p className="text-xs text-gray-500 hidden md:block">@{friend.username || 'unknown'}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-0.5 md:gap-1">
          <button className="p-1.5 md:p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-purple-600">
            <FiPhone size={16} md:size={18} title="Voice Call" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-purple-600">
            <FiVideo size={18} title="Video Call" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hidden sm:flex">
            <FiInfo size={18} />
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600"
            >
              <FiMoreVertical size={18} />
            </button>
            {showOptions && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-2">
                  📞 Voice Call
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-2">
                  📹 Video Call
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-2">
                  🔔 Mute Notifications
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-2">
                  📌 Pin Chat
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-2">
                  🔍 Search Messages
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-2">
                  📋 View Profile
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2">
                  🚫 Block User
                </button>
                <button className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2">
                  🗑️ Delete Chat
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <MessageList messages={messages} messagesEndRef={messagesEndRef} onDeleteMessage={handleDeleteMessage} />
        )}
      </div>

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}

      {/* Input - Fixed at bottom */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
