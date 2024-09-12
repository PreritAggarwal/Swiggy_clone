// SearchBar.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchTerm.trim()) {
        try {
            // Call the API to search for menu items by name
            const response = await axios.get('http://localhost:5000/api/searchbar/search-restaurants', {
                params: { menuItemName: searchTerm }
            });

            const restaurants = response.data;

            if (restaurants.length > 0) {
                // Redirect to the restaurant page based on the first matching restaurant's ID
                navigate(`/resturant/menu-items/${restaurants[0].id}`);
            } else {
                console.log('No matching restaurants found');
                // Optionally handle no results found (e.g., show a message to the user)
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
            // Optionally handle the error (e.g., show an error message)
        }
    }
};
  return (
    <div className="flex justify-center my-6">
      <form onSubmit={handleSubmit} className="flex w-full max-w-lg">
        <input
          type="text"
          placeholder="Search for restaurants or dishes..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded-r-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
