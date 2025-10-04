import { Box, Button, Flex, Heading, Menu, MenuButton, MenuItem, MenuList, Text, useColorModeValue } from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown, MdOutlineAccountCircle } from 'react-icons/md';
import { PiHandWavingDuotone } from 'react-icons/pi';
import { FiUser } from 'react-icons/fi';
import { AiTwotoneShopping } from 'react-icons/ai';
import { IoMdHeartEmpty } from 'react-icons/io';
import { CiLocationOn } from 'react-icons/ci';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa6';

export default function GuestNav() {
    const { currentUser } = useSelector((state) => state.user);

  return (
    <Box zIndex={''} className=''>
        <Menu className="bg-black">
            <MenuButton mr={2} display={{base: 'block', md: 'block'}} bg={'transparent'} height={'30px'} width={'40px'} color={'black'}
            _hover={{bg: 'transparent'}} as={Button} _focus={{bg: 'transparent'}} fontWeight={400} className=''>
                
                <Box p={2} width={'35px'} rounded={'full'} bg={{md:'pink.500', base: 'white'}}>
                    <FaRegUser className='text-xl hover:text-black md:text-white text-pink-500' />
                </Box>
            </MenuButton>
            <MenuList p={2} bg={useColorModeValue('white')}>
                <MenuItem color={'black'} rounded={5} padding={2.5} mb={1} transitionDuration={200} className='hover:-translate-y-1 font-medium'>
                    <Flex alignItems={'center'} gap={2}>
                        <Heading fontWeight={500} fontSize={20} className='text-pink-600'>Hi {currentUser ? `${currentUser.firstname}` : 'User'}</Heading>
                        <PiHandWavingDuotone className='text-pink-600 text-xl'/>
                    </Flex>
                </MenuItem>
                <MenuItem color={'black'} rounded={5} padding={2.5} mb={1} transitionDuration={200} className='hover:-translate-y-1 hover:text-pink-600 duration-200'>
                    <Flex alignItems={'center'} gap={2}> 
                        <FiUser/>
                        <Link to={`/signin`} className="text-sm md:text-[16px]">Sign In</Link>
                    </Flex>
                </MenuItem>
                <MenuItem color={'black'} rounded={5} padding={2.5} mb={1} transitionDuration={200} className='hover:-translate-y-1 hover:text-pink-600 duration-200'>
                    <Flex alignItems={'center'} gap={2}> 
                        <FiUser/>
                        <Link to={`/signup`} className="text-sm md:text-[16px]">Sign Up</Link>
                    </Flex>
                </MenuItem>

                <MenuItem color={'black'} rounded={5} padding={2.5} mb={1} transitionDuration={200} className='hover:-translate-y-1 hover:text-pink-600 duration-200'>
                    <Flex alignItems={'center'} gap={2}> 
                        <IoMdHeartEmpty/>
                        <Link to={`/view-wishlist`} className="text-sm md:text-[16px]">My Saved Items</Link>
                    </Flex>
                </MenuItem>
                
                <MenuItem color={'black'} rounded={5} padding={2.5} mb={1} transitionDuration={200} className='hover:-translate-y-1 hover:text-pink-600 duration-200'>
                        {/* <Link to={`/profile/${_id}`} className="text-sm md:text-[16px]">My Order</Link> */}
                    <Link to='/contact' className=''>Contact Us</Link> 
                </MenuItem>
            </MenuList>
        </Menu>
    </Box>
  )
}
