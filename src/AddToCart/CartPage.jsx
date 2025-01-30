import React, { useState, useEffect } from "react";
import { useCart } from "../hooks/useCart";
import { Trash2, AlertCircle, Minus, Plus, ShoppingBag } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import Notification from "../Notification/Notification";
import SurpriseComponent from "../SurpriseCustomer/SurpriseCustomer";
import OrderConfirmationPage from "./OrderConfirmation";

const CartPage = () => {
  const { state, removeFromCart, updateQuantity, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    // Clear error after 5 seconds
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleCheckout = async () => {
    try {
      // Here you would typically:
      // 1. Validate the cart
      // 2. Process the payment
      // 3. Create the order in your backend
      // 4. Get the order number from the backend

      // Simulating an API call with setTimeout
      setTimeout(() => {
        const generatedOrderNumber = "ORD" + Math.random().toString(36).substr(2, 9).toUpperCase();
        setOrderNumber(generatedOrderNumber);
        setOrderPlaced(true);
      }, 1500);

    } catch (err) {
      setError("Failed to process checkout. Please try again.");
    }
  };

  // If order is placed, show the confirmation page
  if (orderPlaced) {
    return <OrderConfirmationPage orderNumber={orderNumber} />;
  }


  

  const handleRemoveItem = async (item) => {
    try {
      await removeFromCart(item);
      setNotificationMessage(`${item.name} has been removed from your cart`);
      setNotificationVisible(true);
      setTimeout(() => {
        setNotificationVisible(false);
        setNotificationMessage("");
      }, 3000);
    } catch (err) {
      setError("Failed to remove item. Please try again.");
    }
  };

  const handleQuantityChange = async (item, newQuantity) => {
    try {
      if (newQuantity < 1 || newQuantity > 10) {
        setError("Quantity must be between 1 and 10");
        return;
      }
      await updateQuantity(item, newQuantity);
    } catch (err) {
      setError("Failed to update quantity. Please try again.");
    }
  };

  const calculateTotalPrice = () =>
    state.items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);

  const calculateSubtotal = (price, quantity) => (price * quantity).toFixed(2);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-gray-800">Please log in to view your cart</h1>
          <p className="mt-2 text-gray-600">Sign in to access your shopping cart and checkout</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-50 pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SurpriseComponent />
        
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Notification */}
        {notificationVisible && (
          <Notification
            message={notificationMessage}
            onClose={() => setNotificationVisible(false)}
          />
        )}

        <h1 className="text-2xl font-semibold text-gray-900 mb-8">Shopping Cart</h1>

        {state.items.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl text-gray-800">Your cart is empty</h2>
            <p className="mt-2 text-gray-600">Start shopping to add items to your cart</p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Cart Items */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {state.items.map((item, index) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className={`p-6 flex flex-col md:flex-row items-center gap-6 ${
                    index !== state.items.length - 1 ? "border-b border-gray-200" : ""
                  }`}
                >
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Color: <span className="capitalize">{item.color}</span>
                    </p>
                    <p className="text-sm text-gray-500">Size: {item.size}</p>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-5 h-5 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item, item.quantity + 1)}
                      disabled={item.quantity >= 10}
                      className="p-1 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Subtotal</p>
                    <p className="text-lg font-medium text-gray-900">
                      ₹{calculateSubtotal(item.price, item.quantity)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{calculateTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between text-lg font-medium text-gray-900">
                    <span>Total</span>
                    <span>₹{calculateTotalPrice()}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full mt-6 bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;