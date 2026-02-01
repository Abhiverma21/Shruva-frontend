import React, { useState, useContext, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import { markMessageSeen } from '../../api/messageApi';

export default function Message({ message, isConsecutive, onDelete }) {
  const [showActions, setShowActions] = useState(false);
  const [isSeen, setIsSeen] = useState(message.isSeen || false);
  const { user } = useContext(AuthContext);
  
  const isUserMessage = message.senderId?._id === user?.id || message.senderId === user?.id;
  const senderName = message.senderId?.fullName || 'Unknown';
  const timestamp = message.createdAt 
    ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : '';

  // Mark message as seen when it comes into view (for other user's messages)
  useEffect(() => {
    if (!isUserMessage && !isSeen) {
      const timer = setTimeout(() => {
        markMessageSeen(message._id).catch(err => console.error("Failed to mark seen:", err));
        setIsSeen(true);
      }, 500); // Mark as seen after 500ms of being visible
      
      return () => clearTimeout(timer);
    }
  }, [message._id, isUserMessage, isSeen]);

  return (
    <div 
      className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} gap-2 group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isUserMessage && !isConsecutive && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-xs text-white flex-shrink-0 font-semibold">
          {senderName.charAt(0).toUpperCase()}
        </div>
      )}
      {!isUserMessage && isConsecutive && (
        <div className="w-8" />
      )}

      <div className={`flex flex-col ${isUserMessage ? 'items-end' : 'items-start'}`}>
        <div className="flex items-center gap-2">
          <div
            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              isUserMessage
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-br-none shadow-md'
                : 'bg-gray-200 text-gray-900 rounded-bl-none shadow-sm'
            } break-words transition-all duration-200 hover:shadow-lg`}
          >
            <p className="text-sm">{message.text}</p>
          </div>

          {/* Message Actions */}
          {showActions && (
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {isUserMessage && (
                <button
                  onClick={() => onDelete(message._id)}
                  className="p-1 hover:bg-red-100 rounded transition-colors text-red-600"
                  title="Delete"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
              {isUserMessage && (
                <button
                  className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 text-xs font-semibold"
                  title={isSeen ? "Seen" : "Sent"}
                >
                  {isSeen ? '✓✓' : '✓'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Timestamp */}
        <span className={`text-xs mt-1 ${isUserMessage ? 'text-right' : 'text-left'} text-gray-500`}>
          {timestamp}
        </span>
      </div>

      {isUserMessage && !isConsecutive && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-xs text-white flex-shrink-0 font-semibold">
          {user?.fullName?.charAt(0).toUpperCase() || 'U'}
        </div>
      )}
      {isUserMessage && isConsecutive && (
        <div className="w-8" />
      )}
    </div>
  );
}
