import React from 'react';
import image from '../Assets/Images/footerimg.jpg';

const Footer = () => {
  return (
    <div className="flex gap-x-48 items-center justify-evenly py-12 px-12 border-t-2 border-black bg-black text-white mt-auto">
      <div>
        <ul className="list-none">
          <li>
            <img src={image} alt="logo" className="h-12" />
          </li>
          <li>Swiggy Corporate</li>
          <li>© 2024 Bundl</li>
          <li>Technologies Pvt. Ltd</li>
        </ul>
      </div>
      <div>
        <ul className="list-none space-y-1">
          <li>Company</li>
          <li>About</li>
          <li>Team</li>
          <li>Career</li>
          <li>Swiggy One</li>
        </ul>
      </div>
      <div>
        <ul className="list-none space-y-1">
          <li>Company</li>
          <li>About</li>
          <li>Team</li>
          <li>Career</li>
          <li>Swiggy One</li>
        </ul>
      </div>
      <div>
        <ul className="list-none space-y-1">
          <li>Company</li>
          <li>About</li>
          <li>Team</li>
          <li>Career</li>
          <li>Swiggy One</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
