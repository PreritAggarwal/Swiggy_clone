import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-20 left-full  bg-gray-500 bg-opacity-50 text-black p-2 rounded-full z-10"
    onClick={onClick}
  >
    <FaArrowRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-20 right-full bg-gray-500 bg-opacity-50 text-black p-2 rounded-full z-10"
    onClick={onClick}
  >
    <FaArrowLeft />
  </button>
);

const Carousel = () => {
  const [carouselImages, setCarouselImages] = useState([]);
  const [menuItemNames, setMenuItemNames] = useState([]);
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  // Fetch menu items from the backend for the carousel
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/carousel/menu-items');
        setCarouselImages(response.data.map(item => item.image));
        setMenuItemNames(response.data.map(item => item.name));
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  // Handle carousel item click, search for restaurants, and navigate with data
  const onFoodItemClick = async (index) => {
    const menuItemName = menuItemNames[index]; // Get the name of the clicked menu item
    if (menuItemName) {
      try {
        // Call the search API with the menu item name
        const response = await axios.get('http://localhost:5000/api/searchbar/search-restaurants', {
          params: { menuItemName }
        });

        const restaurants = response.data;

        // Navigate to the search page with the search results
        navigate('/search', { state: { menuItemName, restaurants } }); // Pass the data using the `state` prop
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

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

  return (
    <div className="relative w-4/5 mx-auto py-5">
      <h2 className="mt-14 text-2xl font-bold">What's on your mind?</h2>
      <Slider {...settings}>
        {carouselImages.length > 0 ? (
          carouselImages.map((image, index) => (
            <div key={index} className="p-2">
              <img
                onClick={() => onFoodItemClick(index)} // Pass the index to get the menu item name
                src={image}
                alt={`Dish ${index}`}
                className="w-screen rounded-lg cursor-pointer "
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
