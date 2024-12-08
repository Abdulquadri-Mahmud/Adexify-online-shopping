import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
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
  TableContainer,
} from '@chakra-ui/react';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

export default function Admin_dashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(12);

    useEffect(() => {
      const fetchProducts = async () => {
          const res = await fetch('https://adexify-api.vercel.app/api/products/all-products');

          const data = await res.json();

          setProducts(data);

      };
      fetchProducts();
    }, []);

    useEffect(() => {
      const fetchProducts = async () => {
          const res = await fetch('https://adexify-api.vercel.app/api/user/auth/all-user');

          const data = await res.json();

          setUser(data);

      };
      fetchProducts();
    }, []);

    const female = [];
    const male = [];

    if (products.length > 0) {
      products.map((pro) => {
        if (pro.gender === 'femail' || pro.gender === 'female') {
          female.push(pro);
        }
        if (pro.gender === 'male') {
          male.push(pro);
        }
      })
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
                  <Flex py={2} pl={5} color={'white'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white  bg-pink-600  text-white'>
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
                  <Flex py={2} pl={5} color={'black'} rounded={'md'}  alignItems={'center'} gap={2} className='duration-200 hover:bg-pink-600 hover:text-white'>
                    <FaStore className='text-xl text-pink-600 hover:text-white'/>
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
            <Heading color={'black'} fontWeight={500} fontSize={20}>Overview</Heading>
          </Box>
          <Box height={'100%'} roundedTop={'md'} p={3} className='bg-zinc-100 h-[100vh] overflow-x-auto'>
            <Box className='flex gap-2'>
              <Box p={4} width={'300px'} height={'300px'} bg={'white'} rounded={'md'}>
                <Text className='text-[15px] font-medium'>Sales Growth</Text>
                <Text className='text-[12px] font-medium flex items-center text-gray-400'><FaNairaSign className='text-[10px]'/>0</Text>
                <Box pt={14} className='flex justify-center items-center'>
                  <CircularProgress value={40} color='pink.500' size={'160px'} className='text-pink-600'>
                    <CircularProgressLabel>40%</CircularProgressLabel>
                  </CircularProgress>
                </Box>
              </Box>
              <Box className='flex flex-col gap-4'>
                <Box p={4} width={{md:'250px'}} rounded={'md'} bg={'white'} height={'140px'}>
                  <Text className='text-[15px] font-medium'>Icoming</Text>
                  <Box pt={3}>
                    <Heading textAlign={'center'} fontWeight={500} className='font-medium flex justify-center items-center text-pink-600'><FaNairaSign className='text-2xl'/>0</Heading>
                    <Text pt={3 } fontSize={12} className='flex items-center gap-1 text-gray-400'>Compared to <span className="flex items-center">(<FaNairaSign className='text-[10px]'/>0</span>Last Year)</Text>
                  </Box>
                </Box>
                <Box p={4} width={{md:'250px'}} rounded={'md'} bg={'white'} height={'140px'}>
                  <Text className='text-[15px] font-medium'>Expenses</Text>
                  <Box pt={3}>
                    <Heading textAlign={'center'} fontWeight={500} className='font-medium flex justify-center items-center text-pink-600'><FaNairaSign className='text-2xl'/>0</Heading>
                    <Text pt={3 } fontSize={12} className='flex items-center gap-1 text-gray-400'>Compared to <span className="flex items-center">(<FaNairaSign className='text-[10px]'/>0</span>Last Year)</Text>
                  </Box>
                </Box>
              </Box>
              <Box className='flex flex-col gap-4'>
                <Box p={4} width={{md:'250px'}} rounded={'md'} bg={'white'} height={'140px'}>
                  <Text className='text-[15px] font-medium'>Customers</Text>
                  <Box pt={3}>
                    <Heading textAlign={'center'} fontWeight={500} className='font-medium flex justify-center items-center text-pink-600'>{users.length}</Heading>
                    <Text pt={3 } fontSize={12} className='flex items-center gap-1 text-gray-400'>Users that has logged in to out app</Text>
                  </Box>
                </Box>
                <Box p={4} width={{md:'250px'}} rounded={'md'} bg={'white'} height={'140px'}>
                  <Text className='text-[15px] font-medium'>Prodcuts</Text>
                  <Box pt={3}>
                    <Heading textAlign={'center'} fontWeight={500} className='font-medium flex justify-center items-center text-pink-600'>{products.length}</Heading>
                    <Text pt={3 } fontSize={12} className='flex items-center gap-1 text-gray-400'>Total products</Text>
                  </Box>
                </Box>
              </Box>
              <Box className='flex flex-col gap-4'>
                <Box p={4} width={{md:'250px'}} rounded={'md'} bg={'white'} height={'140px'}>
                  <Text className='text-[15px] font-medium'>Women's Fashion</Text>
                  <Box pt={3}>
                    <Heading textAlign={'center'} fontWeight={500} className='font-medium flex justify-center items-center text-pink-600'>{female.length}</Heading>
                    <Text pt={3 } fontSize={12} className='flex items-center gap-1 text-gray-400'>Total women fashion wear</Text>
                  </Box>
                </Box>
                <Box p={4} width={{md:'250px'}} rounded={'md'} bg={'white'} height={'140px'}>
                  <Text className='text-[15px] font-medium'>Men's Fashion</Text>
                  <Box pt={3}>
                    <Heading textAlign={'center'} fontWeight={500} className='font-medium flex justify-center items-center text-pink-600'>{male.length}</Heading>
                    <Text pt={3 } fontSize={12} className='flex items-center gap-1 text-gray-400'>Total women fashion wear</Text>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box mt={6} width={{md: '100%'}}>
              <Heading fontWeight={500} fontSize={20}>Customers</Heading>
                <Box mt={3} color={'black'} rounded={'md'} className='bg-white'>
                  <TableContainer>
                    <Table>
                      <Thead className='bg-pink-600 rounded-md'>
                        <Tr>
                          <Th color={'white'} fontWeight={500} className=''>Firtname</Th>
                          <Th color={'white'} fontWeight={500} className=''>Lasname</Th>
                          <Th color={'white'} fontWeight={500} className=''>Phone</Th>
                          <Th color={'white'} fontWeight={500} className=''>Email</Th>
                          <Th color={'white'} fontWeight={500} className=''>Address</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {
                          users.map((user) => {
                            return(
                              <Tr>
                                <Td fontSize={14}>{user.firstname}</Td>
                                <Td fontSize={14}>{user.lastname}</Td>
                                <Td fontSize={14}>{user.phone}</Td>
                                <Td fontSize={14}>{user.email}</Td>
                                <Td fontSize={14}>{user.address}</Td>
                                {/* <Td>{}</Td> */}
                              </Tr>
                            )
                          })
                        }
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

{/*  */}
