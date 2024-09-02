import React from 'react';
import '../Style/LocationModal.css';

const LocationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='close-btn' onClick={onClose}>×</button>
        <h2>Search for a Location</h2>
        <input type="text" placeholder="Enter location" />
        <button className='search-btn'>Search</button>
      </div>
    </div>
  );
};

export default LocationModal;
