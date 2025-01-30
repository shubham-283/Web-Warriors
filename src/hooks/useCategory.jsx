// src/hooks/useCategories.js
import { useEffect, useState } from "react";

export const useCategories = (products) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = new Set();

    products.forEach((product) => {
      if (product.Category) {
        uniqueCategories.add(product.Category);
      }
    });

    setCategories(Array.from(uniqueCategories));
  }, [products]);

  return categories;
};
