import React from 'react';
import { X } from 'lucide-react';

const ChatHeader = ({ onClose }) => {
  return (
    <div className="p-3 border-b flex justify-between items-center bg-gradient-to-r from-pink-100 to-rose-100 rounded-t-lg shadow-md">
      <div className="flex items-center">
        <img
          src="/adaa-icon.ico"
          alt="Adaa Jaipur Logo"
          className="w-9 h-9 rounded-full mr-3"
        />
        <div>
          <h3 className="text-lg font-semibold text-pink-800">Adaa Jaipur Assistant</h3>
          <p className="text-sm text-gray-600">Available</p>
        </div>
      </div>
      <button className="text-gray-600 hover:text-pink-700 transition-colors duration-200" onClick={onClose}>
        <X className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ChatHeader;
