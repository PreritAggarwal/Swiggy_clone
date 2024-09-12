import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';
import HotelGrid from './HotelGridMenu';

function Resturant({ addToCart }) {
  const { restaurant_id } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (restaurant_id) {
      const fetchDetails = async () => {
        try {
          // Fetch restaurant details by ID
          const restaurantResponse = await axios.get(`http://localhost:5000/api/restaurants/${restaurant_id}`);
          setRestaurantDetails(restaurantResponse.data);

          // Fetch menu items by restaurant ID
          const menuResponse = await axios.get(`http://localhost:5000/api/menu-items/${restaurant_id}`);
          setMenuItems(menuResponse.data);
        } catch (error) {
          console.error('Error fetching details:', error);
          setError('Failed to fetch details.');
        }
      };

      fetchDetails();
    } else {
      setError('Invalid restaurant ID');
    }
  }, [restaurant_id]);

  return (
    <>
      <Header />
      <div className='flex flex-col items-center w-full h-full py-8'>
        {restaurantDetails ? (
          <>
            <div className='w-[62vw] h-[10vh]'>
              <h1 className='mt-14 text-3xl font-bold text-gray-800'>{restaurantDetails.name}</h1>
            </div>
            <div className='w-[60vw] h-[20vh] bg-white rounded-xl shadow-lg p-5 my-9'>
              {/* <p className='text-lg text-gray-700'>{restaurantDetails.rating} - {restaurantDetails.priceRange} for two</p>
              <p className='text-lg text-gray-700'>{restaurantDetails.cuisine}</p>
              <p className='text-lg text-gray-700'>{restaurantDetails.location}</p> */}
              <p className='text-lg text-gray-700'>{restaurantDetails.description}</p>
            </div>
          </>
        ) : (
          <p>Loading restaurant details...</p>
        )}
        <div className='text-xl font-bold text-gray-800 mb-5'>
          MENU
        </div>
        <div className='w-full'>
          {error ? <p className='text-red-600'>{error}</p> : <HotelGrid hotels={menuItems} addToCart={addToCart} />}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Resturant;
