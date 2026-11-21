import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/logo.png" alt="Unlonely logo" className="footer-logo-img" />
              <span>Unlonely</span>
            </Link>
            <p className="footer-desc">
              Building meaningful human connections through trusted, professional companionship. You are not alone.
            </p>
            <div className="social-links">
              <a href="#">Facebook</a>
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
          
          <div className="footer-links">
            <h3>Company</h3>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/recovery">Post-Op Recovery</Link>
            <Link to="/become-companion">Become a Companion</Link>
            <Link to="/blog">Blog & Resources</Link>
          </div>

          <div className="footer-links">
            <h3>Support & Safety</h3>
            <Link to="/safety">Safety & Safeguarding</Link>
            <Link to="/faqs">FAQs</Link>
            <Link to="/contact">Contact Us</Link>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>

          <div className="footer-contact">
            <h3>Get in Touch</h3>
            <div className="contact-item">
              <Phone size={18} />
              <a href="tel:+442046520388" style={{ color: 'inherit', textDecoration: 'none' }}>+44 20 4652 0388</a>
            </div>
            <div className="contact-item">
              <Mail size={18} />
              <a href="mailto:support@unlonely.uk" style={{ color: 'inherit', textDecoration: 'none' }}>support@unlonely.uk</a>
            </div>
            <div className="contact-item">
              <MapPin size={18} />
              <span>London, United Kingdom</span>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Unlonely. All rights reserved. A trusted companionship platform.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
