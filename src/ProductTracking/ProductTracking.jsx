import React, { useState, useRef, useEffect } from 'react';
import { FaBox, FaShippingFast, FaCheckCircle, FaTimesCircle, FaSearch, FaMapMarkerAlt, FaCalendarAlt, FaTruck, FaBoxOpen, FaClipboardCheck, FaInfoCircle } from 'react-icons/fa';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCopiedToast, setShowCopiedToast] = useState(false);
  const orderInputRef = useRef(null);
//-------------------------------------not required now----------------------------------------------
  const demoOrder = {
    orderId: "ORD123456",
    status: "in_transit",
    estimatedDelivery: "2025-02-10",
    currentLocation: "Mumbai, Maharashtra",
    productName: "Premium Wireless Headphones",
    productImage: "/api/placeholder/150/150",
    carrier: "Express Logistics",
    distance: "324 km away",
    updates: [
      { 
        date: "2025-02-01", 
        time: "09:30 AM",
        status: "Order Placed", 
        location: "Delhi Warehouse",
        details: "Order confirmed and payment received",
        icon: <FaBoxOpen />,
        completed: true 
      },
      { 
        date: "2025-02-02", 
        time: "10:15 AM",
        status: "Processing", 
        location: "Delhi Sorting Center",
        details: "Package sorted and prepared for shipping",
        icon: <FaBox />,
        completed: true 
      },
      { 
        date: "2025-02-03", 
        time: "08:45 AM",
        status: "Shipped", 
        location: "Delhi Airport Hub",
        details: "Package departed from origin facility",
        icon: <FaTruck />,
        completed: true 
      },
      { 
        date: "2025-02-04", 
        time: "11:20 AM",
        status: "In Transit", 
        location: "Mumbai Central Hub",
        details: "Package arrived at destination city",
        icon: <FaShippingFast />,
        completed: false 
      },
      { 
        date: "2025-02-10", 
        time: "Expected by 8:00 PM",
        status: "Delivery", 
        location: "Mumbai Local Centre",
        details: "Scheduled for final delivery",
        icon: <FaCheckCircle />,
        completed: false 
      }
    ]
  };

  const handleTrack = async (e) => {
    e.preventDefault();
    if (orderNumber) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTrackingResult(demoOrder);
      setIsLoading(false);
    }
  };

  const handleCopyOrderId = () => {
    if (trackingResult) {
      navigator.clipboard.writeText(trackingResult.orderId);
      setShowCopiedToast(true);
      setTimeout(() => setShowCopiedToast(false), 2000);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-700';
      case 'Processing': return 'bg-yellow-100 text-yellow-700';
      case 'Shipped': return 'bg-green-100 text-green-700';
      case 'In Transit': return 'bg-indigo-100 text-indigo-700';
      case 'Delivery': return 'bg-pink-100 text-pink-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  useEffect(() => {
    if (orderInputRef.current) {
      orderInputRef.current.focus();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
      {showCopiedToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center z-50 animate__animated animate__fadeInRight">
          <FaClipboardCheck className="mr-2" />
          Order ID Copied!
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-pink-600 to-pink-500 px-8 py-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-md">Track Your Package</h1>
                <p className="text-pink-100 flex items-center gap-2">
                  <FaInfoCircle />
                  Real-time updates for your delivery
                </p>
              </div>
              <div className="hidden md:block animate-bounce">
                <FaTruck className="text-white text-6xl opacity-80" />
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="p-8">
            <form onSubmit={handleTrack} className="mb-12">
              <div className="relative">
                <input
                  ref={orderInputRef}
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your tracking number"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 pr-36 text-lg shadow-sm transition-all duration-300 hover:shadow-md"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-2 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-all duration-300 flex items-center gap-2 disabled:opacity-50 shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <FaSearch className="text-lg" />
                      <span>Track</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {trackingResult && (
              <div className="space-y-8 animate__animated animate__fadeIn">
                {/* Order Details Card with Enhanced Styling */}
                <div className="bg-white rounded-xl p-6 border-l-4 border-pink-500 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex items-center gap-6">
                      <img
                        src={trackingResult.productImage}
                        alt={trackingResult.productName}
                        className="w-24 h-24 rounded-lg object-cover shadow-md transform hover:scale-105 transition-transform"
                      />
                      <div>
                        <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                          {trackingResult.productName}
                          <button 
                            onClick={handleCopyOrderId} 
                            className="text-gray-500 hover:text-pink-600"
                            title="Copy Order ID"
                          >
                            <FaClipboardCheck />
                          </button>
                        </h3>
                        <p className="text-gray-600 mb-1">Order #{trackingResult.orderId}</p>
                        <span className={`inline-block px-3 py-1 ${getStatusColor(trackingResult.status)} rounded-full text-sm`}>
                          {trackingResult.carrier}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
                        <FaMapMarkerAlt className="text-pink-600 text-xl mx-auto mb-2 animate-pulse" />
                        <p className="text-gray-600 text-sm">Current Location</p>
                        <p className="font-semibold">{trackingResult.currentLocation}</p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
                        <FaCalendarAlt className="text-pink-600 text-xl mx-auto mb-2" />
                        <p className="text-gray-600 text-sm">Estimated Delivery</p>
                        <p className="font-semibold">{trackingResult.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Timeline */}
                <div className="relative pt-8">
                  <div className="absolute left-8 top-0 h-full w-1 bg-gradient-to-b from-pink-200 to-pink-400 rounded-full" />
                  {trackingResult.updates.map((update, index) => (
                    <div key={index} className="relative flex items-start mb-12 group">
                      <div 
                        className={`absolute left-8 -ml-4 mt-2 w-8 h-8 rounded-full 
                          ${update.completed ? 'bg-pink-600' : 'bg-gray-300'}
                          flex items-center justify-center transition-all duration-300
                          group-hover:scale-110 group-hover:shadow-lg`}
                      >
                        <span className="text-white text-sm">
                          {update.icon}
                        </span>
                      </div>
                      <div 
                        className={`ml-16 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 w-full 
                          border-l-4 ${update.completed ? 'border-pink-500' : 'border-gray-300'}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`font-semibold text-lg ${update.completed ? 'text-gray-900' : 'text-gray-600'}`}>
                            {update.status}
                          </h3>
                          <div className="text-right">
                            <p className="text-gray-600">{update.date}</p>
                            <p className="text-sm text-gray-500">{update.time}</p>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{update.location}</p>
                        <p className="text-sm text-gray-500">{update.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;