import React, { useState, useEffect, useCallback } from 'react';

export default function ProductFetcher({ setProducts, children }) {
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL || "https://adda-jaipur.onrender.com/All_Data";
  const MAX_RETRIES = 3;
  const TIMEOUT_MS = 10000;
  const BASE_BACKOFF_MS = 1000;

  const fetchProducts = useCallback(async () => {
    let controller = new AbortController();
    
    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          controller.abort();
          reject(new Error('Request timeout'));
        }, TIMEOUT_MS);
      });

      const fetchPromise = fetch(API_URL, {
        signal: controller.signal,
        headers: {
          "Cache-Control": "no-cache",
          "Pragma": "no-cache",
          "Accept": "application/json"
        }
      });

      const response = await Promise.race([fetchPromise, timeoutPromise]);

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No products found');
      }

      setProducts(data);
      setRetryCount(0);

    } catch (err) {
      if (retryCount < MAX_RETRIES) {
        const backoffTime = Math.min(
          BASE_BACKOFF_MS * Math.pow(2, retryCount), 
          8000
        );
        
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
          fetchProducts();
        }, backoffTime);
      } else {
        setError(
          err.name === 'AbortError'
            ? "Request failed"
            : err.message || "Load error"
        );
      }
    }
  }, [setProducts, retryCount, API_URL]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return error ? null : children;
}