import { Box, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Men_pag({postPerPage, totalPost, paginate}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    }
  
    return (
      <Flex justifyContent={'end'} alignItems={'end'} gap={2} mr={2}>
          {
              pageNumbers.map((number) => (
                  <Box mt={0} bg={'white'} rounded={'10px'} fontWeight={500} key={number}>
                      <Link onClick={() => paginate(number)} to={'#'} className='w-[35px] h-[35px] flex items-center justify-center border'>{number}</Link>
                  </Box>
              ))
          }
      </Flex>
  )
}
