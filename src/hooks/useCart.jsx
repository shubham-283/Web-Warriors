// src/hooks/useCart.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAuth0 } from '@auth0/auth0-react';

const CartContext = createContext();

const initialState = {
  items: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload };
    case 'ADD_TO_CART':
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.name === action.payload.name &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (existingItemIndex > -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return { ...state, items: updatedItems };
      }
      return { ...state, items: [...state.items, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.name === action.payload.name &&
              item.size === action.payload.size &&
              item.color === action.payload.color
            )
        ),
      };
    case 'UPDATE_QUANTITY':
      const updatedCart = state.items.map((item) =>
        item.name === action.payload.name &&
        item.size === action.payload.size &&
        item.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, items: updatedCart };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      loadCart(user.email);
    }
  }, [user]);

  const loadCart = async (email) => {
    try {
      const userDocRef = doc(db, 'users', email);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        dispatch({ type: 'SET_CART', payload: userData.cart || [] });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const addToCart = async (item) => {
    if (!user) return;

    try {
      dispatch({ type: 'ADD_TO_CART', payload: item });

      const userDocRef = doc(db, 'users', user.email);
      const userDoc = await getDoc(userDocRef);
      let currentCart = userDoc.exists() ? userDoc.data().cart || [] : [];

      const existingIndex = currentCart.findIndex(
        (cartItem) =>
          cartItem.name === item.name &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );

      if (existingIndex > -1) {
        currentCart[existingIndex].quantity += item.quantity;
      } else {
        currentCart.push(item);
      }

      await setDoc(userDocRef, { cart: currentCart }, { merge: true });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (itemToRemove) => {
    if (!user) return;

    try {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemToRemove });

      const userDocRef = doc(db, 'users', user.email);
      const userDoc = await getDoc(userDocRef);
      let currentCart = userDoc.exists() ? userDoc.data().cart || [] : [];

      currentCart = currentCart.filter(
        (item) =>
          !(
            item.name === itemToRemove.name &&
            item.size === itemToRemove.size &&
            item.color === itemToRemove.color
          )
      );

      await setDoc(userDocRef, { cart: currentCart }, { merge: true });
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateQuantity = async (itemToUpdate, newQuantity) => {
    if (!user || newQuantity < 1) return;

    try {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { ...itemToUpdate, quantity: newQuantity },
      });

      const userDocRef = doc(db, 'users', user.email);
      const userDoc = await getDoc(userDocRef);
      let currentCart = userDoc.exists() ? userDoc.data().cart || [] : [];

      currentCart = currentCart.map((item) =>
        item.name === itemToUpdate.name &&
        item.size === itemToUpdate.size &&
        item.color === itemToUpdate.color
          ? { ...item, quantity: newQuantity }
          : item
      );

      await setDoc(userDocRef, { cart: currentCart }, { merge: true });
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  return (
    <CartContext.Provider
      value={{ state, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
