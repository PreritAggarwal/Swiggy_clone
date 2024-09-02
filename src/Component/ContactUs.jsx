import React from 'react';
import '../Style/ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <div className="contact-info-box">
        <h2>Swiggy</h2>
        <p>
          <strong>Phone:</strong> +1 234 567 8901
        </p>
        <p>
          <strong>Email:</strong> support@swiggy.com
        </p>
        <p>
          <strong>Address:</strong> 123 Food Street, Restaurant City, Foodland, FL 12345
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
