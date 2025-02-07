import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, Navigation, ChevronDown, ChevronUp } from 'lucide-react';

const quickOptionsData = [
  {
    label: "Product Recommendations",
    action: "recommend",
    icon: Search,
    message: "I'd love to help you find the perfect product! What type of item are you looking for?"
  },
  {
    label: "Sizing Help",
    action: "size",
    icon: Heart,
    message: "Need help finding your perfect size? I can help with measurements or show you our size chart."
  },
  {
    label: "Order Support",
    action: "order",
    icon: ShoppingCart,
    message: "I can help you track orders or assist with any order-related questions. What do you need?"
  },
  {
    label: "Shipping Info",
    action: "shipping",
    icon: Navigation,
    message: "Let me tell you about our shipping options and delivery times!"
  }
];

const QuickOptions = ({ onOptionSelect }) => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button
        className="w-full text-left px-3 py-1 bg-pink-50 text-pink-700 rounded-md hover:bg-pink-100 flex items-center justify-between transition-colors duration-200 shadow-sm mb-2"
        onClick={toggleVisibility}
      >
        Quick Options
        {isVisible ? (
          <ChevronUp className="w-4 h-4" color="#DB2777" />
        ) : (
          <ChevronDown className="w-4 h-4" color="#DB2777" />
        )}
      </button>

      {isVisible && (
        <div className="mb-4 flex flex-wrap gap-2">
          {quickOptionsData.map((option, index) => (
            <button
              key={index}
              onClick={() => onOptionSelect(option.action)} // Pass only the action
              className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full hover:bg-pink-100 flex items-center gap-1 transition-colors duration-200 shadow-sm"
            >
              <option.icon className="w-4 h-4 mr-1" color="#DB2777" />
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuickOptions;
