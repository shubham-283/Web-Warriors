// src/hooks/useWishlist.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAuth0 } from '@auth0/auth0-react';

const WishlistContext = createContext();

const initialState = {
  items: [],
};

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WISHLIST':
      return { ...state, items: action.payload };
    case 'ADD_TO_WISHLIST':
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
      };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      loadWishlist(user.email);
    }
  }, [user]);

  const loadWishlist = async (email) => {
    try {
      const userDocRef = doc(db, 'users', email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch({ type: 'SET_WISHLIST', payload: userData.wishlist || [] });
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  const addToWishlist = async (item) => {
    if (!user) return;

    try {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: item });

      const userDocRef = doc(db, 'users', user.email);
      const userDoc = await getDoc(userDocRef);
      let currentWishlist = userDoc.exists() ? userDoc.data().wishlist || [] : [];

      currentWishlist.push(item);

      await setDoc(userDocRef, { wishlist: currentWishlist }, { merge: true });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (itemToRemove) => {
    if (!user) return;

    try {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: itemToRemove });

      const userDocRef = doc(db, 'users', user.email);
      const userDoc = await getDoc(userDocRef);
      let currentWishlist = userDoc.exists() ? userDoc.data().wishlist || [] : [];

      currentWishlist = currentWishlist.filter(item => item.id !== itemToRemove.id);

      await setDoc(userDocRef, { wishlist: currentWishlist }, { merge: true });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  return (
    <WishlistContext.Provider value={{ state, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
