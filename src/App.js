import './App.css';
import Header from './Component/Header.js';
import Footer from './Component/Footer.js';
import Carousel from './Component/Carousel.js';
import HotelGrid from './Component/HotelGrid.js';
import carouselImages from './carousalimage.json';
import hotelimage from './hotelimage.json'; // Import the JSON file
import Dashboard from './Component/Dashboard.jsx';
import Login from './Component/Login.jsx';
import Signup from './Component/Signup.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Resturant from './Component/Resturant.jsx';
import SearchBar from './Component/SearchBar.jsx';
import ContactUs from './Component/ContactUs.jsx';
import Cart from './Component/Cart.js';
import { useState } from 'react';
 import Contact from './Component/ContactUs.jsx'
 
function App() {
  const imageUrls = carouselImages.map(item => item.image);
  const [cartItems, setCartItems] = useState([]);
 
  const addToCart = (item) => {
    setCartItems(prevItems => [...prevItems, item]);
  };
 
  return (
<Router>
<div className="App">
<Routes>
<Route path="/" element={<Dashboard addToCart={addToCart} />} />
<Route path="/signup" element={<Signup />} />
<Route path="/login" element={<Login />} />
<Route path="/search" element={<SearchBar />} />
<Route path="/resturant" element={<Resturant addToCart={addToCart} />} />
<Route path="/contact" element={<ContactUs />} />
<Route path="/cart" element={<Cart cartItems={cartItems} />} />


</Routes>
</div>
</Router>
  );
}
 
export default App;

