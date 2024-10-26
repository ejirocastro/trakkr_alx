import React from 'react';
import './Pricing.css';
import { FaCheck, FaTimes } from 'react-icons/fa';

function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      <h2 className="pricing-title">Choose Your Plan</h2>
      <div className="pricing-grid">
        {/* Basic Plan */}
        <div className="pricing-card">
          <h3>Basic</h3>
          <p className="price">$9.99<span>/mo</span></p>
          <ul className="features-list non-pro">
            <li><FaCheck className="icon" /> Real-Time IP Tracking</li>
            <li><FaCheck className="icon" /> Basic Analytics</li>
            <li><FaTimes className="icon unavailable" /> Advanced Reporting</li>
            <li><FaTimes className="icon unavailable" /> API Access</li>
          </ul>
          <button className="pricing-button">Get Started</button>
        </div>

        {/* Pro Plan */}
        <div className="pricing-card featured">
          <h3>Pro</h3>
          <p className="price">$29.99<span>/mo</span></p>
          <ul className="features-list pro">
            <li><FaCheck className="icon icon-pro" /> Real-Time IP Tracking</li>
            <li><FaCheck className="icon icon-pro" /> Advanced Analytics Dashboard</li>
            <li><FaCheck className="icon icon-pro" /> Detailed Reporting</li>
            <li><FaTimes className="icon icon-pro unavailable" /> API Access</li>
          </ul>
          <button className="pricing-button featured-btn">Most Popular</button>
        </div>

        {/* Enterprise Plan */}
        <div className="pricing-card">
          <h3>Enterprise</h3>
          <p className="price">$99.99<span>/mo</span></p>
          <ul className="features-list non-pro">
            <li><FaCheck className="icon" /> Real-Time IP Tracking</li>
            <li><FaCheck className="icon" /> All Analytics & Reporting</li>
            <li><FaCheck className="icon" /> API Access</li>
            <li><FaCheck className="icon" /> Priority Support</li>
          </ul>
          <button className="pricing-button">Get Started</button>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
