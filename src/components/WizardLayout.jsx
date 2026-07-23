import React from 'react';
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
  const progressPercentage = ((currentStep) / totalSteps) * 100;

  return (
    <div className="wizard-container">
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
      </div>
    </div>
  );
};

export default WizardLayout;
