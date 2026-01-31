import React from 'react';
import { FiPhone, FiVideoOff, FiPhoneMissed, FiClock, FiArrowLeft } from 'react-icons/fi';

export default function CallsSection({ isSidebar = false, onBack }) {
  const calls = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '👩‍💼',
      type: 'incoming',
      status: 'completed',
      duration: '15 min',
      timestamp: '2:30 PM',
      icon: FiPhone,
    },
    {
      id: 2,
      name: 'Design Team',
      avatar: '🎨',
      type: 'video',
      status: 'completed',
      duration: '1h 20m',
      timestamp: '10:00 AM',
      icon: FiVideoOff,
    },
    {
      id: 3,
      name: 'John Smith',
      avatar: '👨‍💻',
      type: 'incoming',
      status: 'missed',
      duration: '-',
      timestamp: 'Yesterday',
      icon: FiPhoneMissed,
    },
    {
      id: 4,
      name: 'Alex Chen',
      avatar: '👨‍🎨',
      type: 'outgoing',
      status: 'completed',
      duration: '5 min',
      timestamp: '3 days ago',
      icon: FiPhone,
    },
  ];

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
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-900">Calls</h2>
        <p className="text-sm text-gray-600 mt-1">Recent call history</p>
      </div>

      {/* Call List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {calls.map((call) => {
            const Icon = call.icon;
            return (
              <div
                key={call.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex-shrink-0 relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-lg text-white font-semibold">
                      {call.avatar}
                    </div>
                    <div className={`absolute bottom-0 right-0 p-1 rounded-full ${
                      call.status === 'missed' ? 'bg-red-500' : 'bg-green-500'
                    } text-white`}>
                      <Icon size={12} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{call.name}</p>
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
