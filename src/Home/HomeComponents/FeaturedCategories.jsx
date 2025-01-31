import { useState, useEffect } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedCategories = ({ productData }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Product Data in FeaturedCategories:", productData);
    
    if (productData && productData.length > 0) {
      const uniqueCategories = [
        ...new Set(productData.map((product) => product.Category)), // Ensure this property exists
      ];
      // console.log("Unique Categories:", uniqueCategories);

      if (uniqueCategories.length > 0) {
        // Shuffle and limit to 6 categories
        const shuffledCategories = uniqueCategories.sort(() => Math.random() - 0.5).slice(0, 6);
        setCategories(shuffledCategories);
        setError(""); // Clear any previous error
      } else {
        setError("No categories available.");
      }
    } else {
      setError("No products available.");
    }
  }, [productData]);

  // Define the handleShopNowClick function
  const handleShopNowClick = (category) => {
    navigate('/products', { state: { selectedCategory: category } });
  };

  // If there's an error, display it
  if (error) return <div>{error}. Please check back later!</div>;

  return (
    <section 
      className="py-24 px-6 lg:px-12 text-center relative overflow-hidden" 
    ><div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 z-0"
        style={{ backgroundImage: 'url("/pngwing.com[1].png")',
          backgroundSize: 'contain', // Prevent zooming on mobile
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat', }}
      />
      <div className="relative z-10">
      <h2 className="text-5xl font-bold mb-12 text-[#6B1E3C]">Shop by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category} // Use a unique identifier if possible
              className="category-card bg-[#F8C8C2] p-10 rounded-xl shadow-xl transform hover:scale-105 hover:rotate-3 transition-all duration-500 ease-in-out"
            >
              <h3 className="text-3xl font-semibold mb-6 text-[#6B1E3C]">{category}</h3>
              <button
                className="px-8 py-3 bg-[#6B1E3C] text-white rounded-full hover:bg-[#FF5C8D] transition-all duration-300"
                onClick={() => handleShopNowClick(category)} // Reference to the defined function
              >
                Shop Now
              </button>
            </div>
          ))
        ) : (
          <p>No categories available to display.</p> // Fallback message if no categories
        )}
      </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
