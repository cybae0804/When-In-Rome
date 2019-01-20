import React from 'react';
import './input.css';

export default ({id, label, input, meta: { touched, error}}) => {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input {...input} type="text" autoComplete="off" />
      <p className="errorMessage">{touched && error}</p>
    </div>
  );
}
