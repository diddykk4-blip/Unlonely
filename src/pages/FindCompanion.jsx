import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, User, Users, HeartHandshake } from 'lucide-react';
import WizardLayout from '../components/WizardLayout';
import { TextInput, SelectInput, CheckboxGroup, SingleCheckbox, TextArea, SelectableCard } from '../components/FormElements';
import { submitApplication } from '../services/api';

const INITIAL_STATE = {
  whoIsThisFor: '',
  
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  pronouns: '',
  postcode: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  contactMethod: '',
  bestTime: '',
  
  interests: [],
  interestsOther: '',
  
  visitFrequency: '',
  visitLength: '',
  meetLocation: '',
  
  additionalInfo: '',
  idealVisit: '',
  accessibilityNeeds: '',
  allergies: '',
  
  confirmService: false
};

const INTEREST_OPTIONS = [
  'Coffee Chats', 'Walks', 'Gardening', 'Reading', 'Museums', 
  'Music', 'Arts', 'Movies', 'Cooking', 'Board Games', 
  'Faith & Spirituality', 'Shopping', 'Exercise', 'Photography', 
  'Animals', 'Travel', 'History', 'Technology'
];

const FREQUENCY_OPTIONS = [
  'One-Time Visit', 'Weekly', 'Twice Per Week', 'Monthly', 'Not Sure Yet'
];

