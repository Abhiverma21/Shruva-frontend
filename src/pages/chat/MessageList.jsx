import React, { useContext } from 'react';
import Message from './Message';
import { AuthContext } from '../../context/AuthContext';

export default function MessageList({ messages, messagesEndRef, onDeleteMessage }) {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex-1 overflow-y-auto px-2 md:px-4 py-2 md:py-4 space-y-1 md:space-y-3 bg-gradient-to-b from-white via-blue-50 to-white flex-shrink-1 min-h-0">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <p className="text-sm">No messages yet. Start the conversation!</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => {
            const prevMessage = messages[index - 1];
            const isConsecutive =
              prevMessage && 
              prevMessage.senderId?._id === message.senderId?._id;

            return (
              <Message
                key={message._id}
                message={message}
                isConsecutive={isConsecutive}
                onDelete={onDeleteMessage}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
}
