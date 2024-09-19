import React, { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
import axios from 'axios';

const LocationModal = ({ isOpen, onClose }) => {
  const [manualLocation, setManualLocation] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const { isGeolocationAvailable, isGeolocationEnabled, coords } = useGeolocated();

  const fetchPlaceName = async (latitude, longitude) => {
    try {
      const apiKey = 'YOUR_MAPBOX_API_KEY';  // Replace with your Mapbox API key
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${apiKey}`;
      const response = await axios.get(url);
      const features = response.data.features;
      if (features.length > 0) {
        setPlaceName(features[0].place_name);
        setError(null);
      } else {
        setError("Unable to retrieve place name.");
      }
    } catch (error) {
      console.error("Error fetching place name:", error);
      setError("Error fetching place name.");
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }
    try {
      const apiKey = 'YOUR_MAPBOX_API_KEY';  // Replace with your Mapbox API key
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${apiKey}`;
      const response = await axios.get(url);
      if (response.data && response.data.features) {
        setSuggestions(response.data.features);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setError("Error fetching suggestions.");
    }
  };

  const handleGetLocation = () => {
    if (isGeolocationAvailable && isGeolocationEnabled && coords) {
      fetchPlaceName(coords.latitude, coords.longitude);
    } else {
      setError("Geolocation is not available or not enabled.");
    }
  };

  const handleManualChange = (event) => {
    const { value } = event.target;
    setManualLocation(value);
    fetchSuggestions(value);
  };

  const handleManualSelect = (place) => {
    setManualLocation(place.place_name);
    setPlaceName(place.place_name);
    setSuggestions([]);
  };

  const handleManualSearch = () => {
    setPlaceName(manualLocation);
    setError(null);
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96 relative'>
        <button
          className='absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg'
          onClick={onClose}
        >
          ×
        </button>
        <h2 className='text-xl font-semibold text-orange-600 mb-4'>Search for a Location</h2>
        {isGeolocationAvailable && isGeolocationEnabled ? (
          <div className='mb-4'>
            <button
              className='bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600'
              onClick={handleGetLocation}
            >
              Get Current Location
            </button>
            {placeName && <p className='mt-2 text-gray-700'>Current Location: {placeName}</p>}
          </div>
        ) : (
          <p className='text-red-500'>Geolocation is not available or not enabled.</p>
        )}
        <div className='mt-4'>
          <input
            type="text"
            placeholder="Enter location manually"
            value={manualLocation}
            onChange={handleManualChange}
            className='w-full p-2 border border-gray-300 rounded-lg'
          />
          {suggestions.length > 0 && (
            <ul className='border border-gray-300 mt-2 max-h-40 overflow-y-auto bg-white'>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className='p-2 cursor-pointer hover:bg-gray-100'
                  onClick={() => handleManualSelect(suggestion)}
                >
                  {suggestion.place_name}
                </li>
              ))}
            </ul>
          )}
          <button
            className='mt-2 bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600'
            onClick={handleManualSearch}
          >
            Search
          </button>
          {placeName && <p className='mt-2 text-gray-700'>Selected Location: {placeName}</p>}
          {error && <p className='mt-2 text-red-500'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default LocationModal;
