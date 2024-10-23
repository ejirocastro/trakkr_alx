import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';
import ipTracker from '../../assets/hero/ip-tracker.png'

function Hero()
{
  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title">
          Track <span className="highlight">IP</span> Locations Instantly
        </h1>
        <p className="hero-description">
          Secure your data, monitor users, and analyze traffic with real-time IP tracking. Boost your security intelligence with <span className="brand">TrackIt</span>.
        </p>
        <div className="button-group">
          <motion.button
            className="cta-button"
            whileHover={{ scale: 1.1 }}
          >
            Get Started
          </motion.button>
          <motion.button
            className="cta-button-outline"
            whileHover={{ scale: 1.1 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="hero-image"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <img src={ipTracker} className='ip-image' alt="IP Tracking App" />
      </motion.div>
    </section>
  );
}

export default Hero;
