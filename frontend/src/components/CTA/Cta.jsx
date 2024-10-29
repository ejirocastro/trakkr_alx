import React from 'react';
import './Cta.css';

function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">Ready to Track with Precision?</h2>
        <p className="cta-text">
          Start using TrackIt today and gain insights into IP locations and user data with real-time updates.
        </p>
        <a href="#pricing" className="cta-button">Get Started Now</a>
      </div>
    </section>
  );
}

export default CTA;
