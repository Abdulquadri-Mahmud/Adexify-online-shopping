import { Spinner, Flex, useToast } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getCartToken } from "../store/cart/utils/cartToken";
import MotionHeart from "../components/motion_heart/MotionHeart";

const AddToWishlistButton = ({ product }) => {
  const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);
  const [likedItems, setLikedItems] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const toast = useToast();

  const handleWishlistItem = async () => {
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
          description: "Item successfully added.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        setLikedItems((prev) => ({ ...prev, [product._id]: true }));
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

  return (
    <AnimatePresence>
      {loadingWishlistProductId === product?._id ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          bg="pink.600"
          rounded="full"
          className="absolute top-2 right-2 w-[26px] h-[26px]"
        >
          <Spinner color="gray.50" size="sm" />
        </Flex>
      ) : (
        <MotionHeart
          isLiked={likedItems[product?._id] || false}
          onClick={handleWishlistItem}
        />
      )}
    </AnimatePresence>
  );
};

export default AddToWishlistButton;
