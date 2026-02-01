import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiX, FiUser, FiUsers, FiArrowLeft } from 'react-icons/fi';

export default function NewChatModal({ isSidebar = false, onClose, onBack, setSelectedChat }) {
  const [chatType, setChatType] = useState('personal');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [availableUsers, setAvailableUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('/api/users/friends', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if (data.success) setAvailableUsers(data.friends.map(f => ({ id: f._id, name: f.name })));
      })
      .catch(() => {});
  }, []);

  // Search other users (not friends) by name/email
  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    if (!searchTerm.trim()) return setSearchResults([]);
    try {
      const res = await fetch(`/api/users/search?username=${encodeURIComponent(searchTerm)}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.success) {
        // mark already-friends
        const friendsIds = new Set(availableUsers.map(u => u.id));
        setSearchResults(data.users.map(u => ({ id: u._id, name: u.name, email: u.email, isFriend: friendsIds.has(u._id) })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddFriend = async (otherUserId) => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await fetch('/api/users/add-friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ friendId: otherUserId }),
      });
      const data = await res.json();
      if (data.success) {
        // refresh friends + open chat
        const friendsRes = await fetch('/api/users/friends', { headers: { Authorization: `Bearer ${token}` } });
        const friendsData = await friendsRes.json();
        if (friendsData.success) setAvailableUsers(friendsData.friends.map(f => ({ id: f._id, name: f.name })));

        // get/create chat and open
        const chatRes = await fetch(`/api/chat/with/${otherUserId}`, { headers: { Authorization: `Bearer ${token}` } });
        const chatData = await chatRes.json();
        if (chatData.success && chatData.chat) {
          const other = chatData.chat.members.find(m => m._id !== (user?._id));
          const chatObj = {
            id: chatData.chat._id,
            name: other?.name || 'Chat',
            avatar: other?.name ? other.name[0] : '💬',
            isOnline: false,
          };
          if (typeof setSelectedChat === 'function') setSelectedChat(chatObj);
        }
      } else {
        alert(data.message || 'Could not add friend');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCreate = async () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user');
      return;
    }

    if (chatType === 'personal' && selectedUsers.length === 1) {
      // create or get one-to-one chat
      const otherUserId = selectedUsers[0];
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`/api/chat/with/${otherUserId}`, { headers: { Authorization: `Bearer ${token}` } });
        const data = await res.json();
        if (data.success && data.chat) {
          const other = data.chat.members.find(m => m._id !== (user?._id));
          const chatObj = {
            id: data.chat._id,
            name: other?.name || 'Chat',
            avatar: (other?.name || 'U')[0],
            isOnline: false,
          };
          if (typeof setSelectedChat === 'function') setSelectedChat(chatObj);
        }
      } catch (err) {
        console.error(err);
      }
    }

    onBack();
  };

  if (isSidebar) {
    return (
      <div className="w-full md:w-80 h-full md:h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Start Chat</h2>
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiArrowLeft size={20} />
          </button>
        </div>

        {/* Chat Type Selector */}
        <div className="p-4 border-b border-gray-200 flex gap-3 flex-shrink-0">
          <button
            onClick={() => setChatType('personal')}
            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
              chatType === 'personal'
                ? 'bg-purple-100 border-2 border-purple-600 text-purple-700'
                : 'bg-gray-100 border-2 border-gray-200 text-gray-600'
            }`}
          >
            <FiUser size={20} />
            <span className="text-xs font-medium">Personal</span>
          </button>
          <button
            onClick={() => setChatType('group')}
            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
              chatType === 'group'
                ? 'bg-purple-100 border-2 border-purple-600 text-purple-700'
                : 'bg-gray-100 border-2 border-gray-200 text-gray-600'
            }`}
          >
            <FiUsers size={20} />
            <span className="text-xs font-medium">Group</span>
          </button>
        </div>

        {/* Users List (Friends) */}
        <div className="p-4 border-b border-gray-200 flex gap-2 flex-shrink-0">
          <input
            placeholder="Search people to add"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-2 bg-gray-100 rounded-full text-sm"
          />
          <button onClick={handleSearch} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Search</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {searchResults.length > 0 ? (
              searchResults.map((u) => (
                <div key={u.id} className="w-full flex items-center gap-3 p-2 rounded-lg border-2 border-gray-200">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{u.name}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                  </div>
                  {u.isFriend ? (
                    <button disabled className="px-3 py-1 border rounded text-sm text-gray-600">Friend</button>
                  ) : (
                    <button onClick={() => handleAddFriend(u.id)} className="px-3 py-1 bg-purple-600 text-white rounded text-sm">Add Friend</button>
                  )}
                </div>
              ))
            ) : (
              // show friends list when no search
              availableUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => handleUserSelect(user.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all ${
                    selectedUsers.includes(user.id)
                      ? 'bg-purple-50 border-2 border-purple-600'
                      : 'hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    readOnly
                    className="w-4 h-4 accent-purple-600"
                  />
                  <span className="text-base">👤</span>
                  <span className="text-xs font-medium text-gray-900 truncate">{user.name}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-gray-200 flex gap-2 flex-shrink-0">
          <button
            onClick={onBack}
            className="flex-1 px-3 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={selectedUsers.length === 0}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
          >
            Create
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Start New Chat</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Chat Type Selector */}
        <div className="p-6 border-b border-gray-200 flex gap-4">
          <button
            onClick={() => setChatType('personal')}
            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
              chatType === 'personal'
                ? 'bg-purple-100 border-2 border-purple-600 text-purple-700'
                : 'bg-gray-100 border-2 border-gray-200 text-gray-600'
            }`}
          >
            <FiUser size={24} />
            <span className="text-sm font-medium">Personal</span>
          </button>
          <button
            onClick={() => setChatType('group')}
            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
              chatType === 'group'
                ? 'bg-purple-100 border-2 border-purple-600 text-purple-700'
                : 'bg-gray-100 border-2 border-gray-200 text-gray-600'
            }`}
          >
            <FiUsers size={24} />
            <span className="text-sm font-medium">Group</span>
          </button>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-2">
            {availableUsers.map((user) => (
              <button
                key={user.id}
                onClick={() => handleUserSelect(user.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                  selectedUsers.includes(user.id)
                    ? 'bg-purple-50 border-2 border-purple-600'
                    : 'hover:bg-gray-50 border-2 border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  readOnly
                  className="w-5 h-5 accent-purple-600"
                />
                <span className="text-lg">{user.avatar}</span>
                <span className="text-sm font-medium text-gray-900">{user.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={selectedUsers.length === 0}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Create Chat
          </button>
        </div>
      </div>
    </div>
  );
}
