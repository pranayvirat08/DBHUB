import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Carousel from 'react-bootstrap/Carousel';
import MySQL from '.././logos/MySQL.png'
import PostgresSQL from '.././logos/Postgresql.png'
import AWS from '.././logos/AWS-logo-2.jpg'
import mongodb from '.././logos/mongodb.png'
import './ManageConnections/style.css'
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
          <a  href='/mysql'>
            <img
             
              src={MySQL}
              alt="Image One"
            />
          </a>

         
        </Carousel.Item>
        <Carousel.Item interval={1500}>
        <a  href='/postgresql'>
          <img
            className="d-block w-100"
            src={PostgresSQL}
            alt="Image One"
          />
          </a>
        
        </Carousel.Item>
        <Carousel.Item interval={1500}>
        <a  href='/aws'>
          <img
            className="d-block w-100"
            src={AWS}
            alt="Image One"
          />
          </a>
          <Carousel.Caption>
            <h3 styles={{ bg: "red" }}>AWS</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={1500}>
        <a  href='/mongodb'>
          <img
            className="d-block w-100"
            src={mongodb}
            alt="Image One"
          />
          </a>
         
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default Header;