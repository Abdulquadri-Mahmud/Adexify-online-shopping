import Hero from '../components/Hero'
import TopDeals from '../components/Top_Deals/TopDeals'
import TodaysDeal from '../components/TodaysDeal/TodaysDeal'
import Section1 from '../components/sections/Section1'
import { Box, } from '@chakra-ui/react'
import Home_banner2 from '../components/banners/Home_banner2'
// import Home_banner3 from '../components/banners/Home_banner3'
import Home_banner4 from '../components/banners/Home_banner4'
import MaleSalesBanner from '../components/banners/MaleSalesBanner'
import FemaleSalesBanner from '../components/banners/FemaleSalesBanner'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import Womens_wear from '../components/womens_wear/Womens_wear'
import Shoes from '../components/top_sneakers/Shoes'
import Jewelleries from '../Jewellery/Jewelleries'
import Banner from '../Jewellery/Banner'
import FashionXtraBanner from '../components/FashionXtra/FashionXtraBanner'

import Home_category from '../components/Bottom_Categories/Home_category'
import Adverts from '../components/Adverts/Adverts'
import Home_banner3 from '../components/banners/Home_banner3'
import Mens_wear from '../components/mens_wear/Mens_wear'

export default function Home() {

  return (
    <Box>
      <Header/>

      <Box pb={10} className='bg-zinc-200'>
        <Hero/>
        <Section1/>
        <TodaysDeal/>
        <Home_banner4/>
        
        <TopDeals/>
        <Home_banner2/>
        
        {/* Male sales banner */}
        <MaleSalesBanner/>
        <Mens_wear/>

        <Box my='10'/>
        {/* <Home_banner3/> */}
        {/* Male sales banner */}
        <FemaleSalesBanner/>

        <Womens_wear/>
        <FashionXtraBanner/>
        {/* <Bags/> */}
        <Shoes/>
        <Banner/>
        <Jewelleries/>
        <Box>
          <Box mt={10} mb={10}>
            <Home_category/>
          </Box>
        </Box>
        <Adverts/>
      </Box>
      <Footer/>
    </Box>
  )
}
