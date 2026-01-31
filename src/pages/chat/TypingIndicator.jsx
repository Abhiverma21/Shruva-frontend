import React from 'react';

export default function TypingIndicator() {
  return (
    <div className="px-4 py-2 flex items-center gap-2 bg-white border-t border-gray-200">
      <div className="flex gap-1">
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
      </div>
      <span className="text-xs text-gray-500">Someone is typing...</span>
    </div>
  );
}
