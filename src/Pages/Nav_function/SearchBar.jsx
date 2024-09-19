import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../SEarchbar_Restaurant_list/Restaurant_list';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../Component/Header';
import Footer from '../../Component/Footer';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract data from location.state if available
  useEffect(() => {
    if (location.state) {
      setRestaurants(location.state.restaurants || []);
    }
  }, [location.state]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      setLoading(true);
      try {
        // Call the API to search for menu items by name
        const response = await axios.get('http://localhost:5000/api/searchbar/search-restaurants', {
          params: { menuItemName: searchTerm }
        });

        const restaurantResults = response.data;
        setRestaurants(restaurantResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCardClick = (restaurantId) => {
    navigate(`/resturant/menu-items/${restaurantId}`);
  };

  return (
    <>
      <Header />
      <div className="  p-4 py-9">
        <div className="flex justify-center  my-6 ">
          <form onSubmit={handleSubmit} className="flex w-full max-w-lg">
            <input
              type="text"
              placeholder="Search for dishes..."
              value={searchTerm}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded-r-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center justify-center"
            >
              <i className="fas fa-search text-white"></i>
            </button>
          </form>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-wrap justify-center gap-4">
            {restaurants.length > 0 ? (
              restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  className="cursor-pointer"
                  onClick={() => handleCardClick(restaurant.id)}
                >
                  <RestaurantCard restaurant={restaurant} />
                </div>
              ))
            ) : (
              <p>No matching restaurants found.</p>
            )}
          </div>
        )}
      </div>
      <div className='mt-72 border border-3 border-red-800'>
      <Footer />
      </div>
    </>
  );
};

export default SearchBar;
