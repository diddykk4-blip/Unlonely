import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  XCircle, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  HeartHandshake, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  ArrowRight,
  Clock,
  Car,
  Home as HomeIcon,
  Coffee
} from 'lucide-react';
import { submitContactInquiry } from '../services/api';
import './Recovery.css';

const Recovery = () => {
  // FAQ toggles
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Dedicated Intake Form State
  const [formData, setFormData] = useState({
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name, email, and phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Build a comprehensive enquiry dossier for the recovery intake
      const detailedMessage = [
        `[POST-OP RECOVERY ENQUIRY]`,
        `Operation Date: ${formData.operationDate || 'Not specified'}`,
        `Hospital / Clinic: ${formData.hospitalName || 'Not specified'}`,
        `Support Required: ${formData.supportType}`,
        `Pets at Home: ${formData.hasPets}${formData.petDetails ? ` (${formData.petDetails})` : ''}`,
        `Phone: ${formData.phone}`,
        `Additional Notes: ${formData.notes || 'None'}`
      ].join('\n');

      await submitContactInquiry({
        fullName: formData.fullName,
        email: formData.email,
        interest: 'Post-Op Recovery & Respite Support',
        message: detailedMessage
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('Recovery enquiry error:', err);
      setErrorMessage('Could not send your enquiry online. Please call us directly on +44 20 4652 0388.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('recovery-enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'Are you a care agency?',
      a: 'No. We provide companionship and practical everyday help. We cannot assist with medical, clinical, or personal care tasks (such as washing, dressing, or administering medication).'
    },
    {
      q: 'Can we claim this on private medical insurance?',
      a: 'Some private health cash plans cover non-medical home help and convalescence assistance. We provide formal VAT invoices detailing our business information for you to submit to your insurer.'
    },
    {
      q: 'What if my surgery gets cancelled or rescheduled?',
      a: 'Just let us know at least 48 hours in advance and we will cancel or reschedule your visits free of charge with zero penalty.'
    }
  ];

  return (
    <div className="recovery-page animate-fade-in">
      {/* ====================================================================
          Section 1: Hero (Above the Fold)
          ==================================================================== */}
      <section className="recovery-hero">
        <div className="recovery-hero-overlay" />
        <div className="container recovery-hero-content text-center">
          <h1 className="recovery-hero-title animate-fade-in">
            Recovering from surgery shouldn't mean recovering alone.
          </h1>

          <p className="recovery-hero-subtitle animate-fade-in">
            Practical, non-medical support for the first few weeks at home. We provide friendly faces, 
            light meal prep, prescription collection, and lifts to physio so you can heal safely and comfortably.
          </p>

          <div className="recovery-hero-actions animate-fade-in">
            <button onClick={scrollToForm} className="btn btn-primary btn-large">
              Book Recovery Support
            </button>
            <a href="tel:+442046520388" className="recovery-btn-phone">
              <Phone size={18} />
              <span>Call Us: +44 20 4652 0388</span>
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 2: The Problem & The Solution
          ==================================================================== */}
      <section className="section bg-recovery-orange">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 1.5rem' }}>
            <h2 className="section-title">Bridging the Gap from Hospital to Home</h2>
            <p className="section-subtitle">
              Coming home after surgery is a relief, but the first few weeks can feel overwhelming.
            </p>
          </div>

          <div className="recovery-two-col">
            {/* Left Column: Reality */}
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

            {/* Right Column: Solution */}
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
        </div>
      </section>

      {/* ====================================================================
          Section 3: What We Do (And What We Don't)
          ==================================================================== */}
      <section className="section">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 1rem' }}>
            <h2 className="section-title">Clear Boundaries for Safe, Trusted Care</h2>
            <p className="section-subtitle">
              We believe in 100% transparency. Here is exactly what our recovery companions can and cannot do:
            </p>
          </div>

          <div className="scope-grid">
            {/* CAN DO */}
            <div className="scope-card scope-do">
              <div className="scope-badge badge-do">
                <CheckCircle2 size={18} />
                <span>What Your Recovery Companion CAN Do</span>
              </div>
              <ul className="scope-items">
                <li>
                  <CheckCircle2 size={22} className="icon-check" />
                  <div>
                    <strong>Friendly Company:</strong> Sit with you, watch TV, play cards, or just chat over a warm cup of tea.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={22} className="icon-check" />
                  <div>
                    <strong>Light Meal Prep:</strong> Make a simple sandwich, heat up comforting soup, or prepare hot tea and coffee.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={22} className="icon-check" />
                  <div>
                    <strong>Errands:</strong> Collect prescriptions from your pharmacy or pop out for a small grocery shop.
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={22} className="icon-check" />
                  <div>
                    <strong>Transport:</strong> Drive you safely to and from your physiotherapy or clinic appointments (agreed in advance).
                  </div>
                </li>
                <li>
                  <CheckCircle2 size={22} className="icon-check" />
                  <div>
                    <strong>Welfare Checks:</strong> A welcoming, reassuring face to make sure you are comfortable and settling in smoothly.
                  </div>
                </li>
              </ul>
            </div>

            {/* DO NOT DO */}
            <div className="scope-card scope-dont">
              <div className="scope-badge badge-dont">
                <XCircle size={18} />
                <span>What We Do NOT Do (Non-Medical)</span>
              </div>
              <ul className="scope-items">
                <li>
                  <XCircle size={22} className="icon-cross" />
                  <div>
                    <strong>We are not a care agency.</strong> We provide social companionship and practical non-regulated assistance.
                  </div>
                </li>
                <li>
                  <XCircle size={22} className="icon-cross" />
                  <div>
                    <strong>No personal care:</strong> We do not assist with bathing, washing, dressing, or toileting.
                  </div>
                </li>
                <li>
                  <XCircle size={22} className="icon-cross" />
                  <div>
                    <strong>No medication management:</strong> We do not administer or organise prescribed pharmaceutical regimens.
                  </div>
                </li>
                <li>
                  <XCircle size={22} className="icon-cross" />
                  <div>
                    <strong>No clinical or nursing care:</strong> We do not provide wound dressing, clinical monitoring, or injections.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 4: The Recovery Packages (Pricing)
          ==================================================================== */}
      <section className="section bg-light">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 1.5rem' }}>
            <h2 className="section-title">Tailored Recovery Packages</h2>
            <p className="section-subtitle">
              Flexible, short-term support designed specifically for surgery convalescence. No long-term lock-in.
            </p>
          </div>

          <div className="packages-grid">
            {/* Package 1 */}
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
              <button onClick={scrollToForm} className="btn btn-outline" style={{ width: '100%' }}>
                Book This Visit
              </button>
            </div>

            {/* Package 2: Featured */}
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
              <button onClick={scrollToForm} className="btn btn-primary" style={{ width: '100%' }}>
                Book Week Package
              </button>
            </div>

            {/* Package 3 */}
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
              <button onClick={scrollToForm} className="btn btn-outline" style={{ width: '100%' }}>
                Arrange Transport
              </button>
            </div>

            {/* Package 4 */}
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
              <button onClick={scrollToForm} className="btn btn-outline" style={{ width: '100%' }}>
                Book Hourly
              </button>
            </div>
          </div>

          <div className="text-center" style={{ marginTop: '2.5rem' }}>
            <span className="packages-note">
              * All prices include VAT where applicable and travel within a 5-mile radius.
            </span>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 5: Why Choose Unlonely?
          ==================================================================== */}
      <section className="section bg-recovery-orange">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 1.5rem' }}>
            <h2 className="section-title">Why Families Trust Unlonely</h2>
            <p className="section-subtitle">
              Professional, accountable companionship built around patient dignity and family peace of mind.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-wrap">
                <ShieldCheck size={28} />
              </div>
              <h4>Vetted & Safe</h4>
              <p>
                Every companion is Enhanced DBS-checked, two-reference verified, and trained in adult safeguarding standards.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <Calendar size={28} />
              </div>
              <h4>No Long Contracts</h4>
              <p>
                We know recovery takes time, but we don't lock you into recurring monthly contracts. You only pay for the time you need.
              </p>
            </div>

            <div className="why-card">
              <div className="why-icon-wrap">
                <HeartHandshake size={28} />
              </div>
              <h4>Reassurance for the Family</h4>
              <p>
                Send us a message while you're at work just to check in. We can send you a quick text or email letting you know your loved one is resting well.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 6: Frequently Asked Questions (FAQ)
          ==================================================================== */}
      <section className="section bg-light">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 1rem' }}>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Have questions about post-surgery companionship? Here are the most common questions answered.
            </p>
          </div>

          <div className="recovery-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="recovery-faq-item">
                  <button 
                    className="recovery-faq-question" 
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} color="var(--primary-color)" /> : <ChevronDown size={20} />}
                  </button>
                  {isOpen && (
                    <div className="recovery-faq-answer animate-fade-in">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          Section 7: Final CTA & Dedicated Recovery Support Enquiry Form
          ==================================================================== */}
      <section className="section" id="recovery-enquiry-form">
        <div className="container">
          <div className="text-center" style={{ maxWidth: '750px', margin: '0 auto 1.5rem' }}>
            <h2 className="section-title">Coming home from the hospital soon?</h2>
            <p className="section-subtitle">
              Let us help you recover comfortably and safely. Fill out our recovery enquiry below or call our team directly.
            </p>
          </div>

          <div className="recovery-form-section">
            <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Recovery Support Enquiry
            </h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Tell us a little about the surgery and your preferred visit dates. We'll be in touch within 24 hours.
            </p>

            {isSuccess ? (
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
              <form onSubmit={handleFormSubmit}>
                {errorMessage && (
                  <div style={{ 
                    background: '#fef2f2', 
                    border: '1px solid #fecaca', 
                    color: '#991b1b', 
                    padding: '0.85rem 1.25rem', 
                    borderRadius: '8px', 
                    marginBottom: '1.5rem' 
                  }}>
                    {errorMessage}
                  </div>
                )}

                <div className="recovery-form-grid">
                  {/* Full Name */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="fullName">Your Full Name *</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form-input"
                      placeholder="sarah@example.co.uk"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="form-input"
                      placeholder="07123 456789"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* 1. Operation Date */}
                  <div className="form-group">
                    <label className="form-label" htmlFor="operationDate">
                      Date of Operation (or expected discharge)
                    </label>
                    <input
                      id="operationDate"
                      name="operationDate"
                      type="date"
                      className="form-input"
                      value={formData.operationDate}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* 2. Hospital Name */}
                  <div className="form-group recovery-full-width">
                    <label className="form-label" htmlFor="hospitalName">
                      Which hospital or clinic are you (or your loved one) staying at?
                    </label>
                    <input
                      id="hospitalName"
                      name="hospitalName"
                      type="text"
                      className="form-input"
                      placeholder="e.g. St Thomas' Hospital, London or BMI The Clementine Churchill"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* 3. Transport vs Companionship */}
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
                          checked={formData.supportType === 'Both companionship at home & physio transport'}
                          onChange={handleInputChange}
                        />
                        <span>Both companionship at home & lifts to physio/hospital</span>
                      </label>
                      <label className="recovery-radio-label">
                        <input
                          type="radio"
                          name="supportType"
                          value="Companionship & home help only (No transport)"
                          checked={formData.supportType === 'Companionship & home help only (No transport)'}
                          onChange={handleInputChange}
                        />
                        <span>Companionship & practical help at home only (No driving needed)</span>
                      </label>
                      <label className="recovery-radio-label">
                        <input
                          type="radio"
                          name="supportType"
                          value="Physio & clinic transport only"
                          checked={formData.supportType === 'Physio & clinic transport only'}
                          onChange={handleInputChange}
                        />
                        <span>Transport to and from physiotherapy/clinic appointments only</span>
                      </label>
                    </div>
                  </div>

                  {/* 4. Pets at home */}
                  <div className="form-group">
                    <label className="form-label">Do you have any pets at home?</label>
                    <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasPets"
                          value="No"
                          checked={formData.hasPets === 'No'}
                          onChange={handleInputChange}
                          style={{ accentColor: 'var(--primary-color)' }}
                        />
                        <span>No pets</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="hasPets"
                          value="Yes"
                          checked={formData.hasPets === 'Yes'}
                          onChange={handleInputChange}
                          style={{ accentColor: 'var(--primary-color)' }}
                        />
                        <span>Yes, I have pets</span>
                      </label>
                    </div>
                  </div>

                  {formData.hasPets === 'Yes' && (
                    <div className="form-group animate-fade-in">
                      <label className="form-label" htmlFor="petDetails">What pets do you have?</label>
                      <input
                        id="petDetails"
                        name="petDetails"
                        type="text"
                        className="form-input"
                        placeholder="e.g. 1 friendly golden retriever"
                        value={formData.petDetails}
                        onChange={handleInputChange}
                      />
                    </div>
                  )}

                  {/* Additional notes */}
                  <div className="form-group recovery-full-width">
                    <label className="form-label" htmlFor="notes">
                      Any additional details or visit preferences (Optional)
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      className="form-input"
                      rows={3}
                      placeholder="Tell us about preferred times or anything your companion should know before visiting..."
                      value={formData.notes}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div style={{ marginTop: '2rem' }}>
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-large" 
                    style={{ width: '100%' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting Enquiry...' : 'Arrange Recovery Support →'}
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
    </div>
  );
};

export default Recovery;
