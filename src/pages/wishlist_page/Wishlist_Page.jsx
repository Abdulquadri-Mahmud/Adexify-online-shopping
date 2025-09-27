import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaNairaSign } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";
import { MdDelete } from "react-icons/md";
import { removeFromWishlist } from "../../store/cart/wishlistSlice";

// Lazy load image
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function Wishlist_Page() {
  const { currentUser } = useSelector((state) => state.user);
  const guestWishlist = useSelector((state) => state.guestWishlist); // <-- guest wishlist state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const [wishlistItems, setWishlistItems] = useState([]); // unified state
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  // Fetch wishlist from backend if logged in
  const fetchWishlist = async () => {
    if (!currentUser?._id) return;
    setLoading(true);
    try {
      const res = await fetch(
        "https://adexify-api.vercel.app/api/wishlist/get-wishlist",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser._id }),
        }
      );

      const data = await res.json();
      if (res.ok && data.success) {
        setWishlistItems(data.wishlist.products || []);
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

  // Load wishlist depending on user status
  useEffect(() => {
    if (currentUser?._id) {
      fetchWishlist();
    } else {
      setWishlistItems(guestWishlist.items || []); // <-- local storage items
    }
  }, [currentUser, guestWishlist]);

  // Delete wishlist item
  const handleRemoveItem = async (productId) => {
    if (!currentUser?._id) {
      // Guest wishlist
      dispatch(removeFromWishlist(productId)); // your redux reducer for guest wishlist
      return;
    }

    // Logged-in user
    setDeleteLoading(productId);
    try {
      const res = await fetch(
        "https://adexify-api.vercel.app/api/wishlist/delete-wishlist",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: currentUser._id, productId }),
        }
      );
      const data = await res.json();
      if (res.ok && data.success) {
        fetchWishlist(); // refresh backend wishlist
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

      <Box pb={10} pt={7} px={2} bg="gray.100">
        <Box  maxW={{ md: "80%", base: "100%" }}  mx="auto"  py={2}  bg="white"  px={6}  rounded="md">
          <Heading fontSize={24} fontWeight={500}>
            My Wishlist
          </Heading>
          <Text fontSize={13} color="gray.500" mt={2}>
            You have ({wishlistItems.length}) items in your wishlist
          </Text>
        </Box>

        <Box maxW={{ md: "80%", base: "100%" }} mx="auto" mt={6}>
          <Box bg="white" p={4} rounded="md">
            {wishlistItems.length === 0 ? (
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
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={3}
              >
                {wishlistItems.map((item, index) => (
                  <Box
                    key={index}
                    borderWidth="1px"
                    rounded="md"
                    overflow="hidden"
                  >
                    <Link to={`/product-details/${item.productId}`}>
                      <LazyLoadImage
                        src={
                          Array.isArray(item.image) ? item.image[0] : item.image
                        }
                        alt={item.name}
                        height="180px"
                        width="100%"
                        effect="blur" // 👈 blur effect on load
                        style={{ objectFit: "cover" }}
                      />
                    </Link>
                    <Box p={4}>
                      <Text fontWeight={500} mb={2} isTruncated>
                        {item.name}
                      </Text>
                      <Flex align="center" mb={3}>
                        <FaNairaSign />
                        <Text ml={1} fontWeight="semibold">
                          {item.price?.toLocaleString()}.00
                        </Text>
                      </Flex>
                      <Flex direction="column" gap={2}>
                        <Button
                          size="sm"
                          colorScheme="red"
                          leftIcon={<MdDelete />}
                          onClick={() => handleRemoveItem(item.productId)}
                          width="full"
                        >
                          {deleteLoading === item.productId ? (
                            <Spinner size="sm" />
                          ) : (
                            "Delete"
                          )}
                        </Button>
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