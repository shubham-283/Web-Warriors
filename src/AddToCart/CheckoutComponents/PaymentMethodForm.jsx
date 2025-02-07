import React, { useState, useEffect } from 'react';
import { CreditCard, Wallet, Truck } from 'lucide-react';

const PaymentMethodForm = ({ onSubmit, initialPaymentMethod }) => {
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod || {
    type: 'creditCard', // Default payment type
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  useEffect(() => {
    // Set initial payment method if provided
    if (initialPaymentMethod) {
      setPaymentMethod(initialPaymentMethod);
    }
  }, [initialPaymentMethod]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentMethod(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentMethod(prev => ({
      ...prev,
      type: type,
      // Clear card details when switching away from credit card
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(paymentMethod);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 mt-20">
      <div className="flex items-center mb-6 border-b pb-4 border-gray-100"> {/* Light gray border */}
        <Wallet className="w-6 h-6 mr-3 text-pink-500" /> {/* Pink Icon */}
        <h2 className="text-2xl font-serif text-gray-800">Payment Method</h2>
      </div>

      {/* Payment Type Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Select Payment Type</h3>
        <div className="flex space-x-4">
          <button
            type="button"
            className={`flex items-center justify-center px-4 py-2 rounded-md border ${paymentMethod.type === 'creditCard' ? 'border-pink-300 bg-pink-50 text-pink-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors`}
            onClick={() => handlePaymentTypeChange('creditCard')}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Credit Card
          </button>
          <button
            type="button"
            className={`flex items-center justify-center px-4 py-2 rounded-md border ${paymentMethod.type === 'cashOnDelivery' ? 'border-pink-300 bg-pink-50 text-pink-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'} transition-colors`}
            onClick={() => handlePaymentTypeChange('cashOnDelivery')}
          >
            <Truck className="w-5 h-5 mr-2" />
            Cash on Delivery
          </button>
          {/* Add other payment methods here */}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Credit Card Form Fields (Conditional Rendering) */}
        {paymentMethod.type === 'creditCard' && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Name on Card</label>
              <input
                type="text"
                name="cardName"
                value={paymentMethod.cardName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"  // Pink focus ring
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentMethod.cardNumber}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"  // Pink focus ring
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentMethod.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"  // Pink focus ring
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentMethod.cvv}
                  onChange={handleChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-300"  // Pink focus ring
                />
              </div>
            </div>
          </>
        )}

        {/* Display a message for Cash on Delivery */}
        {paymentMethod.type === 'cashOnDelivery' && (
          <div className="text-center p-4 bg-gray-50 rounded-md text-gray-700">
            <p>You've selected Cash on Delivery. Please have the payment ready when your order arrives.</p>
          </div>
        )}

        {/* Submit Button (Always Visible) */}
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors mt-6 font-medium"  // Pink Submit Button
        >
          Review Order
        </button>
      </form>
    </div>
  );
};

export default PaymentMethodForm;
