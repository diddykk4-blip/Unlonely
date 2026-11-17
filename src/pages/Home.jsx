import { Link } from 'react-router-dom';
import { Shield, Users, Clock, Heart } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero full-screen-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-container relative text-center">
          <div className="hero-content">
            <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>Alone No More</h1>
            <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Get personally matched with a vetted companion for friendly visits, chats, and activities | within 48 hours. Not a care agency.
            </p>
            <div className="hero-actions center-actions animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/find-a-companion" className="btn btn-primary btn-large">Find My Companion</Link>
              <Link to="/become-a-companion" className="btn btn-outline light-outline btn-large">Become a Companion</Link>
            </div>
            <div className="trust-bar animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span>48 Hour Matching</span>
              <span className="dot">•</span>
              <span>DBS Vetted</span>
              <span className="dot">•</span>
              <span>GDPR Protected</span>
              <span className="dot">•</span>
              <span>UK Wide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section bg-light">
        <div className="container">
          <div className="text-center services-header">
            <h2>How We Can Help</h2>
            <p>From a friendly chat over coffee to accompanied museum visits.</p>
          </div>
          <div className="grid-3 services-grid">
            <div className="card">
              <div className="card-icon"><Heart size={32} /></div>
              <h3>Home Visits</h3>
              <p>Friendly conversation, sharing hobbies, and enjoying a cup of tea in the comfort of your home.</p>
            </div>
            <div className="card">
              <div className="card-icon"><Users size={32} /></div>
              <h3>Social Outings</h3>
              <p>Accompaniment to parks, museums, cafes, or local community events.</p>
            </div>
            <div className="card">
              <div className="card-icon"><Clock size={32} /></div>
              <h3>Phone & Video</h3>
              <p>Regular check-ins and meaningful conversations over the phone or via video call.</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <Link to="/services" className="btn btn-outline">View All Services</Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section text-center">
        <div className="cta-overlay"></div>
        <div className="container cta-container">
          <h2>Ready to find your companion?</h2>
          <p className="cta-subtitle">Join hundreds of families who trust Unlonely for genuine human connection.</p>
          <Link to="/contact" className="btn btn-primary cta-btn">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
