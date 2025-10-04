import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const updateCart = (cart) => {
    setCartItems(cart.products || []);
    setCartCount(cart.products?.length || 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, updateCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
