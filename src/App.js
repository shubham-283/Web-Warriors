import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Home/Home'; 
import UserInfo from './UserInfo/UserInfo'; 
import { Auth0Provider } from "@auth0/auth0-react"; 
import NavbarAdaa from './NavBar/NavBar';
import CartPage from './AddToCart/CartPage';
import { CartProvider } from './hooks/useCart';
import AboutUs from './AboutUs/AboutUs';
import ProductPage from './ProductPage/ProductPage';
import { WishlistProvider } from './hooks/useWishlist';
import WishlistPage from './WishlistPage/WishlistPage';
import Footer from './Footer/Footer.jsx';
import SubscribeSection from './SubscribeAdaa/SubscribeAdaa.jsx';
import ProductFetcher from "./APIFetcher/ProductFetcher";
import SearchResults from './SearchResult/SearchResults.jsx';
import ContactPage from './ContactPage/ContactPage.jsx';
import useFeaturedProducts from "./hooks/useFeaturedProducts"; // Import the hook here
import "./index.css"

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [products, setProducts] = useState([]);
  const { featuredProducts, loading, error } = useFeaturedProducts(); // Fetch featured products here

  return (
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_ISSUER_BASE_URL}
      clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <Router>
        <ScrollToTop />
        <ProductFetcher setProducts={setProducts} />
        <NavbarAdaa/>
        <CartProvider>
          <WishlistProvider>
            <Routes>
              <Route path="/" element={<HomePage data={products} featuredProducts={featuredProducts} loading={loading} error={error} />} />
              <Route path="/account" element={<UserInfo />} />
              <Route path='/about-us' element={<AboutUs/>}/>
              <Route path="/shoppingcart" element={<CartPage />} />
              <Route path="/products" element={<ProductPage productsData={products}/>}/>
              <Route path='/wishlist' element={<WishlistPage/>}/>
              <Route path="/search-results" element={<SearchResults productData={products} />} />
              <Route path='/contact-us' element={<ContactPage/>}/>
            </Routes>
          </WishlistProvider>
        </CartProvider>
        <SubscribeSection/>
        <Footer/>
      </Router>
    </Auth0Provider>
  );
};

export default App;
