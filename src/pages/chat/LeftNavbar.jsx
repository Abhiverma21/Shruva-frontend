import React from 'react';
import { FiMessageSquare, FiActivity, FiHeart, FiPhone, FiPlus, FiUser, FiSettings, FiLogOut, FiX } from 'react-icons/fi';

export default function LeftNavbar({ activeSection, setActiveSection, selectedChat }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [statusDropdown, setStatusDropdown] = React.useState(false);
  const [userStatus, setUserStatus] = React.useState('active');

  const statusOptions = [
    { id: 'active', label: 'Active', color: 'bg-green-500' },
    { id: 'away', label: 'Away', color: 'bg-yellow-500' },
    { id: 'busy', label: 'Busy', color: 'bg-red-500' },
    { id: 'offline', label: 'Offline', color: 'bg-gray-500' },
  ];

  const menuItems = [
    { id: 'chat', icon: FiMessageSquare, label: 'Chat', tooltip: 'Messages' },
    { id: 'activity', icon: FiActivity, label: 'Activity', tooltip: 'Activity Feed' },
    { id: 'favorites', icon: FiHeart, label: 'Favorites', tooltip: 'Favorite Chats' },
    { id: 'calls', icon: FiPhone, label: 'Calls', tooltip: 'Call History' },
  ];

  const actionItems = [
    { id: 'add-group', icon: FiPlus, label: 'Add Group', tooltip: 'Create Group' },
    { id: 'add-contact', icon: FiUser, label: 'Add Contact', tooltip: 'Add Contact' },
    { id: 'settings', icon: FiSettings, label: 'Settings', tooltip: 'Settings' },
  ];

  const handleMenuClick = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div
        className={`${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative w-full md:w-20 h-20 md:h-screen bg-gradient-to-r md:bg-gradient-to-b from-purple-700 to-purple-900 flex md:flex-col items-center justify-center md:justify-start md:py-4 shadow-xl transition-transform duration-300 z-40 bottom-0 md:bottom-auto left-0 md:left-auto border-t md:border-t-0 md:border-r border-purple-800 ${
          selectedChat && window.innerWidth < 768 ? 'hidden' : 'flex md:flex'
        }`}
      >
      {/* Logo & Status - Hidden on mobile */}
      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-white bg-opacity-20 mb-4 hover:bg-opacity-30 transition-all cursor-pointer relative group">
        <a href="/"><span className="text-2xl">
          <img src="/src/assets/logo.png" alt="" />
        </span></a>
        
        <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
          Chat App
        </div>
      </div>

      {/* Status Button - Hidden on mobile */}
      <div className="hidden md:block relative mb-6">
        <button
          onClick={() => setStatusDropdown(!statusDropdown)}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all group relative ${
            statusDropdown ? 'bg-white bg-opacity-30' : 'text-white hover:bg-white hover:bg-opacity-20'
          }`}
          title="Status"
        >
          <div className={`w-8 h-8 rounded-full ${statusOptions.find(s => s.id === userStatus)?.color || 'bg-green-500'} flex items-center justify-center text-white text-xs font-bold`}>
            •
          </div>
          <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
            Status
          </div>
        </button>

        {/* Status Dropdown */}
        {statusDropdown && (
          <div className="absolute left-16 top-0 bg-gray-900 rounded-lg shadow-lg p-2 w-40 z-50">
            {statusOptions.map((status) => (
              <button
                key={status.id}
                onClick={() => {
                  setUserStatus(status.id);
                  setStatusDropdown(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors text-white text-sm"
              >
                <div className={`w-3 h-3 rounded-full ${status.color}`} />
                <span>{status.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Menu Items */}
      <div className="flex-1 md:flex-1 flex flex-row md:flex-col gap-4 items-center md:items-stretch justify-center md:justify-start">
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
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {item.tooltip}
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Items - Bottom */}
      <div className="flex flex-col gap-4 border-t border-white border-opacity-20 pt-4">
        {actionItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'add-group') {
                  // Add group modal
                  alert('Add Group functionality - Coming soon!');
                } else if (item.id === 'add-contact') {
                  // Add contact modal
                  alert('Add Contact functionality - Coming soon!');
                } else if (item.id === 'settings') {
                  handleMenuClick('settings');
                }
              }}
              className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 transition-all group relative"
              title={item.tooltip}
            >
              <Icon size={22} />
              
              {/* Tooltip */}
              <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {item.tooltip}
              </div>
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          // Logout logic
          alert('Logout - Coming soon!');
        }}
        className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-red-500 hover:bg-opacity-80 transition-all group relative mt-4"
        title="Logout"
      >
        <FiLogOut size={22} />
        
        {/* Tooltip */}
        <div className="absolute left-full ml-4 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
          Logout
        </div>
      </button>
      </div>
    </>
  );
}
