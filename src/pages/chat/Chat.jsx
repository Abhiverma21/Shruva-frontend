import React, { useState } from 'react';
import LeftNavbar from './LeftNavbar';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import NewChatModal from './NewChatModal';
import ActivitySection from './sections/ActivitySection';
import FavoritesSection from './sections/FavoritesSection';
import CallsSection from './sections/CallsSection';
import SettingsSection from './sections/SettingsSection';

export default function Chat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeSection, setActiveSection] = useState('chat');
  const [chatFilter, setChatFilter] = useState('all');
//   const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [sidebarView, setSidebarView] = useState('chats'); // 'chats', 'activity', 'favorites', 'calls', 'settings', 'new'

  const renderSidebarContent = () => {
    switch (sidebarView) {
      case 'activity':
        return <ActivitySection isSidebar={true} onBack={() => setSidebarView('chats')} />;
      case 'favorites':
        return <FavoritesSection isSidebar={true} onBack={() => setSidebarView('chats')} />;
      case 'calls':
        return <CallsSection isSidebar={true} onBack={() => setSidebarView('chats')} />;
      case 'settings':
        return <SettingsSection isSidebar={true} onBack={() => setSidebarView('chats')} />;
      case 'new':
        return <NewChatModal isSidebar={true} onClose={() => setSidebarView('chats')} onBack={() => setSidebarView('chats')} />;
      case 'chats':
      default:
        return (
          <ChatSidebar
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            chatFilter={chatFilter}
            setChatFilter={setChatFilter}
            onNewChat={() => setSidebarView('new')}
          />
        );
    }
  };

  const renderContent = () => {
    if (sidebarView !== 'chats') {
      return (
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="text-center">
            <div className="text-6xl mb-4">👆</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Select a chat</h2>
            <p className="text-gray-600">Choose from the sidebar to start messaging</p>
          </div>
        </div>
      );
    }

    return selectedChat ? (
      <ChatWindow chat={selectedChat} onBackClick={() => setSelectedChat(null)} />
    ) : (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to ChatApp</h2>
          <p className="text-gray-600">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      {/* Left Navigation Sidebar - Bottom on mobile, Left on desktop */}
      <LeftNavbar 
        activeSection={activeSection}
        selectedChat={selectedChat}
        setActiveSection={(section) => {
          setActiveSection(section);
          if (section === 'chat') setSidebarView('chats');
          else if (section === 'activity') setSidebarView('activity');
          else if (section === 'favorites') setSidebarView('favorites');
          else if (section === 'calls') setSidebarView('calls');
          else if (section === 'settings') setSidebarView('settings');
        }}
      />

      {/* Middle and Main Content Container */}
      <div className="flex flex-1 flex-col md:flex-row overflow-hidden pb-20 md:pb-0">
        {/* Middle Sidebar - Full screen on mobile when not in chat */}
        <div className={`${selectedChat && sidebarView === 'chats' ? 'hidden' : 'flex'} md:flex flex-col md:flex-row flex-1 md:flex-none md:w-80`}>
          {renderSidebarContent()}
        </div>

        {/* Main Content Area - Shows chat or empty state */}
        {selectedChat && sidebarView === 'chats' ? (
          <ChatWindow chat={selectedChat} onBackClick={() => setSelectedChat(null)} />
        ) : (
          <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-purple-50 to-purple-100">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to ChatApp</h2>
              <p className="text-gray-600">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
