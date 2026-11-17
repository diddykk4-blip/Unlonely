import { Link } from 'react-router-dom';
import { Search, UserCheck, CalendarDays, HeartHandshake } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search size={40} />,
      title: "1. Tell Us Your Needs",
      desc: "Reach out to us online or over the phone. We'll listen to your preferences, interests, and what you're looking for in a companion."
    },
    {
      icon: <UserCheck size={40} />,
      title: "2. The Perfect Match",
      desc: "Based on shared interests and personality, we carefully select a fully vetted and trained companion just for you."
    },
    {
      icon: <CalendarDays size={40} />,
      title: "3. First Meeting",
      desc: "Your first meeting is facilitated to ensure everyone feels comfortable. We check in afterwards to make sure it's a great fit."
    },
    {
      icon: <HeartHandshake size={40} />,
      title: "4. Stay Connected",
      desc: "Enjoy regular visits or calls. Our support team remains available to ensure the companionship continues to bring joy."
    }
  ];

  return (
    <div className="animate-fade-in inner-page">
      <div className="container">
        <div className="text-center mb-lg">
          <h1>How It Works</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>A simple, reassuring process to find your perfect companion.</p>
        </div>
        
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
          {steps.map((step, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              gap: '2rem', 
              alignItems: 'flex-start',
              padding: 'var(--space-md)',
              backgroundColor: '#fff',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ 
                backgroundColor: 'var(--success-light)', 
                color: 'var(--secondary-color)',
                padding: '1rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {step.icon}
              </div>
              <div>
                <h3 className="mb-xs" style={{ fontSize: '1.5rem' }}>{step.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center" style={{ marginTop: 'var(--space-xl)' }}>
          <Link to="/pricing" className="btn btn-primary">View Pricing & Book</Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
