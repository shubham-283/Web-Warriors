import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import Notification from '../../Notification/Notification'; // Import the Notification component

const Modal = ({
  product,
  selectedColor,
  selectedSize,
  setSelectedColor,
  setSelectedSize,
  onClose,
  addToCart,
}) => {
  const [showNotification, setShowNotification] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  // Effect to reset selections when product changes
  useEffect(() => {
    if (product) {
      const initialColor = Array.isArray(product.colors) && product.colors.length > 0 ? product.colors[0] : "";
      const initialSize = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes[0] : "";
      setSelectedColor(initialColor);
      setSelectedSize(initialSize);
    }
  }, [product, setSelectedColor, setSelectedSize]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      console.log("Color or Size not selected");
      return; // Prevent adding to cart if color or size is not selected
    }

    setButtonClicked(true); // Trigger button animation
    const itemToAdd = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    };

    console.log("Adding to cart:", itemToAdd); // Debugging log
    addToCart(itemToAdd); // Call addToCart function
    setShowNotification(true); // Show notification

    setTimeout(() => {
      setButtonClicked(false); // Reset button animation
    }, 500); // Duration of button bounce animation
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
        onClick={handleOverlayClick}
      >
        <div className="modal-container bg-white rounded-lg shadow-xl p-6 relative max-w-3xl w-full transform transition-transform duration-300 ease-in-out scale-95 flex flex-col md:flex-row">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="close-modal-btn absolute top-3 right-3 text-white bg-[#6B1E3C] rounded-full px-3 py-1 transform hover:bg-[#FF5C8D] transition duration-300"
            aria-label="Close Modal"
          >
            <MdClose size={24} />
          </button>

          {/* Product Image */}
          <div className="image-container w-full md:w-1/2 mb-4 md:mb-0">
            <img
              src={product?.image || "/placeholder.svg"} // Fallback image
              alt={product?.name || "Product"} // Fallback alt text
              className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md transform transition-transform duration-300"
            />
          </div>

          {/* Product Details */}
          <div className="modal-content text-center md:text-left md:w-1/2 md:pl-4">
            <h2 className="text-2xl font-semibold text-[#6B1E3C] mb-4">{product?.name || "Product Name"}</h2>
            <p className="text-[#6B1E3C] mb-2">{product?.description || "Description not available."}</p>
            <p className="text-xl font-bold text-[#6B1E3C] mb-4">₹{product?.price?.toFixed(2) || "0.00"}</p>

            {/* Color Selection */}
            <div className="mb-4">
              <h3 className="text-lg font-medium text-[#6B1E3C] mb-2">Select Color</h3>
              <div className="color-options flex gap-2 justify-center md:justify-start flex-wrap">
                {(product?.colors || []).map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedColor(color);
                      console.log("Selected Color:", color); // Debugging log for selected color
                    }}
                    style={{ backgroundColor: color }}
                    className={`color-option w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === color
                        ? "border-[#6B1E3C] scale-110"
                        : "border-gray-300 hover:scale-105"
                    }`}
                    aria-label={`Select ${color}`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-[#6B1E3C] mb-2">Select Size</h3>
              <div className="size-options flex gap-2 justify-center md:justify-start flex-wrap">
                {(product?.sizes || []).map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedSize(size);
                      console.log("Selected Size:", size); // Debugging log for selected size
                    }}
                    className={`size-option px-6 py-3 border-2 rounded-lg text-[#6B1E3C] transition-all duration-300 ${
                      selectedSize === size
                        ? "border-[#6B1E3C] bg-[#FF5C8D]"
                        : "border-gray-300 hover:bg-[#F8C8C2]"
                    }`}
                    aria-label={`Select ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button with Animation */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedColor || !selectedSize}
              className={`add-to-cart-btn px-8 py-3 rounded-lg text-white transition-all duration-300 transform ${
                !selectedColor || !selectedSize
                  ? "bg-gray-400 cursor-not-allowed"
                  : buttonClicked
                  ? "bg-[#FF5C8D] transform scale-105" // Add scale effect when clicked
                  : "bg-[#FF5C8D] hover:bg-[#FF5C8D]"
              }`}
              aria-label="Add to Cart"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Notification for Added Item */}
      {showNotification && (
        <Notification
          message={`"${product?.name || "Product"}" has been added to your cart.`}
          onClose={() => setShowNotification(false)} // Close notification after a specified time or action
        />
      )}
    </>
  );
};

export default Modal;
