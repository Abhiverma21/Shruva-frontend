import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiArrowLeft } from 'react-icons/fi';
import ChatListItem from './ChatListItem';
import UserProfile from './UserProfile';

export default function ChatSidebar({ selectedChat, setSelectedChat, chatFilter, setChatFilter, onNewChat }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/chat/conversations', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setChats(
            data.conversations.map((c) => ({
              id: c.id,
              name: c.otherUser?.name || 'Group',
              avatar: c.otherUser?.name ? c.otherUser.name[0] : '💬',
              lastMessage: c.lastMessage?.text || '',
              timestamp: c.updatedAt,
              unread: 0,
              isOnline: false,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const getFilteredChats = () => {
    let filtered = chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    switch (chatFilter) {
      case 'groups':
        return filtered.filter(chat => chat.isGroup);
      case 'unread':
        return filtered.filter(chat => chat.unread > 0);
      case 'new':
        return filtered.slice(0, 3);
      case 'all':
      default:
        return filtered;
    }
  };

  const filteredChats = getFilteredChats();

  const filterTabs = [
    { id: 'all', label: 'All', count: chats.length },
    { id: 'groups', label: 'Groups', count: chats.filter(c => c.isGroup).length },
    { id: 'unread', label: 'Unread', count: chats.filter(c => c.unread > 0).length },
    { id: 'new', label: 'New', count: 3 },
  ];

  return (
    <div className=" md:w-96 h-full md:h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg overflow-hidden pb-20 md:pb-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          <button onClick={onNewChat} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Start new chat">
            <FiPlus size={20} className="text-purple-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-0 border-b border-gray-200 px-2 pt-2 flex-shrink-0">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setChatFilter(tab.id)}
            className={`px-3 py-2 text-sm font-medium transition-all relative ${
              chatFilter === tab.id
                ? 'text-purple-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-1 text-xs bg-gray-200 rounded-full px-2 py-0.5">
                {tab.count}
              </span>
            )}
            {chatFilter === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600 rounded-t"></div>
            )}
          </button>
        ))}
      </div>

      {/* User Profile - Hidden on desktop and mobile */}
      <div className="hidden">
        <UserProfile onBackClick={() => setSelectedChat(null)} />
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <ChatListItem
              key={chat.id}
              chat={chat}
              isSelected={selectedChat?.id === chat.id}
              onClick={() => setSelectedChat(chat)}
            />
          ))
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <p className="text-sm">No conversations found</p>
          </div>
        )}
      </div>

      {/* Mobile Bottom Action Section removed (dummy call/status removed) */}
    </div>
  );
}
