import React from 'react';
import Message from './Message';

export default function MessageList({ messages, messagesEndRef, onDeleteMessage }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gradient-to-b from-white via-blue-50 to-white flex-shrink-1 min-h-0">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="text-4xl mb-2">
              <img src="/src/assets/logo.png" alt=""  className='size-30 '/>
            </div>
            <p className="text-sm">No messages yet. Start the conversation!</p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => {
            const isConsecutive =
              index > 0 && messages[index - 1].sender === message.sender;

            return (
              <Message
                key={message.id}
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
