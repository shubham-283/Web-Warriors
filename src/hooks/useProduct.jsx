import { useState, useEffect } from "react";

export const useProducts = () => {
  const [productsData, setProductsData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  const initializeQuantities = (products) => {
    const initialQuantities = {};
    products.forEach((product) => {
      initialQuantities[product.ProductID] = 1;
    });
    return initialQuantities;
  };

  const initializeSelectedSizes = (products) => {
    const initialSizes = {};
    products.forEach((product) => {
      if (Array.isArray(product.Size) && product.Size.length > 0) {
        initialSizes[product.ProductID] = product.Size[0];
      }
    });
    return initialSizes;
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

  useEffect(() => {
    if (productsData.length > 0) {
      setQuantities(initializeQuantities(productsData));
      setSelectedSizes(initializeSelectedSizes(productsData));
    }
  }, [productsData]);

  return {
    productsData,
    setProductsData,
    quantities,
    setQuantities,
    selectedSizes,
    setSelectedSizes,
    organizeProductsByCategory,
  };
};
