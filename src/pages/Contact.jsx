import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { submitContactInquiry } from '../services/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interest: 'Booking for myself',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      await submitContactInquiry({
        fullName: formData.name,
        email: formData.email,
        interest: formData.interest,
        message: formData.message
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Contact submission error');
      setErrorMessage('Something went wrong sending your message. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            {isSuccess ? (
              <div className="contact-success-state text-center" style={{ padding: '2rem 1rem' }}>
                <CheckCircle2 size={54} color="var(--primary-color)" style={{ margin: '0 auto 1rem' }} />
                <h3>Thank you for reaching out!</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                  We have received your message and a member of our team will get back to you shortly.
                </p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                {errorMessage && (
                  <div className="form-error-alert" style={{ color: '#d32f2f', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                    {errorMessage}
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="interest">I am interested in...</label>
                  <select 
                    id="interest"
                    value={formData.interest}
                    onChange={handleChange}
                  >
                    <option value="Booking for myself">Booking for myself</option>
                    <option value="Booking for a family member">Booking for a family member</option>
                    <option value="Becoming a companion">Becoming a companion</option>
                    <option value="Other enquiry">Other enquiry</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    rows={5} 
                    placeholder="How can we help you?"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                <p className="contact-privacy-notice" style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '0.75rem', lineHeight: '1.45' }}>
                  By submitting this form, you acknowledge that your information will be handled in accordance with our{' '}
                  <Link to="/privacy-policy" style={{ color: 'var(--brand-slate)', textDecoration: 'underline', fontWeight: 500 }}>
                    Privacy Policy
                  </Link>.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
