import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function LastSection() {
  return (
    <Box bg={'white'} pb={10}>
        <Flex justifyContent={{md:'center', base: 'start'}} maxW={{'2xl' : '80%', xl: '90%', md: '100%'}} gap={3} overflowX={{md: 'hidden', base: 'scroll'}} px={'3'} mx={'auto'} pt={10} pb={10} bg={'white'}>
            <Box width={{md:'30%', base: '350px'}} p={2} shadow={'md'} rounded={'md'}>
                <Box width={{md:'100%', base: '350px'}} height={''}>
                    <img src="/bg4.jpg" alt=""  className='max-w-full rounded-md'/>
                </Box>
                <Box>
                    <Heading mt={3} fontSize={20} fontStyle={500}>Men's Wear</Heading>
                    <Text fontSize={13} fontWeight={400} color={'black'} mt={3}>Get Men's Wear At Amazing Price</Text>
                    <button className='bg-pink-600 text-white px-3 py-1 text-[14px] font-medium rounded-sm mt-4'><Link to={"/mens-wear"}>SHOP NOW</Link></button>
                </Box>
            </Box>
            <Box width={{md:'30%', base: '350px'}} p={2} shadow={'md'} rounded={'md'}>
                <Box width={{md:'100%', base: '350px'}} height={''}>
                    <img src="/bg4.jpg" alt=""  className='max-w-full rounded-md'/>
                </Box>
                <Box>
                    <Heading mt={3} fontSize={20} fontStyle={500}>Women's Wear</Heading>
                    <Text fontSize={13} fontWeight={400} color={'black'} mt={3}>Get Women's Wear At Amazing Price</Text>
                    <button className='bg-pink-600 text-white px-3 py-1 text-[14px] font-medium rounded-sm mt-4'><Link to={"/womens-wear"}>SHOP NOW</Link></button>
                </Box>
            </Box>
            <Box width={{md:'30%', base: '350px'}} p={2} shadow={'md'} rounded={'md'}>
                <Box width={{md:'100%', base: '350px'}} height={''}>
                    <img src="/bg4.jpg" alt=""  className='max-w-full rounded-md'/>
                </Box>
                <Box>
                    <Heading mt={3} fontSize={20} fontStyle={500}>Bags</Heading>
                    <Text fontSize={13} fontWeight={400} color={'black'} mt={3}>Get Bags At Amazing Price</Text>
                    <button className='bg-pink-600 text-white px-3 py-1 text-[14px] font-medium rounded-sm mt-4'><Link to={"/womens-wear"}>SHOP NOW</Link></button>
                </Box>
            </Box>
        </Flex>
    </Box>
  )
}
