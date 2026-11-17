const About = () => {
  return (
    <div className="animate-fade-in inner-page">
      <div className="container">
        <h1 className="text-center mb-lg">About Unlonely</h1>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p className="mb-md" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            We believe that every person deserves meaningful human connection. Unlonely was founded on the simple premise that loneliness shouldn't be a normal part of ageing or living alone.
          </p>
          
          <h2 className="mt-4 mb-sm">Our Mission</h2>
          <p className="mb-md">
            To provide safe, trusted, and deeply human companionship that enriches lives and brings joy to everyday moments. We are not a care agency; we are a companionship platform dedicated to social wellbeing.
          </p>
          
          <h2 className="mt-4 mb-sm">Why Loneliness Matters</h2>
          <p className="mb-md">
            Research shows that social isolation can have profound effects on our mental and physical health. By pairing compassionate individuals with those seeking connection, we're building a stronger, warmer community.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
