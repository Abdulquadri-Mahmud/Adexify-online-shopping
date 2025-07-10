import { Badge, Box, Button, Flex, Heading, Icon, Image, Spinner, Stack, Text, useDisclosure } from '@chakra-ui/react';
import React, { createContext, Fragment, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaSmileBeam } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { IoMdCall } from 'react-icons/io';
import { FcLike } from "react-icons/fc";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePolicy } from "react-icons/md";
import { PiGreaterThan } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
// import { addToCart } from '../../store/cart/cartsReucer';
import { CgMathMinus } from 'react-icons/cg';
import { RiAddFill } from 'react-icons/ri';
import { FaNairaSign } from 'react-icons/fa6';
import { addWishlist } from '../../store/wishlists/Wishlists';
import { useToast } from '@chakra-ui/react'
import { IoHeart } from 'react-icons/io5';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';
import Adverts from '../../components/Adverts/Adverts';
import {motion} from 'framer-motion';
import { setCartCount } from '../../store/cart/cartActions';
import { setWishlistCount } from '../../store/cart/wishlishActions';
const MotionButton = motion.create(Button);

export const quantityContext = createContext();

export default function Details() {
    const { proId } = useParams();
    let [isOpen, setIsOpen] = useState(false);
    let [message, setMessage] = useState(null);
    const [getCarts, setGetCarts] = useState({
      productID: '',
      productName: '',
      productImage: '',
      productPrice: '',
      items: {}, // e.g. { "S": 2, "M": 1 }
    });
    const [loadingProductId, setLoadingProductId] = useState(null);
    const [loadingWishlistProductId, setLoadingWishlistProductId] = useState(null);
    const { currentUser } = useSelector((state) => state.user);

    const { currentAdmin } = useSelector((state) => state.admin);
    const { items } = useSelector((state) => state.cart);

    const toast = useToast({
      position: 'top',
      bg: 'green.600',
    });
    
    const [product, setProduct] = useState([]);

    let displayImage = useRef(null);

    const dispatch = useDispatch();

    useEffect(() => {
      const fetchData = async () => {
        const res =  await fetch(`https://adexify-api.vercel.app/api/products/single-products/${proId}`);

        const data = await res.json();

        setProduct(data);
      };

      fetchData();
    }, []);

    const {_id, name, category, image, price, trackingId, stock, description, oldprice, size, gender} = product;
    // Update state when `product` changes
    useEffect(() => {
      if (product) {
        setGetCarts({
          productID: product._id || '',
          productName: product.name || '',
          productImage: product.image?.length > 0 ? product.image[0] : product.image || [],
          productPrice: product.price || '',
          items: {}, // ✅ Preserve this key
        });
      }
    }, [product]); // Runs whenever `product` updates

    const handleSizeChange = (e) => {
      const { value, checked } = e.target;
      setGetCarts((prev) => {
        const updatedItems = { ...prev.items };
        if (checked) {
          updatedItems[value] = 1; // Default quantity
        } else {
          delete updatedItems[value];
        }
        return { ...prev, items: updatedItems };
      });
    };

    const updateQuantity = (size, change) => {
      setGetCarts((prev) => {
        const currentQty = prev.items[size] || 1;
        const newQty = currentQty + change;
        const updatedItems = { ...prev.items };

        if (newQty < 1) {
          delete updatedItems[size];
        } else {
          updatedItems[size] = newQty;
        }

        return { ...prev, items: updatedItems };
      });
    };

    // Handle Add to Cart
    const handleCart = async () => {
      // Case: Product has sizes
      if (Array.isArray(size) && size.length > 0) {
        if (!getCarts.items || Object.keys(getCarts.items).length === 0) {
          setMessage('Please select a cloth size!');
          setIsOpen(true);
          return;
        }

        // Loop over selected sizes
        for (const selectedSize in getCarts.items) {
          const quantity = getCarts.items[selectedSize];

          const payload = {
            userId: currentUser._id || '',
            product: {
              productId: _id,
              name,
              stock: stock || 0,
              price,
              discount: product.discount || 0,
              oldprice: oldprice || 0,
              deal: product.deal || '',
              category: category || '',
              image: image || [],
              description: description || '',
              discountType: product.discountType || '',
              trackingId: trackingId || '',
              size: size || [],
              selectedSize,
              quantity,
              gender: gender || 'unisex',
              brand: product.brand || '',
            },
          };

          try {
            const res = await fetch('https://adexify-api.vercel.app/api/cart/add', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok || data.success !== true) {
              throw new Error(data.message || 'Failed to add to cart');
            }
          } catch (error) {
            toast({
              title: 'Error',
              description: error.message,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            return;
          }
        }
      } else {
        // Case: Product has no sizes
        const payload = {
          userId: currentUser._id || '',
          product: {
            productId: _id,
            name,
            stock: stock || 0,
            price,
            discount: product.discount || 0,
            oldprice: oldprice || 0,
            deal: product.deal || '',
            category: category || '',
            image: image || [],
            description: description || '',
            discountType: product.discountType || '',
            trackingId: trackingId || '',
            size: [],
            selectedSize: '',
            quantity: 1,
            gender: gender || 'unisex',
            brand: product.brand || '',
          },
        };

        try {
          const res = await fetch('https://adexify-api.vercel.app/api/cart/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });

          const data = await res.json();

          if (!res.ok || data.success !== true) {
            throw new Error(data.message || 'Failed to add to cart');
          }
        } catch (error) {
          toast({
            title: 'Error',
            description: error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
          return;
        }
      }

      // Show success toast
      toast({
        title: 'Added to cart!',
        description: 'Item added successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Fetch updated cart count
      try {
        const cartRes = await fetch('https://adexify-api.vercel.app/api/cart/get-user-cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: currentUser._id }),
        });

        const cartData = await cartRes.json();

        if (cartRes.ok && cartData.success === true) {
          const count = cartData.cart?.products?.length || 0;
          dispatch(setCartCount(count));
        }
      } catch (error) {
        console.error('Cart count fetch failed:', error);
      }

      setIsOpen(false);
    };

    const handleWishlistItem = async () => {
      setLoadingWishlistProductId(_id); // Show loading for this product

      const payload = {
        userId: currentUser._id || '',
        product: {
          productId: _id,
          name,
          price,
          image: image || [],
          category: category || '',
          brand: product.brand || '',
          gender: gender || '',
          description: description || '',
        },
      };

      try {
        const res = await fetch('https://adexify-api.vercel.app/api/wishlist/add-to-wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (res.ok && data.success === true) {
          toast({
            title: 'Added to wishlist!',
            description: 'Item saved to your wishlist.',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          // Fetch updated wishlist count
          const wishlistRes = await fetch('https://adexify-api.vercel.app/api/wishlist/get-wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: currentUser._id }),
          });

          const wishlistData = await wishlistRes.json();

          if (wishlistRes.ok && wishlistData.success === true) {
            const count = wishlistData.wishlist?.products?.length || 0;
            dispatch(setWishlistCount(count));
          }
        } else {
          throw new Error(data.message || 'Failed to add to wishlist');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoadingWishlistProductId(null);
      }
    };


    const handleClick = (img) => {
      displayImage.current.src = img;
    }

  return (
    <Box>
      <Header/>

      <div className='bg-zinc-200 md:mb-0 mb-16'>
        <Box className=" p-2" mt={7}>
          <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mt={2} mx={'auto'} bg={'white'} py={4} px={6} rounded={'md'}>
            <div className="flex gap-1 items-center">
              <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
              <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
              <Link to={'/'} className='text-[13px] text-gray-500'>{gender} fashion</Link>
              <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
              <Link to={`/${category}`} className='text-[13px] text-gray-500'>{category}</Link>
            </div>
            {/* <div className="">
            </div> */}
            {/* <Heading fontSize={{md:30, base: 25}} fontWeight={500} color={'black'}>{category}</Heading> */}
          </Box>
        </Box>
        <Box maxW={{'2xl' : '80%', xl : '96%', lg : '100%', base: '97%'}} mx={'auto'} className="md:p-4 p-2 flex justify-center gap-2 flex-wrap">
          <div className="flex-1 relative bg-white md:p-4 p-2 rounded-md">
            <div className="flex gap-2 flex-wrap">
              <div className="2xl:w-[350px] w-[300px]">
                <div className="w-[300px] flex md:justify-start justify-center">
                  <img src={image ? image[0] : image} alt="" ref={displayImage} className='max-w-full h-[300px] object-fill rounded'/>
                </div>
                <div className="py-2">
                  {
                    image !== undefined ? (
                      <div className='flex items-center justify-center flex-wrap gap-2'>
                        {
                          image.length > 0 && image.map((img, index) => {
                            return (
                              <div key={index} className="cursor-pointer">
                                <img src={img} onMouseEnter={() => handleClick(img)} className='max-w-12 rounded' alt="" />
                              </div>
                            )
                          })
                        }
                      </div>
                    ) : ''
                  }
                </div>
              </div>
              <div className="flex-1 md:mt-0 mt-4 pl-3">
                <Link to={'/'} className='bg-white md:px-0 md:py-0 px-2 py-1 rounded-md flex items-center gap-2'>
                  <Image src='/Logo.png' alt='logo' w={{md:'100px', base:'100px'}}/>
                </Link>
                <div className=" mt-4 border-b-[1px] border-b-gray-300 pb-2">
                  <Heading fontSize={{md:23, base: 16}} fontWeight={500} color={'gray.800'}>{name}</Heading>
                  <div className="mt-3">
                    <p className='text-sm text-gray-500 my-1'>Product Code: <span className='text-gray-600 text-[13px]'>{trackingId}</span></p>
                    {/* Optional: Reviews Section */}
                    <Box display="flex" alignItems="center" gap={2}>
                      {[...Array(5)].map((_, i) => (
                          <Icon as={FaStar} key={i} color="yellow.400" />
                      ))}
                      <Text fontSize="sm" color="gray.500">20,00 Reviews</Text>
                    </Box>

                    <p className='text-sm text-gray-500 pt-2'>Brand: <span className='text-gray-600 text-[13px]'></span></p>
                  </div>
                  <Box className="py-3">
                    <Box display="flex" alignItems="center" gap={3}>
                      {price !== undefined && (
                        <>
                          <Heading as="h2" fontSize={{ base: "2xl", lg: "3xl" }} fontWeight="medium" display="flex" alignItems="center">
                            <FaNairaSign style={{ fontSize: '1.5rem' }} />
                            {price.toLocaleString()}
                          </Heading>

                          {oldprice && (
                              <Text fontSize="sm" color="gray.400" fontWeight="normal" pt={2} textDecoration="line-through" display="flex" alignItems="center">
                                  <FaNairaSign style={{ fontSize: '0.875rem' }} />
                                  {oldprice}
                              </Text>
                          )}

                          {oldprice && (
                              <Badge bg={'gray.50'} fontSize="sm" px={2} py={1} border="1px" borderColor="red.500" borderRadius="sm" color="pink.500" fontWeight="medium" display="flex" alignItems="center">
                                  {((oldprice - price) / oldprice * 100).toFixed(2)}% OFF
                              </Badge>
                          )}

                          {stock && (
                              <Text fontSize="sm" px={2} py={1} color="white" bgGradient="linear(to-r, pink.600, red.500)" borderRadius="sm" fontWeight="normal">
                              Only {stock} left
                              </Text>
                          )}
                        </>
                      )}
                    </Box>
                </Box>
                </div>
                <div className="border-b-[1px] border-b-gray-300">
                  <div className="bg-pink-200 px-2 py-2 rounded-md mt-3">
                    <p className='text-sm font-medium text-center'>Call us for Bulk Purchase</p>
                    <div className="flex justify-center items-center text-pink-600 font-medium">
                      <IoMdCall/>
                      <Link to={'tell:07047594667'} className='text-center'>07047594667</Link>
                    </div>
                  </div>

                  {/* Add to cart */}
                  <MotionButton
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: loadingProductId === _id ? 0.7 : 1 }}
                    transition={{ duration: 0.2 }}
                    disabled={loadingProductId === _id}
                    _hover={{ bg: 'pink.800' }}
                    onClick={() => handleCart(product)}
                    w="full"
                    mt={3}
                    bg="pink.500"
                    color="white">
                    {loadingProductId === product._id ? (
                        <>
                          <Spinner size="sm" mr={2} /> Adding...
                        </>
                    ) : (
                        'Add to Cart'
                    )}
                  </MotionButton>

                  {/* Add to wishlist */}
                  {loadingWishlistProductId === product._id ? (
                      <Flex justifyContent='center' alignItems='center' bg={'pink.600'} rounded={'full'} className="absolute top-2 right-2 w-[30px] h-[30px]">
                          <Spinner color="gray.50" size="sm" mr={2} />
                      </Flex>
                      ) : (
                          <button onClick={() => handleWishlistItem(product)} className="absolute top-2 right-2 w-[30px] h-[30px] bg-gray-200 flex justify-center items-center rounded-full">
                              <IoHeart className="text-xl text-white hover:text-gray-600" />
                          </button>
                      )
                  }
                  {
                    currentAdmin && (
                      <Box mt={4} className='text-pink-600 text-center'>
                        <Link to={`/admin/update-products/${_id}`}>Update Product</Link>
                      </Box>
                    )
                  }
                </div>
              </div>
            </div>
            
          </div>
          <div className="md:w-[350px] w-full bg-white rounded-md md:h-[]">
            <div className="py-2 border-b-[1px] border-b-gray-300 p-3">
              <Text className='text-[16px] font-medium'>Delivery & Retrurn</Text>
            </div>
            <div className="py-3 flex gap-2 justify-start p-3">
              <div className="">
                <TbTruckDelivery className='text-pink-600 text-xl'/>
              </div>
              <div className="">
                <Text className='text-[15] font-medium'>Delivery</Text>
                <p className=''>Estimated delivery time 1-9 business days</p>
                <p className="text-[13px] pb-3">Express Delivery Available</p>
                <p className="text-[13px] pb-3"><span className="font-medium">For Same-Day-Delivery:</span> Please place your order before 11AM</p>
                <p className="text-[13px] pb-3"><span className="font-medium">Next-Day-Delivery:</span> Orders placed after 11AM will be delievered the next day</p>
                <p className="text-[13px] pb-3"><span className="text-[13px] font-medium">Note: </span>Availability may vary by location</p>
              </div>
            </div>
            <div className="text-[13px] py-3 flex gap-2 justify-start p-3">
              <div className="">
                <MdOutlinePolicy className='text-pink-600 text-xl'/>
              </div>
              <div className="">
                <p className="text-[15px] pb-3">Return Policy</p>
                <p className="text-[13px] pb-3 font-medium">Guaranteed 7-Day Return Policy</p>
                <p className="text-[13px] pb-3">For details about return shipping options, please visit - <Link to={'/'} className='text-pink-600'>ADEXIFY Return Policy</Link></p>
              </div>
            </div>
            <div className="py-3 flex gap-2 justify-start p-3">
              <div className="text-[13px]">

              </div>
              <div className="text-[13px]">
                <p className="text-[16] pb-3">Waranty</p>
                <p className="">Warranty information unavailable for this item.</p>
              </div>
            </div>
          </div>
        </Box>
        {isOpen && (
          <Box position="fixed" top="0" left="0" w="100vw" h="100vh" bg="blackAlpha.700" display="flex" alignItems="center" justifyContent="center" zIndex="50" p={4}>
            <Box bg="gray.100" color="gray.800" borderRadius="lg" p={8} maxW="lg" w="100%" position="relative" mt={{ '2xl': 0, xl: 28 }}>
              <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={4}>
                Select Size & Quantity
              </Text>

              <Box bg="white" p={4} borderRadius="md">
                <Stack spacing={4} mb={4}>
                  {Array.isArray(size) && size.map((s) => (
                    <Flex key={s} align="center" justify="space-between" bg="gray.200" borderRadius="md" p={2}>
                      <Flex align="center" gap={2}>
                        <input
                          type="checkbox"
                          id={s}
                          value={s}
                          onChange={handleSizeChange}
                          checked={!!getCarts.items[s]}
                        />
                        <label htmlFor={s}>{s}</label>
                      </Flex>

                      {getCarts.items[s] && (
                        <Flex align="center" gap={2}>
                          <Button size="sm" onClick={() => updateQuantity(s, -1)}>-</Button>
                          <Text>{getCarts.items[s]}</Text>
                          <Button size="sm" onClick={() => updateQuantity(s, 1)}>+</Button>
                        </Flex>
                      )}
                    </Flex>
                  ))}
                </Stack>

                {/* <MotionButton
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 1 }}
                    animate={{ opacity: loadingProductId === _id ? 0.7 : 1 }}
                    transition={{ duration: 0.2 }}
                    disabled={loadingProductId === _id}
                    _hover={{ bg: 'pink.800' }}
                    onClick={() => handleCart(_id)}
                    w="full"
                    mt={3}
                    bg="pink.500"
                    rounded={'full'}
                    color="white">
                    {loadingProductId === product._id ? (
                        <>
                          <Spinner size="sm" mr={2} /> Adding...
                        </>
                    ) : (
                        'Confirm Selection'
                    )}
                  </MotionButton> */}

                <Button type="button" width="100%" bg="pink.600" color="white" borderRadius="full" onClick={() => handleCart(_id)} _hover={{ bg: "pink.700" }} fontWeight="medium" py={2}>
                  {loadingProductId === product._id ? (
                        <>
                          <Spinner size="sm" mr={2} /> Adding...
                        </>
                    ) : (
                        'Confirm Selection'
                    )}
                </Button>
              </Box>

              <Button onClick={() => setIsOpen(false)} mt={4} bg="red.600" color="white" _hover={{ bg: "red.700" }} w="100%" borderRadius="md">
                Cancel
              </Button>
            </Box>
          </Box>
        )}

        {/* Products details */}
        <Box py={4} px={3}>
          <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} bg={'white'} py={4} px={3} rounded={'md'} className="my-6">
            <Box className="mb-2">
              <h2 className='font-medium text-xl'>Description:</h2>
            </Box>
            {/* <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{description}</ReactMarkdown> */}
            <p className="pb-2 text-sm" dangerouslySetInnerHTML={{
                __html: description ? description.replace(/\n/g, "<br />") : description,
              }}></p>
          </Box>
        </Box>
      </div>
      {/* advert content and footer */}
      <Adverts/>
      <Footer/>
    </Box>
  )
}
