import React, { useState, useEffect } from 'react';
import { FiSearch, FiPlus, FiArrowLeft } from 'react-icons/fi';
import NewChatModal from './NewChatModal';
import ChatListItem from './ChatListItem';
import { getChats } from '../../api/chatApi';
import { searchUsers, addFriend } from '../../api/userApi';

export default function ChatSidebar({ selectedChat, setSelectedChat, chatFilter, setChatFilter, chats: propChats, setChats: setPropChats }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [chats, setChats] = useState(propChats || []);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newChatOpen, setNewChatOpen] = useState(false);

  // Update parent component when chats change
  useEffect(() => {
    if (setPropChats) {
      setPropChats(chats);
    }
  }, [chats, setPropChats]);

  // Fetch existing chats on mount
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { chats: fetchedChats } = await getChats();
        const formattedChats = (fetchedChats || []).map(c => ({
          _id: c._id,
          chatId: c._id,
          id: c._id,
          name: c.friend?.fullName || 'Unknown',
          username: c.friend?.username || '',
          friend: c.friend,
          lastMessage: c.lastMessage?.text || '',
          timestamp: c.lastMessage?.createdAt ? new Date(c.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
          unread: 0,
          isOnline: false,
        }));
        setChats(formattedChats);
      } catch (err) {
        console.error("Failed to fetch chats", err);
      }
    };

    fetchChats();
  }, []);

  // Search for users when searchTerm changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (!searchTerm.trim()) {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const { users } = await searchUsers(searchTerm);
        const formattedResults = (users || []).map(u => ({
          _id: u._id,
          id: u._id,
          name: u.fullName,
          username: u.username,
          lastMessage: `@${u.username}`,
          timestamp: '',
          unread: 0,
          isOnline: false,
          isGlobalSearch: true,
          user: u,
        }));
        setSearchResults(formattedResults);
      } catch (err) {
        console.error("Search failed", err);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const getFilteredChats = () => {
    let filtered = chats.filter((chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (searchTerm) {
      const existingIds = new Set(filtered.map(c => c._id));
      const newGlobal = searchResults.filter(u => !existingIds.has(u._id));
      return [...filtered, ...newGlobal];
    }

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

  const handleAddFriend = async (userId) => {
    try {
      setLoading(true);
      const { chatId, message } = await addFriend(userId);
      alert(message);
      
      // Refetch chats
      const { chats: fetchedChats } = await getChats();
      const formattedChats = (fetchedChats || []).map(c => ({
        _id: c._id,
        chatId: c._id,
        id: c._id,
        name: c.friend?.fullName || 'Unknown',
        username: c.friend?.username || '',
        friend: c.friend,
        lastMessage: c.lastMessage?.text || '',
        timestamp: c.lastMessage?.createdAt ? new Date(c.lastMessage.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
        unread: 0,
        isOnline: false,
      }));
      setChats(formattedChats);
      setSearchTerm('');
      setSearchResults([]);

      // Auto-select the new chat
      const newChat = formattedChats.find(c => c._id === chatId);
      if (newChat) {
        setSelectedChat(newChat);
      }
    } catch (err) {
      console.error("Failed to add friend", err);
      alert(err.response?.data?.message || 'Failed to add friend');
    } finally {
      setLoading(false);
    }
  };

  const filteredChats = getFilteredChats();

  const filterTabs = [
    { id: 'all', label: 'All', count: chats.length },
    { id: 'groups', label: 'Groups', count: chats.filter(c => c.isGroup).length },
    { id: 'unread', label: 'Unread', count: chats.filter(c => c.unread > 0).length },
    { id: 'new', label: 'New', count: Math.min(3, chats.length) },
  ];

  return (
    <div className="md:w-96 h-full md:h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg overflow-hidden md:pb-0">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button className="md:hidden p-1 hover:bg-gray-100 rounded-full transition-colors text-purple-600" onClick={() => window.history.back()} title="Go back">
              <FiArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
          </div>
          <button onClick={() => setNewChatOpen(true)} className="p-2 hover:bg-gray-100 rounded-full transition-colors" title="Start new chat">
            <FiPlus size={20} className="text-purple-600" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search users or chats..."
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

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
        {filteredChats.length > 0 ? (
          filteredChats.map((item) => 
            item.isGlobalSearch ? (
              <div key={item._id} className="px-3 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">@{item.username}</p>
                  </div>
                  <button 
                    onClick={() => handleAddFriend(item._id)}
                    disabled={loading}
                    className="ml-2 px-3 py-1 bg-purple-600 text-white text-xs rounded-full hover:bg-purple-700 disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <ChatListItem
                key={item._id}
                chat={item}
                isSelected={selectedChat?._id === item._id}
                onClick={() => setSelectedChat(item)}
                onChatUpdate={(updatedChat) => {
                  // Update chat in list
                  setChats(prev => prev.map(c => c._id === updatedChat._id ? { ...c, isPinned: updatedChat.isPinned, isMuted: updatedChat.isMuted, isArchived: updatedChat.isArchived } : c));
                }}
                onChatDelete={(chatId) => {
                  // Remove from list
                  setChats(prev => prev.filter(c => c._id !== chatId));
                  if (selectedChat?._id === chatId) {
                    setSelectedChat(null);
                  }
                }}
              />
            )
          )
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-500">
            <p className="text-sm">{searchTerm ? 'No results found' : 'No chats yet'}</p>
          </div>
        )}
      </div>


      {newChatOpen && (
        <NewChatModal
          isSidebar={true}
          onClose={() => setNewChatOpen(false)}
          onBack={() => setNewChatOpen(false)}
        />
      )}
    </div>
  );
}
