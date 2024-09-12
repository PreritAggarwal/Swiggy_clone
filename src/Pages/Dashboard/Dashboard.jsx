import React from 'react';
import Header from '../../Component/Header.js';
import HotelGrid from '../../Component/HotelGrid.js';
import Carousel from '../../Component/Carousel.js';
import Footer from '../../Component/Footer.js';


function Dashboard () {
    
    return(
        <>
        
          <Header />
          <Carousel  />
          <HotelGrid  /> 
          <Footer />
        </>
    )
}

export default Dashboard;