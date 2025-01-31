import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, MapPin, Gift, ArrowRight, ChevronDown, Stars } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const OrderConfirmationPage = ({ orderNumber = "ORD123456789" }) => {
  const [activeSection, setActiveSection] = useState('timeline');
  const [showConfetti, setShowConfetti] = useState(true);

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const deliveryDate = new Date(new Date().setDate(new Date().getDate() + 5));

  return (
    <>
    <ScrollToTop/>
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-fuchsia-50 to-pink-200 pt-4">
      {/* Floating Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <div className="absolute inset-0 animate-float">
            <Stars className="w-6 h-6 text-yellow-400 absolute top-1/4 left-1/4" />
            <Stars className="w-4 h-4 text-purple-400 absolute top-1/3 right-1/3" />
            <Stars className="w-5 h-5 text-pink-400 absolute bottom-1/4 right-1/4" />
            <Stars className="w-6 h-6 text-orange-400 absolute bottom-1/3 left-1/3" />
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Celebration Banner */}
        <div className="relative overflow-hidden bg-white rounded-3xl shadow-xl mb-8 transform hover:scale-102 transition-transform">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-100 to-fuchsia-100 opacity-50" />
          <div className="relative p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-r from-pink-500 to-pink-500 rounded-full">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">
              Your Order is Confirmed!
            </h1>
            <p className="mt-2 text-gray-600">Order #{orderNumber}</p>
          </div>
        </div>

        {/* Interactive Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-white rounded-3xl shadow-lg p-6 transform hover:scale-102 transition-transform">
            <div className="space-y-8">
              {['Order Placed', 'Processing', 'Shipping', 'Delivery'].map((step, index) => (
                <div key={step} className="relative">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-gradient-to-r from-pink-500 to-pink-500' : 'bg-gray-200'
                    }`}>
                      {index === 0 && <CheckCircle className="w-6 h-6 text-white" />}
                      {index === 1 && <Package className="w-6 h-6 text-gray-400" />}
                      {index === 2 && <MapPin className="w-6 h-6 text-gray-400" />}
                      {index === 3 && <Gift className="w-6 h-6 text-gray-400" />}
                    </div>
                    <div className="ml-4 flex-grow">
                      <h3 className="font-semibold text-lg text-gray-900">{step}</h3>
                      <p className="text-sm text-gray-500">
                        {index === 0 ? 'Just now' : 
                         index === 1 ? 'Starting soon' :
                         index === 2 ? `Expected ${deliveryDate.toLocaleDateString()}` :
                         'Arriving soon'}
                      </p>
                    </div>
                    {index !== 3 && (
                      <div className="absolute left-6 top-12 h-16 w-px bg-gradient-to-b from-violet-200 to-transparent" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-3xl shadow-lg p-6 transform hover:scale-102 transition-transform">
            <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl">
                <p className="text-sm font-medium text-gray-600">Estimated Delivery</p>
                <p className="text-lg font-semibold text-gray-900">
                  {deliveryDate.toLocaleDateString()}
                </p>
              </div>
              <div className="p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-xl">
                <p className="text-sm font-medium text-gray-600">Shipping Address</p>
                <p className="text-gray-900">123 Delivery Street</p>
                <p className="text-gray-900">Cityville, ST 12345</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="group bg-gradient-to-r from-pink-600 to-pink-600 text-white py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
            <span className="mr-2">Track Order</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="bg-white text-gray-900 py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center border border-gray-200">
            <span className="mr-2">View Order Details</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
    </>
  );
};

export default OrderConfirmationPage;