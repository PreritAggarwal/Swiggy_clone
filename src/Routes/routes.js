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
      <Route path="/resetpassword/:token" element={<ResetPassword />} />
    </Routes>
  );
};

export default AppRoutes;
