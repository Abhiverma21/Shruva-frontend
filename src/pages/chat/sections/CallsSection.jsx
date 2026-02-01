import React from 'react';
import { FiPhone, FiVideoOff, FiPhoneMissed, FiClock, FiArrowLeft } from 'react-icons/fi';

export default function CallsSection({ isSidebar = false, onBack }) {
  const calls = [];

  if (isSidebar) {
    return (
      <div className="w-80 h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg hidden md:flex">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors text-purple-600">
              <FiArrowLeft size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-900">Calls</h2>
          </div>
        </div>

        {/* Call List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {calls.map((call) => {
            const Icon = call.icon;
            return (
              <div
                key={call.id}
                className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="flex-shrink-0 relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-sm text-white font-semibold">
                      {call.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 p-0.5 rounded-full ${
                      call.status === 'missed' ? 'bg-red-500' : 'bg-green-500'
                    } text-white`}>
                      <Icon size={10} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-xs truncate">{call.name}</p>
                    <div className="flex items-center gap-1 mt-0.5">
                      <FiClock size={12} className="text-gray-500 flex-shrink-0" />
                      <span className="text-xs text-gray-600">{call.duration}</span>
                      {call.status === 'missed' && (
                        <span className="text-xs text-red-600 font-semibold">Missed</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 ml-2 flex-shrink-0">{call.timestamp}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <div className="flex items-center gap-3 mb-2">
          {onBack && (
            <button onClick={onBack} className="md:hidden p-1 hover:bg-gray-100 rounded-full transition-colors text-purple-600">
              <FiArrowLeft size={20} />
            </button>
          )}
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Calls</h2>
        </div>
        <p className="text-sm text-gray-600 ml-0 md:ml-0">Recent call history</p>
      </div>

      {/* Call List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {calls.map((call) => {
            const Icon = call.icon;
            return (
              <div
                key={call.id}
                className="px-8 py-5 hover:bg-white transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0 relative">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-lg text-white font-semibold shadow-md">
                      {call.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 p-1 rounded-full ${
                      call.status === 'missed' ? 'bg-red-500' : 'bg-green-500'
                    } text-white shadow-md`}>
                      <Icon size={12} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-lg">{call.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <FiClock size={14} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{call.duration}</span>
                      {call.status === 'missed' && (
                        <span className="text-xs text-red-600 font-semibold">Missed</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{call.timestamp}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
