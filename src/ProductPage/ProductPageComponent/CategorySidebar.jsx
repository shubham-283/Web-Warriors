import React from 'react';

export default function CategorySidebar({
  productsData,
  selectedCategory,
  handleCategorySelection,
}) {
  const organizeProductsByCategory = (products) =>
    products.reduce((acc, product) => {
      const { Category, Sub_Category } = product;
      if (!acc[Category]) {
        acc[Category] = { products: [] };
      }
      if (Sub_Category) {
        if (!acc[Category][Sub_Category]) {
          acc[Category][Sub_Category] = [];
        }
        acc[Category][Sub_Category].push(product);
      } else {
        acc[Category].products.push(product);
      }
      return acc;
    }, {});

  return (
    <div className="hidden md:block md:w-1/6 bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">Categories</h2>
      <div className="space-y-4">
        {productsData.length > 0 &&
          Object.entries(organizeProductsByCategory(productsData)).map(
            ([category]) => (
              <button
                key={category}
                onClick={() => handleCategorySelection(category)}
                className={`w-full text-left p-4 rounded-md transition-all duration-300 transform ${
                  selectedCategory === category
                    ? "bg-pink-100 text-pink-800 scale-105 shadow-xl"
                    : "bg-pink-50 text-pink-600 hover:bg-pink-200"
                }`}
              >
                <h3 className="text-lg font-semibold">{category}</h3>
              </button>
            )
          )}
      </div>
    </div>
  );
}
