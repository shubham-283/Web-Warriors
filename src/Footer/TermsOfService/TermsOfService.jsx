import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 mt-20">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Terms of Service</h1>

      <section className="space-y-6 text-gray-700">
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Exchange and Return Policy</h2>
        
        <h3 className="text-xl font-semibold text-gray-800 mt-4">EXCHANGE</h3>
        <p>
          We send all our products with love and precision, yet if you happen to receive the wrong size, you can send us an exchange request at 
          <a href="mailto:adaajaipur4india@gmail.com" className="text-blue-500"> adaajaipur4india@gmail.com</a>. An executive will respond to your request within working hours.
        </p>

        <p>
          Customers need to self-ship the product to us. Exchange pieces in the correct size will be made as soon as possible. You will receive the shipping information on your registered email once it is dispatched.
        </p>

        <ul className="list-disc pl-6">
          <li><strong>Exchange will only be done for sizing issues or defective items.</strong></li>
          <li><strong>Exchange request shall be raised within 24 hours of delivery.</strong> After that, we will not be able to entertain any requests.</li>
          <li><strong>Customers need to self-ship the product to us within 3 days after delivery.</strong></li>
          <li><strong>Exchange will be done only once for one piece.</strong></li>
          <li><strong>All product tags should be intact and in their original packaging with an invoice.</strong></li>
          <li><strong>Product must be in an unused, unwashed, and undamaged condition.</strong></li>
          <li><strong>A confirmation email will be sent once the shipment is received at our warehouse and checked for quality.</strong></li>
          <li><strong>If the product fails our quality inspection, it will be shipped back to you.</strong></li>
          <li><strong>We do not have a reverse pickup facility for now.</strong> Please do not forget to take an acknowledgment receipt from the courier with their signature and contact details. We will not be responsible for any lost shipment.</li>
        </ul>

        <p><strong>You have to send the package back to:</strong></p>
        <address className="pl-6">
          ADAA JAIPUR<br />
          H-5, RIICO MANSAROVAR INDUSTRIAL AREA<br />
          JAIPUR – 302020
        </address>

        <h3 className="text-xl font-semibold text-gray-800 mt-6">RETURN</h3>
        <ul className="list-disc pl-6">
          <li><strong>Do not return any product(s) before receiving a confirmation email from us.</strong></li>
          <li>If you wish to return a product, <strong>write to us at 
            <a href="mailto:adaajaipur4india@gmail.com" className="text-blue-500"> adaajaipur4india@gmail.com</a> within 24 hours of receiving the product.</strong></li>
          <li><strong>All shipping costs of returning the product are to be paid by customers.</strong></li>
          <li><strong>No refund will be given if the order has been delivered with the color and size as selected by the customer while placing the order.</strong></li>
        </ul>
      </section>
    </div>
  );
};

export default TermsOfService;
