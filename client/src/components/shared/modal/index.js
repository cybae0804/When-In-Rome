import React from 'react';
import './index.css';

// props
// open: true/false
// header, body, footer

export default ({open, close, header, body, footer}) => {
  return (
  <div className={`modalContainer ${open ? '' : 'dispNone'}`} onClick={close}>
    <div className="modalWindow container ui" onClick={e => {e.stopPropagation()}}>
      <div className='modalCloseIcon'>
        <i onClick={close} className="close icon"></i>
      </div>
      { header ? (
        <div className='modalHeader'>
          <h3>{header}</h3>
        </div>): null}
      { body || footer ? 
        <div className='space9px'></div> : null}
      { body ? (
        <div className="modalBody">
          {body}
        </div>) : null}
      { footer ? 
      <div className='space9px'></div> : null}
      { footer ? (
        <div className="modalFooter">
          {footer}
        </div>) : null}
    </div>
  </div>
  );
}
