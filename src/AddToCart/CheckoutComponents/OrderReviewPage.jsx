import React from 'react';
import { Check } from 'lucide-react';

const OrderReviewPage = ({
  cartItems,
  shippingAddress,
  paymentMethod,
  totalPrice,
  orderId,
  userEmail,
  onConfirm,
  isSubmitting,
  orderSubmitted,
  companyLogoSrc// Added companyLogoSrc prop
}) => {
  const buttonClassName = `w-full mt-6 ${
    isSubmitting || orderSubmitted ? 'bg-pink-300 cursor-not-allowed' : 'bg-pink-600 hover:bg-pink-700'
  } text-white py-3 rounded-lg transition-colors font-medium shadow-sm`;

  const getPaymentMethodDisplay = () => {
    switch (paymentMethod.type) {
      case 'creditCard':
        return (
          <>
            Credit Card:
            <span className="inline-block bg-pink-50 px-3 py-1 rounded-full text-pink-600 ml-2">
              •••• {paymentMethod.cardNumber.slice(-4)}
            </span>
          </>
        );
      case 'cashOnDelivery':
        return 'Cash on Delivery';
      // Add cases for other payment methods as needed
      default:
        return 'Unknown Payment Method';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-pink-100 p-8 mt-20">
        {/* Company Logo */}
        {companyLogoSrc && (
          <div className="flex justify-center mb-6">
            <img src={companyLogoSrc} alt="Company Logo" className="h-12" />
          </div>
        )}

        <div className="flex items-center mb-8 border-b border-pink-100 pb-4">
          <div className="bg-pink-50 p-2 rounded-full mr-4">
            <Check className="w-6 h-6 text-pink-600" />
          </div>
          <h2 className="text-2xl font-serif text-gray-800">Order Review</h2>
        </div>

        <div className="mb-8 bg-gradient-to-r from-pink-50 to-white p-6 rounded-lg border border-pink-100">
          <h3 className="font-medium text-gray-700 mb-2">Order ID</h3>
          <p className="text-lg font-bold text-gray-900">{orderId}</p>
        </div>

        <div className="grid gap-8 mb-8">
          <div className="space-y-1 bg-white p-6 rounded-lg border border-pink-100">
            <h3 className="font-medium text-gray-700 mb-3">Shipping Address</h3>
            <p className="text-gray-800 font-medium">{shippingAddress.fullName}</p>
            <p className="text-gray-600">{shippingAddress.street}</p>
            <p className="text-gray-600">{shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}</p>
            <p className="text-gray-600">Phone: {shippingAddress.phone}</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-pink-100">
            <h3 className="font-medium text-gray-700 mb-3">Payment Method</h3>
            <p className="text-gray-800">
              {getPaymentMethodDisplay()}
            </p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-medium text-gray-700 mb-4">Order Items</h3>
          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between py-3 border-b border-pink-50">
                <span className="text-gray-800">{item.name} × {item.quantity}</span>
                <span className="text-gray-800 font-medium">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-pink-100 pt-6">
          <div className="flex justify-between text-lg">
            <span className="font-medium text-gray-800">Total</span>
            <span className="font-bold text-pink-600">₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={() => onConfirm(userEmail)}
          disabled={isSubmitting || orderSubmitted}
          className={buttonClassName}
        >
          {isSubmitting ? 'Processing...' : orderSubmitted ? 'Order Confirmed' : 'Confirm Order'}
        </button>

        {orderSubmitted && (
          <div className="bg-pink-50 text-pink-600 p-4 rounded-lg mt-6 text-center font-medium">
            Thank you for your order! A confirmation email will be sent shortly.
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderReviewPage;
