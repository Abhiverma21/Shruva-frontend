import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiLogOut, FiUsers, FiArrowLeft, FiLoader } from 'react-icons/fi';

export default function UserProfile({ onBackClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    setLoading(true);
    fetch('https://shruva-backend.onrender.com/api/users/friends', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setFriends(data.friends || []);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  };

  const handleRemoveFriend = async (friendId) => {
    const token = localStorage.getItem('token');
    if (!window.confirm('Remove this friend?')) return;
    try {
      const res = await fetch('https://shruva-backend.onrender.com/api/users/remove-friend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ friendId }),
      });
      const data = await res.json();
      if (data.success) {
        loadFriends();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Logout?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="w-full md:w-96 h-full md:h-screen bg-white border-r border-gray-200 flex flex-col shadow-lg overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-900">Profile</h2>
        {onBackClick && (
          <button onClick={onBackClick} className="p-1 hover:bg-gray-100 rounded-full">
            <FiArrowLeft size={20} />
          </button>
        )}
      </div>

      {/* Profile Card */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-2xl font-semibold">
            {user?.name ? user.name[0] : '👤'}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition">
            <FiEdit size={16} />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Friends Section */}
      <div className="flex-1 flex flex-col p-4 min-h-0">
        <div className="flex items-center gap-2 mb-4">
          <FiUsers size={18} className="text-purple-600" />
          <h3 className="font-bold text-gray-900">{friends.length} Friends</h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center flex-1">
            <FiLoader className="animate-spin text-purple-600" size={24} />
          </div>
        ) : friends.length > 0 ? (
          <div className="flex-1 overflow-y-auto space-y-2">
            {friends.map((friend) => (
              <div key={friend._id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 border border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {friend.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">{friend.name}</div>
                  <div className="text-xs text-gray-500">{friend.email}</div>
                </div>
                <button
                  onClick={() => handleRemoveFriend(friend._id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
            <div className="text-center">
              <p className="mb-2">No friends yet</p>
              <p className="text-xs">Search and add people to get started!</p>
            </div>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200 flex-shrink-0">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
