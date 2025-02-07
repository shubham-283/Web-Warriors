import React from 'react';

const ChatMessage = ({ message, onNavigate }) => {
  const isBot = message.role === "bot";

  const handleButtonClick = (path) => {
    if (onNavigate && path) {
      onNavigate(path);
    }
  };

  return (
    <div className={`mb-4 flex ${isBot ? 'items-start' : 'items-end flex-row-reverse'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-xl shadow-md ${
          isBot ? 'bg-pink-50 text-pink-800 rounded-bl-none' : 'bg-pink-400 text-white rounded-br-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        {isBot && message.buttons && message.buttons.length > 0 && (
          <div className="mt-2 flex flex-col gap-2">
            {message.buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button.path)}
                className="text-pink-600 bg-white px-3 py-1 rounded-md text-sm hover:bg-pink-50 transition-colors duration-200 shadow-sm"
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
