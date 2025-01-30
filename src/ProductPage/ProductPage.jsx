import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Notification from "../Notification/Notification";
import SurpriseComponent from "../SurpriseCustomer/SurpriseCustomer";
import CategorySidebar from "./ProductPageComponent/CategorySidebar";
import CategoryMobileDropdown from "./ProductPageComponent/CategoryMobile";
import ProductsGrid from "./ProductPageComponent/ProductGrid";
import ProductFilters from "./ProductPageComponent/FilterComponent";
import { useProductQuantities } from "../hooks/useProductQuantity";
import { useSelectedSizes } from "../hooks/useSelectedSizes";
import { useNotification } from "../hooks/useNotification";
import { useCategories } from "../hooks/useCategory";

export default function ProductPage({ productsData }) {
  const { state } = useLocation();
  const selectedCategoryFromState = state?.selectedCategory;

  const [selectedCategory, setSelectedCategory] = useState(selectedCategoryFromState || null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const [filter, setFilter] = useState({
    size: null,
    priceRange: [0, 10000],
    color: [],
    fabric: [],
    fabricCare: []
  });

  const [dropdownOpen, setDropdownOpen] = useState({
    color: false,
    fabric: false,
    fabricCare: false
  });

  const [filterVisible, setFilterVisible] = useState(false);

  const { addToCart } = useCart();
  const [quantities, handleQuantityChange] = useProductQuantities(productsData);
  const [selectedSizes, handleSizeSelection] = useSelectedSizes(productsData);
  const [notification, showNotification] = useNotification();
  const categories = useCategories(productsData);

  const getUniqueValues = (field) => {
    try {
      return [...new Set(productsData
        .map(product => product.Description?.[field])
        .filter(Boolean))];
    } catch (error) {
      console.error(`Error getting unique ${field} values:`, error);
      return [];
    }
  };

  const uniqueColors = [...new Set(productsData.map((product) => product.Color).filter(Boolean))];

  useEffect(() => {
    if (productsData.length > 0) {
      if (!selectedCategory) {
        const defaultCategory = categories[0];
        setSelectedCategory(defaultCategory);
      } else {
        const firstSubCategory = Object.keys(
          organizeProductsByCategory(productsData)[selectedCategory] || {}
        ).find((subCategory) => subCategory !== "products");
        setSelectedSubCategory(firstSubCategory || null);
      }
    }
  }, [productsData, categories, selectedCategory]);

  const handleAddToCart = (product) => {
    try {
      let selectedSize;
      if (Array.isArray(product.Size) && product.Size.length > 0) {
        selectedSize = selectedSizes[product.ProductID] || product.Size[0];
      } else {
        selectedSize = "No size available";
      }

      const cartItem = {
        name: product.Name,
        image: product.ImageURL,
        size: selectedSize,
        color: product.Color,
        quantity: quantities[product.ProductID] || 1,
        price: product.Price,
      };

      addToCart(cartItem);
      showNotification(`Added ${product.Name} to the cart!`);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      showNotification("Failed to add item to cart. Please try again.");
    }
  };

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

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(
      Object.keys(organizeProductsByCategory(productsData)[category] || {}).find(
        (subCategory) => subCategory !== "products"
      ) || null
    );
    setCategoriesOpen(false);
  };

  const handleSubCategorySelection = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const toggleDropdown = (type) => {
    setDropdownOpen(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const filterProducts = (products) => {
    try {
      return products.filter((product) => {
        const isInPriceRange =
          product.Price >= filter.priceRange[0] && product.Price <= filter.priceRange[1];
        const isCorrectSize =
          !filter.size || (product.Size && product.Size.includes(filter.size));
        const isCorrectColor =
          filter.color.length === 0 || filter.color.includes(product.Color);
        const isCorrectFabric =
          filter.fabric.length === 0 || filter.fabric.includes(product.Description?.Fabric);
        const isCorrectFabricCare =
          filter.fabricCare.length === 0 || filter.fabricCare.includes(product.Description?.FabricCare);

        return isInPriceRange && isCorrectSize && isCorrectColor && isCorrectFabric && isCorrectFabricCare;
      });
    } catch (error) {
      console.error("Error filtering products:", error);
      return [];
    }
  };

  const filteredProducts = filterProducts(
    selectedSubCategory
      ? organizeProductsByCategory(productsData)[selectedCategory]?.[selectedSubCategory] || []
      : organizeProductsByCategory(productsData)[selectedCategory]?.products || []
  );

  const toggleFilterVisibility = () => {
    setFilterVisible(prev => !prev);
  };

  return (
    <>
      <SurpriseComponent />
      <div className="flex flex-col md:flex-row bg-pink-50 min-h-screen">
        {notification && (
          <Notification
            message={notification}
            onClose={() => showNotification("")}
            className="fixed top-4 right-4 z-50"
          />
        )}

        <CategoryMobileDropdown
          productsData={productsData}
          categoriesOpen={categoriesOpen}
          selectedCategory={selectedCategory}
          setCategoriesOpen={setCategoriesOpen}
          handleCategorySelection={handleCategorySelection}
        />

        <CategorySidebar
          productsData={productsData}
          selectedCategory={selectedCategory}
          handleCategorySelection={handleCategorySelection}
        />

        <div className={`flex-1 p-6 ${filterVisible ? '' : 'lg:w-full'}`}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className={`lg:col-span-1 h-fit ${filterVisible ? '' : 'hidden'}`}>
              <ProductFilters
                filter={filter}
                handleFilterChange={handleFilterChange}
                dropdownOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                uniqueColors={uniqueColors}
                productsData={productsData}
                getUniqueValues={getUniqueValues}
              />
            </div>

            <div className={`${filterVisible ? 'lg:col-span-3' : 'lg:col-span-5'}`}>
              {selectedCategory && (
                <div className="bg-white rounded-lg p-4 mb-6">
                  <h2 className="text-3xl font-bold text-pink-700 mb-4">{selectedCategory}</h2>
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(organizeProductsByCategory(productsData)[selectedCategory] || {}).filter((key) => key !== "products")
                      .map((subCategory) => (
                        <button
                          key={subCategory}
                          onClick={() => handleSubCategorySelection(subCategory)}
                          className={`px-4 py-2 text-lg font-semibold rounded-md transition-colors
                            ${selectedSubCategory === subCategory
                              ? "bg-pink-600 text-white"
                              : "bg-pink-200 text-pink-800 hover:bg-pink-300"
                            }`}
                        >
                          {subCategory}
                        </button>
                      ))}
                  </div>
                </div>
              )}

              <div className="bg-white rounded-lg p-4">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-pink-700">
                    {filteredProducts.length} Products Found
                  </h3>
                  <button
                    onClick={toggleFilterVisibility}
                    className="text-pink-700 mt-2 md:mt-0"
                  >
                    {filterVisible ? 'Hide Filters' : 'Show Filters'}
                  </button>
                </div>
                <ProductsGrid
                  productsData={filteredProducts}
                  selectedCategory={selectedCategory}
                  selectedSubCategory={selectedSubCategory}
                  quantities={quantities}
                  selectedSizes={selectedSizes}
                  handleSizeSelection={handleSizeSelection}
                  handleQuantityChange={handleQuantityChange}
                  handleAddToCart={handleAddToCart}
                  organizeProductsByCategory={organizeProductsByCategory}
                />
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #CECECE;
            border-radius: 10px;
            border: 3px solid #f0f0f0;
          }

          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #d79be2;
          }

          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 10px;
          }
        `}</style>
      </div>
    </>
  );
}
