import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchCounts = async () => {

    try {

      const token = localStorage.getItem("token");

      if (!token) {
        setCartCount(0);
        setWishlistCount(0);
        return;
      }

      const cartRes = await api.get("/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const validCart = cartRes.data.filter((item) => item.product);
setCartCount(validCart.length);

      const wishRes = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const validWishlist = wishRes.data.filter((item) => item.product);
      setWishlistCount(validWishlist.length);

    } catch (error) {

      console.log(error);

      setCartCount(0);
      setWishlistCount(0);

    }

  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartCount,
        wishlistCount,
        fetchCounts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);