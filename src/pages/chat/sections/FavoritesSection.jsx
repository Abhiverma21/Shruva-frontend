import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

export default function FavoritesSection({ isSidebar = false, onBack }) {
  const favorites = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '👩‍💼',
      lastMessage: 'Hey! How are you doing?',
      timestamp: '2:45 PM',
      isOnline: true,
    },
    {
      id: 2,
      name: 'Alex Chen',
      avatar: '👨‍🎨',
      lastMessage: 'Thanks for the feedback!',
      timestamp: '3 days ago',
      isOnline: false,
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
            <h2 className="text-lg font-bold text-gray-900">Favorites</h2>
          </div>
        </div>

        {/* Favorites List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <div
                key={fav.id}
                className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-2">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-lg text-white font-semibold">
                      {fav.avatar}
                    </div>
                    {fav.isOnline && (
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">{fav.name}</p>
                    <p className="text-xs text-gray-600 mt-0.5 line-clamp-1">{fav.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">{fav.timestamp}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500">
              <p className="text-xs">No favorites</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white shadow-sm flex-shrink-0">
        <h2 className="text-2xl font-bold text-gray-900">Favorites</h2>
        <p className="text-sm text-gray-600 mt-1">Your favorite conversations</p>
      </div>

      {/* Favorites Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.length > 0 ? (
            favorites.map((fav) => (
              <div
                key={fav.id}
                className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer border border-purple-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-lg text-white font-semibold">
                    {fav.avatar}
                  </div>
                  {fav.isOnline && (
                    <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900">{fav.name}</h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">{fav.lastMessage}</p>
                <p className="text-xs text-gray-500 mt-3">{fav.timestamp}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center h-64 text-gray-500">
              <div className="text-center">
                <div className="text-4xl mb-2">❤️</div>
                <p>No favorites yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
