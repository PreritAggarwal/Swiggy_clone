// src/Component/SearchBar.js
import React, { useState, useEffect } from "react";
import data from "./data.json";
import '../Style/SearchBar.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm === "") {
      setSuggestions([]);
      return;
    }

    const searchTermLower = searchTerm.toLowerCase();
    
    // Filter foods and restaurants based on the search term
    const foodSuggestions = data.foods.filter(food =>
      food.toLowerCase().includes(searchTermLower)
    );

    const restaurantSuggestions = data.restaurants.filter(restaurant =>
      restaurant.toLowerCase().includes(searchTermLower)
    );

    // Combine and deduplicate suggestions
    const combinedSuggestions = [
      ...new Set([...foodSuggestions, ...restaurantSuggestions])
    ];

    setSuggestions(combinedSuggestions);
  }, [searchTerm]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for food or restaurant..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <ul className="suggestions-list">
          {suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <li key={index}>{item}</li>
            ))
          ) : (
            <li>No suggestions found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
