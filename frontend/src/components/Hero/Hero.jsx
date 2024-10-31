import React from 'react';
import './Hero.css';
import { motion } from 'framer-motion';
import ipTracker from '../../assets/hero/ip-tracker.png'
import { Link } from 'react-router-dom';

function Hero()
{
  return (
    <section className="hero bg-gradient-to-b from-slate-900 via-slate-800 to-blue-900" id='hero'>
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
            className="cta-button !font-semibold bg-white text-blue-800 hover:bg-blue-900 "
            whileHover={{ scale: 1.1 }}
          >
            <Link to="/dashboard" className='hover:!text-white'> Get Started</Link>

          </motion.button>
          <motion.button
            className="cta-button-outline"
            whileHover={{ scale: 1.1 }}
          >
            Learn More
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
