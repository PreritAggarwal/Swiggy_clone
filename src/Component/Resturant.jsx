import React from 'react';
import '../Style/Resturant.css';
import Header from './Header';
import hotelImage from '../hotelimage.json';
import HotelGrid from './HotelGridMenu';
import Footer from './Footer';
 
function Resturant({ addToCart }) {
  return (
<>
<Header />
<div className='Resturant_main'>
<div className='head_res'>
<h1>Chinese Wok</h1>
</div>
<div className='box1_res'>
<p>4.2 - 250 for two</p>
<p>Chinese</p>
<p>Outlet Kirti Nagar</p>
<p>25-30 min</p>
</div>
<div className='head_two_res'>MENU</div>
<div className='menu_item'>
<HotelGrid hotels={hotelImage} addToCart={addToCart} />
</div>
</div>
<Footer />
</>
  );
}
 
export default Resturant;