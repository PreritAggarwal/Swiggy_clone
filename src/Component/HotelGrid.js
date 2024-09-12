import React, { useEffect, useState } from 'react';
import HotelCard from './HotelCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HotelGrid = () => {
  const [hotels, setHotels] = useState([]);

  // Fetch the hotel data when the component loads
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/restaurants');
        setHotels(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {hotels.length > 0 ? (
        hotels.map((hotel, index) => (
          <Link
            to={`/resturant/menu-items/${hotel.id}`} 
            className="no-underline text-inherit"
            key={index}
          >
            <HotelCard hotel={hotel} />
          </Link>
        ))
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default HotelGrid;
