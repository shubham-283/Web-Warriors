import { useState } from "react";

export const useProductQuantities = (products) => {
  const [quantities, setQuantities] = useState(() => {
    const initialQuantities = {};
    products.forEach((product) => {
      initialQuantities[product.ProductID] = 1;
    });
    return initialQuantities;
  });

  const handleQuantityChange = (productId, type, maxQuantity) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productId] || 1;
      const updatedQuantity =
        type === "increment"
          ? Math.min(currentQuantity + 1, maxQuantity)
          : Math.max(currentQuantity - 1, 1);
      return { ...prev, [productId]: updatedQuantity };
    });
  };

  return [quantities, handleQuantityChange];
};
