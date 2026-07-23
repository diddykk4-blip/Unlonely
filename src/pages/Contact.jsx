import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="animate-fade-in section">
      <div className="container">
        <div className="text-center mb-lg">
          <h1>Get in Touch</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            We're here to answer any questions you might have about our companionship services.
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="mb-md">Contact Information</h2>
            
            <div className="info-item">
              <Phone className="info-icon" />
              <div>
                <h4>Phone</h4>
                <p>0800 123 4567</p>
              </div>
            </div>
            
            <div className="info-item">
              <Mail className="info-icon" />
              <div>
                <h4>Email</h4>
                <p>hello@unlonely.co.uk</p>
              </div>
            </div>

            <div className="info-item">
              <Clock className="info-icon" />
              <div>
                <h4>Opening Hours</h4>
                <p>Monday - Friday: 9am - 5pm</p>
                <p>Saturday: 10am - 2pm</p>
              </div>
            </div>

            <div className="emergency-notice mt-4">
              <strong>Please Note:</strong> Unlonely is not an emergency service or a medical provider. If you or a loved one requires immediate medical assistance, please dial 999.
            </div>
          </div>

          <div className="contact-form-container">
            <h2 className="mb-md">Send us a Message</h2>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="john@example.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="interest">I am interested in...</label>
                <select id="interest">
                  <option>Booking for myself</option>
                  <option>Booking for a family member</option>
                  <option>Becoming a companion</option>
                  <option>Other enquiry</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="How can we help you?"></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
