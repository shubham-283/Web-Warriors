import { useState } from "react";

export const useCategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const handleCategorySelection = (category, organizeProductsByCategory, productsData) => {
    setSelectedCategory(category);
    setSelectedSubCategory(
      Object.keys(organizeProductsByCategory(productsData)[category] || {}).find(
        (subCategory) => subCategory !== "products"
      ) || null
    );
    setCategoriesOpen(false);
  };

  return {
    selectedCategory,
    selectedSubCategory,
    categoriesOpen,
    setCategoriesOpen,
    handleCategorySelection,
    setSelectedSubCategory,
  };
};
