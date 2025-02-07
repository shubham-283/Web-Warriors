import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { db } from '../firebase-config.js';
import { collection, addDoc } from 'firebase/firestore';
import ShippingAddressForm from './CheckoutComponents/ShippingAddressForm';
import PaymentMethodForm from './CheckoutComponents/PaymentMethodForm';
import OrderReviewPage from './CheckoutComponents/OrderReviewPage';
import { generateOrderId } from './CheckoutComponents/GenerateOrderId.jsx';

const CheckoutProcess = ({ cartItems, totalPrice }) => {
  const [step, setStep] = useState(1);
  const [shippingData, setShippingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const { user } = useAuth0();
  const [checkoutSteps, setCheckoutSteps] = useState([1]);

  useEffect(() => {
    // Load state from sessionStorage on component mount
    const storedState = sessionStorage.getItem('checkoutState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setStep(parsedState.step);
      setShippingData(parsedState.shippingData);
      setPaymentData(parsedState.paymentData);
      setOrderId(parsedState.orderId);
      setCheckoutSteps(parsedState.checkoutSteps);
    }
  }, []);

  useEffect(() => {
    // Update checkoutSteps whenever the step changes
    if (!checkoutSteps.includes(step)) {
      setCheckoutSteps(prevSteps => [...prevSteps, step]);
    }
  }, [step]);

  useEffect(() => {
    // Save state to sessionStorage whenever it changes
    const checkoutState = {
      step,
      shippingData,
      paymentData,
      orderId,
      checkoutSteps
    };
    sessionStorage.setItem('checkoutState', JSON.stringify(checkoutState));
  }, [step, shippingData, paymentData, orderId, checkoutSteps]); // Depend on ALL state vars

  const handleShippingSubmit = (data) => {
    setShippingData(data);
    setStep(2);
  };

  const handlePaymentSubmit = (data) => {
    setPaymentData(data);
    setOrderId(generateOrderId());
    setStep(3);
  };

  const handleOrderConfirmation = async (userEmail) => {
    if (isSubmitting || orderSubmitted || !userEmail) return;
    setIsSubmitting(true);

    try {
      const orderDetails = {
        orderId: orderId,
        cartItems,
        shippingAddress: {
          ...shippingData,
          email: userEmail
        },
        paymentMethod: paymentData,
        totalPrice,
        createdAt: new Date(),
        userId: user?.sub || null
      };

      await addDoc(collection(db, 'orders'), orderDetails);
      setOrderSubmitted(true);

    } catch (error) {
      console.error('Error adding document: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const goToStep = (stepNumber) => {
    if (checkoutSteps.includes(stepNumber)) {
      setStep(stepNumber);
    }
  };

  const stepLabels = {
    1: 'Shipping Address',
    2: 'Payment Method',
    3: 'Order Review'
  };

  return (
    <div className="w-full mx-auto p-6 min-h-screen bg-pink-50 mt-20">
      {/* Checkout Progress Tracker */}
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Checkout Progress</h3>
        <div className="flex items-center space-x-4">
          {Object.keys(stepLabels).map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              {checkoutSteps.includes(parseInt(stepNumber)) ? (
                <>
                  <button
                    onClick={() => goToStep(parseInt(stepNumber))}
                    className="flex items-center focus:outline-none"
                  >
                    <span className="bg-green-200 text-green-700 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    <span className="text-gray-700 hover:underline">{stepLabels[stepNumber]}</span>
                  </button>
                  {stepNumber < Object.keys(stepLabels).length && <span className="mx-2">&rarr;</span>}
                </>
              ) : (
                <>
                  <span className="bg-gray-200 text-gray-500 rounded-full w-6 h-6 flex items-center justify-center mr-2">
                    {stepNumber}
                  </span>
                  <span className="text-gray-500">{stepLabels[stepNumber]}</span>
                  {stepNumber < Object.keys(stepLabels).length && <span className="mx-2">&rarr;</span>}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Forms */}
      {step === 1 && (
        <ShippingAddressForm onSubmit={handleShippingSubmit} />
      )}

      {step === 2 && (
        <PaymentMethodForm onSubmit={handlePaymentSubmit} />
      )}

      {step === 3 && (
        <OrderReviewPage
          cartItems={cartItems}
          shippingAddress={shippingData}
          paymentMethod={paymentData}
          totalPrice={totalPrice}
          orderId={orderId}
          userEmail={user?.email}
          onConfirm={handleOrderConfirmation}
          isSubmitting={isSubmitting}
          orderSubmitted={orderSubmitted}
          companyLogoSrc="/adaa-logo.png"
        />
      )}
    </div>
  );
};

export default CheckoutProcess;
