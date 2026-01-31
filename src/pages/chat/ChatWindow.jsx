import React, { useState, useEffect, useRef } from 'react';
import { FiPhone, FiVideo, FiInfo, FiMoreVertical, FiArrowLeft } from 'react-icons/fi';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ chat, onBackClick }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const messagesEndRef = useRef(null);

  // Dummy messages based on selected chat
  const DUMMY_MESSAGES = {
    1: [
      { id: 1, text: 'Hey! How are you doing?', sender: 'other', timestamp: '2:30 PM', avatar: '👩‍💼', read: true },
      { id: 2, text: 'I\'m doing great! Just finished the project', sender: 'user', timestamp: '2:35 PM', avatar: '👤', read: true },
      { id: 3, text: 'That\'s amazing! Can I see it?', sender: 'other', timestamp: '2:40 PM', avatar: '👩‍💼', read: true },
      { id: 4, text: 'Sure! I\'ll send you the link shortly', sender: 'user', timestamp: '2:42 PM', avatar: '👤', read: true },
      { id: 5, text: 'Awesome!', sender: 'other', timestamp: '2:45 PM', avatar: '👩‍💼', read: true },
    ],
    2: [
      { id: 1, text: 'Team, we need to finalize the design system by Friday', sender: 'other', timestamp: '10:00 AM', avatar: '🎨', read: true },
      { id: 2, text: 'I\'ll prepare the color palette', sender: 'user', timestamp: '10:05 AM', avatar: '👤', read: true },
      { id: 3, text: 'I can handle the typography components', sender: 'other', timestamp: '10:10 AM', avatar: '🎨', read: true },
      { id: 4, text: 'Let\'s finalize the design system', sender: 'other', timestamp: '11:30 AM', avatar: '🎨', read: true },
    ],
    3: [
      { id: 1, text: 'Can you review the code I submitted?', sender: 'other', timestamp: '10:30 AM', avatar: '👨‍💻', read: true },
      { id: 2, text: 'Sure, let me check it out', sender: 'user', timestamp: '10:35 AM', avatar: '👤', read: true },
    ],
    4: [
      { id: 1, text: 'Campaign launch scheduled for next week', sender: 'other', timestamp: '9:00 AM', avatar: '📢', read: true },
      { id: 2, text: 'Sounds good! What time?', sender: 'user', timestamp: '9:15 AM', avatar: '👤', read: true },
    ],
    5: [
      { id: 1, text: 'Thanks for the feedback!', sender: 'other', timestamp: '3 days ago', avatar: '👨‍🎨', read: true },
    ],
    6: [
      { id: 1, text: 'Sprint planning meeting at 3 PM', sender: 'other', timestamp: '5 days ago', avatar: '📋', read: true },
    ],
  };

  useEffect(() => {
    setMessages(DUMMY_MESSAGES[chat.id] || []);
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (message) => {
    // Simulate typing
    setIsTyping(true);
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      avatar: '👤',
      read: false,
    };
    
    setTimeout(() => {
      setMessages([...messages, newMessage]);
      setIsTyping(false);
    }, 500);
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
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-purple-600">
            <FiPhone size={18} title="Voice Call" />
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

      {/* Messages Container - Compact Layout */}
      <MessageList messages={messages} messagesEndRef={messagesEndRef} onDeleteMessage={handleDeleteMessage} />

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}

      {/* Input - Fixed at bottom */}
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
}
