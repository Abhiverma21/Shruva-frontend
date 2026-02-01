import React, { useState, useContext, useMemo, useEffect } from 'react';
import { FiSearch, FiTrash2, FiUserX, FiArrowLeft } from 'react-icons/fi';
import { AuthContext } from '../../../context/AuthContext';

export default function FriendsSection({ onBack }) {
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found');
          setLoading(false);
          return;
        }
        const response = await fetch('http://localhost:3000/api/users/friends', {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success && data.friends) {
          setFriends(data.friends);
        } else {
          console.log('No friends found:', data);
        }
      } catch (error) {
        console.error('Failed to fetch friends:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const filteredFriends = useMemo(() => {
    if (searchTerm.trim() === '') {
      return friends;
    }
    return friends.filter(friend =>
      friend.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, friends]);

  const handleRemoveFriend = (friendId) => {
    setFriends(friends.filter(f => f._id !== friendId));
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          {onBack && (
            <button onClick={onBack} className="md:hidden p-1 hover:bg-gray-100 rounded-full transition-colors text-purple-600">
              <FiArrowLeft size={20} />
            </button>
          )}
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">My Friends</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <FiSearch className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search friends by name or username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Friends List */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500">Loading friends...</p>
          </div>
        ) : filteredFriends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFriends.map(friend => (
              <div key={friend._id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                {/* Friend Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-lg text-white font-bold flex-shrink-0">
                    {friend.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{friend.fullName}</h3>
                    <p className="text-sm text-gray-600 truncate">@{friend.username}</p>
                  </div>
                </div>

                {/* Friend Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
                  <p>{friend.email}</p>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFriend(friend._id)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <FiTrash2 size={16} />
                  Remove Friend
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            {friends.length === 0 ? (
              <>
                <FiUserX size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Friends Yet</h2>
                <p className="text-gray-500">Start searching for users to add as friends!</p>
              </>
            ) : (
              <>
                <FiSearch size={48} className="mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">No Results</h2>
                <p className="text-gray-500">No friends match your search.</p>
              </>
            )}
          </div>
        )}

        {/* Friends Count */}
        {friends.length > 0 && (
          <div className="mt-6 text-center text-sm text-gray-600">
            Total friends: <span className="font-semibold">{friends.length}</span>
          </div>
        )}
      </div>
    </div>
  );
}
