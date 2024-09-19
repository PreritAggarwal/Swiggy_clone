import React from 'react';

const HotelCard = ({ hotel }) => {


  return (
    <div className=" w-full  p-4 border border-gray-200 rounded-lg overflow-hidden shadow-md bg-white transition-transform duration-300 hover:scale-105" style={{ margin: 10 }}>
      <img src={hotel.image} alt={hotel.name} className="w-full h-40 object-cover " />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-nowrap truncate">{hotel.name}</h3>
        <p className="text-sm text-gray-600 text-nowrap truncate ">{hotel.description}</p>
      </div>
    </div>
  );
};

export default HotelCard;
