import { Link } from 'react-router-dom';
import { Search, UserCheck, CalendarDays, HeartHandshake, Sparkles } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      stepNum: "01",
      icon: <Search size={32} />,
      title: "Tell Us Your Needs",
      desc: "Reach out to us online or call us directly. We'll listen to your routines, hobbies, personality preferences, and what you're looking for in a companion."
    },
    {
      stepNum: "02",
      icon: <UserCheck size={32} />,
      title: "The Perfect Match",
      desc: "Based on shared interests and geographic proximity, we match you with an Enhanced DBS-checked, vetted, and compassionate local companion."
    },
    {
      stepNum: "03",
      icon: <CalendarDays size={32} />,
      title: "Your First Meeting",
      desc: "Your initial meeting is scheduled at your pace. We check in with you and your family right after to ensure everyone feels completely comfortable."
    },
    {
      stepNum: "04",
      icon: <HeartHandshake size={32} />,
      title: "Ongoing Friendship",
      desc: "Enjoy regular visits, outings, or chats. There are no locking contracts, and our support team is always on hand for anything you need."
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Mini Hero Header */}
      <section className="mini-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="mini-hero-title">How It Works</h1>
          <p className="mini-hero-subtitle">
            A gentle, guided four-step process to introduce trusted companionship into your life.
          </p>
        </div>
      </section>

      {/* Main Steps Content */}
      <div className="container" style={{ padding: '3.5rem 1rem 5rem' }}>
        <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              gap: '2rem', 
              alignItems: 'flex-start',
              padding: '2.25rem',
              backgroundColor: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--border-color)',
              position: 'relative'
            }}>
              <div style={{ 
                backgroundColor: 'rgba(255, 107, 74, 0.1)', 
                color: 'var(--primary-color)',
                padding: '1.1rem',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {step.icon}
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: 800, 
                    color: 'var(--primary-color)', 
                    backgroundColor: '#FFF6F3', 
                    padding: '0.2rem 0.6rem', 
                    borderRadius: '9999px',
                    letterSpacing: '0.05em'
                  }}>
                    STEP {step.stepNum}
                  </span>
                  <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', margin: 0 }}>{step.title}</h3>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Reassurance */}
        <div className="text-center" style={{ 
          marginTop: '3.5rem', 
          maxWidth: '840px', 
          margin: '3.5rem auto 0',
          background: 'linear-gradient(145deg, #ffffff 0%, #FFF8F6 100%)',
          padding: '3rem 2rem',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid rgba(255, 107, 74, 0.25)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h2 style={{ fontSize: '1.8rem', color: 'var(--brand-slate)', marginBottom: '0.75rem' }}>
            Ready to get started?
          </h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 1.75rem', fontSize: '1.05rem' }}>
            Fill out our quick matching form and we will introduce you to your companion within 48 hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/find-a-companion" className="btn btn-primary btn-large">
              Find My Companion
            </Link>
            <Link to="/contact" className="btn btn-outline btn-large">
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
