import React, { Fragment } from 'react';
import './dropdown.css';

export default ({ id, label, input, values, meta: { touched, error } }) => {
  return (
    <Fragment>
      <div className="field width60px">
        <label htmlFor={id}>{label}</label>
          <select {...input}>
            <option></option>
            {values.map((value, index) => <option key={index} value={value}>{value}</option>)}
            {/* <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option> */}
          </select>
      </div>
      <p className="errorMessage">{touched && error}</p>
    </Fragment>
  );
}