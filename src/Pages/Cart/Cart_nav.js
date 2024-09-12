import React from 'react';
import logo from '../../Assets/Images/th.jpg';
import { FaLifeRing, FaSignInAlt, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Cart_nav = ({ cartItems = [] }) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex justify-between items-center px-10 rounded-lg">
       
        <div className="flex items-center gap-x-6">
          <Link to="/">
            <img src={logo} alt="logo" className="h-12" />
          </Link>
          <h3 className="cursor-pointer font-bold">SECURE CHECKOUT</h3>
        </div>

        
        <nav>
          <ul className="flex items-center gap-x-8">
           
            <li className="flex items-center gap-2">
              <FaLifeRing />
              <span>Help</span>
            </li>
            
            <li className="flex items-center gap-2">
              <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
                <FaSignInAlt />
                <span>Sign In</span>
              </Link>
            </li>
            
            <li className="flex items-center gap-2">
              <Link to="/cart" className="flex items-center gap-2 text-gray-700 hover:text-blue-500">
                <FaShoppingCart />
                <span>Cart ({cartItems.length})</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Cart_nav;
