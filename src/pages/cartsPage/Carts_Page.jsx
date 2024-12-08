import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { BiLeftArrowAlt } from 'react-icons/bi';
import { PiGreaterThan } from 'react-icons/pi'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { changeQuantity, deleteProduct } from '../../store/cart/cartsReucer';
import { CgMathMinus } from 'react-icons/cg';
import { RiAddFill } from 'react-icons/ri';
import { FaNairaSign } from 'react-icons/fa6';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react';
import { MdDelete } from 'react-icons/md';
import Header from '../../components/Header';
import Footer from '../../components/footer/Footer';

export default function Carts_Page() {
  const { items } = useSelector((state) => state.cart);
  const [emptyCart, setEmptyCart] = useState(false);

  let total = 0;
  
  let dispatch = useDispatch();

  // useEffect()
  // const mSize = item.productSize.findIndex((it) => it === 'M');

  const increaseQuantity = (id) => {
    items.map((item) => {
      if (id === item.productID) {
        dispatch(changeQuantity({
          productID : item.productID,
          quantity : item.quantity + 1
        }));
      }
    });
  }

  let navigate = useNavigate();

  const decreaseQuantity = (id) => {
    items.map((item) => {
      if (id === item.productID) {
        dispatch(changeQuantity({
          productID : item.productID,
          quantity : item.quantity - 1 < 1 ? 1
           : item.quantity - 1
        }));
      }
    });
  }

  const handleRemoveItem = (id) => {
    dispatch(deleteProduct({
      productID: id,
    }));
    if (items.length === 0) {
      setEmptyCart(true);
      return;
    }
  }
  useEffect(() => {
    if (items.length === 0) {
      setEmptyCart(true);
      return;
    }
  })

  return (
    <Box>
      <Header/>
      <Box pb={10} className='bg-zinc-200'>

        <Box mt={3} className=''>
          <Box bg={''}>
            <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} className="py-2">
              <Box className="flex gap-1 items-center">
                <Link to={'/'} className='text-[13px]'>Home</Link>
                <PiGreaterThan className='text-[13px] pt-1 text-gray-500'/>
                <Link to={'/view-carts'} className='text-[13px] text-gray-500'>Shopping Cart</Link>
              </Box>
            </Box>
          </Box>
          <Box bg={'white'} py={3} px={2} rounded={'md'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} mt={4} className=''>
            <Box className="">
                <Heading fontSize={{md:30, base: 25}} fontWeight={500} color={'black'}>Shopping Cart</Heading>
            </Box>
            <Box mt={4} width={'200px'} py={1} rounded={'md'} className='border border-gray-300' >
              <Link to={'/fashion'} fontWeight={500} className='text- flex items-center justify-center gap-2'><BiLeftArrowAlt/> Continue Shopping</Link>
            </Box>
          </Box>
          <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} className=''>

            <Flex justifyContent={'space-between'} flexWrap={{md:'no-wrap', base: 'wrap'}} gap={{md: 5, base: 2}} mt={6}>
              <Box flex={1} width={{md:'50%', base: '100%'}} bg={'white'} rounded={'md'}>
                <TableContainer className="">
                  <Table className='rounded-md'>
                    <Thead className='bg-pink-300'>
                      <Tr>
                        <Th className='font-medium p-[10px] text-center'>Image</Th>
                        <Th className='font-medium p-[10px] text-center'>Name</Th>
                        <Th className='font-medium p-[10px] text-center'>Quantity</Th>
                        <Th className='font-medium p-[10px] text-center'>Size</Th>
                        <Th className='font-medium p-[10px] text-center'>Items Price</Th>
                        <Th className='font-medium p-[10px] text-center'>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody className='w-full'>
                      {
                        items.length > 0 && items.map((item, index) => {
                          total += item.productPrice * item.quantity ;
                          
                          // check f m exist
                          // let mSize = item.productSize.findIndex((it) => it === 'M');
                          // let sSize = item.productSize.findIndex((it) => it === 'S');
                          
                          // count the lenght of m we've got
                          // let sCount = item.productSize.filter((it) => it === 'S').length;
                          // let mCount = item.productSize.filter((it) => it === 'M').length;
                          
                          return (
                            <Tr className='' key={index}>
                              <Td className=''>
                                <img src={item.productImage} alt="" className='rounded-md max-w-[50px] max-h-[50px]'/>
                              </Td>
                              <Td className='font-medium text-[14px] truncate'>
                                {item.productName.slice(0, 20)}...
                              </Td>
                              <Td className='font-medium'>
                                <div className="flex justify-center items-center h-full gap-2">
                                  <button type='button' className='rounded-md bg-zinc-200 w-7 h-7 flex justify-center items-center' onClick={() => decreaseQuantity(item.productID)}><CgMathMinus className='text-sm text-black'/></button>
                                  <span className="" >{item.quantity}</span>
                                  <button type='button' className='rounded-md bg-zinc-200 w-7 h-7 flex justify-center items-center' onClick={() => increaseQuantity(item.productID)}><RiAddFill className='text-sm text-black'/></button>
                                </div>
                              </Td>
                              <Td className='font-medium '>
                                <div className="">
                                  {/* <Text>
                                    {
                                      mSize >= 0 ? `M: ${mCount}` : ''
                                    }
                                  </Text>
                                  <Text>
                                    {
                                      sSize >= 0 ? `S: ${sCount}` : ''
                                    }
                                  </Text> */}
                                </div>
                                {/* <div className="flex justify-center flex- items-center h-full gap-1">
                                  <button type='button' className='rounded-md bg-zinc-200 w-3 h-3 flex justify-center items-center' onClick={() => decreaseQuantity(item.productID)}><CgMathMinus className='text-[13px] text-black'/></button>
                                  <span className="text-[13px]" >{item.quantity}</span>
                                  <button type='button' className='rounded-md bg-zinc-200 w-3 h-3 flex justify-center items-center' onClick={() => increaseQuantity(item.productID)}><RiAddFill className='text-[13px] text-black'/></button>
                                </div> */}
                              </Td>
                              <Td className='font-medium w-[20%]'>
                                <Text fontWeight={500} textAlign={'center'} className='flex items-center justify-center'><FaNairaSign/>{(item.productPrice * item.quantity).toLocaleString()}.00</Text>
                              </Td>
                              <Td className='font-medium'>
                                <div className="flex justify-center items-center">
                                  <button className='text-red-500 text-[14px] font-medium text-center' onClick={() => handleRemoveItem(item.productID)}><MdDelete className='text-2xl'/></button>
                                </div>
                              </Td>
                            </Tr>
                          )
                        })
                      }
                    </Tbody>
                  </Table>
                </TableContainer>
                {
                  emptyCart && (
                    <Flex mt={{md:20, base: 15}} pb={6} justifyContent={'center'} height={'70%'} alignItems={'center'}>
                      <Text fontWeight={500} fontSize={20}>Your Cart Is Empty!</Text>
                    </Flex>
                  )
                }
              </Box>
              <Box width={{md:'350px', base: '100%'}} height={'350px'} p={{md:3, base:2}} bg={'white'} rounded={'md'}>
                <Flex justifyContent={'space-between'} alignItems={'center'} pb={3} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                  <Heading fontSize={16} fontWeight={500}>Order Summary</Heading>
                  <Text fontWeight={500} fontSize={15}>Subtotal ({items.length} Item)</Text>
                </Flex>
                <Flex justifyContent={'space-between'} alignItems={'center'} py={5} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                  <Text fontSize={14} fontWeight={500}>Delivery Changes:</Text>
                  <Text fontWeight={500} fontSize={'11px'} textAlign={'end'} className='text-gray-400'>Add your Delivery address at checkout to see delivery charges</Text>
                </Flex>
                <Flex justifyContent={'space-between'} alignItems={'center'} py={4} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                  <Heading fontSize={16} fontWeight={500}>Subtotal</Heading>
                  <Box>
                    <Text fontWeight={500} className='flex items-center'><FaNairaSign/>{total.toLocaleString()}.00</Text>
                  </Box>
                </Flex>
                <Flex justifyContent={'space-between'} alignItems={'center'} py={4} borderBottomWidth={1} borderBottomColor={'gray.100'}>
                  <Heading fontSize={16} fontWeight={500}>Total</Heading>
                  <Text fontWeight={500} className='flex items-center'><FaNairaSign/>{total.toLocaleString()}.00</Text>
                </Flex>
                <Text className='text-[12px] text-yellow-600 text-end py-2'>Excluding delivery charges</Text>
                <Box borderBottomWidth={1} borderBottomColor={'gray.100'}>
                  <button className='bg-pink-600 text-white w-full my-3 rounded-md py-2 font-medium'>Continue to Checkout</button>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Box>
      <Footer/>
    </Box>
  )
}
