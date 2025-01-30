import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Notification.css'

const Notification = ({ message, onClose }) => {
  const [isFalling, setIsFalling] = useState(false);
  const [isShaking, setIsShaking] = useState(true);

  useEffect(() => {
    // Reset shaking effect when a new notification is triggered
    setIsShaking(true);
    const shakeTimer = setTimeout(() => {
      setIsShaking(false);
    }, 500); // Shake effect duration

    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      setIsFalling(true); // Trigger free-fall animation
      setTimeout(onClose, 500); // Delay onClose to allow animation to complete
    }, 5000);

    return () => {
      clearTimeout(timer); // Cleanup on unmount
      clearTimeout(shakeTimer); // Cleanup the shaking timer
    };
  }, [message, onClose]); // Dependency on message ensures the animation runs when new notification is triggered

  return (
    <div
      className={`fixed bottom-5 right-5 bg-white/30 backdrop-blur-lg py-4 px-6 rounded-lg shadow-lg border border-transparent transition-transform transform duration-300 ease-in-out ${
        isShaking ? 'animate-shake' : ''
      } ${isFalling ? 'translate-y-[200px] opacity-0' : 'translate-y-0 opacity-100'}`}
      style={{
        zIndex: 9999,
        borderImage: 'linear-gradient(45deg, #4ade80, #22d3ee) 1',
      }}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-3 text-green-500 animate-pulse"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01M12 4a8 8 0 100 16 8 8 0 000-16z"
            />
          </svg>
          <span className="text-lg font-semibold text-gray-900">{message}</span>
        </div>
        <button
          onClick={() => {
            setIsFalling(true); // Trigger free-fall animation manually
            setTimeout(onClose, 500); // Delay onClose to allow animation to complete
          }}
          className="ml-4 text-gray-800 font-bold text-xl hover:text-red-500 focus:outline-none transition-colors duration-300"
          aria-label="Close notification"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Notification;
