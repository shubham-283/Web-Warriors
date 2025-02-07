import React, { memo } from "react";
import SectionHeader from "./SectionHeading";

// Memoized ProductCard component to avoid unnecessary re-renders
const ProductCard = memo(({ product, handleQuickView }) => (
  <div className="product-card bg-white p-5 rounded-xl shadow-lg border border-gray-200 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl flex flex-col">
    <div className="relative h-90 mb-4 overflow-hidden rounded-lg">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="object-contain w-full h-full transition-transform duration-300 hover:scale-110"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3>
    <p className="text-lg font-bold text-[#FF5C8D] mb-2">
      ₹{product.price.toFixed(2)}
    </p>
    <div className="flex-grow" />
    <button
      className="bg-[#FF5C8D] text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#FF80A4] transition-all duration-300 hover:shadow-lg"
      onClick={() => handleQuickView(product)}
    >
      Quick View
    </button>
  </div>
));

const FeaturedProducts = ({ products, handleQuickView }) => {
  return (
    <section className="py-24 px-6 lg:px-12 text-center relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("/pngwing.com[1].png")',
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent opacity-80 z-0"></div>
      <div className="relative z-10">
      {/* <div className="w-full overflow-hidden mb-16"> */}
      <SectionHeader title="Signature Styles" backgroundColor="" flourishColor="#6B1E3C" />
  {/* </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              handleQuickView={handleQuickView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
