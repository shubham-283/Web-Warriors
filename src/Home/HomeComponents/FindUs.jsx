import React from "react";
import { FaStore } from "react-icons/fa";
import { SiDm } from "react-icons/si";
import { AiFillAmazonCircle } from "react-icons/ai";
import { IoStorefrontOutline } from "react-icons/io5";
import { SiFlipkart } from "react-icons/si";

const FindUsOn = () => {
  const stores = [
    { name: "Adaa Jaipur", icon: <FaStore />, bgColor: "bg-pink-100" },
    { name: "Adaa Hyderabad", icon: <FaStore />, bgColor: "bg-pink-100" },
    { name: "Flipkart", icon: <SiFlipkart />, bgColor: "bg-pink-100" },
    { name: "D Mart", icon: <SiDm />, bgColor: "bg-pink-100" },
  ];

  return (
    <div className="flex flex-col items-center py-10 px-4 bg-pink-50">
      <h2 className="text-2xl text-pink-800 font-bold mb-6">Find Us On</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
        {stores.map((store, index) => (
          <div
            key={index}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg aspect-square text-center ${store.bgColor}`}
          >
            <div className="text-3xl md:text-4xl text-pink-600 mb-2">{store.icon}</div>
            <p className="text-sm md:text-base font-medium text-pink-500">{store.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindUsOn;