import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("Please enter your email");
      return;
    }
    // Add your subscription logic here
    setStatus("Thank you for subscribing!");
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-r from-pink-50 to-pink-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-pink-700 animate__animated animate__fadeIn">
              JOIN THE ADAA JAIPUR COMMUNITY
            </h2>
            <p className="text-lg text-gray-600">
              Stay in the loop with the latest trends & exclusive updates.
            </p>
          </div>

          {/* Subscribe Form */}
          <div className="max-w-md mx-auto md:max-w-none">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <FaEnvelope className="text-pink-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-12 pr-4 py-3 border-2 border-pink-200 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-300"
                />
              </div>
              
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                SUBSCRIBE
              </button>
              
              {status && (
                <p className={`text-sm ${
                  status.includes('error') ? 'text-red-500' : 'text-green-500'
                } text-center md:text-left`}>
                  {status}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="hidden md:block absolute right-0 top-0 -z-10">
        <div className="w-64 h-64 bg-pink-100 rounded-full opacity-50 blur-3xl"></div>
      </div>
      <div className="hidden md:block absolute left-0 bottom-0 -z-10">
        <div className="w-48 h-48 bg-pink-200 rounded-full opacity-50 blur-3xl"></div>
      </div>
    </section>
  );
};

export default SubscribeSection;