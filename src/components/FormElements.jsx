import React from 'react';
import './wizard.css';

export const TextInput = ({ label, name, value, onChange, error, type = 'text', required = false, optional = false }) => (
  <div className="form-group">
    <label className="form-label" htmlFor={name}>
      {label} {optional && <span className="form-label-optional">(Optional)</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      className={`form-input ${error ? 'error' : ''}`}
      value={value}
      onChange={onChange}
      required={required}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export const TextArea = ({ label, name, value, onChange, error, required = false, rows = 4 }) => (
  <div className="form-group">
    <label className="form-label" htmlFor={name}>{label}</label>
    <textarea
      id={name}
      name={name}
      className={`form-textarea ${error ? 'error' : ''}`}
      value={value}
      onChange={onChange}
      required={required}
      rows={rows}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);

export const SelectInput = ({ label, name, value, onChange, options, error, required = false }) => (
  <div className="form-group">
    <label className="form-label" htmlFor={name}>{label}</label>
    <select
      id={name}
      name={name}
      className={`form-select ${error ? 'error' : ''}`}
      value={value}
      onChange={onChange}
      required={required}
    >
      <option value="" disabled>Select an option</option>
      {options.map((opt) => (
        <option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </option>
      ))}
    </select>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export const CheckboxGroup = ({ label, name, values, onChange, options, error, hasOther = false, otherValue = '', onOtherChange }) => {
  const handleCheck = (e) => {
    const { value, checked } = e.target;
    let newValues = [...values];
    if (checked) {
      newValues.push(value);
    } else {
      newValues = newValues.filter(v => v !== value);
    }
    onChange({ target: { name, value: newValues } });
  };

  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <div className="checkbox-group">
        {options.map((opt) => (
          <label key={opt} className="checkbox-label">
            <input
              type="checkbox"
              name={name}
              value={opt}
              checked={values.includes(opt)}
              onChange={handleCheck}
            />
            {opt}
          </label>
        ))}
        {hasOther && (
          <label className="checkbox-label">
            <input
              type="checkbox"
              name={name}
              value="Other"
              checked={values.includes("Other")}
              onChange={handleCheck}
            />
            Other
            {values.includes("Other") && (
              <input
                type="text"
                className="form-input"
                style={{ marginLeft: '10px', marginTop: '-5px', width: 'auto' }}
                value={otherValue}
                onChange={onOtherChange}
                placeholder="Please specify"
              />
            )}
          </label>
        )}
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export const RadioGroup = ({ label, name, value, onChange, options, error }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <div className="radio-group">
      {options.map((opt) => (
        <label key={opt} className="radio-label">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={onChange}
          />
          {opt}
        </label>
      ))}
    </div>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export const SingleCheckbox = ({ label, name, checked, onChange, error, required = false }) => (
  <div className="form-group">
    <label className="checkbox-label">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange({ target: { name, value: e.target.checked } })}
        required={required}
      />
      <span>{label}</span>
    </label>
    {error && <span className="error-message">{error}</span>}
  </div>
);

export const SelectableCard = ({ label, icon, selected, onClick }) => (
  <div 
    className={`selectable-card ${selected ? 'selected' : ''}`} 
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') onClick(); }}
  >
    <div className="selectable-card-icon">
      {icon}
    </div>
    <div className="selectable-card-label">
      {label}
    </div>
  </div>
);
