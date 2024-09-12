import React  from 'react';
import { Link , useNavigate } from 'react-router-dom';

function FoodCard({ id, name, image, price, addToCart }) {
  const navigate = useNavigate();
  const handleAddToCart = (event) => {
    event.stopPropagation(); 
    addToCart({ id, name, image, price });
   navigate('/cart')

  };

  return (
    <div className="relative flex items-center rounded-lg overflow-hidden shadow-md m-4 w-[60vw] h-52">
      <Link to={`/restaurant/${id}`} className="flex flex-1">
        <div className="flex flex-col justify-center p-4 flex-1">
          <h3 className="text-xl font-bold m-0">{name}</h3>
          <p className="text-gray-600 mt-2">Rs. {price}</p>
        </div>
        <div className="relative w-44 h-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
      </Link>
      <button
        className="absolute bottom-4 right-7 bg-orange-600 text-white rounded px-4 py-2 text-sm hover:bg-orange-500"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

export default FoodCard;
