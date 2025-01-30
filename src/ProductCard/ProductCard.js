import React, { useState } from "react"
import { FaShoppingCart } from "react-icons/fa"
import { PiHeartFill, PiHeartDuotone } from "react-icons/pi"
import colorData from "../data/colors.json"
import { useWishlist } from "../hooks/useWishlist"
import Modal from "./ProductModal.jsx"

const ProductCard = ({
  product,
  quantities,
  selectedSizes,
  handleSizeSelection,
  handleQuantityChange,
  handleAddToCart,
}) => {
  const { state: wishlistState, addToWishlist, removeFromWishlist } = useWishlist()
  const [isInWishlist, setIsInWishlist] = useState(wishlistState.items.some((item) => item.id === product.ProductID))
  const [isModalOpen, setIsModalOpen] = useState(false)

  const colorMap = {}
  colorData.colors.forEach((color) => {
    colorMap[color.name] = color.hex
  })

  const productColorHex = colorMap[product.Color] || null

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist({ id: product.ProductID })
    } else {
      addToWishlist({ id: product.ProductID, ...product })
    }
    setIsInWishlist(!isInWishlist)
  }

  return (
    <>
      <div className="relative max-w-lg p-4 bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl duration-300 overflow-hidden">
        {/* Product Image */}
        <img
          src={product.ImageURL || "/placeholder.svg"}
          alt={product.Name}
          className="w-full h-72 object-contain rounded-md mb-4"
        />

        <h4 className="text-lg font-semibold truncate">{product.Name}</h4>

        {/* Color Display */}
        {productColorHex && (
          <div className="flex items-center mb-2">
            <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: productColorHex }} />
            <span className="text-sm truncate">{product.Color}</span>
          </div>
        )}

        {/* Price Display */}
        <p className="text-xl font-bold text-gray-800 mb-1">₹{product.Price}</p>

        {/* View Details Button */}
        <button
          className="mt-4 w-full bg-pink-500 text-white py-2 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:bg-pink-600"
          onClick={() => setIsModalOpen(true)}
        >
          View Details
        </button>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-[10px] right-[10px] text-pink-500 z-10"
          aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          {isInWishlist ? <PiHeartFill size={24} /> : <PiHeartDuotone size={24} />}
        </button>

        {/* Discount Badge */}
        {product.Discount > 0 && (
          <span className="absolute top-[10px] right-[50px] bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-[5]">
            {product.Discount}% OFF
          </span>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <img
              src={product.ImageURL || "/placeholder.svg"}
              alt={product.Name}
              className="w-full h-auto object-contain rounded-md"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.Name}</h2>
            <p className="text-xl font-bold text-gray-800 mb-2">₹{product.Price}</p>

            {/* Color Display */}
            {productColorHex && (
              <div className="flex items-center mb-2">
                <span className="inline-block w-4 h-4 rounded-full mr-2" style={{ backgroundColor: productColorHex }} />
                <span className="text-sm">{product.Color}</span>
              </div>
            )}

            {/* Description */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-1">Description</h3>
              <p className="text-gray-600">{product.Description.Detail}</p>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <p>
                <span className="font-semibold">Fabric:</span> {product.Description.Fabric}
              </p>
              <p>
                <span className="font-semibold">Fabric Care:</span> {product.Description.FabricCare}
              </p>
              <p>
                <span className="font-semibold">Ideal For:</span> {product.Description.IdealFor}
              </p>
              <p>
                <span className="font-semibold">Length Type:</span> {product.Description.LengthType}
              </p>
              <p>
                <span className="font-semibold">Pattern:</span> {product.Description.Pattern}
              </p>
              <p>
                <span className="font-semibold">Sleeve:</span> {product.Description.Sleeve}
              </p>
              <p>
                <span className="font-semibold">Style:</span> {product.Description.Style}
              </p>
              <p>
                <span className="font-semibold">Style Code:</span> {product.Description.StyleCode}
              </p>
              <p>
                <span className="font-semibold">Type:</span> {product.Description.Type}
              </p>
              <p>
                <span className="font-semibold">Category:</span> {product.Category}
              </p>
              <p>
                <span className="font-semibold">Sub-Category:</span> {product.Sub_Category}
              </p>
            </div>

            {/* Size Selection */}
            {Array.isArray(product.Size) && product.Size.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Select Size:</p>
                <div className="flex flex-wrap space-x-2">
                  {product.Size.map((size) => (
                    <button
                      key={size}
                      className={`px-3 py-1 border rounded transition-colors duration-300 ${
                        selectedSizes[product.ProductID] === size
                          ? "bg-pink-500 text-white"
                          : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                      }`}
                      onClick={() => handleSizeSelection(product.ProductID, size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="flex items-center mb-4">
              <p className="text-sm font-medium text-gray-600 mr-2">Quantity:</p>
              <button
                onClick={() => handleQuantityChange(product.ProductID, "decrement", product.Quantity)}
                className="px-3 py-1 bg-pink-100 rounded-lg transition-colors duration-300 hover:bg-pink-200 text-pink-700"
              >
                -
              </button>
              <span className="mx-4 text-gray-800">{quantities[product.ProductID] || 1}</span>
              <button
                onClick={() => handleQuantityChange(product.ProductID, "increment", product.Quantity)}
                className="px-3 py-1 bg-pink-100 rounded-lg transition-colors duration-300 hover:bg-pink-200 text-pink-700"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="w-full flex items-center justify-center bg-pink-500 text-white py-2 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:bg-pink-600"
              onClick={() => handleAddToCart(product)}
            >
              <FaShoppingCart className="mr-2" /> Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ProductCard

