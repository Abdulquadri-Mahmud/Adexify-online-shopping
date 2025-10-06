// import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Details from '../pages/product_details/Details';
import Signin from '../pages/user_auth/Signin';
import Sign_up from '../pages/user_auth/Sign_up';
import Private_Routes from '../components/private_routes/Private_Routes';
import ContactUs from '../pages/ContactUs';
import NotFound from '../pages/NotFound';
import Carts_Page from '../pages/cartsPage/Carts_Page';
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
import ProductsByCategory from '../pages/ProductsByCategory/ProductsByCategory';
import ScrollToTop from '../components/scroll-to-top/ScrollToTop';
import SearchPage from '../pages/search_Page/Search_Page';
import NewArrival from '../pages/NewArrival';
import FashionDeals from '../pages/FashionDeals';
import GreateDeals from '../pages/GreateDeals';
import Fashion from '../pages/Fashion';
import Wishlist_Page from '../pages/wishlist_page/Wishlist_Page';
import CheckOutPage from '../pages/cartsPage/CheckoutPage/CheckOutPage';
import Profile from '../pages/profile/Profile';
import AddressManager from '../pages/profile/address/AddressManager';
import PaymentVerify from '../pages/cartsPage/CheckoutPage/PaymentVerify';
import UserOrders from '../pages/profile/order/UserOrders';

export default function PageRoutes() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route element={<Private_Routes/>}>
          <Route path='/profile' element={<Profile/>}/>
          <Route path="/my-orders" element={<UserOrders />} />
          <Route path="/order-details" element={<UserOrders />} />
          <Route path='/address' element={<AddressManager/>}/>
        </Route>
        <Route path='/product-details/:proId' element={<Details/>}/>

        <Route path='/view-carts' element={<Carts_Page/>}/>
        <Route path='/view-wishlist' element={<Wishlist_Page/>}/>
        <Route path='/checkout/summary' element={<CheckOutPage/>}/>
        <Route path="/payment/verify" element={<PaymentVerify />} />
        {/* <Route path="/mens-clothing" element={<Men_Clothing_page/>}/>
        <Route path="/womens-clothing" element={<Women_Clothing_page/>}/> */}
        <Route path="/category" element={<ProductsByCategory/>}/>

        <Route path="/fashion" element={<Fashion/>}/>
        <Route path="/new-arrival" element={<NewArrival/>}/>
        <Route path="/fashion-deals" element={<FashionDeals/>}/>
        <Route path="/greate-deals" element={<GreateDeals/>}/>
        
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Sign_up/>}/>
        <Route path='/forgot-password' element={<User_forgotten_password/>}/>
        <Route path='/user/forgot-password/reset-password/:token' element={<User_reset_password/>}/>

        <Route path='/search' element={<SearchPage/>}/>


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
