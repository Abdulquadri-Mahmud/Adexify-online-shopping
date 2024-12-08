import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Image, Text, useToast } from '@chakra-ui/react'
import { MdOutlineShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { CiGrid42 } from 'react-icons/ci'
import { FiGrid } from 'react-icons/fi'
import { FaNairaSign, FaStore, FaUsersLine } from 'react-icons/fa6'
import { BsBank2 } from 'react-icons/bs'
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
import { IoSearchSharp } from 'react-icons/io5'
import { GrUpdate } from 'react-icons/gr'

export default function Items() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(12);

    useEffect(() => {
      const fetchProducts = async () => {
          const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');

          const data = await res.json();

          setItems(data);

      };
      fetchProducts();
    }, []);

    const female = [];
    const male = [];
    const unisex = [];

    if (items.length > 0) {
      items.map((pro) => {
        if (pro.gender === 'femail' || pro.gender === 'female') {
          female.push(pro);
        }
        if (pro.gender === 'male') {
          male.push(pro);
        }
        if (pro.gender === 'unisex') {
          unisex.push(pro);
        }
      })
    }

    const handleRemoveItem = async (id) => {
      try {
        setLoading(true);
        
        const res = fetch(`https://adexify-api.vercel.app/api/products/delete-products/${id}`, {
          method: 'DELETE'
        });
  
        const deletes = await res.json();
  
        if (deletes.success === false) {
          toast({
            description: data.message,
            duration: 5000,
            isClosable: true,
            status: 'error',
          });
          setLoading(false);
          return;
        }

        setLoading(false);
        toast({
          description: 'Item has been deleted successfully!',
          duration: 5000,
          isClosable: true,
          status: 'success',
        });

      } catch (error) {
        setLoading(false);
        toast({
          description: error,
          duration: 5000,
          isClosable: true,
          status: 'error',
      });
      }
    }

  return (
    <Box className='bg-white h-[100vh]'>
      <Flex gap={0} height={'100vh'}>
        <Box position={'relative'} width={'250px'} color={'white'} p={0} height={'100%'} className='bg-white'>
          <Link to={'/'}>
            <div className="bg-pink-600 text-white flex items-center gap-3 py-3 justify-center">
                <MdOutlineShoppingCart className='md:text-2xl'/>
                <h1 className='md:text-2xl font-medium'>Ade<span className="">X</span>ify</h1>
            </div>
          </Link>
          <Box pt={7} px={2}>
            <Text pl={2} fontSize={14} fontWeight={500} className='text-pink-400'>Main Menu</Text>
            <Box mt={6}>
              <Box>
                <Link to={'/admin-dashboard'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white  text-white'>
                    <FiGrid className='text-xl text-pink-600'/>
                    <Text fontWeight={500}>Overview</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link to={'/admin/create-products'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <FaStore className='text-xl text-pink-600 hover:text-white'/>
                    <Text fontWeight={500}>Products</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link to={'/admin/items'}>
                  <Flex py={2} pl={5} color={'white'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 text-white bg-pink-600'>
                    <FaStore className='text-xl hover:text-white text-white'/>
                    <Text fontWeight={500}>Items</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link to={'/'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <MdOutlineShoppingCart className='text-xl text-pink-600 hover:text-white'/>
                    <Text fontWeight={500}>Order</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link to={'/'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <FaUsersLine className='text-xl text-pink-600 hover:text-white'/>
                    <Text fontWeight={500}>Customers</Text>
                  </Flex>
                </Link>
              </Box>
              <Box mt={5}>
                <Link to={'/'}>
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <BsBank2 className='text-xl text-pink-600 hover:text-white'/>
                    <Text fontWeight={500}>Payments</Text>
                  </Flex>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box pos={'absolute'} bottom={0} width={'full'}>
            <button className='py-2 bg-pink-600 text-white w-[94%] uppercase font-medium'>Logout</button>
          </Box>
        </Box>
        <Box flex={1} pt={3} pr={3} className='bg-white '>
          <Box pt={1} pb={4} px={4}>
            <Heading color={'black'} fontWeight={500} fontSize={20} className=''>List Of Items</Heading>
          </Box>
          <Box height={'100%'} roundedTop={'md'} p={2} className='bg-zinc-100'>
            <Flex alignItems={'center'} flexWrap={'wrap'} mt={3} justifyContent={'space-between'}>
              <Box position={'relative'}>
                <input type="text" className='rounded-full py-2 px-4 md:w-[400px]' placeholder='Search item'/>
                <Box position={'absolute'} top={0} right={0} className='bg-pink-600 py-3 px-3 rounded-r-full'>
                  <IoSearchSharp  className='text-white'/>
                </Box>
              </Box>
              <Box className='flex items-center gap-1 bg-white px-2 py-2 rounded-md'>
                <Text color={'black'} fontWeight={500} fontSize={13}>Items Found:</Text>
                <Text color={'black'} fontWeight={500} fontSize={13}>{items.length}</Text>
              </Box>
              <Flex alignItems={'center'} gap={5}>
                <Box bg={'white'} className='flex items-center gap-1 rounded-full' rounded={'full'} px={2}>
                  <Text fontSize={12} color={'gray.400'}>Show:</Text>
                  <select name="" id="items" className='py-2 px-5 font-medium text-sm outline-none border-none rounded-full'>
                    <option value="all products">All Products</option>
                    <option value="price">Price</option>
                    <option value="stock">Stock</option>
                  </select>
                </Box>
                <Link to={'/admin/create-products'}>
                  <button className='text-white bg-pink-600 px-4 py-2 rounded-full font-medium flex items-center gap-2'>
                    <FaStore className='text-xl'/>
                    Add New Products
                  </button>
                </Link>
              </Flex>
            </Flex>
            <Flex px={5} mt={5} bg={''} py={2} rounded={'md'} justifyContent={'space-between'} alignItems={'center'} className='bg-pink-600'>
              <Box className='flex items-center gap-1 text-[13px] font-medium bg-white text- px-3 py-1 rounded-md'>
                <Text>Male:</Text>
                <Text>{male.length}</Text>
              </Box>
              <Box className='flex items-center gap-1 text-[13px] font-medium bg-white text- px-3 py-1 rounded-md'>
                <Text>Female:</Text>
                <Text>{female.length}</Text>
              </Box>
              <Box className='flex items-center gap-1 text-[13px] font-medium bg-white text- px-3 py-1 rounded-md'>
                <Text>Unisex:</Text>
                <Text>{unisex.length}</Text>
              </Box>
            </Flex>
            <Box flex={1} mt={6} width={'100%'} height={'75vh'} pb={10} overflowX={'scroll'} bg={'white'} rounded={'md'}>
                <TableContainer className="">
                  <Table className='w-[100%] table-auto rounded-md'>
                    <Thead className=''>
                      <Tr>
                        <Th className='font-medium p-[10px] text-center'>Product</Th>
                        <Th className='font-medium p-[10px] text-center'>Price</Th>
                        <Th className='font-medium p-[10px] text-center'>Old Price</Th>
                        <Th className='font-medium p-[10px] text-center'>Stock</Th>
                        <Th className='font-medium p-[10px] text-center'>Update</Th>
                        <Th className='font-medium p-[10px] text-center'>Delete</Th>
                      </Tr>
                    </Thead>
                    <Tbody className='w-full'>
                      {
                        items.length > 0 && items.map((item) => {
                          
                          return (
                            <Tr className='hover:bg-pink-300 duration-200 rounded-md'>
                              <Td className=''>
                                <Box className='flex items-center gap-1'>
                                  <Link to={`/product-details/${item._id}`}>
                                    <img src={item.image} alt="" className='rounded-md max-w-[50px] max-h-[50px]'/>
                                  </Link>
                                  <Box className='text-[13px] font-medium'>
                                    {item.name.slice(0, 16)}...
                                  </Box>
                                </Box>
                              </Td>
                              <Td className=' font-medium truncate text-[13px]'>
                                <Box className='flex items-center'>
                                  <FaNairaSign className='text-[10px]'/>
                                  {item.price.toLocaleString()}
                                </Box>
                              </Td>
                              <Td className=' font-medium text-[13px]'>
                                <Box className='flex items-center line-through text-gray-500'>
                                  <FaNairaSign className='text-[10px]'/>
                                  {item.oldprice.toLocaleString()}
                                </Box>
                              </Td>
                              <Td className=' font-medium '>
                                <div className="text-[13px] font-medium">
                                  {item.stock.toLocaleString()}
                                </div>
                              </Td>
                              <Td className=' font-medium'>
                                <div className="flex justify-center items-center">
                                  <Link to={`/admin/update-products/${item._id}`}>
                                    <button className='text-pink-500 text-[14px] font-medium text-center'><GrUpdate className='text-sm'/></button>
                                  </Link>
                                </div>
                              </Td>
                              <Td className=' font-medium'>
                                <div className="flex justify-center items-center">
                                  <button className='text-red-500 text-[14px] font-medium text-center' onClick={() => handleRemoveItem(item._id)}><MdDelete className='text-[20px]'/></button>
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
                  items.length <= 0 && (
                    <Flex mt={{md:20, base: 15}} justifyContent={'center'} height={'70%'} alignItems={'center'}>
                      <Text fontWeight={500} fontSize={20}>No Items Found!</Text>
                    </Flex>
                  )
                }
              </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
