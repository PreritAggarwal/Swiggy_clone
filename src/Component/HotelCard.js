import React from 'react';
import '../Style/HotelCard.css'; 

const HotelCard = ({ hotel }) => {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} className="hotel-image" />
      <div className="hotel-info">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-description">{hotel.description}</p>
        <p className='hotel-id'></p>

      </div>
    </div>
  );
};

export default HotelCard;
