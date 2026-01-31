import React, { useState } from 'react';
import { FiSearch, FiPlus, FiArrowLeft } from 'react-icons/fi';
import ChatListItem from './ChatListItem';
import UserProfile from './UserProfile';

const DUMMY_CHATS = [
  {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '👩‍💼',
    lastMessage: 'Hey! How are you doing?',
    timestamp: '2:45 PM',
    unread: 2,
    isOnline: true,
    isFavorite: true,
  },
  {
    id: 2,
    name: 'Design Team',
    avatar: '🎨',
    lastMessage: 'Let\'s finalize the design system',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 3,
    name: 'John Smith',
    avatar: '👨‍💻',
    lastMessage: 'Can you review the code?',
    timestamp: '10:30 AM',
    unread: 1,
    isOnline: false,
  },
  {
    id: 4,
    name: 'Marketing Group',
    avatar: '📢',
    lastMessage: 'Campaign launch scheduled for next week',
    timestamp: 'Monday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 5,
    name: 'Alex Chen',
    avatar: '👨‍🎨',
    lastMessage: 'Thanks for the feedback!',
    timestamp: '3 days ago',
    unread: 0,
    isOnline: false,
    isFavorite: true,
  },
  {
    id: 6,
    name: 'Project Managers',
    avatar: '📋',
    lastMessage: 'Sprint planning meeting at 3 PM',
    timestamp: '5 days ago',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 7,
    name: 'Emma Wilson',
    avatar: '👩‍🚀',
    lastMessage: 'The presentation looks great!',
    timestamp: 'Today',
    unread: 3,
    isOnline: true,
  },
  {
    id: 8,
    name: 'Frontend Devs',
    avatar: '💻',
    lastMessage: 'React 19 upgrade completed',
    timestamp: 'Today',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 9,
    name: 'Michael Brown',
    avatar: '👨‍⚕️',
    lastMessage: 'Thanks for your help!',
    timestamp: '1 hour ago',
    unread: 0,
    isOnline: true,
  },
  {
    id: 10,
    name: 'Product Team',
    avatar: '🚀',
    lastMessage: 'Q1 roadmap is ready for review',
    timestamp: '2 hours ago',
    unread: 2,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 11,
    name: 'Jessica Lee',
    avatar: '👩‍🎓',
    lastMessage: 'See you at the meeting!',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: false,
  },
  {
    id: 12,
    name: 'Backend Squad',
    avatar: '⚙️',
    lastMessage: 'API documentation updated',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 12,
    name: 'Backend Squad',
    avatar: '⚙️',
    lastMessage: 'API documentation updated',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 12,
    name: 'Backend Squad',
    avatar: '⚙️',
    lastMessage: 'API documentation updated',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 12,
    name: 'Backend Squad',
    avatar: '⚙️',
    lastMessage: 'API documentation updated',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },

  {
    id: 12,
    name: 'Backend Squad',
    avatar: '⚙️',
    lastMessage: 'API documentation updated',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 12,
    name: 'Backend Squad',
    avatar: '⚙️',
    lastMessage: 'API documentation updated',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 12,
    name: 'Backend Squad',
    avatar: '⚙️',
    lastMessage: 'API documentation updated',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  {
    id: 12,
    name: 'Backend Squad',
    avatar: '⚙️',
    lastMessage: 'API documentation updated',
    timestamp: 'Yesterday',
    unread: 0,
    isOnline: true,
    isGroup: true,
  },
  
];

export default function ChatSidebar({ selectedChat, setSelectedChat, chatFilter, setChatFilter, onNewChat }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState(DUMMY_CHATS);

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

      {/* Mobile Bottom Action Section */}
      <div className="md:hidden flex-shrink-0 border-t border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center justify-between gap-3">
          {/* Status Section */}
          <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Active</span>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {/* Call Button */}
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <span className="text-lg">📞</span>
            <span className="text-sm font-medium text-gray-700">Call</span>
          </button>
        </div>
      </div>
    </div>
  );
}
