import React from 'react';
import logo from './th.jpg';
import '../Style/Header.css';
import { FaLifeRing, FaSignInAlt, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
 
const Cart_nav = ({ cartItems = [] }) => {
  return (
<div className='header'>
<div className='navbar'>
        {/* Logo and Checkout Title */}
<div className='logo'>
<Link to ="/"><img src={logo} alt='logo' height={50} /></Link>
<h3>SECURE CHECKOUT</h3>
</div>
 
        {/* Navigation Links */}
<div className='nav-content'>
<ul className='list'>
            {/* Help Link */}
<li>
<FaLifeRing /> Help
</li>
            {/* Sign In Link */}
<li>
<Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
<FaSignInAlt /> Sign In
</Link>
</li>
 
<li>
<Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
<FaShoppingCart /> Cart ({cartItems.length})
</Link>
</li>
</ul>
</div>
</div>
</div>
  );
}
 
export default Cart_nav;