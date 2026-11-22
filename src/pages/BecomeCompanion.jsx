import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';
import WizardLayout from '../components/WizardLayout';
import { TextInput, SelectInput, CheckboxGroup, RadioGroup, SingleCheckbox, TextArea } from '../components/FormElements';
import { submitApplication } from '../services/api';
import { triggerWelcomeEmail } from '../services/emailService';

const INITIAL_STATE = {
  fullName: '',
  dob: '',
  niNumber: '',
  address: '',
  phone: '',
  email: '',
  transport: '',
  
  motivation: '',
  experience: '',
  impactExample: '',
  
  languages: '',
  interests: [],
  interestsOther: '',
  availability: [],
  
  dbsConsent: '',
  refereeConsent: '',
  criminalConviction: '',
  convictionDetails: '',
  dbsUpdateService: '',
  
  confirmTrue: false,
  confirmSelfEmployed: false
};

const INTEREST_OPTIONS = [
  'Reading/Books', 'Walking/Nature', 'Gardening', 'Arts & crafts', 
  'Music/Concerts', 'Cooking/Baking', 'Films/Cinema', 'Sports/Exercise', 
  'Board games/Puzzles', 'Visiting museums/galleries', 'Shopping/Cafés', 
  'Pets/Animals'
];

const AVAILABILITY_OPTIONS = [
  'Weekday mornings', 'Weekday afternoons', 'Evenings', 'Weekends', 'Flexible'
];

