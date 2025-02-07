import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Select from 'react-select'; // Import react-select


const ReturnsPage = () => {
  const [formData, setFormData] = useState({
    orderId: '',
    contactNumber: '',
    email: '',
    productName: '',
    purchaseDate: '',
    returnReason: '',
    condition: '',
    preferredRefundMethod: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Return Request Submitted:', formData);
  };

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      border: '1px solid #f472b6',
      borderRadius: '0.5rem',
      boxShadow: state.isFocused ? '0 0 0 2px #f9a8d4' : null,
      '&:hover': {
        borderColor: '#f9a8d4',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#f9a8d4' : 'white',
      color: '#e91e63',
      '&:hover': {
        backgroundColor: '#f9a8d4',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e91e63'
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#e91e63'
    })
  };

  const selectOptions = [
    { value: '', label: 'Select condition' },
    { value: 'unopened', label: 'Unopened' },
    { value: 'opened', label: 'Opened - Like New' },
    { value: 'used', label: 'Used' },
    { value: 'damaged', label: 'Damaged' }
  ];

    const refundOptions = [
        { value: '', label: 'Select refund method' },
        { value: 'original', label: 'Original Payment Method' },
        { value: 'store-credit', label: 'Store Credit' },
        { value: 'bank-transfer', label: 'Bank Transfer' }
    ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-16 mt-20">
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-xl border border-pink-200">
        <div className="bg-gradient-to-r from-pink-400 to-pink-600 text-transparent bg-clip-text">
          <h2 className="text-3xl font-bold text-center mb-8">Return Request Form</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-pink-700 font-medium mb-2" htmlFor="orderId">
                Order ID *
              </label>
              <input
                type="text"
                id="orderId"
                value={formData.orderId}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/70 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-pink-700 font-medium mb-2" htmlFor="productName">
                Product Name *
              </label>
              <input
                type="text"
                id="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/70 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-pink-700 font-medium mb-2" htmlFor="contactNumber">
                Contact Number *
              </label>
              <input
                type="tel"
                id="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/70 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-pink-700 font-medium mb-2" htmlFor="email">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-white/70 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-2" htmlFor="purchaseDate">
              Purchase Date *
            </label>
            <input
              type="date"
              id="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/70 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-2" htmlFor="condition">
              Product Condition *
            </label>
            <Select
              id="condition"
              value={formData.condition ? { value: formData.condition, label: selectOptions.find(option => option.value === formData.condition)?.label || '' } : null}
              onChange={(selectedOption) => handleChange({ target: { id: 'condition', value: selectedOption ? selectedOption.value : '' } })}
              options={selectOptions}
              styles={customSelectStyles}
              isClearable
              placeholder="Select condition"
            />
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-2" htmlFor="returnReason">
              Reason for Return *
            </label>
            <textarea
              id="returnReason"
              value={formData.returnReason}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/70 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all"
              rows="4"
              required
            />
          </div>

          <div>
            <label className="block text-pink-700 font-medium mb-2" htmlFor="preferredRefundMethod">
              Preferred Refund Method *
            </label>
             <Select
              id="preferredRefundMethod"
              value={formData.preferredRefundMethod ? { value: formData.preferredRefundMethod, label: refundOptions.find(option => option.value === formData.preferredRefundMethod)?.label || '' } : null}
              onChange={(selectedOption) => handleChange({ target: { id: 'preferredRefundMethod', value: selectedOption ? selectedOption.value : '' } })}
              options={refundOptions}
              styles={customSelectStyles}
              isClearable
              placeholder="Select refund method"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold rounded-lg hover:from-pink-500 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Submit Return Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReturnsPage;
