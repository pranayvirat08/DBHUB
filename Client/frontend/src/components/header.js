import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import MySQL from '.././logos/MySQL.png'
import PostgresSQL from '.././logos/Postgresql.png'
import AWS from '.././logos/AWS-logo-2.jpg'
import mongodb from '.././logos/mongodb.png'
import './ManageConnections/style.css'
import {Link} from "react-router-dom"
const Header = () => {
  return (
    <div style={{
      display: 'block', width: '50%', padding: 20, height: '20%',
      margin: 'auto', marginTop: '5%', marginBottom: '5%', borderRadius: 10, boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'

    }}>

      <Carousel style={{
        width: '100%',
      }} className='car'>
        <Carousel.Item interval={1500}>
          <Link  to='/mysql'>
            <img
             
              src={MySQL}
              alt="Image One"
            />
          </Link>

         
        </Carousel.Item>
        <Carousel.Item interval={1500}>
        <Link  to='/postgresql'>
          <img
            className="d-block w-100"
            src={PostgresSQL}
            alt="Image One"
          />
          </Link>
        
        </Carousel.Item>
        <Carousel.Item interval={1500}>
        <Link  to='/aws'>
          <img
            className="d-block w-100"
            src={AWS}
            alt="Image One"
          />
          </Link>
          <Carousel.Caption>
            <h3 styles={{ bg: "red" }}>AWS</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
        <Link  to='/mongodb'>
          <img
            className="d-block w-100"
            src={mongodb}
            alt="Image One"
          />
          </Link>
         
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Header;