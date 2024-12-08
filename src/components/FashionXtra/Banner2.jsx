import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function Banner2() {
  return (
    <Box mt={8}>
        <Box maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} rounded={'md'} bg={'white'}>
            <Box>
                <Flex alignItems={'center'} justifyContent={'center'} gap={2} px={2} py={2}>
                    <Flex justifyContent={'center'} alignItems={'center'} w={{md:'50%', base: '100%'}} height={{'xl': '250px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'center'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-500' bgImage={'/mbg.jpeg'} position={'relative'}>
                        <Box position={'absolute'}>
                        <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                        <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Men Bags</Heading>
                        </Box>
                    </Flex>
                    <Flex justifyContent={'center'} alignItems={'center'} w={{md:'50%', base: '100%'}} height={{'xl': '250px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'center'} bgBlendMode={'multiply'} rounded={'md'} className='bg-slate-500' bgImage={'/wbg.jpg'} position={'relative'}>
                        <Box position={'absolute'}>
                        <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                        <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Women Bags</Heading>
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </Box>
        <Box bg={'white'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} rounded={'md'} p={2} mt={4}>
            <Flex justifyContent={'center'} alignItems={'center'} p={2} height={{'xl': '250px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'center'} bgBlendMode={'multiply'} className='bg-slate-500' bgImage={'/shoes.jpg'} position={'relative'}>
                <Box position={'absolute'}>
                    <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                    <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Shoes</Heading>
                </Box>
            </Flex>
        </Box>
    </Box>
  )
}
