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
  // ... keeping all the existing state and handlers the same ...
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
        className="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn p-4"
        onClick={handleOverlayClick}
      >
        {/* Added separate container for close button */}
        <div className="relative w-full max-w-3xl">
          {/* Repositioned close button */}
          <button
            onClick={onClose}
            className="absolute right-0 top-0 z-50 text-white bg-[#6B1E3C] hover:bg-[#FF5C8D] rounded-full w-12 h-12 flex items-center justify-center shadow-lg border-2 border-white transition duration-300 transform hover:scale-110 -translate-y-1/2 translate-x-1/2"
            aria-label="Close Modal"
          >
            <MdClose size={28} />
          </button>

          <div className="modal-container bg-white rounded-lg shadow-xl w-full transform transition-transform duration-300 ease-in-out scale-95 max-h-[90vh] md:max-h-[80vh] overflow-y-auto">
            <div className="p-4 md:p-6 flex flex-col md:flex-row">
              {/* Product Image */}
              <div className="image-container w-full md:w-1/2 mb-4 md:mb-0">
                <img
                  src={product?.image || "/placeholder.svg"}
                  alt={product?.name || "Product"}
                  className="w-full h-auto max-h-48 md:max-h-96 object-contain rounded-lg shadow-md transform transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="modal-content text-center md:text-left md:w-1/2 md:pl-4">
                <h2 className="text-xl md:text-2xl font-semibold text-[#6B1E3C] mb-2 md:mb-4">
                  {product?.name || "Product Name"}
                </h2>
                <p className="text-sm md:text-base text-[#6B1E3C] mb-2">
                  {product?.description || "Description not available."}
                </p>
                <p className="text-lg md:text-xl font-bold text-[#6B1E3C] mb-2 md:mb-4">
                  ₹{product?.price?.toFixed(2) || "0.00"}
                </p>

                {/* Color Selection */}
                <div className="mb-3 md:mb-4">
                  <h3 className="text-base md:text-lg font-medium text-[#6B1E3C] mb-1 md:mb-2">
                    Select Color
                  </h3>
                  <div className="color-options flex gap-2 justify-center md:justify-start flex-wrap">
                    {(product?.colors || []).map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedColor(color);
                          console.log("Selected Color:", color);
                        }}
                        style={{ backgroundColor: color }}
                        className={`color-option w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all duration-300 ${
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
                <div className="mb-3 md:mb-6">
                  <h3 className="text-base md:text-lg font-medium text-[#6B1E3C] mb-1 md:mb-2">
                    Select Size
                  </h3>
                  <div className="size-options flex gap-2 justify-center md:justify-start flex-wrap">
                    {(product?.sizes || []).map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setSelectedSize(size);
                          console.log("Selected Size:", size);
                        }}
                        className={`size-option px-4 py-2 md:px-6 md:py-3 border-2 rounded-lg text-sm md:text-base text-[#6B1E3C] transition-all duration-300 ${
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
                  className={`add-to-cart-btn w-full px-6 py-2 md:px-8 md:py-3 rounded-lg text-white transition-all duration-300 transform ${
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