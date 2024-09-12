import React from 'react';


const HotelCard = ({ hotel }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-105">
      <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{hotel.name}</h3>
        <p className="text-sm text-gray-600">{hotel.description}</p>
      </div>
    </div>
  );
};

export default HotelCard;
