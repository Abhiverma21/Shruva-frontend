import React, { useState, useRef, useEffect } from 'react';
import { FiMoreVertical, FiBookmark, FiBell, FiArchive, FiTrash2 } from 'react-icons/fi';
import { pinChat, unpinChat, muteChat, unmuteChat, archiveChat, deleteChat } from '../../api/chatApi';

export default function ChatListItem({ chat, isSelected, onClick, onChatUpdate, onChatDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const friend = chat.friend || {};
  const initials = friend.fullName?.split(' ').map(n => n.charAt(0).toUpperCase()).join('') || '?';

  const handlePinToggle = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const action = chat.isPinned ? unpinChat : pinChat;
      const { chat: updatedChat } = await action(chat._id || chat.chatId);
      onChatUpdate && onChatUpdate(updatedChat);
      setShowMenu(false);
    } catch (err) {
      console.error("Failed to toggle pin", err);
      alert('Failed to update chat');
    } finally {
      setLoading(false);
    }
  };

  const handleMuteToggle = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const action = chat.isMuted ? unmuteChat : muteChat;
      const { chat: updatedChat } = await action(chat._id || chat.chatId);
      onChatUpdate && onChatUpdate(updatedChat);
      setShowMenu(false);
    } catch (err) {
      console.error("Failed to toggle mute", err);
      alert('Failed to update chat');
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      await archiveChat(chat._id || chat.chatId);
      onChatDelete && onChatDelete(chat._id || chat.chatId);
      setShowMenu(false);
    } catch (err) {
      console.error("Failed to archive chat", err);
      alert('Failed to archive chat');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this chat? This cannot be undone.')) return;
    setLoading(true);
    try {
      await deleteChat(chat._id || chat.chatId);
      onChatDelete && onChatDelete(chat._id || chat.chatId);
      setShowMenu(false);
    } catch (err) {
      console.error("Failed to delete chat", err);
      alert('Failed to delete chat');
    } finally {
      setLoading(false);
    }
  };

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
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-sm font-semibold text-white shadow-sm">
            {initials}
          </div>
          {chat.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
          )}
        </div>

        {/* Chat Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {friend.fullName || 'Unknown'}
            </h3>
            <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
              {chat.timestamp || ''}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600 truncate">
              {chat.lastMessage || 'No messages yet'}
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
          className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600 opacity-0 group-hover:opacity-100"
          title="More options"
        >
          <FiMoreVertical size={18} />
        </button>

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-50 overflow-hidden">
            <button 
              onClick={handlePinToggle}
              disabled={loading}
              className="w-full text-left px-4 py-3 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-3 transition-colors border-b border-gray-100 disabled:opacity-50"
            >
              <FiBookmark size={16} className={chat.isPinned ? 'text-purple-600' : ''} />
              <span>{chat.isPinned ? 'Unpin Chat' : 'Pin Chat'}</span>
            </button>
            
            <button 
              onClick={handleMuteToggle}
              disabled={loading}
              className="w-full text-left px-4 py-3 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-3 transition-colors border-b border-gray-100 disabled:opacity-50"
            >
              <FiBell size={16} className={chat.isMuted ? 'text-purple-600' : ''} />
              <span>{chat.isMuted ? 'Unmute Notifications' : 'Mute Notifications'}</span>
            </button>
            
            <button 
              onClick={handleArchive}
              disabled={loading}
              className="w-full text-left px-4 py-3 hover:bg-purple-50 text-sm text-gray-700 flex items-center gap-3 transition-colors border-b border-gray-100 disabled:opacity-50"
            >
              <FiArchive size={16} />
              <span>Archive Chat</span>
            </button>
            
            <button 
              onClick={handleDelete}
              disabled={loading}
              className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm text-red-600 flex items-center gap-3 transition-colors disabled:opacity-50"
            >
              <FiTrash2 size={16} />
              <span>Delete Chat</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
