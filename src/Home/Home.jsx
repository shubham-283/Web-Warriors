import React, { useState, useCallback, memo } from "react";
import Hero from "../HeroSlider/HeroSlider";
import FeaturedCategories from "./HomeComponents/FeaturedCategories";
import FeaturedProducts from "./HomeComponents/FeaturedProducts";
import Modal from "./Modal/Modal";
import { useCart } from "../hooks/useCart";
import SurpriseComponent from "../SurpriseCustomer/SurpriseCustomer";
import DiscoverAdaa from "./HomeComponents/DiscoverAdaa";
import Features from "./HomeComponents/Features";
import FindUsOn from "./HomeComponents/FindUs";

// Memoize child components if they haven't been memoized already
const MemoizedHero = memo(Hero);
const MemoizedFeaturedCategories = memo(FeaturedCategories);
const MemoizedFeaturedProducts = memo(FeaturedProducts);
const MemoizedSurpriseComponent = memo(SurpriseComponent);

const HomePage = ({ data, featuredProducts }) => {
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  const handleQuickView = useCallback((product) => {
    setSelectedProduct(product);
    
    // Check if colors and sizes exist and have at least one item
    const initialColor = Array.isArray(product.colors) && product.colors.length > 0 ? product.colors[0] : "";
    const initialSize = Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes[0] : "";
    
    setSelectedColor(initialColor);
    setSelectedSize(initialSize);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);
    setSelectedColor("");
    setSelectedSize("");
  }, []);

  return (
    <main className="bg-gradient-to-br from-[#F2E4D8] via-[#F8C8C2] to-[#F6A8B2] text-white">
      <MemoizedSurpriseComponent />
      <MemoizedHero />
      <MemoizedFeaturedCategories productData={data} />
      <MemoizedFeaturedProducts 
        products={featuredProducts} 
        handleQuickView={handleQuickView} 
      />
      <DiscoverAdaa/>
      <Features/>
      <FindUsOn/>
      {selectedProduct && (
        <Modal
          product={selectedProduct}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          setSelectedColor={setSelectedColor}
          setSelectedSize={setSelectedSize}
          onClose={handleCloseModal}
          addToCart={addToCart}
        />
      )}
      {/* <UploadDataFire/> */}
    </main>
  );
};

export default memo(HomePage);
