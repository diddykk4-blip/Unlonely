import { Shield, FileCheck, Lock, AlertCircle } from 'lucide-react';

const Safety = () => {
  return (
    <div className="animate-fade-in section">
      <div className="container">
        <div className="text-center mb-lg">
          <h1>Safety & Safeguarding</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
            Your safety and peace of mind are our highest priorities. We have robust procedures in place to ensure a secure, trusting environment for every client and companion.
          </p>
        </div>

        <div className="grid-2">
          <div className="card">
            <Shield size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
            <h3>Enhanced DBS Checks</h3>
            <p>Every single companion undergoes a rigorous Enhanced Disclosure and Barring Service (DBS) check before they are approved to join our platform.</p>
          </div>
          
          <div className="card">
            <FileCheck size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
            <h3>Safeguarding Trained</h3>
            <p>All companions complete comprehensive safeguarding training, ensuring they know how to recognize and appropriately report any concerns.</p>
          </div>
          
          <div className="card">
            <Lock size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
            <h3>Professional Boundaries</h3>
            <p>We maintain strict professional boundaries. Our companions are trained on confidentiality, privacy, and the limits of non-medical support.</p>
          </div>

          <div className="card">
            <AlertCircle size={32} style={{ color: 'var(--accent-color)', marginBottom: '1rem' }} />
            <h3>Emergency Procedures</h3>
            <p>We have clear protocols in place for medical emergencies or unexpected situations, ensuring our companions know exactly what to do and who to contact.</p>
          </div>
        </div>
        
        <div className="mt-4" style={{ backgroundColor: '#fff', padding: 'var(--space-md)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
          <h2 className="mb-sm">Complaints & Feedback Process</h2>
          <p className="mb-md">We welcome all feedback and take every complaint seriously. If you have any concerns, our support team is available during working hours to investigate and resolve issues swiftly.</p>
          <a href="mailto:safeguarding@unlonely.uk" className="btn btn-outline">Contact Safeguarding Team</a>
        </div>
      </div>
    </div>
  );
};

export default Safety;
