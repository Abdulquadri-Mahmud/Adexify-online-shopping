import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { FaCartShopping, FaNairaSign } from 'react-icons/fa6';
import { IoHeart } from 'react-icons/io5';
import { addToCart } from '../../store/cart/cartsReucer';
import { addWishlist } from '../../store/wishlists/Wishlists';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { Men_ClothingContext, ShirtsComp_Context } from '../../pages/clothing_page/Men_Clothing_page';

export default function ShirtsComp() {
    const product = useContext(ShirtsComp_Context);
    
    const toast = useToast({
        position: 'top'
    }); 

    const priceToLocalString = product.price.toLocaleString();
    
        const { currentUser } = useSelector((state) => state.user);
    
        let dispatch = useDispatch();
    
        const getCarts = {
            productID: product._id,
            productName: product.name,
            productImage : product.image,
            productPrice: product.price,
            userId : currentUser?._id,
            quantity: 1
        }
    
        const handleCart = () => {
          dispatch(addToCart(getCarts));
        }
    
        const handleWishlistItem = () => {
            dispatch(addWishlist(getCarts));
            
            toast({
                description: "Your item has been saved.",
                duration: 5000,
                isClosable: true,
                bgColor: 'green.500',
            });
        }

  return (
    <div className='relative bg-white p-2 rounded-xl shadow-md '>
        <Link to={`/product-details/${product._id}`}>
            <div className="flex justify-center pt-0 md:w-[200px] h-[170px] w-[140px] mx-auto">
                <img src={product.image ? product.image[0] : product.image} alt="" className='max-w-full  object-cover object-top'/>
            </div>
            <div className="w-full">
                <h2 className='py-1 font-medium md:text-center truncate'>{product.name}</h2>
            </div>
        </Link>
        <button onClick={handleWishlistItem} className=" text-white cursor-pointer hover:text-green-500 active:text-green-500 focus:text-green-500 absolute top-2 right-2 w-[30px] h-[30px] bg-green-500 flex justify-center items-center rounded-full">
            <IoHeart className='text-xl'/>
        </button>
        <p className="truncate">{product.description}</p>
        <div className="flex justify-between items-center mt-2">
            <p className='flex items-center'>
                <FaNairaSign/>
                <span className='font-medium'>{priceToLocalString}.00</span>
            </p>
            {
                product.oldprice && (
                    <p className="text-[14px] text-gray-400 font-medium pt-1 line-through flex items-center pl-3"><FaNairaSign className='text-[14px]'/>{product.oldprice}</p>
                )
            }
            {/* <button onClick={handleCart} className='w-[30px] h-[30px] bg-green-500 rounded-full flex justify-center items-center text-white'><FaCartShopping/></button> */}
        </div>
    </div>
  )
}
