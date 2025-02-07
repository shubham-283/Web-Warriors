import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const ShippingAddressForm = ({ onSubmit, initialAddress }) => {
  const [address, setAddress] = useState(initialAddress || {
    fullName: '',
    phone: '',
    country: '',
    street: '',
    apartment: '',
    landmark: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryInstructions: ''
  });

  useEffect(() => {
    // Load data from sessionStorage on component mount
    try {
      const storedAddress = sessionStorage.getItem('shippingAddress');
      if (storedAddress) {
        setAddress(JSON.parse(storedAddress));
      }
    } catch (error) {
      console.error('Error loading shipping address from sessionStorage:', error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({
      ...prev,
      [name]: value
    }));

    // Save data to sessionStorage on every change
    try {
      sessionStorage.setItem('shippingAddress', JSON.stringify(address));
    } catch (error) {
      console.error('Error saving shipping address to sessionStorage:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);

      // Clear sessionStorage on submit
      try {
        sessionStorage.removeItem('shippingAddress');
      } catch (error) {
        console.error('Error clearing shipping address from sessionStorage:', error);
      }
  };

  return (
    <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl border border-pink-100 p-8 mt-20 shadow-lg">
      <div className="flex items-center mb-8 border-b border-pink-100 pb-4">
        <MapPin className="w-7 h-7 mr-3 text-pink-600" />
        <h2 className="text-2xl font-serif text-gray-800 tracking-wide">Shipping Address</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <select
            name="country"
            value={address.country}
            onChange={handleChange}
            required
            className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
          >
            <option value="">Select Country</option>
            <option value="IN">India</option>
            {/* <option value="CA">Canada</option>
            <option value="GB">United Kingdom</option>
            <option value="AU">Australia</option> */}
            {/* Add more countries as needed */}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Street Address</label>
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            required
            className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Apartment/Suite/Unit</label>
            <input
              type="text"
              name="apartment"
              value={address.apartment}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Nearest Landmark</label>
            <input
              type="text"
              name="landmark"
              value={address.landmark}
              onChange={handleChange}
              placeholder="Optional"
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              required
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              required
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={address.zipCode}
              onChange={handleChange}
              required
              className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Delivery Instructions</label>
          <textarea
            name="deliveryInstructions"
            value={address.deliveryInstructions}
            onChange={handleChange}
            placeholder="Optional: Add any specific delivery instructions"
            rows="3"
            className="w-full p-3 border border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-400 focus:border-pink-400 bg-white shadow-sm transition-all duration-200 hover:border-pink-300 text-gray-800"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-4 rounded-lg hover:bg-pink-700 transition-all duration-200 mt-8 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingAddressForm;

