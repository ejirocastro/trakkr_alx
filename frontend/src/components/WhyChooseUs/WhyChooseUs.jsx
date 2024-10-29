import React from 'react';
import './WhyChooseUs.css';
import { FaShieldAlt, FaTachometerAlt, FaMobileAlt, FaThumbsUp } from 'react-icons/fa';

function WhyChooseUs()
{
  return (
    <section className="why-choose-us">
      <div className="container">
        <h2 className="section-title">Why Choose TrackIt?</h2>
        <div className="reasons-grid">
          <div className="reason-card">
            <div className="card-icon">
              <FaShieldAlt className="icon" />
            </div>
            <h3>High Security</h3>
            <p>With state-of-the-art encryption, we ensure your IP tracking data is secure and protected at all times.</p>
          </div>
          <div className="reason-card">
            <div className="card-icon">
              <FaTachometerAlt className="icon" />
            </div>
            <h3>Real-time Tracking</h3>
            <p>Our system provides real-time IP location updates, giving you the most accurate and up-to-date data.</p>
          </div>
          <div className="reason-card">
            <div className="card-icon">
              <FaMobileAlt className="icon" />
            </div>
            <h3>Mobile Friendly</h3>
            <p>Access your data on the go with a fully responsive mobile-friendly design.</p>
          </div>
          <div className="reason-card">
            <div className="card-icon">
              <FaThumbsUp className="icon" />
            </div>
            <h3>Trusted by Experts</h3>
            <p>We are trusted by top businesses and security experts around the world for IP location accuracy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
