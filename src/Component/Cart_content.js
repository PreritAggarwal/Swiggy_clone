import React , {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/Cart_content.css';
import bikeimg from '../Component/images.png';
 
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
<div className='container'>
      {cartItems && cartItems.length === 0 ? (
<>
<div className='img_container'>
<img src={imageUrls} alt="cart empty" height={250} className='image' />
</div>
<h3>Your Cart is empty</h3>
<div>You can go to the home page to view more restaurants</div>
<button className='check' onClick={handleButtonClick}>SEE RESTAURANTS NEAR YOU</button>
</>
      ) : (
<div >
<h3>Order Summary</h3>
<div className='order-summary'>
<div className='order-content'>
<ul className='order-list'>
    {cartItems.map((item, index) => (
    <li key={index}>{item.name} - {item.description} 
     <div className='button'>
                      <button onClick={() => handleDecrease(index)}>-</button>
                      <span>{itemQuantities[index]}</span>
                      <button onClick={() => handleIncrease(index)}>+</button>
      </div>
     </li>
   ))}
</ul>
</div>
<div className='img'>
<img src ={bikeimg} alt='photo' height={500}></img>
</div>
</div>
</div>
      )}
</div>
  );
};
 
export default Cart_content;