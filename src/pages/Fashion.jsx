import { Box, Heading } from '@chakra-ui/react';
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import { Link } from 'react-router-dom'
import Home_banner1 from '../components/banners/Home_banner1'
import TopDeals from '../components/Top_Deals/TopDeals'
import FashionXtra from '../components/FashionXtra/FashionXtra'
import Banner1 from '../components/FashionXtra/Banner1'
import Unisex from '../components/genders/Unisex'
import Top_sneakers from '../components/top_sneakers/Top_sneakers'
import FashionXtraBanner from '../components/FashionXtra/FashionXtraBanner'
import MaleSalesBanner from '../components/banners/MaleSalesBanner'
import FemaleSalesBanner from '../components/banners/FemaleSalesBanner'
import FashionCategory from '../components/Bottom_Categories/FashionCategory';

export default function Fashion() {

  return (
    <Box>
        <Header/>
        <Box pb={4} className='bg-zinc-200' pt={5}>
            <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} bg={'white'} py={2} mb={5}>
                <Heading fontWeight={500} fontSize={20} textAlign={'center'}>Fashion</Heading>
            </Box>
            <Box rounded={'md'} maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} py={3} mt={3} mb={5} className='bg-pink-500'>
                <Heading color={'white'} fontWeight={500} fontSize={20} textAlign={'center'} className='flex items-center gap-1 justify-center'>CALL TO ORDER 
                    <Link to={'tel:07047594667'}>07047594667</Link>
                </Heading>
            </Box>
            <Home_banner1/>
            <Box mt={6}>
                <FashionXtra/>
            </Box>

            {/* Male sales banner */}
            <FemaleSalesBanner/>
            <MaleSalesBanner/>

            <TopDeals/>
            <Banner1/>
            <Unisex/>
            <FashionXtraBanner/>
            {/* <Bags/> */}
            <Top_sneakers/>
            <MaleSalesBanner/>
            <FashionCategory/>
        </Box>
        <Footer/>
    </Box>
  )
}
