import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ input, setInput, onSendMessage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
        <button
          type="submit"
          className="p-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!input.trim()}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
