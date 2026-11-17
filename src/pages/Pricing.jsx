import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  return (
    <div className="animate-fade-in inner-page">
      <div className="container">
        <div className="text-center mb-lg">
          <h1>Simple, Transparent Pricing</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            No hidden fees. Just trusted companionship.
          </p>
        </div>

        <div className="pricing-grid">
          {/* Hourly */}
          <div className="pricing-card">
            <h3>Hourly Visits</h3>
            <div className="price">
              <span className="amount">£25</span>
              <span className="period">/ hour</span>
            </div>
            <p className="pricing-desc">Perfect for occasional check-ins or specific outings.</p>
            <ul className="features-list">
              <li><Check size={16} className="check-icon"/> Min. 2 hour booking</li>
              <li><Check size={16} className="check-icon"/> Vetted companion</li>
              <li><Check size={16} className="check-icon"/> Flexible scheduling</li>
            </ul>
            <Link to="/contact" className="btn btn-outline w-100">Book Now</Link>
          </div>

          {/* Weekly */}
          <div className="pricing-card popular">
            <div className="popular-badge">Most Popular</div>
            <h3>Weekly Plan</h3>
            <div className="price">
              <span className="amount">£90</span>
              <span className="period">/ week</span>
            </div>
            <p className="pricing-desc">Consistent connection with 4 hours of weekly visits.</p>
            <ul className="features-list">
              <li><Check size={16} className="check-icon"/> 4 hours per week</li>
              <li><Check size={16} className="check-icon"/> Same dedicated companion</li>
              <li><Check size={16} className="check-icon"/> Weekly progress updates</li>
              <li><Check size={16} className="check-icon"/> Priority booking</li>
            </ul>
            <Link to="/contact" className="btn btn-primary w-100">Choose Weekly</Link>
          </div>

          {/* Phone */}
          <div className="pricing-card">
            <h3>Phone Companionship</h3>
            <div className="price">
              <span className="amount">£40</span>
              <span className="period">/ month</span>
            </div>
            <p className="pricing-desc">Regular phone or video calls to stay connected.</p>
            <ul className="features-list">
              <li><Check size={16} className="check-icon"/> 2 calls per week</li>
              <li><Check size={16} className="check-icon"/> 30 mins per call</li>
              <li><Check size={16} className="check-icon"/> Friendly check-ins</li>
            </ul>
            <Link to="/contact" className="btn btn-outline w-100">Select Plan</Link>
          </div>
        </div>

        <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
          <h3 className="mb-sm">Looking for a Gift Package?</h3>
          <p className="mb-md">Purchase a block of companionship hours for a loved one.</p>
          <Link to="/contact" className="btn btn-secondary">Enquire About Gifts</Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
