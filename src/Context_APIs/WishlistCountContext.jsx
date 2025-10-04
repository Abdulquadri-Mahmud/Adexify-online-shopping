import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  // Update wishlist items and count
  const updateWishlist = (wishlist) => {
    setWishlistItems(wishlist.products || []);
    setWishlistCount(wishlist.products?.length || 0);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, wishlistCount, updateWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook for easier consumption
export const useWishlist = () => useContext(WishlistContext);
