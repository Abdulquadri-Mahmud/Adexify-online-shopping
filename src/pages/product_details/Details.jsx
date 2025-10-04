import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { createContext, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaShieldAlt, FaStar } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePolicy } from "react-icons/md";
import { PiGreaterThan } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import Footer from "../../components/footer/Footer";
import Adverts from "../../components/Adverts/Adverts";
import { motion } from "framer-motion";
import { setWishlistCount } from "../../store/cart/wishlishActions";
import { useCart } from "../../Context_APIs/CartCountContext";
import { getCartToken } from "../../store/cart/utils/cartToken";
import { FaNairaSign } from "react-icons/fa6";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ProductViews from "../../components/ProductViews/ProductViews";
import AddToCartButton from "../../hooks/AddToCartButton";
import AddToWishlistButton from "../../hooks/AddToWishlistButton";

const MotionButton = motion.create(Button);
export const quantityContext = createContext();

export default function Details({ productViews }) {
  const { proId } = useParams();

  // size modal (Chakra)
  const { isOpen, onOpen, onClose } = useDisclosure();

  // lightbox modal state (separate)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  const { updateCart } = useCart();
  const toast = useToast();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [product, setProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loadingProductId, setLoadingProductId] = useState(null);
  const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);

  const displayImage = useRef(null);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://adexify-api.vercel.app/api/products/single-products/${proId}`
        );
        const data = await res.json();
        setProduct(data || null);
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProduct();
  }, [proId]);

  // Build gallery images dynamically
  useEffect(() => {
    if (!product) return;
    const imgs = Array.isArray(product.image) ? [...product.image] : [];
    setImages(imgs);
    setActiveIndex(0);

    // Set main display image
    setTimeout(() => {
      if (displayImage.current && imgs[0]) displayImage.current.src = imgs[0];
    }, 0);
  }, [product]);

  // Update main display image when activeIndex changes
  useEffect(() => {
    if (displayImage.current && images[activeIndex]) {
      displayImage.current.src = images[activeIndex];
    }
  }, [activeIndex, images]);

  // Lightbox keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKey = (e) => {
      if (e.key === "ArrowRight") setActiveIndex((i) => (i + 1) % images.length);
      else if (e.key === "ArrowLeft") setActiveIndex((i) => (i - 1 + images.length) % images.length);
      else if (e.key === "Escape") setIsLightboxOpen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen, images.length]);
  
  // Gallery helpers
  const prevImage = () =>
    setActiveIndex((i) => (i - 1 + images.length) % images.length);
  const nextImage = () => setActiveIndex((i) => (i + 1) % images.length);
  const openLightboxAt = (index) => {
    setActiveIndex(index);
    openLightbox();
  };

  // Guard render
  // if (!product) return <Text p={6}>Loading product...</Text>;

  return (
    <Box>
      <Header />

      <Box pt={2} className="bg-zinc-200 md:mb-0 ">
        <Box className="mb-2">
          <Box maxW={{ "2xl": "80%", xl: "95%", lg: "100%", base: "97%" }} mt={2} mx={"auto"} bg={"white"} py={4} px={6} rounded={"md"}>
            <div className="flex gap-1 items-center">
              <Link to={"/"} className="text-[13px] text-gray-500">
                Home
              </Link>
              <PiGreaterThan className="text-[13px] text-gray-500 pt-1" />
              <Link
                to={`/category?category=${product?.category}`}
                className="text-[13px] text-gray-500"
              >
                {product?.category}
              </Link>
            </div>
          </Box>
        </Box>

        {/* Main content */}
        <Box maxW={{ "2xl": "80%", xl: "100%", lg: "100%", base: "97%" }} mx={"auto"} className="md:p-4 p-">
          <Flex gap={2} flexWrap="wrap" className="w-full" direction={{ base: "column", md: "row" }}>
              {/* Gallery column */}
              <Box flex={{ base: "1", md: "0 0 30%" }} bg="white" p={4} rounded="md" minW={{ base: "100%", md: "280px" }} maxW={{ md: "350px" }}>
                {/* Main large preview */}
                {images.length > 0 && (
                  <Zoom>
                    <motion.img
                      ref={displayImage}
                      src={images[activeIndex]}
                      alt={product?.name}
                      className="w-full h-auto object-cover rounded-md cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
                      onClick={() => openLightboxAt(activeIndex)}
                    />
                  </Zoom>
                )}

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto scrollbar-hide">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-[64px] h-[64px] rounded overflow-hidden border-2 transition-transform transform hover:scale-105 focus:outline-none ${
                          activeIndex === idx
                            ? "border-white ring-2 ring-pink-500"
                            : "border-gray-200"
                        }`}
                      >
                        <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </Box>

              {/* Details column */}
              <Box flex={{ base: "1", md: "0 0 45%" }} bg="white" p={4} rounded="md" minW={{ base: "100%", md: "400px" }}>
                <Heading fontSize="2xl" fontWeight={500}>
                  {product?.name}
                </Heading>

                <Text mt={4} mb={3} color="gray.500">
                  Product Code: <span className="text-black font-medium">{product?.trackingId}</span>
                </Text>
                <Text mt={2} mb={3} color="gray.500">
                  Category: <span className="text-black font-medium">{product?.category}</span>
                </Text>

                <Box>
                  {product?.stock > 0 ? (
                    <Badge bg="pink.200" fontWeight={500} px={2} py={1} rounded="sm">
                      In Stock
                    </Badge>
                  ) : (
                    <Badge colorScheme="red" px={2} py={1} rounded="md">
                      Out of Stock
                    </Badge>
                  )}
                </Box>

                <Flex align="center" mt={2} gap={2}>
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} as={FaStar} color="yellow.400" />
                  ))}
                  <Text fontSize="sm">20,000 Reviews</Text>
                </Flex>

                <Flex alignItems="center" justifyContent="space-between" mt={4} gap={3} width="250px" p={2} bg="gray.100" rounded="md">
                  <Heading fontSize="2xl" display="flex" alignItems="center">
                    <FaNairaSign /> {product?.price?.toLocaleString()}
                  </Heading>
                  {product?.oldprice && (
                    <Text display="flex" alignItems="center" textDecor="line-through" color="gray.500">
                      <FaNairaSign /> {product?.oldprice?.toLocaleString()}
                    </Text>
                  )}
                </Flex>

                {product?.oldprice && (
                  <Text mt={4} display="flex" alignItems="center" gap={1} color="gray.500">
                    You save <FaNairaSign />{" "}
                    <Text as="span" fontWeight="medium" color="green.600">
                      {(product.oldprice - product.price).toLocaleString()}
                    </Text>
                  </Text>
                )}

                <AddToCartButton product={product}/>
                <AddToWishlistButton product={product} />
              </Box>

              {/* Right column (info) */}
              <Box flex={{ base: "1", md: "0 0 25%" }} bg="white" rounded="md" minW={{ base: "100%", md: "300px" }} maxW={{ md: "350px" }}>
                {/* Delivery Section */}
                <div className="py-2 border-b-[1px] border-b-gray-300 p-3">
                  <Text className="text-[16px] font-medium">Delivery & Return</Text>
                </div>

                <div className="py-3 flex gap-2 justify-start p-3">
                  <TbTruckDelivery className="text-pink-600 text-xl" />
                  <div>
                    <Text className="text-[15px] font-medium">Delivery</Text>
                    <p>Estimated delivery time 1-9 business days</p>
                    <p className="text-[13px] pb-3">Express Delivery Available</p>
                    <p className="text-[13px] pb-3">
                      <span className="font-medium">For Same-Day-Delivery:</span> Place order before 11AM
                    </p>
                    <p className="text-[13px] pb-3">
                      <span className="font-medium">Next-Day-Delivery:</span> Orders after 11AM → next day
                    </p>
                    <p className="text-[13px] pb-3">
                      <span className="font-medium">Note:</span> Availability may vary by location
                    </p>
                  </div>
                </div>

                {/* Return Policy */}
                <div className="text-[13px] py-3 flex gap-2 justify-start p-3">
                  <MdOutlinePolicy className="text-pink-600 text-xl" />
                  <div>
                    <p className="text-[15px] pb-3">Return Policy</p>
                    <p className="text-[13px] pb-3 font-medium">Guaranteed 7-Day Return Policy</p>
                    <p className="text-[13px] pb-3">
                      For details about return options, visit{" "}
                      <Link to="/" className="text-pink-600">
                        ADEXIFY Return Policy
                      </Link>
                    </p>
                  </div>
                </div>

                {/* Warranty */}
                <div className="py-3 flex gap-2 justify-start p-3 text-[13px]">
                  <FaShieldAlt className="text-pink-600 text-xl" />
                  <div>
                    <p className="text-[16px] pb-3">Warranty</p>
                    <p>Warranty info unavailable for this item.</p>
                  </div>
                </div>
              </Box>
            </Flex>
        </Box>

        {/* Product description */}
        <Box py={4} px={2}>
          <Box maxW={{ "2xl": "80%", xl: "100%", lg: "100%", base: "100%" }} mx={"auto"} bg={"white"} py={4} px={3} rounded={"md"} className="">
            <Box className="mb-2">
              <h2 className="font-medium text-xl">Description:</h2>
            </Box>
            <p className="pb-2 text-sm" dangerouslySetInnerHTML={{ __html: product?.description ? product.description.replace(/\n/g, "<br />") : "" }}></p>
          </Box>
        </Box>
      </Box>

      {/* Lightbox Modal (Chakra) */}
      <Modal isOpen={isLightboxOpen} onClose={closeLightbox} size="6xl" isCentered>
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none" maxW={{md:"90%", base: '100%'}}>
          <ModalBody className="p-0">
            <div className="relative bg-black rounded-md overflow-hidden">
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute right-3 top-3 z-30 bg-black/60 p-2 rounded-full hover:bg-black/80"
                aria-label="Close"
              >
                <X color="white" size={20} />
              </button>

              {/* Prev button */}
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 p-3 rounded-full hover:bg-black/60"
                aria-label="Previous"
              >
                <ChevronLeft color="white" size={28} />
              </button>

              {/* Next button */}
              <button
                onClick={nextImage}
                className="absolute right-16 top-1/2 transform -translate-y-1/2 z-30 bg-black/40 p-3 rounded-full hover:bg-black/60"
                aria-label="Next"
              >
                <ChevronRight color="white" size={28} />
              </button>

              {/* Active image */}
              <div className="flex items-center justify-center w-full" style={{ minHeight: 420 }}>
                <img src={images[activeIndex]} alt={`lightbox-${activeIndex}`} className="max-h-[70vh] object-contain" />
              </div>

              {/* Thumbnail strip */}
              <div className="bg-black/60 py-3 px-4 overflow-x-auto whitespace-nowrap flex gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex-none w-20 h-20 rounded-md overflow-hidden border-2 ${activeIndex === idx ? "border-white" : "border-transparent"} transition-transform transform hover:scale-105`}
                  >
                    <img src={img} alt={`mini-${idx}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Size & Quantity Modal (existing) */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx={3}>
          <ModalHeader>Select Size & Quantity</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text isTruncated mb={4}>{product?.name}</Text>
            <Flex bg={'pink.50'} alignItems="center" justifyContent={"space-between"} mt={4} gap={3} width={"100%"} p={2} rounded={"md"}>
              <Heading fontSize="md" fontWeight={500} display="flex" alignItems="center">
                <FaNairaSign /> {product?.price?.toLocaleString()}
              </Heading>
              {product?.oldprice && (
                <Text fontSize="md" display={"flex"} alignItems={"center"} textDecor="line-through" color="gray.500">
                  <FaNairaSign /> {product?.oldprice?.toLocaleString()}
                </Text>
              )}
            </Flex>

            <Box my={4}>
                {product?.stock > 0 ? (
                  <Badge bg="pink.500" color={'white'} fontWeight={500} px={2} py={1} rounded="sm">
                    In Stock
                  </Badge>
                ) : (
                  <Badge colorScheme="red" px={2} py={1} rounded="md">
                    Out of Stock
                  </Badge>
                )}
              </Box>

            {selectedProduct?.size?.length > 0 && (
              <Select
                placeholder="Select size"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {selectedProduct.size.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Select>
            )}
            <NumberInput mt={4} min={1} value={quantity} onChange={(val) => setQuantity(Number(val))}>
              <NumberInputField />
            </NumberInput>

            {product?.oldprice && (
              <Text mt={4} display="flex" alignItems="center" gap={1} color="gray.500">
                You save <FaNairaSign />{" "}
                <Text as="span" fontWeight="medium" color="green.600">
                  {(product.oldprice - product.price).toLocaleString()}
                </Text>
              </Text>
            )}
            <Flex justifyContent={'space-between'} fontSize={'sm'} rounded={'md'} px={3} mt={4} bg={'pink.50'} alignItems={'center'}>
              <Text mt={4} mb={3} color={"gray.700"}>
                Product Code: <span className="text-pink-600 font-medium">{product?.trackingId}</span>
              </Text>
              <Text mt={2} mb={3} color={"gray.700"}>
                Category: <span className="text-pink-600 font-medium">{product?.category}</span>
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="pink"
              onClick={() => {
                handleCart(selectedProduct, selectedSize, quantity);
                onClose();
              }}
            >
              Add to Cart
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {product && <ProductViews productId={product._id} />}

      <Adverts />
      <Footer />
    </Box>
  );
}
