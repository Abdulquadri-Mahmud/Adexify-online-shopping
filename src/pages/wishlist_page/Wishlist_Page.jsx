import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";
import { MdDelete, MdShoppingCart } from "react-icons/md";

// Lazy load image
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getCartToken } from "../../store/cart/utils/cartToken";
import { useSelector } from "react-redux";
import { useCart } from "../../Context_APIs/CartCountContext";
import { LucideTrash2 } from "lucide-react";

export default function Wishlist_Page({ guestToken }) {
  const navigate = useNavigate();
  const toast = useToast();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [loadingProductId, setLoadingProductId] = useState(null);
  // const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const { updateCart } = useCart();
  // Fetch wishlist from backend
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const payload = currentUser?._id
        ? { userId: currentUser._id }
        : { cartToken: getCartToken() };
        
        const query = new URLSearchParams(payload).toString();
            
        const res = await fetch(
          `https://adexify-api.vercel.app/api/wishlist/get?${query}`);

        const data = await res.json();

        if (res.ok && data.success) {
          setWishlistItems(data.cart.products || []);
        } else {
          setWishlistItems([]);
        }
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
        setWishlistItems([]);
      } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [currentUser, guestToken]);

// ✅ Add to Cart
  const handleCart = async (product, size, qty) => {
    setLoadingProductId(product.productId || product._id);

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
        onClose?.();
      } else {
        throw new Error(data.message);
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
  const handleRemoveItem = async (productId, selectedSize) => {
    setDeleteLoading(productId);
    try {
      const payload = currentUser?._id
        ? { userId: currentUser._id, productId, selectedSize }
        : { cartToken: guestToken, productId, selectedSize };

      const res = await fetch("https://adexify-api.vercel.app/api/wishlist/remove", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("delete data:", data);

      if (res.ok && data.success) {
        fetchWishlist();
        toast({
          title: "Deleted",
          description: "Item removed from wishlist.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to delete item.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <Box>
      <Header />

      <Box pb={10} pt={3} px={2} bg="gray.100">
        <Box  maxW={{ md: "80%", base: "100%" }}  mx="auto"  py={4}  bg="white"  px={6}  rounded="md" boxShadow="sm">
          <Heading fontSize={24} fontWeight={600} color="pink.600">
            {currentUser ? `Hi, ${currentUser.firstname} 👋` : "Hi User 👋"}
          </Heading>

          <Text fontSize={14} color="gray.600" mt={1}>
            {currentUser 
              ? `Welcome back! You have (${wishlistItems.length}) item${wishlistItems.length !== 1 ? "s" : ""} saved in your wishlist. ✨`
              : `You have (${wishlistItems.length}) item${wishlistItems.length !== 1 ? "s" : ""} in your wishlist. Sign in to save them permanently!`}
          </Text>

          <Text fontSize={12} color="gray.400" mt={2} fontStyle="italic">
            {wishlistItems.length > 0 
              ? "Keep exploring, your dream products are just a click away 💖" 
              : "Your wishlist is empty. Start adding your favorite items today! 🛍️"}
          </Text>
        </Box>

        <Box maxW={{ md: "80%", base: "100%" }} mx="auto" mt={6}>
          <Box bg={'white'} spacing={1}p={2} rounded="md">
            {loading ? (
              loading && [...Array(8)].map((_, index) => (
                <SimpleGrid rounded={'xl'} gap={2} columns={{ base: 2, md: 3, lg: 4, xl: 5 }} spacing={1} key={index} bg="white" p={2} borderRadius="lg" border={'1px solid'} borderColor={'gray.200'} opacity={0.6}>
                  <Box h="150px" bg="gray.300" mb={4} />
                  <Box h="2" bg="gray.300" w="3/4" mb={2} />
                  <Box h="2" bg="gray.300" w="1/2" mb={2}/>
                  <Box h="2" bg="gray.300" w="1/2" />
                  <Box h="10" bg="gray.300" w="full" mt={3} />
                </SimpleGrid>
              ))
            ) : wishlistItems.length === 0 ? (
              <Box textAlign="center" py={10}>
                <Text color="gray.500" fontSize="lg">
                  Your wishlist is empty.
                </Text>
                <Button
                  mt={4}
                  bg="pink.600"
                  color="white"
                  _hover={{ bg: "pink.800" }}
                  onClick={() => navigate("/fashion")}
                >
                  Go to Shop
                </Button>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 2, sm: 2, md: 3, lg: 4 }} spacing={3}>
                {wishlistItems.map((item, index) => (
                  <Box key={index} borderWidth="1px" rounded="md" overflow="hidden">
                    <Link to={`/product-details/${item.productId}`}>
                      <LazyLoadImage
                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                        alt={item.name}
                        effect="blur"
                        style={{ objectFit: "cover" }} className="h-[200px]"
                      />
                    </Link>
                    <Box p={1} mt={0}>
                      <Text fontWeight={500} fontSize={'sm'} py={1} color={'gray.700'} isTruncated>
                        {item?.name}
                      </Text>
                      <Flex align="center" mb={3}>
                        <FaNairaSign />
                        <Text ml={1} fontWeight="semibold">
                          {item.price?.toLocaleString()}.00
                        </Text>
                      </Flex>
                      <Flex justifyContent={'space-between'} alignItems={'center'} gap={2}>
                        <button className="bg-pink-600 text-white px-3 py-2 rounded flex items-center gap-1"
                          onClick={() => handleCart(item, item.selectedSize, 1)}
                        >
                          {
                            loadingProductId === (item.productId || item._id)
                              ? <Spinner size="sm" />
                              : item.stock < 1
                                ? "Out of Stock"
                                : <MdShoppingCart />
                          }

                        </button>
                        
                        <button className="bg-red-600 text-white px-3 py-2 rounded flex items-center gap-1"
                          onClick={() => handleRemoveItem(item.productId, item.selectedSize)} 
                        >
                          {deleteLoading === item.productId ? <Spinner /> : <MdDelete />}
                        </button>
                      </Flex>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            )}
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
