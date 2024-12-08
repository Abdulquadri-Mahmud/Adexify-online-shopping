import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

export default function NotFound() {
  return (
    <Box>
      <Header/>
        <Box py={10} className='bg-zinc-100'>
          <Flex justifyContent={'center'} bg={'white'} alignItems={'center'} flexDir={'column'} gap={2} maxW={{md: '350px', base: '300px'}} mx={'auto'} rounded={'md'} py={6} px={3} className=''>
            <Heading fontSize={50} className='drop-shadow-xl'>404</Heading>
            <Text fontWeight={500} fontSize={18}>Page not found</Text>
            <Text textAlign={'center'} fontSize={12} color={'gray.500'}>The link you clicked may be broken or the page may have been removed or renamed.</Text>
            <Button px={7} mt={4} rounded={'md'} bg={'pink.500'} _hover={{bg: 'pink.600'}} color={'white'}><Link to={'/'} className='flex items-center gap-2'><FaArrowLeft/>Go Back</Link></Button>
          </Flex>
        </Box>
    </Box>
  )
}
