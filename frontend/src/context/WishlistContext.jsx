import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  // ✅ LOAD FROM localStorage SAFELY (NO useEffect)
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlist")) || [];
    } catch {
      return [];
    }
  });

  // ✅ SAVE every time wishlist changes
  const saveWishlist = (data) => {
    setWishlist(data);
    localStorage.setItem("wishlist", JSON.stringify(data));
  };

  const addToWishlist = (place) => {
    if (!wishlist.some(item => item.id === place.id)) {
      saveWishlist([...wishlist, place]);
    }
  };

  const removeFromWishlist = (id) => {
    saveWishlist(wishlist.filter(item => item.id !== id));
  };

  const isWishlisted = (id) => {
    return wishlist.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
