import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import LeftNavbar from './LeftNavbar';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';
import CallsSection from './sections/CallsSection';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

      {/* Left Navigation Sidebar */}
      <div className="hidden md:block">
        <LeftNavbar 
          activeSection={activeSection}
          setActiveSection={handleNavigateSection}
          selectedChat={selectedChat}
          mobileMenuOpen={false}
          setMobileMenuOpen={() => {}}
        />
      </div>

      {/* Mobile Side Navigation */}
      <div className="md:hidden">
        <LeftNavbar 
          activeSection={activeSection}
          setActiveSection={(section) => {
            handleNavigateSection(section);
            setMobileMenuOpen(false);
          }}
          selectedChat={selectedChat}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
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
        {/* Mobile Header with Menu Button */}
        <div className="md:hidden bg-gradient-to-r from-purple-700 to-purple-900 text-white p-4 flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all"
            title="Menu"
          >
            <FiMenu size={24} />
          </button>
          <h1 className="text-xl font-bold">Chat App</h1>
        </div>

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
    </div>
  );
}
