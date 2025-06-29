import { Box, Flex, Heading, Text,} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { PiGreaterThan } from 'react-icons/pi';
export default function ProductByCategroyBanner({category}) {
    
  return (
    <Box>
        <Box pb={7} className="bg-zinc-200 rounded-t-lg">
        {/* Breadcrumb Navigation */}
        <Box bg={''} py={6}>
            <Box bg={'white'} py={4} px={6} rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '97%', base: '97%'}} mx={'auto'}>
                <Box bg={''} className="flex gap-1 items-center">
                    <Link to={'/'} className='text-[13px] text-gray-500'>Home</Link>
                    <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                    <Link to={'/fashion'} className='text-[13px] text-gray-500'>Fashion</Link>
                    <PiGreaterThan className='text-[13px] text-gray-500 pt-1'/>
                    <Link to={`/catgory/category=${category}`} className='text-[13px] text-gray-500'>{category}</Link>
                </Box>
            </Box>
        </Box>

        <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} py={3} mt={3} mb={5} className='bg-pink-500'>
            <Heading color={'white'} fontWeight={500} fontSize={20} textAlign={'center'} className='flex items-center gap-1 justify-center'>CALL TO ORDER 
                <Link to={'tel:07047594667'}>07047594667</Link>
            </Heading>
        </Box>
        
        <Box bg={'white'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} rounded={'md'} p={2} mt={4}>
            <Flex justifyContent={'center'} alignItems={'center'} p={2} height={{'xl': '300px',md: '220px', base: '200px'}} bgRepeat={'no-repeat'} bgSize={'cover'} bgPos={'top'} bgBlendMode={'multiply'} className='bg-slate-400' bgImage={'/hero2.jpg'} position={'relative'}>
                <Box position={'absolute'}>
                    <Text color={'white'} fontWeight={500} textAlign={'center'}>SHOP</Text>
                    <Heading color={'white'} fontWeight={500} fontSize={{md: 40, base: 30}}>Men's Fahion</Heading>
                </Box>
            </Flex>
         </Box>
      </Box>
    </Box>
  )
}
