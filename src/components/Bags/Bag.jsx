import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaCartShopping, FaNairaSign } from 'react-icons/fa6';
import { useToast } from '@chakra-ui/react';
import { IoHeart } from 'react-icons/io5';
import { BagsProductsContext } from './Bags';
import { addWishlist } from '../../store/wishlists/Wishlists';
import { useDispatch } from 'react-redux';

export default function Bag() {
    const product = useContext(BagsProductsContext);
    const toast = useToast();
    const {_id,image, name, price, description} = product;
    const priceToLocalString = price.toLocaleString()
    
    const getCarts = {
      productID: _id,
      productName: name,
      productImage : image,
      productPrice: price,
      quantity: 1
    };

    const dispatch = useDispatch();
    
    const handleWishlistItem = () => {
      dispatch(addWishlist(getCarts));
      
      toast({
          description: "Your item has been saved.",
          duration: 5000,
          isClosable: true,
          bgColor: 'pink.500',
      });
  }
  
    return (
      <div className='bg-white p-2 rounded-xl shadow-md relative'>
        <Link to={`/product-details/${_id}`}>
            <div className="flex justify-center pt-0 md:w-[200px] h-[170px] w-[140px] mx-auto">
                <img src={image ? image[0] : image} alt="" className='max-w-full  object-cover object-top'/>
            </div>
            <div className="w-full">
                <h2 className='py-1 font-medium md:text-center truncate'>{name}</h2>
            </div>
        </Link>
        <button onClick={handleWishlistItem} className=" text-white cursor-pointer hover:text-pink-500 active:text-pink-500 focus:text-pink-500 absolute top-3 right-3 w-[30px] h-[30px] bg-gray-300 flex justify-center items-center rounded-full">
          <IoHeart className='text-xl'/>
        </button>
        <p className="truncate">{description}</p>
        <div className="flex justify-between items-center mt-2">
            <p className='flex items-center'>
                <FaNairaSign/>
                <span className='font-medium'>{priceToLocalString}</span>
            </p>
            {/* <button onClick={handleCart} className='w-[30px] h-[30px] bg-pink-500 rounded-full flex justify-center items-center text-white'><FaCartShopping/></button> */}
        </div>
      </div>
  )
}
