import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Clock, 
  Heart, 
  Phone, 
  ArrowRight, 
  ChevronDown, 
  Star, 
  ShieldCheck, 
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
  Calendar,
  HeartHandshake
} from 'lucide-react';
import { submitContactInquiry } from '../services/api';
import './Home.css';
import './Recovery.css';

const HOME_FAQS = [
  {
    q: 'Is Unlonely a care agency?',
    a: 'No. Unlonely is a non-clinical companionship service. We do not provide personal care, medication support, childcare, counselling, clinical services or emergency response.'
  },
  {
    q: 'Can we claim recovery support on private medical insurance?',
    a: 'Some private health cash plans cover non-medical home help and convalescence assistance. We can provide formal VAT invoices detailing our business information for you to submit to your insurer.'
  },
  {
    q: 'What if my surgery gets cancelled or rescheduled?',
    a: 'Just let us know at least 48 hours in advance and we will cancel or reschedule your visits free of charge with zero penalty.'
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

  // Dedicated Recovery Form State
  const [recoveryFormData, setRecoveryFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    operationDate: '',
    hospitalName: '',
    supportType: 'Both companionship at home & physio transport',
    hasPets: 'No',
    petDetails: '',
    notes: ''
  });
  const [isRecoverySubmitting, setIsRecoverySubmitting] = useState(false);
  const [isRecoverySuccess, setIsRecoverySuccess] = useState(false);
  const [recoveryError, setRecoveryError] = useState('');

  const handleRecoveryInputChange = (e) => {
    const { name, value } = e.target;
    setRecoveryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRecoveryFormSubmit = async (e) => {
    e.preventDefault();
    setRecoveryError('');

    if (!recoveryFormData.fullName.trim() || !recoveryFormData.email.trim() || !recoveryFormData.phone.trim()) {
      setRecoveryError('Please provide your name, email, and phone number.');
      return;
    }

    setIsRecoverySubmitting(true);
    try {
      const detailedMessage = [
        `[POST-OP RECOVERY ENQUIRY]`,
        `Operation Date: ${recoveryFormData.operationDate || 'Not specified'}`,
        `Hospital / Clinic: ${recoveryFormData.hospitalName || 'Not specified'}`,
        `Support Required: ${recoveryFormData.supportType}`,
        `Pets at Home: ${recoveryFormData.hasPets}${recoveryFormData.petDetails ? ` (${recoveryFormData.petDetails})` : ''}`,
        `Phone: ${recoveryFormData.phone}`,
        `Additional Notes: ${recoveryFormData.notes || 'None'}`
      ].join('\n');

      await submitContactInquiry({
        fullName: recoveryFormData.fullName,
        email: recoveryFormData.email,
        interest: 'Post-Op Recovery & Respite Support',
        message: detailedMessage
      });

      setIsRecoverySuccess(true);
    } catch (err) {
      console.error('Recovery enquiry error:', err);
      setRecoveryError('Could not send your enquiry online. Please call us directly on +44 20 4652 0388.');
    } finally {
      setIsRecoverySubmitting(false);
    }
  };

  const scrollToRecoveryForm = () => {
    const el = document.getElementById('recovery-enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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

      {/* ====================================================================
          Post-Op Recovery & Respite Support (Spotlight Section)
          ==================================================================== */}
      <section id="recovery" className="section recovery-home-section">
        <div className="container">
          
          {/* Spotlight Hero Card */}
          <div className="recovery-spotlight-card">
            <div className="recovery-spotlight-grid">
              <div className="recovery-spotlight-content">
                <span className="recovery-tag">
                  SHORT-TERM SURGERY RECOVERY
                </span>
                <h2 className="recovery-spotlight-title">
                  Recovering from surgery shouldn't mean recovering alone.
                </h2>
                <p className="recovery-spotlight-subtitle">
                  Practical, non-medical support for the first few weeks at home. We provide friendly faces, 
                  light meal prep, prescription collection, and lifts to physio so you can heal safely and comfortably.
                </p>
                <div className="recovery-spotlight-actions">
                  <button onClick={scrollToRecoveryForm} className="btn btn-primary btn-large">
                    Book Recovery Support
                  </button>
                  <a href="tel:+442046520388" className="btn btn-outline recovery-phone-btn">
                    <Phone size={17} /> Call Us: +44 20 4652 0388
                  </a>
                </div>
                <div className="recovery-spotlight-badges">
                  <span className="spotlight-badge"><ShieldCheck size={16} /> Enhanced DBS Checked</span>
                  <span className="spotlight-badge"><Calendar size={16} /> No Long Contracts</span>
                  <span className="spotlight-badge"><HeartHandshake size={16} /> Updates for Family</span>
                </div>
              </div>
              <div className="recovery-spotlight-media">
                <img 
                  src="/recovery-hero.jpg" 
                  alt="Relaxing recovery at home with a warm cup of tea" 
                  className="recovery-spotlight-image"
                />
              </div>
            </div>
          </div>

          {/* Section: Problem & Solution (Two Columns) */}
          <div className="recovery-two-col">
            <div className="reality-card">
              <div className="card-header-icon">
                <AlertCircle size={28} className="reality-icon" />
                <h3>The Reality of Post-Op Recovery</h3>
              </div>
              <ul className="recovery-list">
                <li>
                  <span className="bullet-icon">•</span>
                  <span><strong>Over 330,000 joint replacements</strong> happen in the UK every single year.</span>
                </li>
                <li>
                  <span className="bullet-icon">•</span>
                  <span><strong>Hospitals are discharging patients faster</strong> than ever before, often within 24 to 48 hours.</span>
                </li>
                <li>
                  <span className="bullet-icon">•</span>
                  <span><strong>Family members often can't take weeks off work</strong> to provide constant company and practical cover.</span>
                </li>
                <li>
                  <span className="bullet-icon">•</span>
                  <span><strong>Being stuck at home alone</strong> can lead to anxiety, missed physio appointments, and poor recovery outcomes.</span>
                </li>
              </ul>
            </div>

            <div className="solution-card">
              <div className="card-header-icon">
                <HeartHandshake size={28} className="solution-icon" />
                <h3>How Unlonely Helps</h3>
              </div>
              <ul className="recovery-list">
                <li>
                  <CheckCircle2 size={20} className="solution-icon bullet-icon" />
                  <span><strong>Bridge the gap:</strong> We connect hospital discharge to getting fully back on your feet with compassionate reassurance.</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className="solution-icon bullet-icon" />
                  <span><strong>Reliable, friendly companion:</strong> Check in on you, ensure you’re eating well, and keep your spirits bright.</span>
                </li>
                <li>
                  <CheckCircle2 size={20} className="solution-icon bullet-icon" />
                  <span><strong>Everyday peace of mind:</strong> We handle the little everyday chores so you and your family can focus purely on resting.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section: Clear Boundaries (What We Do & What We Don't) */}
          <div className="scope-grid">
            <div className="scope-card scope-do">
              <div className="scope-badge badge-do">
                <CheckCircle2 size={18} />
                <span>What Your Recovery Companion CAN Do</span>
              </div>
              <ul className="scope-items">
                <li>
                  <CheckCircle2 size={18} className="icon-check" />
                  <div>
                    <strong>Friendly Company:</strong> Sit with you, watch TV, play cards, or just chat over a warm cup of tea.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="icon-check" />
                  <div>
                    <strong>Light Meal Prep:</strong> Make a simple sandwich, heat up comforting soup, or prepare hot tea and coffee.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="icon-check" />
                  <div>
                    <strong>Errands:</strong> Collect prescriptions from your pharmacy or pop out for a small grocery shop.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="icon-check" />
                  <div>
                    <strong>Transport:</strong> Drive you safely to and from your physiotherapy or clinic appointments (agreed in advance).
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={18} className="icon-check" />
                  <div>
                    <strong>Welfare Checks:</strong> A welcoming, reassuring face to make sure you are comfortable and settling in smoothly.
                  </div>
                </li>
              </ul>
            </div>

            <div className="scope-card scope-dont">
              <div className="scope-badge badge-dont">
                <XCircle size={16} />
                <span>What We Do NOT Do (Non-Medical)</span>
              </div>
              <ul className="scope-items">
                <li>
                  <XCircle size={18} className="icon-cross" />
                  <div>
                    <strong>We are not a care agency.</strong> We provide social companionship and practical non-regulated assistance.
                  </div>
                </li>
                <li>
                  <XCircle size={18} className="icon-cross" />
                  <div>
                    <strong>No personal care:</strong> We do not assist with bathing, washing, dressing, or toileting.
                  </div>
                </li>
                <li>
                  <XCircle size={18} className="icon-cross" />
                  <div>
                    <strong>No medication management:</strong> We do not administer or organise prescribed pharmaceutical regimens.
                  </div>
                </li>
                <li>
                  <XCircle size={18} className="icon-cross" />
                  <div>
                    <strong>No clinical or nursing care:</strong> We do not provide wound dressing, clinical monitoring, or injections.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Section: Packages & Pricing */}
          <div className="recovery-packages-wrapper">
            <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 1.5rem' }}>
              <h2 className="section-title">Tailored Recovery Packages</h2>
              <p className="section-subtitle">
                Flexible, short-term support designed specifically for surgery convalescence. No long-term lock-in.
              </p>
            </div>

            <div className="packages-grid">
              <div className="package-card">
                <div>
                  <h3 className="package-name">The "Welcome Home" Visit</h3>
                  <div className="package-price-wrap">
                    <span className="package-price">£45</span>
                    <span className="package-term">one-off</span>
                  </div>
                  <p className="package-desc">
                    A 2-hour visit on the day you come home from hospital. We'll make sure the heating is on, 
                    make you a cup of tea, and help you settle in safely.
                  </p>
                </div>
                <button onClick={scrollToRecoveryForm} className="btn btn-outline" style={{ width: '100%' }}>
                  Book This Visit
                </button>
              </div>

              <div className="package-card package-featured">
                <div className="package-tag">Most Popular</div>
                <div>
                  <h3 className="package-name">The "Peace of Mind" Week</h3>
                  <div className="package-price-wrap">
                    <span className="package-price">£110</span>
                    <span className="package-term">for 3 visits</span>
                  </div>
                  <p className="package-desc">
                    Three 90-minute visits across the week. Ideal for helping with light meal prep, collecting prescriptions, 
                    and breaking up the long days.
                  </p>
                </div>
                <button onClick={scrollToRecoveryForm} className="btn btn-primary" style={{ width: '100%' }}>
                  Book Week Package
                </button>
              </div>

              <div className="package-card">
                <div>
                  <h3 className="package-name">The "Physio Partner"</h3>
                  <div className="package-price-wrap">
                    <span className="package-price">£28</span>
                    <span className="package-term">/ hour</span>
                  </div>
                  <p className="package-desc">
                    Need a lift to the hospital or physio clinic? We'll drive you there, wait with you, 
                    and bring you safely home without parking stress.
                  </p>
                </div>
                <button onClick={scrollToRecoveryForm} className="btn btn-outline" style={{ width: '100%' }}>
                  Arrange Transport
                </button>
              </div>

              <div className="package-card">
                <div>
                  <h3 className="package-name">Standard Hourly Rate</h3>
                  <div className="package-price-wrap">
                    <span className="package-price">£28</span>
                    <span className="package-term">/ hour</span>
                  </div>
                  <p className="package-desc">
                    Completely flexible hourly support. Book exactly what you need, when you need it, 
                    as your recovery progresses week by week.
                  </p>
                </div>
                <button onClick={scrollToRecoveryForm} className="btn btn-outline" style={{ width: '100%' }}>
                  Book Hourly
                </button>
              </div>
            </div>

            <div className="text-center" style={{ marginTop: '1.25rem' }}>
              <span className="packages-note">
                * All prices include VAT where applicable and travel within a 5-mile radius.
              </span>
            </div>
          </div>

          {/* Section: Dedicated Recovery Support Intake Form */}
          <div id="recovery-enquiry-form" className="recovery-form-section" style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Recovery Support Enquiry
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Coming home from the hospital soon? Tell us about the surgery and your preferred visit dates. We'll be in touch within 24 hours.
            </p>

            {isRecoverySuccess ? (
              <div className="text-center" style={{ padding: '2.5rem 1rem' }}>
                <CheckCircle2 size={56} color="var(--primary-color)" style={{ margin: '0 auto 1.25rem' }} />
                <h3 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Recovery Enquiry Received</h3>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto 1.5rem' }}>
                  Thank you. Our recovery support coordinator will review your dates and contact you within 24 hours to confirm companion availability.
                </p>
                <a href="tel:+442046520388" className="btn btn-outline">
                  Need faster assistance? Call +44 20 4652 0388
                </a>
              </div>
            ) : (
              <form onSubmit={handleRecoveryFormSubmit}>
                {recoveryError && (
                  <div style={{ 
                    background: '#fef2f2', 
                    border: '1px solid #fecaca', 
                    color: '#991b1b', 
                    padding: '0.85rem 1.25rem', 
                    borderRadius: '8px', 
                    marginBottom: '1.5rem' 
                  }}>
                    {recoveryError}
                  </div>
                )}

                <div className="recovery-form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="recovery-fullName">Your Full Name *</label>
                    <input
                      id="recovery-fullName"
                      name="fullName"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sarah Jenkins"
                      value={recoveryFormData.fullName}
                      onChange={handleRecoveryInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="recovery-email">Email Address *</label>
                    <input
                      id="recovery-email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="sarah@example.co.uk"
                      value={recoveryFormData.email}
                      onChange={handleRecoveryInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="recovery-phone">Phone Number *</label>
                    <input
                      id="recovery-phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="07123 456789"
                      value={recoveryFormData.phone}
                      onChange={handleRecoveryInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="recovery-operationDate">
                      Date of Operation (or expected discharge)
                    </label>
                    <input
                      id="recovery-operationDate"
                      name="operationDate"
                      type="date"
                      className="form-input"
                      value={recoveryFormData.operationDate}
                      onChange={handleRecoveryInputChange}
                    />
                  </div>

                  <div className="form-group recovery-full-width">
                    <label className="form-label" htmlFor="recovery-hospitalName">
                      Which hospital or clinic are you (or your loved one) staying at?
                    </label>
                    <input
                      id="recovery-hospitalName"
                      name="hospitalName"
                      type="text"
                      className="form-input"
                      placeholder="e.g. St Thomas' Hospital, London or BMI The Clementine Churchill"
                      value={recoveryFormData.hospitalName}
                      onChange={handleRecoveryInputChange}
                    />
                  </div>

                  <div className="form-group recovery-full-width">
                    <label className="form-label">
                      What type of support do you primarily require?
                    </label>
                    <div className="recovery-radio-group">
                      <label className="recovery-radio-label">
                        <input
                          type="radio"
                          name="supportType"
                          value="Both companionship at home & physio transport"
                          checked={recoveryFormData.supportType === 'Both companionship at home & physio transport'}
                          onChange={handleRecoveryInputChange}
                        />
                        <span>Both companionship at home & lifts to physio/hospital</span>
                      </label>
                      <label className="recovery-radio-label">
                        <input
                          type="radio"
                          name="supportType"
                          value="Companionship & home help only (No transport)"
                          checked={recoveryFormData.supportType === 'Companionship & home help only (No transport)'}
                          onChange={handleRecoveryInputChange}
                        />
                        <span>Companionship & practical help at home only (No driving needed)</span>
                      </label>
                      <label className="recovery-radio-label">
                        <input
                          type="radio"
                          name="supportType"
                          value="Physio & clinic transport only"
                          checked={recoveryFormData.supportType === 'Physio & clinic transport only'}
                          onChange={handleRecoveryInputChange}
                        />
                        <span>Transport to and from physiotherapy/clinic appointments only</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Do you have any pets at home?</label>
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasPets"
                          value="No"
                          checked={recoveryFormData.hasPets === 'No'}
                          onChange={handleRecoveryInputChange}
                          style={{ accentColor: 'var(--primary-color)' }}
                        />
                        <span>No pets</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasPets"
                          value="Yes"
                          checked={recoveryFormData.hasPets === 'Yes'}
                          onChange={handleRecoveryInputChange}
                          style={{ accentColor: 'var(--primary-color)' }}
                        />
                        <span>Yes, I have pets</span>
                      </label>
                    </div>
                  </div>

                  {recoveryFormData.hasPets === 'Yes' && (
                    <div className="form-group animate-fade-in">
                      <label className="form-label" htmlFor="recovery-petDetails">What pets do you have?</label>
                      <input
                        id="recovery-petDetails"
                        name="petDetails"
                        type="text"
                        className="form-input"
                        placeholder="e.g. 1 friendly golden retriever"
                        value={recoveryFormData.petDetails}
                        onChange={handleRecoveryInputChange}
                      />
                    </div>
                  )}

                  <div className="form-group recovery-full-width">
                    <label className="form-label" htmlFor="recovery-notes">
                      Any additional details or visit preferences (Optional)
                    </label>
                    <textarea
                      id="recovery-notes"
                      name="notes"
                      className="form-input"
                      rows={3}
                      placeholder="Tell us about preferred times or anything your companion should know before visiting..."
                      value={recoveryFormData.notes}
                      onChange={handleRecoveryInputChange}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-large" 
                    style={{ width: '100%' }}
                    disabled={isRecoverySubmitting}
                  >
                    {isRecoverySubmitting ? 'Submitting Enquiry...' : 'Arrange Recovery Support →'}
                  </button>
                  <p className="recovery-form-privacy-note text-center">
                    By submitting this form, you agree to our{' '}
                    <Link to="/privacy-policy" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
                      Privacy Policy
                    </Link>
                    . We will never share your personal information.
                  </p>
                </div>
              </form>
            )}
          </div>

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
