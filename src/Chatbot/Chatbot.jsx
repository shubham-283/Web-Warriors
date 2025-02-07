import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import ChatHeader from './ChatHeader';
import ChatMessage from './ChatMessage';
import QuickOptions from './QuickOptions';
import ChatInput from './ChatInput';
import { generateResponse } from './ChatUtils';
import { IoChatbubblesSharp } from "react-icons/io5";

const ChatBot = ({ productData = [] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const chatContainerRef = useRef(null); // Ref for the chat container

    const initialGreetings = [
        "👋 Hi there! I'm your friendly Adaa Jaipur assistant. How can I help you today?",
        "नमस्ते! Welcome to Adaa Jaipur! What can I assist you with?",
        "Hello! I'm from Adaa Jaipur. Ask me anything!",
        "Greetings! I'm here to help with your Adaa Jaipur shopping experience.",
        "खम्मा घणी! Welcome to Adaa Jaipur! What can I assist you with?"
        // Add more greetings as needed
    ];

    const quickOptionsData = [
      {
        label: "Product Recommendations",
        action: "recommend",
        icon: null,
        message: "I'd love to help you find the perfect product! What type of item are you looking for?"
      },
      {
        label: "Sizing Help",
        action: "size",
        icon: null,
        message: "Need help finding your perfect size? I can help with measurements or show you our size chart."
      },
      {
        label: "Order Support",
        action: "order",
        icon: null,
        message: "I can help you track orders or assist with any order-related questions. What do you need?"
      },
      {
        label: "Shipping Info",
        action: "shipping",
        icon: null,
        message: "Let me tell you about our shipping options and delivery times!"
      }
    ];

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * initialGreetings.length);
        const initialMessage = initialGreetings[randomIndex];

        setMessages([{
            role: "bot",
            content: initialMessage
        }]);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]); // Scroll when messages change OR when isOpen changes

    // Effect to scroll to bottom when chat is opened
    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [isOpen]);

    const handleUserInput = async (text) => {
        if (!text?.trim()) return;

        setIsLoading(true);
        setMessages(prev => [...prev, { role: "user", content: text }]);

        try {
            const response = await generateResponse(text, productData);
            setMessages(prev => [...prev, { role: "bot", ...response }]);
        } catch (error) {
            console.error('Error generating response:', error);
            setMessages(prev => [...prev, {
                role: "bot",
                content: "I apologize, but I'm having trouble processing that request. Could you try rephrasing it?",
                buttons: []
            }]);
        }

        setIsLoading(false);
        setInput("");
    };

    const handleQuickOption = async (action) => {
        setIsLoading(true);
        setMessages(prev => [...prev, { role: "user", content: quickOptionsData.find(option => option.action === action).message }]); //add a user message

        try {
            const response = await generateResponse("", productData, action); // Pass action, not message
            setMessages(prev => [...prev, { role: "bot", ...response }]);
        } catch (error) {
            console.error('Error generating response:', error);
            setMessages(prev => [...prev, {
                role: "bot",
                content: "I apologize, but I'm having trouble processing that request. Could you try rephrasing it?",
                buttons: []
            }]);
        }

        setIsLoading(false);
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (chatContainerRef.current && !chatContainerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            {/* Toggle Button */}
            <button
                className="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition-colors duration-300 z-50"
                onClick={toggleChat}
            >
                <IoChatbubblesSharp size={30} />
            </button>

            {/* Chatbot Container (conditionally rendered) */}
            {isOpen && (
                 <div
                    className="fixed inset-x-0 bottom-0 sm:right-4 sm:bottom-4 sm:left-auto w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-md xl:max-w-md h-[70vh] sm:h-[500px] md:h-[550px] lg:h-[600px] bg-white rounded-lg shadow-xl flex flex-col z-50 border border-pink-200 mx-auto sm:mx-0"
                    ref={chatContainerRef} // Attach the ref
                >
                    <ChatHeader onClose={toggleChat} />

                    <div className="flex-1 p-4 overflow-y-auto">
                        {messages.map((message, index) => (
                            <ChatMessage
                                key={index}
                                message={message}
                                onNavigate={navigate}
                            />
                        ))}
                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="bg-pink-50 text-pink-800 p-3 rounded-lg rounded-bl-none">
                                    <Loader className="w-5 h-5 animate-spin" color="#DB2777" />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-pink-200">
                        <QuickOptions onOptionSelect={handleQuickOption} />
                        <ChatInput
                            input={input}
                            setInput={setInput}
                            onSendMessage={handleUserInput}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default ChatBot;
