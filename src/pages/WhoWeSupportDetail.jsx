import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, ChevronDown, ShieldAlert, ArrowRight, Phone } from 'lucide-react';
import { WHO_WE_SUPPORT_DATA } from '../data/whoWeSupportData';
import './WhoWeSupportDetail.css';

const WhoWeSupportDetail = () => {
  const { slug } = useParams();
  const data = WHO_WE_SUPPORT_DATA[slug] || WHO_WE_SUPPORT_DATA['older-adults'];
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="who-we-support-page animate-fade-in">
      {/* Breadcrumb Bar */}
      <div className="support-breadcrumb-bar">
        <div className="container">
          <div className="breadcrumb-nav">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/#who-we-support">Who We Support</Link>
            <span>/</span>
            <span className="current">{data.title}</span>
          </div>
        </div>
      </div>

      {/* Hero Banner with Photo Background + Color Tint Overlay */}
      <section 
        className="support-hero" 
        style={{ backgroundImage: `url(${data.bgImage})` }}
      >
        <div 
          className="support-hero-overlay" 
          style={{ background: data.gradient }}
        ></div>
        <div className="container support-hero-container">
          <span className="support-hero-tag">{data.tag}</span>
          <h1 className="support-hero-title">{data.title}</h1>
          <p className="support-hero-subtitle">{data.heroSubtitle}</p>
        </div>
      </section>

      {/* Main Content & FAQ Section */}
      <section className="support-body-section">
        <div className="container support-split-grid">
          {/* Left Column: How Unlonely Helps */}
          <div className="support-content-col">
            <span className="section-eyebrow">HOW UNLONELY HELPS</span>
            <h2 className="support-section-heading">{data.howHelpsTitle}</h2>
            <p className="support-body-text">{data.howHelpsDesc}</p>

            <ul className="support-bullet-list">
              {data.bullets.map((bullet, idx) => (
                <li key={idx} className="support-bullet-item">
                  <CheckCircle2 size={20} className="support-bullet-icon" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            <div className="support-disclaimer-box">
              <ShieldAlert size={20} className="disclaimer-icon" />
              <p>{data.disclaimer}</p>
            </div>
          </div>

          {/* Right Column: FAQs */}
          <div className="support-faq-col">
            <span className="section-eyebrow">QUESTIONS</span>
            <h2 className="support-section-heading">FAQs</h2>

            <div className="faq-accordion-list">
              {data.faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  className={`support-faq-item ${openFaq === idx ? 'open' : ''}`}
                  onClick={() => toggleFaq(idx)}
                >
                  <div className="support-faq-header">
                    <h4>{faq.q}</h4>
                    <ChevronDown size={18} className="faq-chevron" />
                  </div>
                  {openFaq === idx && (
                    <div className="support-faq-body">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mid CTA: Ready to begin? */}
      <section className="support-ready-cta text-center">
        <div className="container">
          <h3>Ready to begin?</h3>
          <p>
            Start with an introductory visit or talk to us about flexible arrangements that fit your life.
          </p>
          <div className="support-cta-actions">
            <Link to="/find-a-companion" className="btn btn-primary">Find a Companion</Link>
          </div>
        </div>
      </section>

      {/* Dark Slate Banner: A friendly face could be closer than you think */}
      <section className="container mb-xl">
        <div className="support-feature-banner text-center">
          <div className="support-feature-banner-overlay"></div>
          <div className="support-feature-banner-content">
            <h2>A friendly face could be closer than you think</h2>
            <p>
              Experience genuine connection with a trusted, vetted companion who shares your interests.
            </p>
            <div className="banner-buttons">
              <Link to="/find-a-companion" className="btn btn-primary banner-btn-main">
                Find My Companion
              </Link>
              <a href="tel:+442046520388" className="btn btn-outline banner-btn-alt">
                <Phone size={16} /> Speak to Unlonely: +44 20 4652 0388
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhoWeSupportDetail;
