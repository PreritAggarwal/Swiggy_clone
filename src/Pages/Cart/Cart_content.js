import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bikeimg from '../../Assets/Images/images.png';
import axios from 'axios';

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

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item, index) => {
      const itemPrice = parseFloat(item.price) || 0;
      return total + itemPrice * itemQuantities[index];
    }, 0);
  };

  const handlePlaceOrder = async () => {
    const totalPrice = calculateTotalPrice();
  
    try {
      // Fetch the order details from the backend
      const res = await axios.post('http://localhost:5000/payment/orders', { amount: totalPrice });
  
      const { amount, id: order_id, currency } = res.data;
  
      // Load the Razorpay checkout script
      const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  
      if (!scriptLoaded) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
  
      // Check if Razorpay object is available
      if (window.Razorpay) {
        // Configure Razorpay options
        const options = {
          key: 'rzp_test_EJPws2xdPpXtLq', // Enter the Key ID generated from the Dashboard
          amount: amount.toString(),
          currency: currency,
          name: 'Swiggy Clone',
          description: 'Test Transaction',
          order_id: order_id,
          handler: async function (response) {
            const data = {
              orderCreationId: order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
  
            try {
              const result = await axios.post('http://localhost:5000/payment/success', data);
              alert(result.data.msg);
            } catch (error) {
              console.error('Payment success handling error:', error);
              alert('There was an error processing the payment confirmation.');
            }
          },
          prefill: {
            name: 'Soumya Dey',
            email: 'SoumyaDey@example.com',
            contact: '9999999999',
          },
          notes: {
            address: 'Soumya Dey Corporate Office',
          },
          theme: {
            color: '#61dafb',
          },
        };
  
        // Open Razorpay payment window
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } else {
        alert("Razorpay SDK is not loaded correctly.");
      }
    } catch (error) {
      console.error('Payment Error:', error);
      alert('There was an error processing your payment.');
    }
  };
  
  // Function to dynamically load the Razorpay checkout script
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => reject(new Error(`Script load error for ${src}`));
      document.body.appendChild(script);
    });
  }
  

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
        <div>
          <h3 className="font-bold underline mt-20">Order Summary</h3>
          <div className="flex justify-between items-center mt-8">
            <div className="flex-1 mr-8 border border-gray-300 p-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b-2 p-2">Item</th>
                    <th className="border-b-2 p-2">Price</th>
                    <th className="border-b-2 p-2">Quantity</th>
                    <th className="border-b-2 p-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => {
                    const itemPrice = parseFloat(item.price) || 0;
                    return (
                      <tr key={index}>
                        <td className="p-2 border-b">{item.name}</td>
                        <td className="p-2 border-b">Rs.{itemPrice.toFixed(2)}</td>
                        <td className="p-2 border-b">
                          <div className="flex items-center">
                            <button
                              className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
                              onClick={() => handleDecrease(index)}
                            >
                              -
                            </button>
                            <span className="mx-4">{itemQuantities[index]}</span>
                            <button
                              className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700"
                              onClick={() => handleIncrease(index)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="p-1 border-b">
                          Rs.{(itemPrice * itemQuantities[index]).toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="p-2 text-right font-bold">Total:</td>
                    <td colSpan="2" className="p-0 font-bold">Rs.{calculateTotalPrice().toFixed(2)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="p-4 ml-8">
              <img src={bikeimg} alt="bike" className="w-full h-auto" />
            </div>
          </div>
          <div>
            <button
              className="px-3 py-1 ml-36 bg-orange-600 text-white rounded hover:bg-orange-700"
              onClick={handlePlaceOrder}
            >
              Place order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart_content;
