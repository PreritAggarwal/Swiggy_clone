import React, { useState } from 'react';
import logo from '../Assets/Images/th.jpg';
import { FaSearch, FaGift, FaLifeRing, FaSignInAlt, FaShoppingCart, FaBriefcase } from 'react-icons/fa';
import LocationModal from '../Pages/Nav_function/LocationModal';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="fixed top-0 left-0 w-screen z-[1000] bg-white"> 
      <div className="navbar flex justify-between px-10  rounded-[10px] shadow-md items-center w-full"> 
        <div className="logo flex gap-x-6 items-center">
          <Link to="/">
            <img src={logo} alt="logo" className="h-12" />
          </Link>
          <h3 className="cursor-pointer font-bold" onClick={toggleModal}>Other</h3>
        </div>

        <div className="nav-content">
          <ul className="list flex items-center gap-x-12">
            <li className="flex items-center gap-2">
              <FaBriefcase /> Swiggy Corporate
            </li>
            <Link to="/search" className="no-underline text-inherit">
              <li className="flex items-center gap-2">
                <FaSearch /> Search
              </li>
            </Link>
            <li className="flex items-center gap-2">
              <FaGift /> Offers
            </li>
            <Link to="/contact" className="no-underline text-inherit">
              <li className="flex items-center gap-2">
                <FaLifeRing /> Help
              </li>
            </Link>
            <Link to="/login" className="no-underline text-inherit flex items-center gap-2">
              <FaSignInAlt /> Sign In
            </Link>
            <Link to="/cart" className="no-underline text-inherit">
              <li className="flex items-center gap-2">
                <FaShoppingCart /> Cart
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <LocationModal isOpen={isModalOpen} onClose={toggleModal} />
    </div>
  );
};

export default Header;