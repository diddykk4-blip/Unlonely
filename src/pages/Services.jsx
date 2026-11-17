import { Link } from 'react-router-dom';
import { Coffee, Map, PhoneCall, Calendar, Smile, ShoppingBag } from 'lucide-react';
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
      <div className="container">
        <div className="text-center services-header">
          <h1>Our Services</h1>
          <p>
            We provide a range of non-medical companionship services designed to bring joy, connection, and peace of mind.
          </p>
        </div>

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
          <Link to="/contact" className="btn btn-primary">Speak to our Team</Link>
        </div>
      </div>
    </div>
  );
};

export default Services;
