import { Link } from 'react-router-dom';
import { Shield, MessageCircle } from 'lucide-react';

const Companions = () => {
  const companions = [
    {
      name: "Sarah Jenkins",
      bio: "A retired teacher who loves gardening, baking, and sharing stories over a pot of tea.",
      interests: ["Gardening", "Baking", "Literature"],
      languages: ["English"],
      availability: "Weekdays (Morning)",
      avatarPlaceholder: "S"
    },
    {
      name: "David Chen",
      bio: "Former architect passionate about local history, museums, and gentle walks in the park.",
      interests: ["History", "Architecture", "Walking"],
      languages: ["English", "Mandarin"],
      availability: "Flexible",
      avatarPlaceholder: "D"
    },
    {
      name: "Emma Thompson",
      bio: "A wonderful listener who enjoys knitting, classical music, and helping with small errands.",
      interests: ["Knitting", "Music", "Crafts"],
      languages: ["English"],
      availability: "Weekends",
      avatarPlaceholder: "E"
    }
  ];

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <div className="text-center mb-lg">
          <h1>Meet Our Companions</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Every companion at Unlonely is carefully selected, fully vetted, and deeply passionate about building meaningful connections.
          </p>
        </div>

        <div className="grid-3">
          {companions.map((comp, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--secondary-color)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold'
                }}>
                  {comp.avatarPlaceholder}
                </div>
                <div>
                  <h3 style={{ marginBottom: '0.25rem' }}>{comp.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--success-color)', fontSize: '0.875rem' }}>
                    <Shield size={14} /> <span>DBS Checked</span>
                  </div>
                </div>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', flexGrow: 1 }}>
                "{comp.bio}"
              </p>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <strong>Interests:</strong> {comp.interests.join(', ')}
                </p>
                <p style={{ fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <strong>Languages:</strong> {comp.languages.join(', ')}
                </p>
                <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
                  <strong>Availability:</strong> {comp.availability}
                </p>
                <button className="btn btn-outline" style={{ width: '100%' }}>
                  <MessageCircle size={18} /> Request Match
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4" style={{ backgroundColor: '#fff', padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 className="mb-sm">Become a Companion</h2>
          <p className="mb-md">Are you empathetic, reliable, and looking to make a meaningful difference in someone's life?</p>
          <Link to="/become-companion" className="btn btn-primary">Learn More & Apply</Link>
        </div>
      </div>
    </div>
  );
};

export default Companions;
