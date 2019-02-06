import React, { Component } from 'react';
import './index.css';

// props
// open: true/false
// header, body, footer

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false || this.props.open
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) this.setState({open: this.props.open});
  }

  close = () => {
    this.setState({open: false});
  }

  render() {
    if (this.state.open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return (
    <div className={`modalContainer ${this.state.open ? '' : 'dispNone'}`} onClick={this.close}>
      <div className="modalWindow container ui" onClick={e => {e.stopPropagation()}}>
        <div className='modalCloseIcon'>
          <i onClick={this.close} className="close icon"></i>
        </div>
        { this.props.header ? (
          <div className='modalHeader'>
            <h3>{this.props.header}</h3>
          </div>): null}
        { this.props.body || this.props.footer ? 
          <div className='space9px'></div> : null}
        { this.props.body ? (
          <div className="modalBody">
            {this.props.body}
          </div>) : null}
        { this.props.footer ? 
        <div className='space9px'></div> : null}
        { this.props.footer ? (
          <div className="modalFooter">
            {this.props.footer}
          </div>) : null}
      </div>
    </div>
    )
  }
}

export default Modal;
