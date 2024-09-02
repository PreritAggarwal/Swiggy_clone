import React from 'react';
import HotelCard from './HotelCard';
import { Link } from 'react-router-dom';

import '../Style/HotelGrid.css'; 

const HotelGrid = ({ hotels }) => {
  return (
    <Link to='/resturant' className="hotel-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
    <div className="hotel-grid">
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
    </Link>
  );
};

export default HotelGrid;
