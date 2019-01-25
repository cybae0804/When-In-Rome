import React from 'react';
import './input.css';

export default ({id, label, input, type, meta: { touched, error}}) => {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? 
      <textarea {...input} type="text" autoComplete="off" /> : 
      <input {...input} type={type || "text"} autoComplete="off" />}
      <p className="errorMessage">{touched && error}</p>
    </div>
  );
}
