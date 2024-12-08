import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Menu, MenuButton, MenuItem, MenuList, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { FaUser } from 'react-icons/fa';
import { RiUserSettingsLine } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Account() {
    const { currentUser } = useSelector((state) => state.user);

    const {_id} = currentUser;

  return (
    <div className=''>
        <Menu className="bg-white">
            <MenuButton display={{base: 'block', md: 'block'}} bg={'transparent'} height={'30px'} width={'20px'} color={'white'}
            _hover={{bg: 'transparent'}} as={Button} _focus={{bg: 'transparent'}}>
                My Account
            </MenuButton>
            <MenuList p={3} bg={useColorModeValue('white')}>
                <MenuItem _hover={{bgGradient:'linear(to-l, pink.500, gray.800)'}} bg={useColorModeValue('gray.800', 'gray.600')} color={'white'} rounded={5} padding={2.5} mb={3} transitionDuration={200} className='hover:-translate-y-1 font-medium'>
                    <Link to={`/profile/${_id}`} className="">My Account</Link>
                </MenuItem>
                <MenuItem _hover={{bgGradient:'linear(to-l, pink.500, gray.800)'}} bg={useColorModeValue('gray.800', 'gray.600')} color={'white'} rounded={5} padding={2.5} mb={3} transitionDuration={200} className='hover:-translate-y-1 font-medium'>
                    <Link to='/' className="">Checkout</Link>
                </MenuItem>
                <MenuItem _hover={{bgGradient:'linear(to-l, pink.500, gray.800)'}} bg={useColorModeValue('gray.800', 'gray.600')} color={'white'} rounded={5} padding={2.5} mb={3} transitionDuration={200} className='hover:-translate-y-1 font-medium'>
                    <Link to='/signin' className=''>Sign In</Link> 
                </MenuItem>
                <MenuItem _hover={{bgGradient:'linear(to-l, pink.500, gray.800)'}} bg={useColorModeValue('gray.800', 'gray.600')} color={'white'} rounded={5} padding={2.5} mb={3} transitionDuration={200} className='hover:-translate-y-1 font-medium'>
                    <Link to='/signup' className=''>Sign Up</Link> 
                </MenuItem>
                <MenuItem _hover={{bgGradient:'linear(to-l, pink.500, gray.800)'}} bg={useColorModeValue('gray.800', 'gray.600')} color={'white'} rounded={5} padding={2.5} mb={3} transitionDuration={200} className='hover:-translate-y-1 font-medium'>
                    <Link to='/contact' className=''>Contact Us</Link> 
                </MenuItem>
            </MenuList>
        </Menu>
    </div>
  )
}
