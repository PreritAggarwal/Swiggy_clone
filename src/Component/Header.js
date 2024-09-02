import React, { useState }from 'react'
import logo from './th.jpg'
import '../Style/Header.css'
import { FaSearch, FaGift, FaLifeRing, FaSignInAlt, FaShoppingCart, FaBriefcase } from 'react-icons/fa';
import LocationModal from './LocationModal';
import { Link } from 'react-router-dom';


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return (
    <div className='header'>
      <div className='navbar'>
        <div className='logo'>
        <Link to ="/"> <img src= {logo} alt='logo' height={50}></img></Link>
          <h3 onClick={toggleModal}>Other</h3>                 
        </div>
        <div className='nav-content'>
        <ul className='list' >
          <li><FaBriefcase/>Swiggy Corporate</li>
          <Link to="/search" style={{ textDecoration: 'none', color: 'inherit' }}>
              <li><FaSearch /> Search</li>
            </Link>
          <li><FaGift />offers</li>
       <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>   <li><FaLifeRing />Help</li></Link>
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                <FaSignInAlt />Sign In
              </Link>
        <Link to="/cart">  <li><FaShoppingCart />cart</li></Link>
        </ul>
        </div>
      </div>
      <LocationModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>

  )
}

export default Header