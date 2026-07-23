import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import WizardLayout from '../components/WizardLayout';
import { TextInput, SelectInput, CheckboxGroup, RadioGroup, SingleCheckbox, TextArea } from '../components/FormElements';
import { submitApplication } from '../services/api';

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
               formData.niNumber.trim() !== '' &&
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
          <p className="wizard-subtitle" style={{ maxWidth: '500px', margin: '0 auto' }}>
            Thank you for applying to be a companion. We are reviewing your details and will be in touch shortly regarding the next steps in our vetting process.
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
            <TextInput label="National Insurance number" name="niNumber" value={formData.niNumber} onChange={handleChange} required />
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