const BecomeCompanion = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ageError, setAgeError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' && (name === 'confirmTrue' || name === 'confirmSelfEmployed') ? checked : value
    }));
  };

  const isValidAge = (dobString) => {
    if (!dobString) {
      return false;
    }
    const dob = new Date(dobString);
    if (isNaN(dob.getTime())) return false;
    
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    
    return age >= 18;
  };

  const validateStep = () => {
    switch(currentStep) {
      case 1:
        return formData.fullName.trim() !== '' && 
               formData.dob !== '' && isValidAge(formData.dob) &&
               formData.address.trim() !== '' &&
               formData.phone.trim() !== '' &&
               formData.email.trim() !== '' &&
               formData.transport !== '';
      case 2:
        return formData.motivation.trim() !== '' && 
               formData.impactExample.trim() !== '';
      case 3:
        return true; // Languages, hobbies, availability are optional or arrays
      case 4:
        const validConviction = formData.criminalConviction === 'No' || 
                                (formData.criminalConviction === 'Yes' && formData.convictionDetails.trim() !== '');
        return formData.dbsConsent === 'Yes' && 
               formData.refereeConsent === 'Yes' && 
               formData.criminalConviction !== '' &&
               validConviction &&
               formData.dbsUpdateService !== '';
      case 5:
        return formData.confirmTrue === true && 
               formData.confirmSelfEmployed === true;
      default:
        return false;
    }
  };

  const getIsNextDisabled = () => {
    if (currentStep === 4 && formData.dbsConsent === 'No') return true;
    return !validateStep();
  };

  const handleNext = async () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit
      setIsSubmitting(true);
      try {
        const payload = {
          formType: "companion",
          fields: formData
        };
        await submitApplication('companion_application', payload);
        setIsSuccess(true);

        // Extract first name safely from full name
        const parsedFirstName = formData.fullName ? formData.fullName.trim().split(' ')[0] : '';

        // Fire-and-forget branded welcome email confirmation (non-blocking)
        triggerWelcomeEmail({
          template: 'become-companion',
          to: formData.email,
          firstName: parsedFirstName
        });
      } catch (error) {
        console.error("Submission failed", error);
        alert("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (isSuccess) {
    return (
      <div className="container" style={{ padding: '4rem 1rem' }}>
        <div className="success-screen">
          <CheckCircle2 size={80} className="success-icon" />
          <h1 className="wizard-title mb-sm">Application Submitted</h1>
          <p className="wizard-subtitle" style={{ maxWidth: '500px', margin: '0 auto 1.5rem' }}>
            Thank you for applying to be a companion. We are reviewing your details and will be in touch shortly regarding the next steps in our vetting process.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Questions regarding recruitment? Contact our companion onboarding team at <a href="mailto:recruitments@unlonely.uk" style={{ color: 'var(--brand-orange, #FF6B4A)', fontWeight: 600 }}>recruitments@unlonely.uk</a>.
          </p>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <TextInput label="Full name" name="fullName" value={formData.fullName} onChange={handleChange} required />
            <div>
              <TextInput 
                label="Date of birth" name="dob" type="date" 
                value={formData.dob} onChange={handleChange} 
                required 
              />
              {formData.dob && !isValidAge(formData.dob) && (
                <span className="error-message" style={{ display: 'block', marginTop: '-0.5rem', marginBottom: '1rem' }}>
                  You must be at least 18 years old to apply.
                </span>
              )}
            </div>
            <TextArea label="Current address & postcode" name="address" value={formData.address} onChange={handleChange} required rows={3} />
            
            <div className="grid-2">
              <TextInput label="Phone number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
              <TextInput label="Email address" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>
            
            <SelectInput 
              label="Valid UK driving licence and access to a car?" name="transport" 
              value={formData.transport} onChange={handleChange}
              options={['Yes', 'No', 'Public transport only']} required
            />
          </>
        );
      case 2:
        return (
          <>
            <TextArea 
              label="Why do you want to be a companion?" name="motivation" 
              value={formData.motivation} onChange={handleChange} required 
            />
            <TextArea 
              label="Paid or voluntary experience supporting others" name="experience" 
              value={formData.experience} onChange={handleChange} optional 
            />
            <TextArea 
              label="Tell us about a time you made someone feel less alone" name="impactExample" 
              value={formData.impactExample} onChange={handleChange} required 
            />
          </>
        );
      case 3:
        return (
          <>
            <TextInput label="Languages spoken" name="languages" value={formData.languages} onChange={handleChange} optional />
            
            <CheckboxGroup 
              label="Hobbies & interests" name="interests" 
              values={formData.interests} onChange={handleChange}
              options={INTEREST_OPTIONS}
              hasOther={true}
              otherValue={formData.interestsOther}
              onOtherChange={(e) => handleChange({ target: { name: 'interestsOther', value: e.target.value }})}
            />
            
            <CheckboxGroup 
              label="Availability" name="availability" 
              values={formData.availability} onChange={handleChange}
              options={AVAILABILITY_OPTIONS}
            />
          </>
        );
      case 4:
        return (
          <>
            <div className="vetting-notice" style={{
              padding: '1rem 1.25rem',
              marginBottom: '1.5rem',
              backgroundColor: '#F8F9FA',
              borderLeft: '4px solid var(--brand-slate, #1F2D3D)',
              borderRadius: 'var(--radius-sm, 4px)',
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
              lineHeight: '1.55'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <ShieldCheck size={18} color="var(--brand-slate, #1F2D3D)" />
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--brand-slate, #1F2D3D)' }}>
                  Vetting &amp; Background Information Notice
                </h4>
              </div>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                Unlonely is dedicated to the safety and wellbeing of the people we support. All background vetting information is held in strict confidence, accessed solely by authorised vetting personnel, and evaluated individually on a case-by-case basis.
              </p>
              <p style={{ margin: '0 0 0.5rem 0' }}>
                Under the Rehabilitation of Offenders Act 1974, you should only disclose criminal convictions, cautions, or reprimands that you are legally required to disclose. A previous conviction does not automatically disqualify you from becoming a companion.
              </p>
              <p style={{ margin: 0, fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                For further details on how criminal conviction data is processed and retained under UK GDPR, please see our{' '}
                <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--brand-slate, #1F2D3D)', textDecoration: 'underline', fontWeight: 500 }}>
                  Privacy Policy
                </Link>.
              </p>
            </div>

            <RadioGroup 
              label="Consent to Enhanced DBS check?" name="dbsConsent" 
              value={formData.dbsConsent} onChange={handleChange}
              options={['Yes', 'No']} error={formData.dbsConsent === 'No' ? 'You must consent to an Enhanced DBS check to proceed.' : ''}
            />
            {formData.dbsConsent === 'No' && (
              <div style={{ color: '#d32f2f', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', marginTop: '-0.5rem' }}>
                <AlertTriangle size={16} /> <span>An Enhanced DBS check is required for this role.</span>
              </div>
            )}
            
            <RadioGroup 
              label="Consent to contact two referees, one from recent employer/volunteer role?" name="refereeConsent" 
              value={formData.refereeConsent} onChange={handleChange}
              options={['Yes', 'No']}
            />
            
            <RadioGroup 
              label="Ever convicted of a criminal offence, excluding spent minor motoring offences?" name="criminalConviction" 
              value={formData.criminalConviction} onChange={handleChange}
              options={['Yes', 'No']}
            />
            
            {formData.criminalConviction === 'Yes' && (
              <div className="animate-fade-in" style={{ paddingLeft: '1rem', borderLeft: '2px solid var(--accent-color)' }}>
                <TextArea 
                  label="Please provide details" name="convictionDetails" 
                  value={formData.convictionDetails} onChange={handleChange} required 
                  supportingText="All disclosures are assessed confidentially and individually in the context of the role."
                />
              </div>
            )}
            
            <SelectInput 
              label="Registered with DBS Update Service?" name="dbsUpdateService" 
              value={formData.dbsUpdateService} onChange={handleChange}
              options={['Yes', 'No', 'Not yet']} required
            />
          </>
        );
      case 5:
        return (
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--success-light)', borderRadius: 'var(--radius-sm)' }}>
            <h3 className="mb-sm">Declaration</h3>
            <SingleCheckbox 
              label="I confirm the information given is true and complete" 
              name="confirmTrue" 
              checked={formData.confirmTrue} 
              onChange={handleChange} 
              required 
            />
            <br/>
            <SingleCheckbox 
              label="I understand this is a self-employed role and I am responsible for my own tax/NI" 
              name="confirmSelfEmployed" 
              checked={formData.confirmSelfEmployed} 
              onChange={handleChange} 
              required 
            />
          </div>
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    "Personal Details",
    "Experience & Motivation",
    "Practical Skills",
    "Compliance & Vetting",
    "Declaration"
  ];

  return (
    <WizardLayout
      title="Join us as a companion"
      intro="Thank you for wanting to bring connection to others. This takes 10 minutes. All info is confidential."
      currentStep={currentStep}
      totalSteps={5}
      stepTitle={stepTitles[currentStep - 1]}
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={getIsNextDisabled()}
      isSubmitting={isSubmitting}
      submitLabel="Submit application →"
    >
      {renderStepContent()}
    </WizardLayout>
  );
};

export default BecomeCompanion;
