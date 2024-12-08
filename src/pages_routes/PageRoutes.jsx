import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Header from '../components/Header';
import BottomNav from '../bottom_nav/BottomNav';
import Details from '../pages/product_details/Details';
import Signin from '../pages/user_auth/Signin';
import Sign_up from '../pages/user_auth/Sign_up';
import Footer from '../components/footer/Footer';
import Private_Routes from '../components/private_routes/Private_Routes';
import ContactUs from '../pages/ContactUs';
import UserProfile from '../pages/profile/UserProfile';
import Womens_Wear from '../pages/Womens_Wear';
import Mens_Wear from '../pages/Mens_Wear';
import NotFound from '../pages/NotFound';
import Carts_Page from '../pages/cartsPage/Carts_Page';
import Wishlist_Page from '../pages/wishlist_page/Wishlist_Page';
import Men_Clothing_page from '../pages/clothing_page/Men_Clothing_page';
import Women_Clothing_page from '../pages/clothing_page/Women_Clothing_page';
import Admin_Login from './admin/Admin_Login';
import Admin_dashboard from './admin/Dashboards/Admin_dashboard';
import Forgot_password from './admin/Forgot_password';
import Reset_password from './admin/Reset_password';
import User_forgotten_password from './user/User_forgotten_password';
import User_reset_password from './user/User_reset_password';
import Create_products from './admin/create_products/Create_products';
import Update_product from './admin/create_products/Update_product';
import Items from './admin/Dashboards/Items';
import Fashion from './Fashion';
import Shirt from '../pages/shirts/Shirt';
import Bags_page from '../pages/Bags/Bags_page';
import Shoes_page from '../pages/Bags/Shoes/Shoes_page';
import Jewellery_page from '../pages/Jewellery/Jewellery_page';

export default function PageRoutes() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route element={<Private_Routes/>}>
          <Route path='/product-details/:proId' element={<Details/>}/>
        </Route>
        <Route element={<Private_Routes/>}>
          <Route path='/profile/:userID' element={<UserProfile/>}/>
        </Route>
        <Route element={<Private_Routes/>}>
          <Route path='/view-carts' element={<Carts_Page/>}/>
        </Route>
        <Route element={<Private_Routes/>}>
          <Route path='/view-wishlist' element={<Wishlist_Page/>}/>
        </Route>
        <Route element={<Private_Routes/>}>
          <Route path="/mens-clothing" element={<Men_Clothing_page/>}/>
        </Route>
        <Route element={<Private_Routes/>}>
          <Route path="/womens-clothing" element={<Women_Clothing_page/>}/>
        </Route>
        <Route path="/fashion" element={<Fashion/>}/>
        <Route path="/shirts" element={<Shirt/>}/>
        <Route path="/bags" element={<Bags_page/>}/>
        <Route path="/shoes" element={<Shoes_page/>}/>
        <Route path="/jewellery" element={<Jewellery_page/>}/>
        
        <Route path="/womenswear" element={<Womens_Wear/>}/>
        <Route path="/menswear" element={<Mens_Wear/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Sign_up/>}/>
        <Route path='/forgot-password' element={<User_forgotten_password/>}/>
        <Route path='/user/forgot-password/reset-password/:token' element={<User_reset_password/>}/>

        <Route path='/contact' element={<ContactUs/>}/>

        <Route path="/admin-login" element={<Admin_Login/>}/>
        <Route path="/admin-dashboard" element={<Admin_dashboard/>}/>
        <Route path="/admin-login/forgot-password" element={<Forgot_password/>}/>
        <Route path="/admin-login/forgot-password/reset-pssword/:token" element={<Reset_password/>}/>

        {/* products routes */}
        <Route path="/admin/create-products" element={<Create_products/>}/>
        <Route path="/admin/update-products/:id" element={<Update_product/>}/>
        <Route path="/admin/items" element={<Items/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Routes>
      {/* <BottomNav/> */}
      {/* <Footer/> */}
    </Router>
  )
}
