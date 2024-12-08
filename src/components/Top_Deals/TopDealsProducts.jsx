import React, { useContext } from 'react'
import { TopDealsProductsContext } from './TopDeals';
import { Link } from 'react-router-dom';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaCartShopping, FaNairaSign } from 'react-icons/fa6';
import { addWishlist } from '../../store/wishlists/Wishlists';
import { useToast } from '@chakra-ui/react';
import { IoHeart } from 'react-icons/io5';

export default function TopDealsProducts() {
  const product = useContext(TopDealsProductsContext);
  const toast = useToast();
  const {_id, deal, quantity, image, name, price, description} = product;
  const priceToLocalString = price.toLocaleString()
  
  const getCarts = {
    productID: _id,
    productName: name,
    productImage : image,
    productPrice: price,
    quantity: 1
  };

  const handleCart = () => {

  }
  const handleWishlistItem = () => {
    dispatch(addWishlist(getCarts));
    
    toast({
        description: "Your item has been saved.",
        duration: 5000,
        isClosable: true,
        bgColor: 'pink.600',
    });
}

  return (
    <div className='bg-white p-2 rounded-xl shadow-md relative'>
      <Link to={`/product-details/${_id}`}>
          <div className="flex justify-center pt-0 md:w-[200px] h-[170px] w-[140px] mx-auto">
              <img src={image} alt="" className='max-w-full  object-cover object-top'/>
          </div>
          <div className="w-full">
              <h2 className='py-1 font-medium md:text-center truncate'>{name}</h2>
          </div>
      </Link>
      <button onClick={handleWishlistItem} className=" text-white cursor-pointer hover:text-pink-600 active:text-pink-600 focus:text-pink-600 absolute top-3 right-3 w-[30px] h-[30px] bg-pink-300 flex justify-center items-center rounded-full">
        <IoHeart className='text-xl'/>
      </button>
      <p className="truncate">{description}</p>
      <div className="flex justify-between items-center mt-2">
          <p className='flex items-center'>
              <FaNairaSign/>
              <span className='font-medium'>{priceToLocalString}</span>
          </p>
          {/* <button onClick={handleCart} className='w-[30px] h-[30px] bg-pink-600 rounded-full flex justify-center items-center text-white'><FaCartShopping/></button> */}
      </div>
    </div>
  )
}
