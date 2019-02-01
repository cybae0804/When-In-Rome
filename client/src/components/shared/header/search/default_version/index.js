import React from 'react';
import './index.css';

export default ({submit, change, val, view}) => (
  <form 
    id='search' 
    className={`ui left icon input ${view === 'desktop' ? 'desktopDefaultSearch' : ''}`} 
    onSubmit={submit}
  >
    <i className="search link icon" onClick={submit} />
    <input 
      type="text" 
      name="cityjob" 
      placeholder="Osaka, Japan" 
      onChange={change} 
      value={val}
    />
  </form>
);
