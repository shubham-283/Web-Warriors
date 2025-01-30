import React, { useState, useEffect } from "react";
import LoadingAnimation from "../LoadingAnim/LoadingAnim";

export default function ProductFetcher({ setProducts }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  useEffect(() => {
    let timeoutId;
    let controller;

    const fetchProducts = async () => {
      try {
        controller = new AbortController();
        const { signal } = controller;

        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) => {
          timeoutId = setTimeout(() => {
            controller.abort();
            reject(new Error("Request timed out"));
          }, 10000);
        });

        // Race between fetch and timeout
        const response = await Promise.race([
          fetch("https://adda-jaipur.onrender.com/All_Data", {
            signal,
            headers: {
              "Cache-Control": "no-cache",
              "Pragma": "no-cache"
            }
          }),
          timeoutPromise
        ]);

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data || (Array.isArray(data) && data.length === 0)) {
          throw new Error("No data received from server");
        }

        setProducts(data);
        setLoading(false);
        setError("");
        setRetryCount(0);

      } catch (err) {
        console.error("Fetch error:", err);
        
        if (retryCount < MAX_RETRIES) {
          const backoffTime = Math.min(1000 * Math.pow(2, retryCount), 8000);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, backoffTime);
        } else {
          setError(
            err.name === "AbortError"
              ? "Request timed out. Please refresh the page."
              : "Failed to load products. Please refresh the page."
          );
          setLoading(false);
        }
      }
    };

    if (loading) {
      fetchProducts();
    }

    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (controller) controller.abort();
    };

  }, [loading, retryCount, setProducts]);

  const handleRetry = () => {
    setLoading(true);
    setError("");
    setRetryCount(0);
  };

  if (loading) {
    return (
      <div className="w-full">
        <LoadingAnimation loadingText={
          retryCount > 0 
            ? `Retrying... (Attempt ${retryCount}/${MAX_RETRIES})`
            : "Filling the Collection..."
        } />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={handleRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry Loading
        </button>
      </div>
    );
  }

  return null;
}