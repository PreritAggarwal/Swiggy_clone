import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bikeimg from '../../Assets/Images/images.png';

const Cart_content = ({ cartItems = [] }) => {
  const navigate = useNavigate();
  const [itemQuantities, setItemQuantities] = useState(cartItems.map(() => 1));

  const handleButtonClick = () => {
    navigate('/');
  };

  const handleIncrease = (index) => {
    setItemQuantities((prevQuantities) =>
      prevQuantities.map((quantity, i) => (i === index ? quantity + 1 : quantity))
    );
  };

  const handleDecrease = (index) => {
    setItemQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      } else {
        newQuantities.splice(index, 1);
        cartItems.splice(index, 1);
      }
      return newQuantities;
    });
  };

  const imageUrls = 'https://th.bing.com/th/id/OIP.xtsx5oWiAk5zfU9VjFTNOQHaG3?w=197&h=183&c=7&r=0&o=5&pid=1.7';

  return (
    <div className="flex flex-col items-center gap-2">
      {cartItems.length === 0 ? (
        <>
          <div className="flex items-center justify-center w-full pt-36">
            <img src={imageUrls} alt="cart empty" className="h-64" />
          </div>
          <h3 className="mb-0">Your Cart is empty</h3>
          <div>You can go to the home page to view more restaurants</div>
          <button
            className="bg-orange-600 text-white py-4 px-6 rounded"
            onClick={handleButtonClick}
          >
            SEE RESTAURANTS NEAR YOU
          </button>
        </>
      ) : (
        <div >
          <h3 className='font-bold underline mt-20'>Order Summary</h3>
          <div className="flexjustify-between items-center mt-8">
            <div className="flex-1 mr-8 border border-gray-300 p-4">
              <ul className="list-none p-0">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    {item.name} - {item.description}
                    <div className="flex items-center">
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => handleDecrease(index)}
                      >
                        -
                      </button>
                      <span className="mx-4">{itemQuantities[index]}</span>
                      <button
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => handleIncrease(index)}
                      >
                        +
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4 ml-8">
              <img src={bikeimg} alt="bike" className="w-full h-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart_content;
