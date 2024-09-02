import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/FoodCard.css'; 

function FoodCard({ name, image, description, addToCart }) {
  const navigate = useNavigate(); 

 
  const handleAddToCart = () => {
    addToCart({ name, image, description }); 
    navigate('/cart'); 
  };

  return (
    <div className="food-card">
      <div className="food-card-info">
        <h3 className="food-card-title">{name}</h3>
        <p className="food-card-description">{description}</p>
      </div>
      <div className="food-card-image-container">
        <img src={image} alt={name} className="food-card-image" />
        
        <button className="food-card-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
