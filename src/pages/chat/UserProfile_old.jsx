import React from 'react';
import { FiSettings, FiLogOut, FiArrowLeft } from 'react-icons/fi';

export default function UserProfile({ onBackClick }) {
  return (
    <div className="border-t border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1">
          <button 
            onClick={onBackClick}
            className="md:hidden p-1.5 hover:bg-purple-100 rounded-full transition-colors text-purple-600 flex-shrink-0" 
            title="Back to contacts"
          >
            <FiArrowLeft size={18} />
          </button>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
            👤
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900">You</p>
            <p className="text-xs text-gray-500">Active now</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600">
            <FiSettings size={18} />
          </button>
          <button className="p-2 hover:bg-red-50 rounded-full transition-colors text-gray-600 hover:text-red-600">
            <FiLogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
