import { Link } from 'react-router-dom';
import { Coffee, Map, PhoneCall, Calendar, Smile, ShoppingBag, Sparkles } from 'lucide-react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <Coffee size={28} />,
      title: "Friendly Home Visits",
      description: "A companion visits your home for tea, conversation, or to share a hobby.",
      for: "Those who find comfort in their own space."
    },
    {
      icon: <Map size={28} />,
      title: "Outings & Walks",
      description: "Accompaniment to a local park, museum, or just a stroll around the neighbourhood.",
      for: "Those wanting to stay active and explore."
    },
    {
      icon: <PhoneCall size={28} />,
      title: "Phone & Video Calls",
      description: "Regular check-ins and meaningful chats from a distance.",
      for: "Remote connection and daily peace of mind."
    },
    {
      icon: <ShoppingBag size={28} />,
      title: "Shopping Trips",
      description: "A friendly face to accompany you to the shops and help carry bags.",
      for: "Maintaining independence with a little support."
    },
    {
      icon: <Calendar size={28} />,
      title: "Appointment Accompaniment",
      description: "Non-medical support for appointments to ensure you never go alone.",
      for: "Confidence during important visits."
    },
    {
      icon: <Smile size={28} />,
      title: "Weekly Packages",
      description: "Consistent, scheduled visits to build a lasting, trusting relationship.",
      for: "Ongoing, structured companionship."
    }
  ];

  return (
    <div className="services-page animate-fade-in">
      {/* Mini Hero */}
      <section className="mini-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="mini-hero-title">Our Services</h1>
          <p className="mini-hero-subtitle">
            A range of flexible, non-medical companionship services designed to bring joy, connection, and everyday peace of mind.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '3.5rem' }}>
        <div className="grid-3 services-grid">
          {services.map((service, index) => (
            <div key={index} className="card">
              <div className="card-icon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="card-for">
                Perfect for: {service.for}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center services-cta-banner">
          <h2>Not sure which service is right?</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            We'll guide you through your options and find the ideal companion match.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn btn-outline">Speak to our Team</Link>
            <Link to="/find-a-companion" className="btn btn-primary">Book a Companion</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
