import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './wizard.css';

const WizardLayout = ({ 
  title, 
  intro, 
  currentStep, 
  totalSteps, 
  stepTitle, 
  onNext, 
  onBack, 
  isNextDisabled, 
  isSubmitting, 
  children,
  submitLabel = "Continue"
}) => {
  const containerRef = useRef(null);
  const progressPercentage = ((currentStep) / totalSteps) * 100;

  // Whenever the step changes, smoothly scroll to top of the wizard container
  useEffect(() => {
    if (containerRef.current) {
      const topOffset = containerRef.current.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: Math.max(0, topOffset),
        behavior: 'smooth'
      });
    }
  }, [currentStep]);

  return (
    <div className="wizard-container" ref={containerRef}>
      <div className="wizard-header">
        <h1 className="wizard-title">{title}</h1>
        {intro && <p className="wizard-subtitle">{intro}</p>}
        
        <div className="wizard-progress">
          <span className="progress-text">Step {currentStep} of {totalSteps}</span>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="wizard-step">
        <h2 className="wizard-section-title">{stepTitle}</h2>
        
        <div className="wizard-form-content">
          {children}
        </div>
        
        <div className="wizard-footer">
          {currentStep > 1 ? (
            <button 
              type="button" 
              className="btn btn-back" 
              onClick={onBack}
              disabled={isSubmitting}
            >
              Back
            </button>
          ) : (
            <div></div> // Empty div for flexbox spacing
          )}
          
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={onNext}
            disabled={isNextDisabled || isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : (currentStep === totalSteps ? submitLabel : 'Continue')}
          </button>
        </div>

        <p className="wizard-privacy-notice">
          {currentStep === totalSteps ? (
            <>
              By submitting this form, you acknowledge that your information will be handled in accordance with our{' '}
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
            </>
          ) : (
            <>
              Your personal data is handled securely in accordance with our{' '}
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default WizardLayout;
