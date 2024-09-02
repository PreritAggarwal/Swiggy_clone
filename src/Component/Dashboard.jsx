import React from 'react';
import Header from './Header.js';
import carouselImages from '../carousalimage.json';
import hotelimage from '../hotelimage.json';
import HotelGrid from './HotelGrid.js';
import Carousel from './Carousel.js';
import Footer from './Footer.js';


function Dashboard () {
    const imageUrls = carouselImages.map(item => item.image);

    return(
        <>
        
          <Header />
          <Carousel images={imageUrls} />
          <HotelGrid hotels={hotelimage} /> 
          <Footer />
        </>
    )
}

export default Dashboard;