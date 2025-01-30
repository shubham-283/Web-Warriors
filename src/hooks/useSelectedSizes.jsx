import { useState } from "react";

export const useSelectedSizes = (products) => {
  const [selectedSizes, setSelectedSizes] = useState(() => {
    const initialSizes = {};
    products.forEach((product) => {
      if (Array.isArray(product.Size) && product.Size.length > 0) {
        initialSizes[product.ProductID] = product.Size[0];
      }
    });
    return initialSizes;
  });

  const handleSizeSelection = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  return [selectedSizes, handleSizeSelection];
};