const FindCompanion = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' && name === 'confirmService' ? checked : value
    }));
  };
  
  const handleSelectWho = (value) => {
    setFormData(prev => ({ ...prev, whoIsThisFor: value }));
    setTimeout(() => {
      setCurrentStep(2); // Auto-advance
    }, 150);
  };

  const validateStep = () => {
    switch(currentStep) {
      case 1:
        return formData.whoIsThisFor !== '';
      case 2:
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return formData.firstName.trim() !== '' && 
               formData.lastName.trim() !== '' &&
               emailRegex.test(formData.email) &&
               formData.phone.trim() !== '' &&
               formData.dob !== '' && 
               formData.postcode.trim() !== '' &&
               formData.emergencyContactName.trim() !== '' && 
               formData.emergencyContactNumber.trim() !== '';
      case 3:
        return true; 
      case 4:
        return formData.visitFrequency !== '' && formData.visitLength !== '' && formData.meetLocation !== '';
      case 5:
        return formData.confirmService === true;
      default:
        return false;
    }
  };

  const getIsNextDisabled = () => {
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
          formType: "client",
          fields: formData
        };
        await submitApplication('client_intake', payload);
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
        <div className="success-screen animate-fade-in text-center">
          <CheckCircle2 size={80} className="success-icon" />
          <h1 className="wizard-title mb-sm">Thank you.</h1>
          <h2 className="mb-md" style={{ color: 'var(--text-secondary)', fontWeight: 400, maxWidth: '600px', margin: '0 auto 2rem' }}>
            We'll carefully match you with a suitable companion within 24 hours.
          </h2>
          <p className="wizard-subtitle mb-lg" style={{ maxWidth: '600px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
            Our team personally reviews every request to ensure we pair you with someone who shares your interests and preferences.<br/><br/>
            You'll receive an email shortly confirming we've received your request. If we need any additional information, we'll contact you directly.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/" className="btn btn-primary">Return Home</Link>
            <Link to="/companions" className="btn btn-outline">Learn About Our Companions</Link>
          </div>
        </div>
      </div>
    );
  }

  const renderStepContent = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="card-grid">
            <SelectableCard 
              label="Myself" 
              icon={<User size={40} strokeWidth={1.5} />} 
              selected={formData.whoIsThisFor === 'Myself'} 
              onClick={() => handleSelectWho('Myself')} 
            />
            <SelectableCard 
              label="A Family Member" 
              icon={<Users size={40} strokeWidth={1.5} />} 
              selected={formData.whoIsThisFor === 'A Family Member'} 
              onClick={() => handleSelectWho('A Family Member')} 
            />
            <SelectableCard 
              label="Someone Else" 
              icon={<HeartHandshake size={40} strokeWidth={1.5} />} 
              selected={formData.whoIsThisFor === 'Someone Else'} 
              onClick={() => handleSelectWho('Someone Else')} 
            />
          </div>
        );
      case 2:
        return (
          <>
            <div className="grid-2">
              <TextInput label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
              <TextInput label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
            
            <div className="grid-2">
              <TextInput label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
              <TextInput label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            </div>
            
            <div className="grid-2">
              <TextInput label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required />
              <SelectInput 
                label="Pronouns" name="pronouns" value={formData.pronouns} onChange={handleChange}
                options={['She/Her', 'He/Him', 'They/Them', 'Prefer not to say']} 
              />
            </div>
            
            <TextInput label="Postcode" name="postcode" value={formData.postcode} onChange={handleChange} required />
            
            <div className="grid-2" style={{ marginTop: '1.5rem' }}>
              <TextInput label="Emergency contact name" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} required />
              <TextInput label="Emergency contact number" name="emergencyContactNumber" type="tel" value={formData.emergencyContactNumber} onChange={handleChange} required />
            </div>
            
            <div className="grid-2" style={{ marginTop: '0.5rem' }}>
              <SelectInput 
                label="Preferred contact method" name="contactMethod" value={formData.contactMethod} onChange={handleChange}
                options={['Phone call', 'WhatsApp', 'Email']} 
              />
              <SelectInput 
                label="Best time to call" name="bestTime" value={formData.bestTime} onChange={handleChange}
                options={['Morning', 'Afternoon', 'Evening', 'Flexible']} 
              />
            </div>
          </>
        );
      case 3:
        return (
          <>
            <CheckboxGroup 
              label="" name="interests" 
              values={formData.interests} onChange={handleChange}
              options={INTEREST_OPTIONS}
              hasOther={true}
              otherValue={formData.interestsOther}
              onOtherChange={(e) => handleChange({ target: { name: 'interestsOther', value: e.target.value }})}
            />
          </>
        );
      case 4:
        return (
          <>
            <SelectInput 
              label="How often would you like companionship?" name="visitFrequency" value={formData.visitFrequency} onChange={handleChange}
              options={FREQUENCY_OPTIONS} required
            />
            <SelectInput 
              label="Preferred visit length" name="visitLength" value={formData.visitLength} onChange={handleChange}
              options={['1 hour', '2 hours', '3 hours', 'Flexible']} required
            />
            <SelectInput 
              label="Where would you like to meet?" name="meetLocation" value={formData.meetLocation} onChange={handleChange}
              options={['At home', 'At a café/park (local)', 'Phone calls only', 'Video calls only', 'Mix of all']} required
            />
          </>
        );
      case 5:
        return (
          <>
            <TextArea 
              label="Tell us anything that would help us find the perfect companion." 
              name="additionalInfo" 
              value={formData.additionalInfo} 
              onChange={handleChange} 
              rows={5}
            />
            
            <TextInput label="Describe your ideal visit in 3 words" name="idealVisit" value={formData.idealVisit} onChange={handleChange} optional />
            
            <div className="grid-2">
              <TextInput label="Accessibility needs" name="accessibilityNeeds" value={formData.accessibilityNeeds} onChange={handleChange} optional />
              <TextInput label="Allergies or medical conditions" name="allergies" value={formData.allergies} onChange={handleChange} optional />
            </div>
            
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--success-light)', borderRadius: 'var(--radius-sm)' }}>
              <SingleCheckbox 
                label="I confirm I understand Unlonely is a companionship service, not a care agency" 
                name="confirmService" 
                checked={formData.confirmService} 
                onChange={handleChange} 
                required 
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  const stepTitles = [
    "Who is this companionship for?",
    "Personal Details",
    "What would you enjoy doing together?",
    "Visit Frequency",
    "Additional Information"
  ];

  const stepIntros = [
    "Help us understand who we're matching.",
    "",
    "",
    "",
    ""
  ];

  return (
    <WizardLayout
      title={currentStep === 1 ? "" : "Find a companion"}
      intro={stepIntros[currentStep - 1]}
      currentStep={currentStep}
      totalSteps={5}
      stepTitle={stepTitles[currentStep - 1]}
      onNext={handleNext}
      onBack={handleBack}
      isNextDisabled={getIsNextDisabled()}
      isSubmitting={isSubmitting}
      submitLabel="Find My Companion"
    >
      {renderStepContent()}
    </WizardLayout>
  );
};

export default FindCompanion;
