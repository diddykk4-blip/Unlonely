import { Link } from 'react-router-dom';
import { Coffee, Map, PhoneCall, Calendar, Smile, ShoppingBag } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Coffee size={32} />,
      title: "Friendly Home Visits",
      description: "A companion visits your home for tea, conversation, or to share a hobby.",
      for: "Those who find comfort in their own space."
    },
    {
      icon: <Map size={32} />,
      title: "Outings & Walks",
      description: "Accompaniment to a local park, museum, or just a stroll around the neighbourhood.",
      for: "Those wanting to stay active and explore."
    },
    {
      icon: <PhoneCall size={32} />,
      title: "Phone & Video Calls",
      description: "Regular check-ins and meaningful chats from a distance.",
      for: "Remote connection and daily peace of mind."
    },
    {
      icon: <ShoppingBag size={32} />,
      title: "Shopping Trips",
      description: "A friendly face to accompany you to the shops and help carry bags.",
      for: "Maintaining independence with a little support."
    },
    {
      icon: <Calendar size={32} />,
      title: "Appointment Accompaniment",
      description: "Non-medical support for appointments to ensure you never go alone.",
      for: "Confidence during important visits."
    },
    {
      icon: <Smile size={32} />,
      title: "Weekly Packages",
      description: "Consistent, scheduled visits to build a lasting, trusting relationship.",
      for: "Ongoing, structured companionship."
    }
  ];

  return (
    <div className="animate-fade-in section">
      <div className="container">
        <div className="text-center mb-lg">
          <h1>Our Services</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            We provide a range of non-medical companionship services designed to bring joy, connection, and peace of mind.
          </p>
        </div>

        <div className="grid-3">
          {services.map((service, index) => (
            <div key={index} className="card" style={{ border: '1px solid var(--border-color)' }}>
              <div style={{ color: 'var(--accent-color)', marginBottom: '1rem' }}>
                {service.icon}
              </div>
              <h3 className="mb-xs">{service.title}</h3>
              <p className="mb-sm">{service.description}</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--secondary-color)', fontWeight: '500' }}>
                Perfect for: {service.for}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center" style={{ marginTop: 'var(--space-lg)' }}>
          <h2 className="mb-md">Not sure which service is right?</h2>
          <Link to="/contact" className="btn btn-primary">Speak to our Team</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
