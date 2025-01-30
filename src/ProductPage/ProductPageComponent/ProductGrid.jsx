import React from "react";
import ProductCard from "../../ProductCard/ProductCard.js";

export default function ProductsGrid({
  productsData,
  selectedCategory,
  selectedSubCategory,
  quantities,
  selectedSizes,
  handleSizeSelection,
  handleQuantityChange,
  handleAddToCart,
  organizeProductsByCategory,
  filteredProducts, // Filtered products passed here
}) {
  const categoryProducts = selectedSubCategory
    ? organizeProductsByCategory(productsData)[selectedCategory]?.[selectedSubCategory]
    : organizeProductsByCategory(productsData)[selectedCategory]?.products;

  const displayProducts = filteredProducts || categoryProducts; // Use filteredProducts if available

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProducts?.map((product) => (
        <ProductCard
          key={product.ProductID}
          product={product}
          quantities={quantities}
          selectedSizes={selectedSizes}
          handleSizeSelection={handleSizeSelection}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}
