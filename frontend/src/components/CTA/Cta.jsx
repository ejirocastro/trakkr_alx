import React from 'react';
import './Cta.css';

function CTA() {
  return (
    <section className="cta-section bg-gradient-to-b from-slate-900 via-slate-800 to-blue-900">
      <div className="cta-content">
        <h2 className="cta-title">Ready to Track with Precision?</h2>
        <p className="cta-text">
          Start using TrackIt today and gain insights into IP locations and user data with real-time updates.
        </p>
        <a href="/dashboard" className="cta-button">Get Started Now</a>
      </div>
    </section>
  );
}

export default CTA;
