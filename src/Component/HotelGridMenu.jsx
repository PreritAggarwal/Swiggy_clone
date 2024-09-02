import React from 'react';
import FoodCard from './FoodCard';
import '../Style/HotelGridMenu.css';
 
function HotelGrid({ hotels, addToCart }) {
  return (
<div className="hotel-grid">
      {hotels.map((hotel, index) => (
<FoodCard
          key={index}
          name={hotel.name}
          image={hotel.image}
          description={hotel.description}
          addToCart={() => addToCart(hotel)} 
        />
      ))}
</div>
  );
}
 
export default HotelGrid;