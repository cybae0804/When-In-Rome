import React from 'react';

export default ({submit, change, val}) => (
  <form id='search' className="ui left icon input" onSubmit={submit}>
    <i className="search link icon" />
    <input 
      type="text" 
      name="cityjob" 
      placeholder="Osaka, Japan" 
      onChange={change} 
      value={val}
    />
  </form>
);
