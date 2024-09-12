import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-0 right-10 bg-gray-500 bg-opacity-50 text-black p-2 rounded-full z-10"
    onClick={onClick}
  >
    <FaArrowRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-0 right-20 bg-gray-500 bg-opacity-50 text-black p-2 rounded-full z-10"
    onClick={onClick}
  >
    <FaArrowLeft />
  </button>
);

const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState([]); // Renamed to avoid conflict
  const [menuItemIds, setMenuItemIds] = useState([]); // To store menu item IDs
  const navigate = useNavigate(); // Hook for navigation

  // Fetch menu items from the backend
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/carousel/menu-items');
        setCarouselImages(response.data.map(item => item.image)); // Use response.data directly
        setMenuItemIds(response.data.map(item => item.id)); // Store IDs for navigation
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const onFoodItemClick = async (index) => {
    try {
      const menuItemId = menuItemIds[index]; // Get the correct ID based on index
      const response = await axios.get(`http://localhost:5000/api/carousel/menu-item/${menuItemId}`);
      const restaurantData = response.data;

      // Navigate to the restaurant details page
      navigate(`/resturant/menu-items/${restaurantData.id}`);
    } catch (error) {
      console.error('Error fetching restaurant details:', error);
    }
  };

  return (
    <div className="relative w-4/5 mx-auto py-5">
      <h2 className="mt-14 text-2xl font-bold">What's on your mind?</h2>
      <Slider {...settings}>
        {carouselImages.length > 0 ? (
          carouselImages.map((image, index) => (
            <div key={index} className="p-2">
              <img
                onClick={() => onFoodItemClick(index)} // Pass the index to get the ID
                src={image}
                alt={`Dish ${index}`}
                className="w-full rounded-lg cursor-pointer"
              />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </Slider>
    </div>
  );
};

export default Carousel;
