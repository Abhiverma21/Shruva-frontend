import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical } from 'react-icons/fi';

export default function ChatListItem({ chat, isSelected, onClick }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  return (
    <div
      onClick={onClick}
      className={`p-3 cursor-pointer border-b border-gray-100 transition-all duration-200 hover:bg-gray-50 relative group ${
        isSelected ? 'bg-purple-50 border-l-4 border-l-purple-600' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-lg font-semibold text-white shadow-sm">
            {chat.avatar}
          </div>
          {chat.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
          )}
        </div>

        {/* Chat Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {chat.name}
            </h3>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
              {chat.timestamp}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 truncate">
              {chat.lastMessage}
            </p>
            {chat.unread > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-purple-600 text-white text-xs font-semibold rounded-full flex-shrink-0">
                {chat.unread}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Three Dot Menu */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2" ref={menuRef}>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
          className="p-1 hover:bg-gray-200 rounded-full transition-colors text-gray-600 opacity-0 group-hover:opacity-100"
          title="More options"
        >
          <FiMoreVertical size={16} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
            <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-2 rounded-t-lg">
              📌 Pin Chat
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-2">
              🔔 Mute Notifications
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-2">
              📁 Archive
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2 rounded-b-lg">
              🗑️ Delete Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
