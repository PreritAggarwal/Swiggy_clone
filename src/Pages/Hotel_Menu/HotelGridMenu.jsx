import React from 'react';
import FoodCard from './FoodCard';

function HotelGrid({ hotels, addToCart }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {hotels.length > 0 ? (
        hotels.map((hotel, index) => (
          <FoodCard
            key={index}
            name={hotel.name}
            image={hotel.image}
            price={hotel.price}
            
            addToCart={() => addToCart(hotel)} 
          />
        ))
      ) : (
        <p>No menu items available</p>
      )}
    </div>
  );
}

export default HotelGrid;
