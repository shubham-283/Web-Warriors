import React from "react";

const ShippingPolicy = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8 mt-20">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
        Shipping Policy
      </h1>

      <div className="space-y-6 text-gray-700">
        <p>
          We ship through registered and trusted courier partners for orders
          within India.
        </p>

        <p>
          Please note that Saturdays, Sundays, and Public Holidays are not set
          as working days for standard deliveries.
        </p>

        <h2 className="text-xl font-medium text-gray-800 mt-4">
          DOMESTIC SHIPPING:
        </h2>
        <p>
          We offer free shipping for all domestic orders. The estimated delivery
          time for shipping is 3-10 days. Deliveries are dispatched to the
          shipping address recorded at checkout. All orders are processed from
          our warehouse in Jaipur.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
