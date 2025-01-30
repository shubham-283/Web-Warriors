import React, { useState, useEffect } from 'react';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import ProductCard from '../ProductCard/ProductCard';
import SurpriseComponent from '../SurpriseCustomer/SurpriseCustomer';
import { Link } from 'react-router-dom';

const Notification = ({ message, type, onClose }) => (
  <div className={`fixed top-5 right-5 px-6 py-3 rounded-md shadow-md z-50 flex items-center justify-between gap-3 
    ${type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}
  >
    <span>{message}</span>
    <button 
      onClick={onClose}
      className="border-none bg-transparent cursor-pointer text-lg"
    >
      ×
    </button>
  </div>
);

const WishlistPage = () => {
  const { state: wishlistState, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [notifications, setNotifications] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stockStatus, setStockStatus] = useState({});

  useEffect(() => {
    const checkStockStatus = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const stockUpdates = {};
        wishlistState.items.forEach(item => {
          stockUpdates[item.ProductID] = {
            inStock: Math.random() > 0.2,
            quantity: Math.floor(Math.random() * 10) + 1
          };
        });
        
        setStockStatus(stockUpdates);
        setError(null);
      } catch (err) {
        setError('Failed to fetch stock information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    checkStockStatus();
  }, [wishlistState.items]);

  const addNotification = (message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  const handleAddToCart = async (product) => {
    try {
      if (!selectedSizes[product.ProductID]) {
        addNotification('Please select a size first', 'error');
        return;
      }

      if (!stockStatus[product.ProductID]?.inStock) {
        addNotification('Sorry, this item is out of stock', 'error');
        return;
      }

      const quantity = quantities[product.ProductID] || 1;
      if (quantity > stockStatus[product.ProductID]?.quantity) {
        addNotification(`Only ${stockStatus[product.ProductID].quantity} items available`, 'error');
        return;
      }

      const cartItem = {
        name: product.Name,
        image: product.ImageURL,
        size: selectedSizes[product.ProductID],
        color: product.Color,
        quantity,
        price: product.Price,
      };

      await addToCart(cartItem);
      addNotification(`Added ${product.Name} to your cart!`);
      removeFromWishlist(product.ProductID);
    } catch (err) {
      addNotification('Failed to add item to cart. Please try again.', 'error');
    }
  };

  const handleSizeSelection = (productId, size) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleQuantityChange = (productId, type) => {
    setQuantities(prev => {
      const currentQuantity = prev[productId] || 1;
      const maxQuantity = stockStatus[productId]?.quantity || 1;
      
      let updatedQuantity = type === "increment" 
        ? currentQuantity + 1 
        : Math.max(currentQuantity - 1, 1);
      
      updatedQuantity = Math.min(updatedQuantity, maxQuantity);
      
      return { ...prev, [productId]: updatedQuantity };
    });
  };

  if (error) {
    return (
      <div className="min-h-screen p-6 bg-gray-100">
        <div className="p-4 bg-red-100 rounded-md text-red-800">
          <p className="font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-pink-50 to-pink-50">
      <SurpriseComponent />
      
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          Your Wishlist
        </h1>
        <p className="text-gray-600">
          {wishlistState.items.length} {wishlistState.items.length === 1 ? 'item' : 'items'} saved
        </p>
      </div>

      {notifications.map(({ id, message, type }) => (
        <Notification
          key={id}
          message={message}
          type={type}
          onClose={() => setNotifications(prev => 
            prev.filter(n => n.id !== id)
          )}
        />
      ))}

      {wishlistState.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">
            Your wishlist is empty!
          </p>
          <Link
            to="/products" 
            className="text-blue-600 hover:underline"
          >
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistState.items.map((item) => (
            <ProductCard
              key={item.ProductID}
              product={item}
              quantities={quantities}
              selectedSizes={selectedSizes}
              stockStatus={stockStatus[item.ProductID]}
              handleSizeSelection={handleSizeSelection}
              handleQuantityChange={handleQuantityChange}
              handleAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;