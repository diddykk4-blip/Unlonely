import React from 'react';
import { Heart, Users, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="animate-fade-in">
      {/* Mini Hero Header */}
      <section className="mini-hero">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="mini-hero-title">About Unlonely</h1>
          <p className="mini-hero-subtitle">
            We believe that every person deserves meaningful human connection. Building a warmer, more connected community.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ padding: '3.5rem 1rem 5rem' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: '#ffffff', 
            padding: '2.5rem', 
            borderRadius: 'var(--radius-lg)', 
            boxShadow: 'var(--shadow-sm)',
            border: '1px solid var(--border-color)',
            marginBottom: '2.5rem'
          }}>
            <p style={{ fontSize: '1.25rem', color: 'var(--brand-slate)', lineHeight: 1.6, fontWeight: 500, marginBottom: '1.5rem' }}>
              Unlonely was founded on the simple premise that loneliness shouldn't be an inevitable part of ageing, working remotely, or living alone.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '1.5rem' }}>
              In today's fast-paced world, genuine human connection can easily slip away. We bridge that gap by connecting individuals with carefully vetted, kind-hearted companions for real-world shared moments—whether that's a quiet cup of tea, a walk in the park, or simply someone who truly listens.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <div style={{ 
              backgroundColor: '#FFF6F3', 
              padding: '2rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid rgba(255, 107, 74, 0.2)'
            }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#FF6B4A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Heart size={22} />
              </div>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Our Mission</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                To provide safe, trusted, and deeply human companionship that enriches lives and brings joy to everyday moments. We are not a care agency; we are a companionship platform dedicated to social wellbeing.
              </p>
            </div>

            <div style={{ 
              backgroundColor: '#ffffff', 
              padding: '2rem', 
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'var(--brand-slate)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Users size={22} />
              </div>
              <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Why Loneliness Matters</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                Research shows that prolonged social isolation can have profound impacts on physical health, mental wellbeing, and recovery. By pairing compassionate individuals with those seeking connection, we're building a stronger community.
              </p>
            </div>
          </div>

          <div className="text-center" style={{ 
            background: 'linear-gradient(135deg, var(--brand-slate) 0%, #1a2838 100%)', 
            color: '#fff', 
            padding: '2.5rem', 
            borderRadius: 'var(--radius-lg)' 
          }}>
            <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.75rem' }}>Ready to find a companion?</h3>
            <p style={{ color: '#e2e8f0', marginBottom: '1.5rem', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
              We'll match you with a compassionate local companion within 48 hours.
            </p>
            <Link to="/find-a-companion" className="btn btn-primary btn-large">
              Find My Companion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
