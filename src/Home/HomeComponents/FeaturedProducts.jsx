import React, { memo } from "react";

// Memoized ProductCard component to avoid unnecessary re-renders
const ProductCard = memo(({ product, handleQuickView }) => (
  <div className="product-card bg-white p-4 rounded-lg shadow-md transition-shadow duration-300 ease-in-out relative overflow-hidden flex flex-col">
    <div className="product-img-container relative h-64 mb-4">
      <img
        src={product.image || "/placeholder.svg"}
        alt={product.name}
        className="rounded-md object-contain w-full h-full"
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3>
    <p className="text-lg text-gray-600 mb-2">₹{product.price.toFixed(2)}</p>
    <div className="flex-grow" /> {/* This div takes up remaining space */}
    <button
      className="bg-[#FF5C8D] text-white px-4 py-2 rounded-md hover:bg-[#FF80A4] transition-colors duration-300"
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
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 z-0"
        style={{
          backgroundImage: 'url("/pngwing.com[1].png")',
          backgroundSize: 'contain', // Prevent zooming on mobile
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
        }}
      />
      <div className="relative z-10">
        <h2 className="text-5xl font-bold mb-12 text-[#6B1E3C]">Featured Products</h2>
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
