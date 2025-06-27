import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

export default function Adverts() {
  return (
    <div>
        <Box maxW={{'2xl' : '80%', xl : '95%', lg : '100%', base: '97%'}} mx={'auto'} mt={10} bg={'white'} p={3} rounded={'md'}>
            <Box>
                <Heading fontWeight={500} fontSize={18}>Shop Men's and Women's Fashion at Affordable Prices on Adexify</Heading>
                <Text fontSize={12} mt={2}>Discover a wide range of cost-effective men's clothing options at Adexify. From fashionable shirts and t-shirts to comfortable sweaters, hoodies jeans and pants, we offer a diverse selection that caters to different styles and budgets. With our unbeatable prices and extensive range of clothing types, you can effortlessly update your wardrobe. Whether you're in search of formal attire, casual wear, or trendy fashion pieces, Adexify has everything you need. Start browsing our online store today and find the perfect clothing items to enhance your personal style.</Text>
            </Box>
            <Box my={4}>
                <Heading fontWeight={500} fontSize={18}>Explore Trendy Shirts and T-shirts for Men</Heading>
                <Text fontSize={12} mt={2}>Express your individual style with our collection of trendy shirts and t-shirts for men, available on Adexify. Whether you prefer casual t-shirts, timeless button-down shirts, or fashionable polo shirts, we have a wide variety to suit various occasions. Our affordable shirts and t-shirts are available in different colors, patterns, and sizes, ensuring a perfect fit and style that complements your unique taste. Start shopping now and discover the ideal tops to elevate your fashion game.</Text>
            </Box>
            <Box>
                <Heading fontWeight={500} fontSize={18}>Stay Cool and Stylish this Summer with Men's Clothing from Adexify</Heading>
                <Text fontSize={12} mt={2}>Upgrade your summer wardrobe with Adexify collection of men's clothing designed to keep you looking sharp and feeling comfortable in the heat. From lightweight t-shirts and stylish shorts to trendy swimwear and breezy shirts, we have everything you need to beat the summer heat in style. Explore our diverse range of colors, patterns, and designs that embrace the spirit of the season. Whether you're heading to the beach, attending a backyard barbecue, or simply enjoying outdoor activities, our men's clothing ensures you're dressed for the occasion. Shop now and elevate your summer fashion game with Adexify.</Text>
            </Box>
            <Heading fontSize={20} mt={6} mb={6}>Frequently Asked Questions (FAQs)</Heading>
            <Box mb={5}>
                <Heading fontWeight={500} fontSize={18}>What Payment Options are Available on Adexify?</Heading>
                <Text fontSize={12} mt={2}>You can either pay online or pay on delivery when you shop from us. You can conveniently pay online or on delivery with your cards (MasterCard, Visa and Verve), bank transfers and USSD.</Text>
            </Box>
            <Box mb={5}>
                <Heading fontWeight={500} fontSize={18}>Can I Return the Items I Bought From Adexify?</Heading>
                <Text fontSize={12} mt={2}>Yes, you can return items you bought for free and get refunded as soon as possible! We have a refund policy that grants you 7 days to return ALL eligible items bought from the official store on Adexify.</Text>
            </Box>
            <Box mb={5}>
                <Heading fontWeight={500} fontSize={18}>What Is the Jumia Customer Care Line?</Heading>
                <Text fontSize={12} mt={2}>We have a dedicated team that is always available to make sure your shopping experience on Adeixy is effortless. Simply dial 07047594667 to reach out to us for complaints and other inquiries. If you would like to place an order, please call us at 070-4759-4667. Whatever you do, we are always available to help.</Text>
            </Box>
            <Box mb={5}>
                <Heading fontWeight={500} fontSize={18}>How Can I Become a Seller on Adexify?</Heading>
                <Text fontSize={12} mt={2}>No, Adexify is just an online shopping where women and men can buy there fashion needs, and this is only meant for Adexify.</Text>
            </Box>
        </Box>
  </div>
  )
}
