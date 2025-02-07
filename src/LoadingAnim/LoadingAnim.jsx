import React from 'react';

const LoadingAnimation = ({ loadingText }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      {/* Main Loading Container */}
      <div className="relative w-16 h-16">
        {/* Circular Loader Rings */}
        <div className="absolute inset-0">
          <div className="w-full h-full border-4 border-t-pink-500 border-r-pink-300 border-b-pink-200 border-l-pink-100 rounded-full animate-spin-custom"></div>
        </div>
        
        {/* Inner Pulse Circle */}
        <div className="absolute inset-2">
          <div className="w-full h-full bg-pink-50 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-4">
        <p className="text-gray-600 font-medium text-sm tracking-wide">
          {loadingText || 'Loading...'}
        </p>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes spin-custom {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .animate-spin-custom {
          animation: spin-custom 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;