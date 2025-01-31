import React, { useState, useEffect } from "react";
import LoadingAnimation from "../LoadingAnim/LoadingAnim";

export default function ProductFetcher({ setProducts }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const TIMEOUT_DURATION = 15000;

  useEffect(() => {
    let isComponentMounted = true;
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem('productData');
        const timestamp = localStorage.getItem('productDataTimestamp');
        
        if (cached && timestamp) {
          const age = Date.now() - parseInt(timestamp);
          if (age < 5 * 60 * 1000) { // 5 minutes
            setProducts(JSON.parse(cached));
          }
        }

        // Fetch fresh data
        const response = await fetch("https://adda-jaipur.onrender.com/All_Data", {
          signal: controller.signal,
          headers: {
            "Cache-Control": "no-cache",
            "Accept": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();

        if (isComponentMounted) {
          setProducts(data);
          // Update cache
          localStorage.setItem('productData', JSON.stringify(data));
          localStorage.setItem('productDataTimestamp', Date.now().toString());
          setLoading(false);
          setError("");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        if (isComponentMounted) {
          setError("Failed to load products. Please refresh the page.");
          setLoading(false);
        }
      }
    };

    if (loading) {
      fetchProducts();
    }

    return () => {
      isComponentMounted = false;
      controller.abort();
    };
  }, [loading, setProducts]);

  if (loading) {
    return (
      <div className="w-full">
        <LoadingAnimation loadingText="Loading products..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-2">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return null;
}