import React, { useState } from 'react';
import { FiX, FiArrowLeft } from 'react-icons/fi';
import { searchUsers, addFriend } from '../../api/userApi';

export default function NewChatModal({ isSidebar = false, onClose, onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const { users } = await searchUsers(query);
      setSearchResults(users || []);
    } catch (err) {
      console.error("Search failed", err);
      setSearchResults([]);
    } finally {
      setLoading(false);
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

    try {
      setLoading(true);
      // For now, only support personal (1-to-1) chats
      if (selectedUsers.length > 1) {
        alert('Group chats coming soon!');
        return;
      }

      const friendId = selectedUsers[0];
      const res = await addFriend(friendId);
      alert(res.message || 'Friend added!');
      onBack();
    } catch (err) {
      console.error("Failed to add friend", err);
      alert(err.response?.data?.message || 'Failed to add friend');
    } finally {
      setLoading(false);
    }
  };

  if (isSidebar) {
    return (
      <div className="w-full md:w-80 h-full md:h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">Find Users</h2>
          <button
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiArrowLeft size={20} />
          </button>
        </div>

        {/* Search Box */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <input
            type="text"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleUserSelect(user._id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    selectedUsers.includes(user._id)
                      ? 'bg-purple-50 border-2 border-purple-600'
                      : 'hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    readOnly
                    className="w-4 h-4 accent-purple-600"
                  />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
                    <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center text-gray-500 text-sm">No users found</div>
          ) : (
            <div className="text-center text-gray-500 text-sm">Search to find users</div>
          )}
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
            disabled={selectedUsers.length === 0 || loading}
            className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm"
          >
            {loading ? 'Adding...' : 'Add'}
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
          <h2 className="text-xl font-bold text-gray-900">Find Users</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Search Box */}
        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search by username..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2">
              {searchResults.map((user) => (
                <button
                  key={user._id}
                  onClick={() => handleUserSelect(user._id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                    selectedUsers.includes(user._id)
                      ? 'bg-purple-50 border-2 border-purple-600'
                      : 'hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    readOnly
                    className="w-5 h-5 accent-purple-600"
                  />
                  <div className="text-left flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{user.fullName}</p>
                    <p className="text-xs text-gray-500 truncate">@{user.username}</p>
                  </div>
                </button>
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center text-gray-500 text-sm">No users found</div>
          ) : (
            <div className="text-center text-gray-500 text-sm">Search to find users</div>
          )}
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
            disabled={selectedUsers.length === 0 || loading}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
