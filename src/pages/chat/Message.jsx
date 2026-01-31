import React, { useState } from 'react';
import { FiTrash2, FiDownload } from 'react-icons/fi';

export default function Message({ message, isConsecutive, onDelete }) {
  const [showActions, setShowActions] = useState(false);
  const isUserMessage = message.sender === 'user';

  return (
    <div 
      className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'} gap-2 group`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {!isUserMessage && !isConsecutive && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0">
          {message.avatar}
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
              <button
                onClick={() => onDelete(message.id)}
                className="p-1 hover:bg-red-100 rounded transition-colors text-red-600"
                title="Delete"
              >
                <FiTrash2 size={16} />
              </button>
              {isUserMessage && (
                <button
                  className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-600 text-xs font-semibold"
                  title="Message sent"
                >
                  ✓✓
                </button>
              )}
            </div>
          )}
        </div>

        {/* Timestamp & Read Receipt */}
        <span className={`text-xs mt-1 ${isUserMessage ? 'text-right' : 'text-left'} text-gray-500 flex items-center gap-1`}>
          {message.timestamp}
          {isUserMessage && message.read && <span className="text-green-600">✓</span>}
        </span>
      </div>

      {isUserMessage && !isConsecutive && (
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-lg flex-shrink-0">
          {message.avatar}
        </div>
      )}
      {isUserMessage && isConsecutive && (
        <div className="w-8" />
      )}
    </div>
  );
}
