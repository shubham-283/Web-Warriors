import React from 'react';

const LoadingAnimation = ({loadingText}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-white to-gray-100 relative">
      {/* Rotating Mandala Design */}
      <div className="relative w-24 h-24">
        {/* Outer Circle */}
        <div className="absolute inset-0 border-6 border-dashed border-pink-500 rounded-full animate-spin-slow"></div>
        {/* Inner Circle */}
        <div className="absolute inset-2 border-6 border-dashed border-purple-500 rounded-full animate-spin-reverse"></div>
        {/* Central Mandala with Bouncing Effect */}
        <div className="absolute inset-6 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full shadow-lg animate-bounce-smooth"></div> {/* Decreased size of the central ball */}
      </div>

      {/* Updated Text for User Satisfaction */}
      <p className="mt-4 text-lg font-semibold text-gray-700 tracking-wider text-center">
        {loadingText}
      </p>

      {/* Inline Styles for Keyframes */}
      <style>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          0% {
            transform: rotate(360deg);
          }
          100% {
            transform: rotate(0deg);
          }
        }

        @keyframes bounce-smooth {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(65px); /* Adjust height for bounce */
          }
        }

        .animate-spin-slow {
          animation: spin 4s linear infinite; /* Smooth clockwise rotation */
        }

        .animate-spin-reverse {
          animation: spin-reverse 4s linear infinite; /* Smooth counterclockwise rotation */
        }

        .animate-bounce-smooth {
          animation: bounce-smooth 1.75s ease-in-out infinite; /* Smooth bouncing effect */
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
