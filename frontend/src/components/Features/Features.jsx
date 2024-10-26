import React from 'react';
import './Features.css';
import { motion } from 'framer-motion';
import { FaChartPie, FaLock } from 'react-icons/fa6';
import { FaMapMarkerAlt } from 'react-icons/fa';

function Features() {
  const cardVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        type: "spring",
      },
      boxShadow: "0px 20px 50px rgba(0, 0, 0, 0.2)",
    },
    tap: { scale: 0.95 },
  };

  return (
    <section className="features" id="features">
      <h2 className="features-title">Discover Powerful Features</h2>
      <div className="features-list">
        <motion.div 
          className="feature-card"
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
        >
          <div className="card-icon">
            <FaMapMarkerAlt className="icon" />
          </div>
          <h3>Real-Time IP Tracking</h3>
          <p>Monitor IP addresses and track users' exact locations with live updates and analytics. Gain instant insights for better decisions.</p>
        </motion.div>
        
        <motion.div 
          className="feature-card"
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
        >
          <div className="card-icon">
            <FaChartPie className="icon" />
          </div>
          <h3>Interactive Analytics Dashboard</h3>
          <p>Access in-depth traffic reports and comprehensive data visualizations for an elevated view of user behavior and security.</p>
        </motion.div>
        
        <motion.div 
          className="feature-card"
          whileHover="hover"
          whileTap="tap"
          variants={cardVariants}
        >
          <div className="card-icon">
            <FaLock className="icon" />
          </div>
          <h3>Seamless & Secure API Integration</h3>
          <p>Integrate our secure IP tracking API into your apps with ease. Ensure real-time protection and encryption of data.</p>
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
