import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import LeftNavbar from './LeftNavbar';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import NewChatModal from './NewChatModal';
import ActivitySection from './sections/ActivitySection';
import FavoritesSection from './sections/FavoritesSection';
import CallsSection from './sections/CallsSection';
import SettingsSection from './sections/SettingsSection';
import ProfileSection from './sections/ProfileSection';
import FriendsSection from './sections/FriendsSection';
import { AuthContext } from '../../context/AuthContext';
import { initSocket } from '../../services/socketService';

export default function Chat() {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [chatFilter, setChatFilter] = useState('all');
  const { user } = useContext(AuthContext);

  // Determine which section is active based on URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const activeSection = pathParts[1] || 'chats';
  const chatId = pathParts[2];

  // Initialize Socket.io on mount and when user changes
  useEffect(() => {
    if (user && user.id) {
      initSocket(user.id);
      return () => {
        // Don't disconnect on unmount to keep socket alive
      };
    }
  }, [user]);

  // If a chatId is in URL, find and select that chat
  useEffect(() => {
    if (chatId && chats.length > 0) {
      const chat = chats.find(c => c._id === chatId || c.chatId === chatId);
      if (chat) {
        setSelectedChat(chat);
      }
    }
  }, [chatId, chats]);

  const handleNavigateSection = (section) => {
    navigate(`/chat/${section}`);
    setSelectedChat(null);
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    navigate(`/chat/message/${chat._id}`);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 overflow-hidden">
      {/* Left Navigation Sidebar - desktop only */}
      <div className="hidden md:block">
        <LeftNavbar 
          activeSection={activeSection}
          setActiveSection={handleNavigateSection}
          selectedChat={selectedChat}
        />
      </div>

      {/* Desktop Layout: Show sidebar + content side-by-side */}
      <div className="hidden md:flex flex-1 overflow-hidden">
        {/* Show appropriate content based on active section */}
        {activeSection === 'chats' || activeSection === 'message' ? (
          <>
            <ChatSidebar
              selectedChat={selectedChat}
              setSelectedChat={handleSelectChat}
              chatFilter={chatFilter}
              setChatFilter={setChatFilter}
              chats={chats}
              setChats={setChats}
            />
            {selectedChat ? (
              <ChatWindow 
                chat={selectedChat} 
                onBackClick={() => {
                  setSelectedChat(null);
                  navigate('/chat/chats');
                }} 
              />
            ) : (
              <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50">
                <div className="text-center space-y-6">
                  <div className="text-8xl animate-bounce">💬</div>
                  <div>
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-3">Welcome to ChatApp</h2>
                    <p className="text-gray-600 text-lg max-w-md">Select a conversation from the left to start messaging or create a new chat</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : activeSection === 'profile' ? (
          <div className="flex-1 overflow-hidden">
            <ProfileSection onBack={() => handleNavigateSection('chats')} />
          </div>
        ) : activeSection === 'friends' ? (
          <div className="flex-1 overflow-hidden">
            <FriendsSection onBack={() => handleNavigateSection('chats')} />
          </div>
        ) : activeSection === 'calls' ? (
          <div className="flex-1 overflow-hidden">
            <CallsSection onBack={() => handleNavigateSection('chats')} />
          </div>
        ) : null}
      </div>

      {/* Mobile Layout: Full screen for each section */}
      <div className="md:hidden flex-1 flex flex-col overflow-hidden">
        {activeSection === 'chats' ? (
          <ChatSidebar
            selectedChat={selectedChat}
            setSelectedChat={handleSelectChat}
            chatFilter={chatFilter}
            setChatFilter={setChatFilter}
            chats={chats}
            setChats={setChats}
          />
        ) : activeSection === 'message' && selectedChat ? (
          <ChatWindow 
            chat={selectedChat} 
            onBackClick={() => {
              setSelectedChat(null);
              navigate('/chat/chats');
            }} 
          />
        ) : activeSection === 'profile' ? (
          <ProfileSection onBack={() => handleNavigateSection('chats')} />
        ) : activeSection === 'friends' ? (
          <FriendsSection onBack={() => handleNavigateSection('chats')} />
        ) : activeSection === 'calls' ? (
          <CallsSection onBack={() => handleNavigateSection('chats')} />
        ) : (
          <ChatSidebar
            selectedChat={selectedChat}
            setSelectedChat={handleSelectChat}
            chatFilter={chatFilter}
            setChatFilter={setChatFilter}
            chats={chats}
            setChats={setChats}
          />
        )}
      </div>

      {/* Mobile Bottom Navigation - Always visible on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
        <LeftNavbar 
          activeSection={activeSection}
          setActiveSection={handleNavigateSection}
          selectedChat={selectedChat}
        />
      </div>
    </div>
  );
}
