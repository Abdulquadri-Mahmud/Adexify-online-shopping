import { Box, Button, Flex, Heading, Text, IconButton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { PiGreaterThan } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, changeQuantity, removeItem } from '../../store/cart/cartsReucer' // note fix import name
import { MdDelete } from 'react-icons/md'
import Header from '../../components/Header'
import { FaCartShopping, FaNairaSign } from 'react-icons/fa6'
import { CgMathMinus } from 'react-icons/cg'
import { RiAddFill } from 'react-icons/ri'

export default function Wishlist_Page() {
  const { wishlists } = useSelector((state) => state.wishlist)
  const dispatch = useDispatch()

  // Local quantity state per wishlist item (productID as key)
  const [quantities, setQuantities] = useState({})

  // Initialize quantities to 1 for each wishlist item when wishlist changes
  useEffect(() => {
    const initialQuantities = {}
    wishlists.forEach((item) => {
      initialQuantities[item.productID] = item.quantity || 1
    })
    setQuantities(initialQuantities)
  }, [wishlists])

  // Handlers for quantity increase/decrease
  const incrementQuantity = (productID) => {
    setQuantities((prev) => ({
      ...prev,
      [productID]: (prev[productID] || 1) + 1,
    }))
  }

  const decrementQuantity = (productID) => {
    setQuantities((prev) => {
      const newQty = (prev[productID] || 1) - 1
      return {
        ...prev,
        [productID]: newQty < 1 ? 1 : newQty,
      }
    })
  }

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id)) // Assuming this removes from cart, for wishlist use your existing deleteWishlist
    // For wishlist removal:
    // dispatch(deleteWishlist({ productID: id }))
  }

  const handleAddToCart = (item) => {
    // Prepare cart item with quantity from state
    const quantity = quantities[item.productID] || 1
    const cartItem = {
      productID: item.productID,
      productName: item.productName,
      productPrice: item.productPrice,
      productImage: item.productImage,
      items: { M: quantity }, // Adjust size as needed, or extend your wishlist to have sizes
      quantity, // optional flat quantity if you track it
    }
    dispatch(addToCart(cartItem))
  }

  return (
    <Box>
      <Header />

      <Box pb={10} className="bg-zinc-100">
        <Box bg={'white'}>
          <Box maxW={{ '2xl': '80%', xl: '90%', lg: '100%', base: '97%' }} mx={'auto'} className="p-2 ">
            <Box className="flex gap-1 items-center">
              <Link to={'/'} className="text-[13px]">
                Home
              </Link>
              <PiGreaterThan className="text-[13px] pt-1 text-gray-400" />
              <Link to={'/view-carts'} className="text-[13px] text-slate-600">
                Shopping Cart
              </Link>
              <PiGreaterThan className="text-[13px] pt-1 text-gray-400" />
              <Link to={'/view-wishlist'} className="text-[13px] text-slate-600">
                Wishlist
              </Link>
            </Box>
            <Box className="mt-2" my={5}>
              <Heading fontSize={{ md: 30, base: 25 }} fontWeight={500} color={'black'}>
                My Wishlists
              </Heading>
            </Box>
          </Box>
        </Box>
        <Box mt={{ md: 10, base: 6 }}>
          <Box
            height={'400px'}
            overflowY={'scroll'}
            bg={'white'}
            rounded={'md'}
            maxW={{ '2xl': '80%', xl: '90%', lg: '100%', base: '97%' }}
            mx={'auto'}
          >
            <TableContainer>
              <Table variant="simple">
                <TableCaption>
                  <Box bg={'pink.200'} rounded={'sm'} py={2}>
                    <Text className="text-pink-600 font-medium text-sm">Shop What You Desire On Adexify Now</Text>
                  </Box>
                </TableCaption>
                <Thead roundedTop={'md'}>
                  <Tr className="bg-pink-300">
                    <Th fontWeight={500} fontSize={14}>
                      Image
                    </Th>
                    <Th fontWeight={500} fontSize={14}>
                      Name
                    </Th>
                    <Th fontWeight={500} fontSize={14}>
                      Price
                    </Th>
                    <Th fontWeight={500} fontSize={14}>
                      Quantity
                    </Th>
                    <Th fontWeight={500} fontSize={14}>
                      Delete
                    </Th>
                    <Th fontWeight={500} fontSize={14}>
                      Add To Cart
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {wishlists.length > 0 &&
                    wishlists.map((item) => (
                      <Tr key={item.productID}>
                        <Td>
                          <Link to={`/product-details/${item.productID}`}>
                            <img
                              src={item.productImage ? item.productImage[0] : 'fallback-image-url'}
                              alt=""
                              className="rounded-md max-w-[60px] max-h-[60px]"
                            />
                          </Link>
                        </Td>
                        <Td isTruncated>{item.productName}...</Td>
                        <Td>
                          <Text
                            fontWeight={500}
                            textAlign={'center'}
                            className="flex items-center justify-start"
                          >
                            <FaNairaSign />
                            {(item.productPrice * (quantities[item.productID] || 1)).toLocaleString()}.00
                          </Text>
                        </Td>
                        <Td>
                          <Flex alignItems="center" gap={2}>
                            <IconButton
                              size="sm"
                              aria-label="Decrease quantity"
                              icon={<CgMathMinus />}
                              onClick={() => decrementQuantity(item.productID)}
                            />
                            <Text minW="24px" textAlign="center">
                              {quantities[item.productID] || 1}
                            </Text>
                            <IconButton
                              size="sm"
                              aria-label="Increase quantity"
                              icon={<RiAddFill />}
                              onClick={() => incrementQuantity(item.productID)}
                            />
                          </Flex>
                        </Td>
                        <Td>
                          <Button
                            colorScheme="red"
                            size="sm"
                            onClick={() => handleRemoveItem(item.productID)}
                            leftIcon={<MdDelete />}
                          >
                            Delete
                          </Button>
                        </Td>
                        <Td>
                          <Button
                            colorScheme="pink"
                            size="sm"
                            onClick={() => handleAddToCart(item)}
                            leftIcon={<FaCartShopping />}
                          >
                            Add To Cart
                          </Button>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
