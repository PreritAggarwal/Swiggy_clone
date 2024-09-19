import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard/Dashboard.jsx';
import Login from '../Pages/Nav_function/Login.jsx';
import Signup from '../Pages/Nav_function/Signup.jsx';
import Resturant from '../Pages/Hotel_Menu/Resturant.jsx';
import SearchBar from '../Pages/Nav_function/SearchBar.jsx';
import Cart from '../Pages/Cart/Cart.js';
import ForgotPassword from '../Pages/Nav_function/ForgotPassword.js';
import ResetPassword from '../Pages/Nav_function/ResetPassword.js';
import Admin_login from '../Pages/Admin/Admin_login.js';
import Admin_signup from '../Pages/Admin/Admin_signup.js';
import Admin_forgotpassword from '../Pages/Admin/Admin_forgotpassword.js';
import Admin_resetp from '../Pages/Admin/Amin_resetp.js';
import Welcome from '../Pages/Admin_func/Welcome.js'
import Add_restaurant from '../Pages/Admin_func/Add_restaurant.js';
import Edit_restaurant from '../Pages/Admin_func/Edit_restaurant.js';
// import Payment from '../Pages/Cart/Payment.js';

const AppRoutes = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };

  return (
    <Routes>
      <Route path="/" element={<Dashboard addToCart={addToCart} />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/search" element={<SearchBar />} />
      <Route path="/resturant/menu-items/:restaurant_id" element={<Resturant addToCart={addToCart} />} />
      <Route path="/cart" element={<Cart cartItems={cartItems} />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/admin-login" element={<Admin_login/>} />  
      <Route path="/admin-signup" element={<Admin_signup/>} /> 
      <Route path="/admin-ForgotPassword" element={<Admin_forgotpassword />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />
      <Route path="/admin-resetpassword/:token" element={<Admin_resetp />} />
      <Route path='/welcome' element={<Welcome/>}/>
      <Route path='/add-restaurant' element={<Add_restaurant/>}/>
      <Route path= '/edit-restaurant' element={<Edit_restaurant/>}/>
      {/* <Route path='/payment' element={<Payment/>}/> */}
    </Routes>
  );
};

export default AppRoutes;
