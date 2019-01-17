import React from 'react';

export default props => {
  return (
    <div className="field">
      <label htmlFor={props.id}>{props.label}</label>
      <input {...props.input} type={props.type || 'text'} accept={props.accept}  autoComplete="off" />
    </div>
  );
}