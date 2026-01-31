import React, { useState } from 'react';
import { FiBell, FiLock, FiUser, FiHelpCircle, FiDatabase, FiArrowLeft, FiToggleRight, FiToggleLeft } from 'react-icons/fi';

export default function SettingsSection({ isSidebar = false, onBack }) {
  const [settings, setSettings] = useState({
    notifications: true,
    sound: true,
    privacy: 'friends',
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const settingsSections = [
    {
      title: 'Account',
      icon: FiUser,
      items: [
        { label: 'Profile', description: 'Manage your profile information' },
        { label: 'Privacy', description: 'Control your privacy settings' },
      ],
    },
    {
      title: 'Notifications',
      icon: FiBell,
      items: [
        { label: 'Messages', description: 'Get notified for new messages' },
        { label: 'Calls', description: 'Get notified for incoming calls' },
      ],
    },
    {
      title: 'Security',
      icon: FiLock,
      items: [
        { label: 'Password', description: 'Change your password' },
        { label: 'Two-Factor Auth', description: 'Enable 2FA for extra security' },
      ],
    },
    {
      title: 'Storage',
      icon: FiDatabase,
      items: [
        { label: 'Clear Cache', description: 'Free up space on your device' },
        { label: 'Download Data', description: 'Download your chat data' },
      ],
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
            <h2 className="text-lg font-bold text-gray-900">Settings</h2>
          </div>
        </div>

        {/* Settings List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {settingsSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx}>
                <div className="px-4 py-3 bg-gray-50 flex items-center gap-2">
                  <Icon size={16} className="text-purple-600" />
                  <h3 className="font-semibold text-xs text-gray-900">{section.title}</h3>
                </div>
                {section.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    className="w-full px-4 py-2 hover:bg-purple-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-medium text-xs text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{item.description}</p>
                  </button>
                ))}
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
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-600 mt-1">Manage your preferences and account</p>
      </div>

      {/* Settings List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y divide-gray-200">
          {settingsSections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <div key={idx}>
                <div className="px-6 py-4 bg-gray-50 flex items-center gap-2 border-b border-gray-200">
                  <Icon size={20} className="text-purple-600" />
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                </div>
                {section.items.map((item, itemIdx) => (
                  <button
                    key={itemIdx}
                    className="w-full px-6 py-4 hover:bg-purple-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Help & Support */}
      <div className="border-t border-gray-200 px-6 py-4 flex-shrink-0 bg-gray-50">
        <button className="w-full flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors">
          <FiHelpCircle size={18} />
          Help & Support
        </button>
      </div>
    </div>
  );
}
