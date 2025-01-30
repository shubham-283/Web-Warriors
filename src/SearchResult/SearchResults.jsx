import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Search, AlertCircle, ChevronRight, Filter, XCircle, ChevronDown } from "lucide-react";

const SearchResults = ({ productData }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [filteredResults, setFilteredResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("relevance");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    priceRange: null,
  });

  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "discount", label: "Highest Discount" }
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sort-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Extract query from URL and handle errors
  useEffect(() => {
    try {
      const queryParams = new URLSearchParams(location.search);
      const searchQuery = queryParams.get("query");
      if (searchQuery) {
        setQuery(searchQuery);
      } else {
        setError("No search query provided");
      }
    } catch (err) {
      console.error("Search query processing error:", err);
      setError("Error processing search query");
    } finally {
      setLoading(false);
    }
  }, [location]);

  // Filter and sort results based on query and sorting criteria
  useEffect(() => {
    try {
      if (!productData) {
        throw new Error("Product data is not available");
      }

      if (query) {
        setLoading(true);
        const queryWords = query.toLowerCase().split(/\s+/);
        
        let results = productData.filter((item) =>
          queryWords.every((word) =>
            ["Color", "Name", "Category", "Sub_Category"].some((key) =>
              item[key]?.toLowerCase().includes(word)
            ) ||
            ["Detail", "Fabric", "Pattern", "Type"].some((key) =>
              item.Description?.[key]?.toLowerCase().includes(word)
            )
          )
        );

        // Apply sorting with error handling
        try {
          switch (sortBy) {
            case "price-low":
              results.sort((a, b) => {
                if (!a.Price || !b.Price) return 0;
                return a.Price - b.Price;
              });
              break;
            case "price-high":
              results.sort((a, b) => {
                if (!a.Price || !b.Price) return 0;
                return b.Price - a.Price;
              });
              break;
            case "discount":
              results.sort((a, b) => {
                if (!a.Discount || !b.Discount) return 0;
                return b.Discount - a.Discount;
              });
              break;
            default:
              break;
          }
        } catch (sortError) {
          console.error("Sorting error:", sortError);
          // Continue with unsorted results if sorting fails
        }

        setFilteredResults(results);
      } else {
        setFilteredResults([]);
      }
    } catch (err) {
      console.error("Filtering error:", err);
      setError("Error filtering results");
    } finally {
      setLoading(false);
    }
  }, [query, productData, sortBy]);

  const handleSortChange = (value) => {
    setSortBy(value);
    setIsDropdownOpen(false);
  };

  const handleViewCategory = (category, subCategory) => {
    try {
      navigate("/products", {
        state: {
          selectedCategory: category,
          selectedSubCategory: subCategory,
        },
      });
    } catch (err) {
      console.error("Navigation error:", err);
      setError("Error navigating to category page");
    }
  };

  const formatPrice = (price) => {
    try {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
      }).format(price);
    } catch (err) {
      console.error("Price formatting error:", err);
      return `₹${price}`; // Fallback formatting
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-pink-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-gray-500" />
            <h1 className="text-3xl font-semibold text-gray-900">
              Search Results for "{query}"
            </h1>
          </div>
          
          {/* Enhanced Sort and Filter Controls */}
          <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Sort by:</span>
            </div>
            
            {/* Custom Dropdown */}
            <div className="relative sort-dropdown">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors"
              >
                {sortOptions.find(option => option.value === sortBy)?.label}
                <ChevronDown 
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isDropdownOpen ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleSortChange(option.value)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                          sortBy === option.value 
                            ? 'bg-indigo-50 text-indigo-900 font-medium' 
                            : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {filteredResults.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredResults.map((item, index) => (
              <div
                key={`${item.ProductID}-${index}`}
                className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative p-4">
                  <img
                    src={item.ImageURL}
                    alt={item.Name}
                    className="w-full aspect-square object-contain rounded-md mb-4"
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                      e.target.onerror = null;
                    }}
                  />
                  {item.Discount > 0 && (
                    <span className="absolute top-6 right-6 bg-red-600 text-white text-sm font-medium px-2 py-1 rounded-full">
                      {item.Discount}% OFF
                    </span>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900 mb-2 line-clamp-2">
                    {item.Name}
                  </h2>
                  
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">
                      {item.Category} • {item.Sub_Category}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.Description?.Detail}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {formatPrice(item.Price)}
                      </p>
                      {item.Discount > 0 && (
                        <p className="text-sm text-gray-500 line-through">
                          {formatPrice(item.Price * (1 + item.Discount / 100))}
                        </p>
                      )}
                    </div>
                    
                    <button
                      onClick={() => handleViewCategory(item.Category, item.Sub_Category)}
                      className="flex items-center gap-1 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
                    >
                      View
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-lg">
            <XCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">No results found</h2>
            <p className="text-gray-600">
              Try adjusting your search terms or browse our categories instead
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
