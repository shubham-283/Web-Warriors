import React from "react";
import { FaTruck, FaCreditCard, FaExchangeAlt, FaHeadset, FaStamp } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: <FaTruck size={30} />,
      title: "Fast Delivery",
      description: "On Time Delivery",
    },
    {
      icon: <FaCreditCard size={30} />,
      title: "Secure Payment",
      description: "100% Safe & Secure Payment",
    },
    {
      icon: <FaExchangeAlt size={30} />,
      title: "Easy Exchange",
      description: "Valid Upto 15 Days",
    },
    {
      icon: <FaHeadset size={30} />,
      title: "Customer Support",
      description: "Available 24*7",
    },
    {
      icon: <FaStamp size={30} />,
      title: "Made in INDIA",
      description: "Swadeshi",
    },
  ];

  return (
    <div className="flex flex-col items-center p-4 bg-pink-50 pt-8">
      {/* New Heading Added Here */}
      <h2 className="text-2xl font-bold text-pink-700 mb-6">Your Satisfaction, Our Priority</h2>
      
      <div className="flex flex-wrap justify-center gap-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center bg-pink-100 p-4 rounded-2xl shadow-lg w-48 h-48 text-center"
          >
            <div className="text-pink-700 mb-2">{feature.icon}</div>
            <h3 className="text-gray-600 text-lg">{feature.title}</h3>
            <p className="text-sm text-pink-500">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
