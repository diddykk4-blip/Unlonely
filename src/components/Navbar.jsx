import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Recovery', path: '/recovery' },
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'Companions', path: '/companions' }
  ];

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="Unlonely logo" className="nav-logo-img" />
          <span>Unlonely</span>
        </Link>
        
        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.name}
            </Link>
          ))}
          <div className="nav-buttons-mobile">
            <Link to="/contact" className="btn btn-outline">Contact</Link>
            <Link to="/find-a-companion" className="btn btn-primary">Book Now</Link>
          </div>
        </nav>

        <div className="nav-buttons-desktop">
          <a href="tel:+442046520388" className="nav-phone-link" title="Call us: +44 20 4652 0388" aria-label="Call +44 20 4652 0388">
            <Phone size={19} className="nav-phone-icon" />
          </a>
          <Link to="/contact" className="btn btn-outline">Contact</Link>
          <Link to="/find-a-companion" className="btn btn-primary">Book Now</Link>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
