import React from 'react';
import './Contact.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Contact()
{
  return (
    <section className="contact-section" id="contact">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>We're here to help. Get in touch with our support team.</p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <motion.div
            className="contact-card"
            whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <FaPhoneAlt className="contact-icon" />
            <h3>Call Us</h3>
            <p>+123 456 7890</p>
          </motion.div>
          <motion.div
            className="contact-card"
            whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <FaEnvelope className="contact-icon" />
            <h3>Email Us</h3>
            <p>support@trackit.com</p>
          </motion.div>
          <motion.div
            className="contact-card"
            whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)" }}
          >
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Visit Us</h3>
            <p>123 TrackIt Avenue, Tech City, USA</p>
          </motion.div>
        </div>

        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" required></textarea>
          <motion.button
            className="contact-button bg-gradient-to-b from-slate-900 via-slate-800 to-blue-900"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Message
          </motion.button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
