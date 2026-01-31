import React, { useState } from 'react';
import { FiX, FiUser, FiUsers, FiArrowLeft } from 'react-icons/fi';

export default function NewChatModal({ isSidebar = false, onClose, onBack }) {
  const [chatType, setChatType] = useState('personal');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const availableUsers = [
    { id: 1, name: 'Sarah Johnson', avatar: '👩‍💼' },
    { id: 2, name: 'John Smith', avatar: '👨‍💻' },
    { id: 3, name: 'Alex Chen', avatar: '👨‍🎨' },
    { id: 4, name: 'Emma Wilson', avatar: '👩‍🎤' },
    { id: 5, name: 'David Brown', avatar: '👨‍💼' },
    { id: 6, name: 'Lisa Anderson', avatar: '👩‍🔬' },
  ];

  const handleUserSelect = (userId) => {
    setSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCreate = () => {
    if (selectedUsers.length === 0) {
      alert('Please select at least one user');
      return;
    }
    alert(`Creating ${chatType} chat with ${selectedUsers.length} user(s)`);
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

        {/* Users List */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {availableUsers.map((user) => (
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
                <span className="text-base">{user.avatar}</span>
                <span className="text-xs font-medium text-gray-900 truncate">{user.name}</span>
              </button>
            ))}
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
