import React from 'react';
import { FiHeart, FiMessageSquare, FiThumbsUp, FiArrowLeft } from 'react-icons/fi';

export default function ActivitySection({ isSidebar = false, onBack }) {
  const activities = [
    {
      id: 1,
      user: 'Sarah Johnson',
      avatar: '👩‍💼',
      action: 'liked your message',
      timestamp: '2 hours ago',
      icon: FiThumbsUp,
    },
    {
      id: 2,
      user: 'Design Team',
      avatar: '🎨',
      action: 'replied to your message',
      timestamp: '4 hours ago',
      icon: FiMessageSquare,
    },
    {
      id: 3,
      user: 'John Smith',
      avatar: '👨‍💻',
      action: 'liked your message',
      timestamp: '1 day ago',
      icon: FiThumbsUp,
    },
    {
      id: 4,
      user: 'Alex Chen',
      avatar: '👨‍🎨',
      action: 'sent you a message',
      timestamp: '2 days ago',
      icon: FiMessageSquare,
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
            <h2 className="text-lg font-bold text-gray-900">Activity</h2>
          </div>
        </div>

        {/* Activity List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 border-transparent hover:border-l-purple-500"
              >
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-sm text-white font-semibold flex-shrink-0">
                    {activity.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-gray-900 text-xs truncate">{activity.user}</p>
                      <Icon size={12} className="text-purple-500 flex-shrink-0" />
                    </div>
                    <p className="text-xs text-gray-600 mt-0.5">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
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
        <h2 className="text-2xl font-bold text-gray-900">Activity</h2>
        <p className="text-sm text-gray-600 mt-1">Recent activity from your contacts</p>
      </div>

      {/* Activity List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-100">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div
                key={activity.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 border-transparent hover:border-l-purple-500"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-lg text-white font-semibold">
                      {activity.avatar}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{activity.user}</p>
                      <Icon size={16} className="text-purple-500" />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-2">{activity.timestamp}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
