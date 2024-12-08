import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function Banner() {
  return (
    <Box bg={'white'} maxW={{'2xl' : '80%', xl : '90%', lg : '100%', base: '97%'}} mx={'auto'} rounded={'md'} p={2} mt={4}>
        <Flex justifyContent={'center'} alignItems={'center'} p={2} height={{'xl': '250px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'contain'} bgPos={'center'} bgBlendMode={'multiply'} className='bg-slate-500' bgImage={'/jewe.gif'} position={'relative'}>
            <Box position={'absolute'}>
                <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                <Heading color={'white'}>Jewellery</Heading>
            </Box>
        </Flex>
    </Box>
  )
}
