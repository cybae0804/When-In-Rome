import React from 'react';
import Calendar from '../../../calendar/calendar';

export default ({
  submit, change, val, confirm, clear, 
  open, close, dateOpen, calVal, calChange
}) => (
  <form className="ui form topMargin16px" onSubmit={submit}>
    <div className="field">
      <label>City or Job</label>
      <input 
        type="text" 
        name="cityjob" 
        placeholder="Tokyo, Japan" 
        onChange={change} 
        value={val.cityjob}
      />
    </div>
    <div className='two fields'>
      <div className="field small" id="overrideColumns">
        <label>Dates</label>
        <input readOnly 
          type="text" 
          name="date" 
          placeholder="mm/dd/yyyy" 
          onChange={change}
          onFocus={open}
          value={val.dateStart && val.dateEnd ? `${val.dateStart} to ${val.dateEnd}` : ''}
        />
      </div>
      <div className="field small" id="overrideColumns">
        <label>Guests</label>
        <input 
          type="text" 
          name="guests" 
          placeholder="5 guests" 
          onChange={change} 
          value={val.guests}
        />
      </div>
    </div>
    <div className={`field filterDrop ${dateOpen ? '' : 'dispNone'}`}>
      <label>Please select a range</label>
      <Calendar
        selectRange 
        value={calVal}
        returnValue="range" 
        onChange={calChange}
      />
      <div className="space12px"></div>
      <div className='ui align right container topMargin24px'>
        <button 
          type='button' 
          className='ui button'
          onClick={close}
        >Cancel</button>
        <button 
          type='button' 
          className='ui button orange'
          onClick={clear}
        >Clear</button>
        <button 
          type='button' 
          className='ui button positive noMarginButton'
          onClick={confirm}
        >Confirm</button>
      </div>
      <div className="space12px"></div>
    </div>
    <button className="fluid ui button positive" type="submit">Search</button>
  </form>
);
