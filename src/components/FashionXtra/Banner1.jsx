import { Box, Flex, Image } from '@chakra-ui/react'
import React from 'react'

export default function Banner1() {
  return (
    <Flex justifyContent={'center'} mt={6} maxW={{'2xl' : '80%', xl : '80%', lg : '100%', base: '97%'}} mx={'auto'} p={3} bg={'white'} rounded={'md'}>
        <Image src='/desktop-single-banner.png' maxW={'100%'} rounded={'md'}/>
    </Flex>
  )
}
