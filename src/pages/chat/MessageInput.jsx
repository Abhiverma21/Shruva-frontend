import React, { useState } from 'react';
import { FiSend, FiPaperclip, FiSmile, FiMic } from 'react-icons/fi';

export default function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-3 flex-shrink-0">
      <div className="flex items-end gap-2">
        {/* Attachment Button */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 flex-shrink-0" title="Attach file">
          <FiPaperclip size={18} />
        </button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows="1"
            className="w-full px-3 py-2 bg-gray-100 rounded-2xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none max-h-20 leading-normal"
            style={{ minHeight: '36px' }}
          />
        </div>

        {/* Voice Note Button */}
        <button 
          onClick={toggleRecording}
          className={`p-2 rounded-full transition-colors flex-shrink-0 ${
            isRecording 
              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
              : 'hover:bg-gray-100 text-gray-600'
          }`}
          title="Record voice message"
        >
          <FiMic size={18} />
        </button>

        {/* Emoji Button */}
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 flex-shrink-0" title="Add emoji">
          <FiSmile size={18} />
        </button>

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="p-2 hover:bg-purple-100 rounded-full transition-all text-purple-600 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          title="Send message"
        >
          <FiSend size={18} />
        </button>
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-xs">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse"></span>
          Recording... (Click microphone to stop)
        </div>
      )}

      {/* Character count */}
      {message.length > 0 && message.length > 100 && (
        <p className="text-xs text-gray-400 mt-1 text-right">
          {message.length} / 1000
        </p>
      )}
    </div>
  );
}
