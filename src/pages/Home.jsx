import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Users, Clock, Heart, Phone, ArrowRight, ChevronDown, Star, ShieldCheck, X } from 'lucide-react';
import './Home.css';

const HOME_FAQS = [
  {
    q: 'Is Unlonely a care agency?',
    a: 'No. Unlonely is a non-clinical companionship service. We do not provide personal care, medication support, childcare, counselling, clinical services or emergency response.'
  },
  {
    q: 'How are companions checked?',
    a: 'Every companion completes an Enhanced DBS check, safeguarding training and two reference checks.'
  },
  {
    q: 'How does matching work?',
    a: 'You tell us about interests, location, preferred way to connect and timing. We then match you with a suitable companion whose Enhanced DBS check, safeguarding training and references are all verified.'
  },
  {
    q: 'What is included in each membership?',
    a: 'We offer affordable introductory companionship as well as flexible memberships. Pricing details are shared during your membership conversation with our team, so we can find an arrangement that fits your life.'
  },
  {
    q: 'Can I arrange companionship for someone else?',
    a: 'Yes. Families and carers can arrange companionship on behalf of someone, with their consent and authority confirmed during the enquiry. Visit our For Families page to learn more.'
  },
  {
    q: 'What happens if I want to cancel?',
    a: 'There are no joining fees and no long-term contracts. Cancellation and refund details are confirmed during your membership conversation and set out in our membership terms.'
  }
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };
  return (
    <div className="home-page animate-fade-in">
      {/* Hero Section */}
      <section className="hero full-screen-hero">
        <div className="hero-overlay"></div>
        <div className="container hero-container relative text-center">
          <div className="hero-content">
            <h1 className="hero-title animate-fade-in" style={{ animationDelay: '0.1s' }}>Alone No More</h1>
            
            <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Get personally matched with a vetted companion for friendly visits, chats, and activities within 48 hours.
            </p>

            {/* USP Highlight Sub-Badge */}
            <div className="hero-usp-badge animate-fade-in" style={{ animationDelay: '0.25s' }}>
              <span><strong>Companionship, not just care.</strong> No medical tasks. No uniforms.</span>
            </div>

            <div className="hero-actions center-actions animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Link to="/find-a-companion" className="btn btn-primary btn-large hero-cta-primary">Find My Companion</Link>
              <Link to="/become-a-companion" className="btn btn-outline light-outline btn-large hero-cta-secondary">Become a Companion</Link>
            </div>

            {/* Trust Reassurance Row */}
            <div className="hero-reassurance-row animate-fade-in" style={{ animationDelay: '0.35s' }}>
              <span className="reassurance-item">
                <Star size={16} className="reassurance-gold-icon" fill="currentColor" />
                <span><strong>4.9/5</strong> Rating</span>
              </span>
              <span className="reassurance-dot">•</span>
              <span className="reassurance-item">
                <ShieldCheck size={17} className="reassurance-gold-icon" />
                <span><strong>DBS Checked</strong></span>
              </span>
              <span className="reassurance-dot">•</span>
              <span className="reassurance-item">
                <X size={16} strokeWidth={2.8} className="reassurance-gold-icon" />
                <span><strong>No Contracts</strong></span>
              </span>
            </div>

            {/* Phone Reassurance */}
            <div className="hero-phone-cta animate-fade-in" style={{ animationDelay: '0.38s' }}>
              <span>Prefer to talk? Call <a href="tel:+442046520388" className="hero-phone-number">+44 20 4652 0388</a></span>
            </div>

            <div className="trust-bar animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <span>48 Hour Matching</span>
              <span className="dot">•</span>
              <span>DBS Vetted Staffs</span>
              <span className="dot">•</span>
              <span>GDPR Protected</span>
              <span className="dot">•</span>
              <span>UK Wide</span>
            </div>
          </div>
        </div>
      </section>

      {/* Post-Op Recovery Spotlight Strip (Immediately After Hero) */}
      <section className="hero-recovery-strip">
        <div className="container">
          <div className="hero-recovery-card animate-fade-in">
            <div className="hero-recovery-content">
              <h3 className="hero-recovery-heading">
                Recovering from surgery? <span>We're here for the first few weeks at home.</span>
              </h3>
              <p className="hero-recovery-subtext">
                Practical, non-medical companionship, light meal prep, prescription collection &amp; lifts to physiotherapy.
              </p>
            </div>
            <div className="hero-recovery-action">
              <Link to="/recovery" className="hero-recovery-btn">
                <span>Explore Post-Op Recovery</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="section bg-light">
        <div className="container">
          <div className="text-center services-header">
            <h2>Companionship, Your Way</h2>
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

      {/* Who We Support Section */}
      <section id="who-we-support" className="section who-we-support-section">
        <div className="container">
          <div className="text-center support-header">
            <span className="support-tag">WHO WE SUPPORT</span>
            <h2 className="support-main-title">Connection means something different to everyone</h2>
            <p className="support-main-subtitle">
              Unlonely also welcomes any adult who wants more genuine, regular human connection.
            </p>
          </div>

          <div className="support-cards-grid">
            {/* Card 1: Older adults */}
            <div className="support-card">
              <h3>Older adults</h3>
              <p>Conversation, continuity and shared interests that help you stay socially connected on your own terms.</p>
              <Link to="/who-we-support/older-adults" className="support-card-link">
                Find out more <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 2: Remote workers */}
            <div className="support-card">
              <h3>Remote workers</h3>
              <p>Break the isolation of working from home with flexible phone or video companionship and local group walks.</p>
              <Link to="/who-we-support/remote-workers" className="support-card-link">
                Find out more <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 3: New mothers */}
            <div className="support-card">
              <h3>New mothers</h3>
              <p>Adult conversation and connection during a major life transition. Unlonely does not provide childcare or medical advice.</p>
              <Link to="/who-we-support/new-mothers" className="support-card-link">
                Find out more <ArrowRight size={16} />
              </Link>
            </div>

            {/* Card 4: People living with bereavement */}
            <div className="support-card">
              <h3>People living with bereavement</h3>
              <p>Gentle companionship and shared time — not counselling or grief treatment — at a pace that feels right.</p>
              <Link to="/who-we-support/bereavement" className="support-card-link">
                Find out more <ArrowRight size={16} />
              </Link>
            </div>
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

      {/* FAQs Section */}
      <section id="faqs" className="section home-faq-section">
        <div className="container home-faq-container">
          <div className="text-center home-faq-header">
            <span className="faq-tag">QUESTIONS</span>
            <h2 className="faq-main-title">Good company might be closer than you think</h2>
          </div>

          <div className="home-faq-accordion">
            {HOME_FAQS.map((faq, idx) => (
              <div 
                key={idx} 
                className={`home-faq-item ${openFaq === idx ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="home-faq-question">
                  <h3>{faq.q}</h3>
                  <ChevronDown size={18} className="home-faq-icon" />
                </div>
                {openFaq === idx && (
                  <div className="home-faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark Slate Call-To-Action Banner */}
      <section className="home-banner-section">
        <div className="container">
          <div className="friendly-face-banner text-center">
            <div className="friendly-face-banner-overlay"></div>
            <div className="friendly-face-banner-content">
              <h2>A better day could start with a conversation</h2>
              <p>
                Experience an initial companionship session at affordable prices, or talk to us about the membership that fits your life.
              </p>
              <div className="friendly-banner-actions">
                <Link to="/find-a-companion" className="btn btn-primary friendly-btn-primary">
                  Get Started
                </Link>
                <Link to="/contact" className="btn btn-outline friendly-btn-outline">
                  Speak to Unlonely
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
