import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function CategoryMobileDropdown({ 
  productsData, 
  categoriesOpen, 
  selectedCategory, 
  setCategoriesOpen, 
  handleCategorySelection 
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
    <div className="md:hidden bg-white shadow-lg p-4 rounded-xl border border-gray-200">
      <button
        onClick={() => setCategoriesOpen((prev) => !prev)}
        className="flex justify-between items-center w-full text-left text-lg font-semibold p-3 border border-gray-300 rounded-md bg-gradient-to-r from-rose-400 to-rose-300 text-white hover:from-rose-500 hover:to-rose-400 transition-all duration-300 ease-in-out"
      >
        {selectedCategory || "Select a Category"}
        {categoriesOpen ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
      </button>

      <div
        className={`mt-3 overflow-hidden transition-max-height duration-500 ease-in-out ${
          categoriesOpen ? 'max-h-screen' : 'max-h-0'
        }`}
      >
        {productsData.length > 0 &&
          Object.entries(organizeProductsByCategory(productsData)).map(
            ([category]) => (
              <button
                key={category}
                onClick={() => handleCategorySelection(category)}
                className={`w-full text-left p-4 hover:bg-rose-200 hover:text-white transition-colors rounded-md 
                ${selectedCategory === category ? "bg-rose-300 text-white" : "bg-white text-gray-800"}`}
              >
                {category}
              </button>
            )
          )}
      </div>
    </div>
  );
}
