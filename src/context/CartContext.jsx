import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'shopzone-cart-state';

function loadInitialState() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return { cartItems: [], isAuthenticated: false };
    return JSON.parse(stored);
  } catch (error) {
    console.warn('Failed to parse saved cart state', error);
    return { cartItems: [], isAuthenticated: false };
  }
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => loadInitialState().cartItems || []);
  const [isAuthenticated, setIsAuthenticated] = useState(() => loadInitialState().isAuthenticated || false);

  useEffect(() => {
    const payload = { cartItems, isAuthenticated };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [cartItems, isAuthenticated]);

  const addToCart = (product) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((current) => current.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCartItems([]);

  const loginAsGuest = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    isAuthenticated,
    loginAsGuest,
    logout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
