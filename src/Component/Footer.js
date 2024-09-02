import React from 'react'
import '../Style/Footer.css'
import image from './footerimg.jpg'
const Footer = () => {
  return (
    <div className='footer_container'>
        <div>
        <ul className='lists' >
          <li><img src= {image} alt='logo' height={50}></img></li>
          <li>Swiggy Corporate</li>
          <li>© 2024 Bundl</li>
          <li>Technologies Pvt. Ltd</li>
        </ul>
        </div>
        <div>
        <ul className='lists'>
            
          <li>Company</li>
          <li>About</li>
          <li>Team</li>
          <li>Carrer</li>
          <li>Swiggy one</li>
          <li>Team</li>
          <li>Carrer</li>
          <li>Swiggy one</li>
        </ul>
        </div>
        <div>
        <ul className='lists'>
            
            <li>Company</li>
            <li>About</li>
            <li>Team</li>
            <li>Carrer</li>
            <li>Swiggy one</li>
            <li>Team</li>
            <li>Carrer</li>
            <li>Swiggy one</li>
            <li>Team</li>
            <li>Carrer</li>
            <li>Swiggy one</li>
          </ul>
        </div>
        <div>
        <ul className='lists'>
            
            <li>Company</li>
            <li>About</li>
            <li>Team</li>
            <li>Carrer</li>
            <li>Swiggy one</li>
            <li>Team</li>
            <li>Carrer</li>
           
          </ul>
        </div>
        </div>
        
  )
}

export default Footer