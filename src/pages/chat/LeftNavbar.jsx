import React, { useContext, useState } from 'react';
import { FiMessageSquare, FiUser, FiHeart, FiPhone, FiPlus, FiSettings, FiLogOut, FiX, FiToggleLeft, FiToggleRight, FiBell, FiVolume2, FiMoon, FiLock } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

export default function LeftNavbar({ activeSection, setActiveSection, selectedChat, mobileMenuOpen, setMobileMenuOpen }) {
  const { logout } = useContext(AuthContext);
  const [localMobileMenuOpen, setLocalMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Use props if provided, otherwise use local state
  const menuOpen = mobileMenuOpen !== undefined ? mobileMenuOpen : localMobileMenuOpen;
  const setMenuOpen = setMobileMenuOpen !== undefined ? setMobileMenuOpen : setLocalMobileMenuOpen;

  // Settings state
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    darkMode: false,
    privacy: 'public',
  });

  const menuItems = [
    { id: 'chats', icon: FiMessageSquare, label: 'Chat', tooltip: 'Messages' },
    { id: 'profile', icon: FiUser, label: 'Profile', tooltip: 'My Profile' },
    { id: 'friends', icon: FiHeart, label: 'Friends', tooltip: 'My Friends' },
    { id: 'calls', icon: FiPhone, label: 'Calls', tooltip: 'Call History' },
  ];

  const actionItems = [
    { id: 'add-group', icon: FiPlus, label: 'Add Group', tooltip: 'Create Group' },
    { id: 'add-contact', icon: FiUser, label: 'Add Contact', tooltip: 'Add Contact' },
    { id: 'settings', icon: FiSettings, label: 'Settings', tooltip: 'Settings' },
  ];

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSettingToggle = (settingKey) => {
    setSettings(prev => ({
      ...prev,
      [settingKey]: !prev[settingKey]
    }));
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-30 pointer-events-auto" onClick={() => setMenuOpen(false)} />
      )}

      <div
        className={`${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative top-20 md:top-0 left-0 z-40 md:z-0 md:w-20 w-64 h-screen md:h-screen bg-gradient-to-r md:bg-gradient-to-b from-purple-700 to-purple-900 md:flex md:flex-col items-center md:items-center justify-start md:justify-start md:py-4 shadow-xl transition-transform duration-300 border-t md:border-t-0 md:border-r border-purple-800 px-4 md:px-0`}
      >
        {/* Logo - Hidden on mobile */}
        <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-20 mb-4 hover:bg-opacity-30 transition-all cursor-pointer relative group">
          <a href="/"><span className="text-2xl">
            <img src={logoImg} alt="" />
          </span></a>
          
          <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            Chat App
          </div>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden h-12 w-12 rounded-lg flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 transition-all"
          title="Menu"
        >
          <FiX size={24} className={`transform transition-transform ${menuOpen ? 'rotate-0' : 'rotate-45'}`} />
        </button>

      {/* Desktop Menu Items */}
      <div className="md:flex md:flex-1 md:flex-col gap-4 items-center md:items-stretch justify-center md:justify-start hidden md:flex">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-12 h-12 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 group relative ${
                activeSection === item.id
                  ? 'bg-white text-purple-700 shadow-lg md:scale-110'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
              title={item.tooltip}
            >
              <Icon size={24} />
              
              {/* Tooltip - desktop only */}
              <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 hidden md:block">
                {item.tooltip}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Menu Items */}
      <div className="md:hidden flex flex-col gap-3 w-full mt-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleMenuClick(item.id)}
              className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ${
                activeSection === item.id
                  ? 'bg-white text-purple-700 shadow-lg font-semibold'
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
              title={item.tooltip}
            >
              <Icon size={22} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Action Items - Bottom */}
      <div className="hidden md:flex md:flex-col gap-4 border-t border-white border-opacity-20 pt-4">
        {actionItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'add-group') {
                  alert('Add Group functionality - Coming soon!');
                } else if (item.id === 'add-contact') {
                  alert('Add Contact functionality - Coming soon!');
                } else if (item.id === 'settings') {
                  setShowSettingsModal(true);
                }
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 transition-all group relative"
              title={item.tooltip}
            >
              <Icon size={22} />
              
              {/* Tooltip - desktop only */}
              <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {item.tooltip}
              </div>
            </button>
          );
        })}
      </div>

      {/* Mobile Action Items */}
      <div className="md:hidden flex flex-col gap-3 w-full border-t border-white border-opacity-20 pt-4 mt-4">
        {actionItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'add-group') {
                  alert('Add Group functionality - Coming soon!');
                } else if (item.id === 'add-contact') {
                  alert('Add Contact functionality - Coming soon!');
                } else if (item.id === 'settings') {
                  setShowSettingsModal(true);
                }
              }}
              className="w-full px-4 py-3 rounded-lg flex items-center gap-3 text-white hover:bg-white hover:bg-opacity-20 transition-all"
              title={item.tooltip}
            >
              <Icon size={22} />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="hidden md:flex w-12 h-12 rounded-full items-center justify-center text-white hover:bg-red-500 hover:bg-opacity-80 transition-all group relative mt-4"
        title="Logout"
      >
        <FiLogOut size={22} />
        
        {/* Tooltip */}
        <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
          Logout
        </div>
      </button>

      {/* Mobile Logout Button */}
      <button
        onClick={handleLogout}
        className="md:hidden w-full px-4 py-3 rounded-lg flex items-center gap-3 text-white hover:bg-red-500 hover:bg-opacity-80 transition-all mt-4"
        title="Logout"
      >
        <FiLogOut size={22} />
        <span className="text-sm font-medium">Logout</span>
      </button>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <FiX size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Settings List */}
            <div className="space-y-4">
              {/* Notifications */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <FiBell size={20} className="text-purple-600" />
                  <span className="font-medium text-gray-700">Notifications</span>
                </div>
                <button
                  onClick={() => handleSettingToggle('notifications')}
                  className="text-2xl transition-colors"
                >
                  {settings.notifications ? (
                    <FiToggleRight size={24} className="text-green-500" />
                  ) : (
                    <FiToggleLeft size={24} className="text-gray-400" />
                  )}
                </button>
              </div>

              {/* Sound */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <FiVolume2 size={20} className="text-purple-600" />
                  <span className="font-medium text-gray-700">Sound</span>
                </div>
                <button
                  onClick={() => handleSettingToggle('sound')}
                  className="text-2xl transition-colors"
                >
                  {settings.sound ? (
                    <FiToggleRight size={24} className="text-green-500" />
                  ) : (
                    <FiToggleLeft size={24} className="text-gray-400" />
                  )}
                </button>
              </div>

              {/* Dark Mode */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <FiMoon size={20} className="text-purple-600" />
                  <span className="font-medium text-gray-700">Dark Mode</span>
                </div>
                <button
                  onClick={() => handleSettingToggle('darkMode')}
                  className="text-2xl transition-colors"
                >
                  {settings.darkMode ? (
                    <FiToggleRight size={24} className="text-green-500" />
                  ) : (
                    <FiToggleLeft size={24} className="text-gray-400" />
                  )}
                </button>
              </div>

              {/* Privacy */}
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <FiLock size={20} className="text-purple-600" />
                  <span className="font-medium text-gray-700">Privacy</span>
                </div>
                <select
                  value={settings.privacy}
                  onChange={(e) => setSettings(prev => ({ ...prev, privacy: e.target.value }))}
                  className="px-2 py-1 border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>

            {/* Modal Footer */}
            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full mt-6 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}
