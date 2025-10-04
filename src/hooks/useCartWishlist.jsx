// hooks/useCartWishlist.js
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { getCartToken } from "../utils/cartToken"; // your utility
import { updateCart } from "../store/cartUtils";   // your global updater

export const useCartWishlist = () => {
  const { currentUser } = useSelector((state) => state.user);
  const toast = useToast();

  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);

  // 🔹 Add to Cart
  const addToCart = async (product, size, qty, onClose) => {
    setLoadingProductId(product._id);

    const cartItem = {
      productId: product._id,
      name: product.name,
      stock: product.stock || 0,
      price: product.price,
      discount: product.discount || 0,
      oldprice: product.oldprice || 0,
      deal: product.deal || "",
      category: product.category || "",
      image: product.image || [],
      description: product.description || "",
      discountType: product.discountType || "",
      trackingId: product.trackingId || "",
      size: product.size || [],
      selectedSize: size || product.size?.[0] || "",
      quantity: qty || 1,
      gender: product.gender || "unisex",
    };

    try {
      const payload = {
        userId: currentUser?._id || null,
        cartToken: currentUser?._id ? null : getCartToken(),
        product: cartItem,
      };

      const res = await fetch("https://adexify-api.vercel.app/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        updateCart(data.cart);
        toast({
          title: "Success",
          description: "Item added to cart.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        if (onClose) onClose();
      } else {
        if (data.message?.includes("already")) {
          toast({
            title: "Notice",
            description: "Item already in cart.",
            status: "info",
            duration: 2000,
            isClosable: true,
          });
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadingProductId(null);
    }
  };

  // 🔹 Add to Wishlist
  const addToWishlist = async (product) => {
    if (!product) return;
    setLoadingWishlistProductId(product._id);

    const wishlistItem = {
      productId: product._id,
      name: product.name,
      stock: product.stock || 0,
      price: product.price,
      discount: product.discount || 0,
      oldprice: product.oldprice || 0,
      deal: product.deal || "",
      category: product.category || "",
      image: product.image || [],
      description: product.description || "",
      discountType: product.discountType || "",
      trackingId: product.trackingId || "",
      size: product.size || [],
      selectedSize: product.size?.[0] || "",
      quantity: product?.quantity || 1,
      gender: product.gender || "unisex",
    };

    try {
      const payload = {
        userId: currentUser?._id || null,
        cartToken: currentUser?._id ? null : getCartToken(),
        product: wishlistItem,
      };

      const res = await fetch("https://adexify-api.vercel.app/api/wishlist/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast({
          title: "Added to Wishlist",
          description: "Item successfully added to wishlist.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        if (data.message?.includes("already")) {
          toast({
            title: "Notice",
            description: "Item already in wishlist.",
            status: "info",
            duration: 2000,
            isClosable: true,
          });
        } else {
          throw new Error(data.message);
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadingWishlistProductId(null);
    }
  };

  return {
    addToCart,
    addToWishlist,
    loadingProductId,
    loadingWishlistProductId,
  };
};
