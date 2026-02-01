import React, { useState, useEffect, useRef } from 'react';
import { FiInfo, FiMoreVertical, FiArrowLeft } from 'react-icons/fi';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { useAuth } from '../../context/AuthContext';

export default function ChatWindow({ chat, onBackClick }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  // Messages are loaded from backend via API; no dummy fallback.

  useEffect(() => {
    // If chat.id looks like an object id, fetch messages from backend
    const token = localStorage.getItem('token');
    if (token && chat?.id) {
      fetch(`/api/messages/${chat.id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => r.json())
        .then((data) => {
          if (data.success) {
            setMessages(
              data.messages.map((m) => ({
                id: m._id,
                text: m.text,
                sender: m.senderId?._id === user?._id ? 'user' : 'other',
                timestamp: new Date(m.createdAt).toLocaleTimeString(),
                avatar: m.senderId?.name ? m.senderId.name[0] : '👤',
                read: true,
              }))
            );
            return;
          }
          setMessages([]);
        })
        .catch(() => {
          setMessages([]);
        });
    } else {
      setMessages([]);
    }
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (message) => {
    // Send via backend
    const token = localStorage.getItem('token');
    if (!token) {
      // fallback to local UI only
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
        avatar: '👤',
        read: false,
      };
      setMessages([...messages, newMessage]);
      return;
    }

    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ conversationId: chat.id, content: message }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const m = data.message;
          setMessages((prev) => [
            ...prev,
            {
              id: m._id,
              text: m.text,
              sender: 'user',
              timestamp: new Date(m.createdAt).toLocaleTimeString(),
              avatar: '👤',
              read: false,
            },
          ]);
        }
      })
      .catch(() => {
        // optimistic fallback
        const newMessage = {
          id: messages.length + 1,
          text: message,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString(),
          avatar: '👤',
          read: false,
        };
        setMessages([...messages, newMessage]);
      });
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter(msg => msg.id !== messageId));
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden h-screen w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          <button 
            onClick={onBackClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors text-purple-600 flex-shrink-0"
          >
            <FiArrowLeft size={20} />
          </button>
          <div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-lg text-white font-semibold shadow-md">
              {chat.avatar}
            </div>
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900 text-sm truncate">{chat.name}</h2>
            <p className={`text-xs ${chat.isOnline ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
              {chat.isOnline ? 'Active now' : 'Offline'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
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

      {/* Messages Container - Compact Layout */}
      <MessageList messages={messages} messagesEndRef={messagesEndRef} onDeleteMessage={handleDeleteMessage} />

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}

      {/* Input - Fixed at bottom */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
