import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import Notification from '../../Notification/Notification';

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
      return;
    }

    setButtonClicked(true);
    const itemToAdd = {
      ...product,
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    };

    console.log("Adding to cart:", itemToAdd);
    addToCart(itemToAdd);
    setShowNotification(true);

    setTimeout(() => {
      setButtonClicked(false);
    }, 500);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="modal-overlay fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn p-4"
        onClick={handleOverlayClick}
      >
        <div className="relative w-full max-w-5xl rounded-lg overflow-hidden shadow-xl bg-white">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 text-white bg-[#6B1E3C] hover:bg-[#FF5C8D] rounded-full w-10 h-10 flex items-center justify-center shadow-lg border-2 border-white transition duration-300 transform hover:scale-110"
            aria-label="Close Modal"
          >
            <MdClose size={24} />
          </button>

          <div className="modal-container p-6 flex flex-col md:flex-row max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
            {/* Product Image */}
            <div className="image-container w-full md:w-1/2 mb-4 md:mb-0">
              <img
                src={product?.image || "/placeholder.svg"}
                alt={product?.name || "Product"}
                className="w-full h-auto max-h-64 md:max-h-[400px] object-contain rounded-lg shadow-md border border-gray-200"
              />
            </div>

            {/* Product Details */}
            <div className="modal-content text-center md:text-left md:w-1/2 md:pl-6">
              <h2 className="text-xl md:text-3xl font-semibold text-[#6B1E3C] mb-4">
                {product?.name || "Product Name"}
              </h2>
              <p className="text-sm md:text-base text-gray-700 mb-4">
                {product?.description || "Description not available."}
              </p>
              <p className="text-lg md:text-xl font-bold text-[#6B1E3C] mb-6">
                ₹{product?.price?.toFixed(2) || "0.00"}
              </p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-base md:text-lg font-medium text-[#6B1E3C] mb-2">
                  Select Color
                </h3>
                <div className="color-options flex gap-3 justify-center md:justify-start flex-wrap">
                  {(product?.colors || []).map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedColor(color);
                        console.log("Selected Color:", color);
                      }}
                      style={{ backgroundColor: color }}
                      className={`color-option w-10 h-10 rounded-full border transition-all duration-300 ${
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
                <h3 className="text-base md:text-lg font-medium text-[#6B1E3C] mb-2">
                  Select Size
                </h3>
                <div className="size-options flex gap-3 justify-center md:justify-start flex-wrap">
                  {(product?.sizes || []).map((size, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedSize(size);
                        console.log("Selected Size:", size);
                      }}
                      className={`size-option px-4 py-2 border rounded-lg text-sm md:text-base text-[#6B1E3C] transition-all duration-300 ${
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

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={!selectedColor || !selectedSize}
                className={`add-to-cart-btn w-full px-8 py-4 rounded-lg text-white transition-all duration-300 transform ${
                  !selectedColor || !selectedSize
                    ? "bg-gray-400 cursor-not-allowed"
                    : buttonClicked
                    ? "bg-[#FF5C8D] transform scale-105"
                    : "bg-[#FF5C8D] hover:bg-[#FF5C8D] hover:scale-105"
                }`}
                aria-label="Add to Cart"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification */}
      {showNotification && (
        <Notification
          message={`"${product?.name || "Product"}" has been added to your cart.`}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default Modal;
