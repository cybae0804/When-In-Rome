import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { keygen } from '../../../helper';
import Modal from '../../shared/modal';
import axios from 'axios';
import './upcoming.css';

class Upcoming extends Component {
  state = {
    modalOpen: false,
    header: '',
    footer: '',
    expToDelete: null,
    dateToDrop: null,
  }

  closeModal = () => {
    this.setState({
      modalOpen: false,
      header: '',
      footer: '',
      expToDelete: null,
      dateToDrop: null,
    });
  }

  deleteExp = async () => {
    await axios.delete(`/api/experiences/${this.state.expToDelete}`);

    this.props.getServerData();  
  }

  dropDate = async () => {
    await axios.put('/api/experiences/0/dates/book', {
      date_id: this.state.dateToDrop
    });

    this.props.getServerData();    
  }

  render() {
    const { history, data, asUser } = this.props;
    const display = [];
    const today = new Date();
    const uniqueExp = new Set();
    
    for (let i = 0; i < data.length; i++){
      
      if (new Date(data[i].date >= today)){
        
        if (!uniqueExp.has(data[i].experience_id)){
  
          uniqueExp.add(data[i].experience_id);
          display.push((
            <div className='item' key={keygen()}>
              <div className="right floated content">
                { asUser ?
                 (<Fragment>
                   <button 
                      className="ui mini button basic green content desktop"
                      onClick={() => {history.push(`/experience/${data[i].experience_id}`)}}  
                    >View</button>
                    <button 
                      className="ui mini icon button basic green content mobile"
                      onClick={() => {history.push(`/experience/${data[i].experience_id}`)}}>
                      <i className="eye icon"></i>
                    </button>
                  </Fragment>) : 
                  (<Fragment>
                    <button 
                      className="ui mini button basic green content desktop"
                      onClick={() => {history.push(`/edit_experience/${data[i].experience_id}`)}}  
                    >Edit</button>
                    <button 
                      className="ui mini icon button basic positive content mobile"
                      onClick={() => {history.push(`/edit_experience/${data[i].experience_id}`)}}>
                      <i className="edit icon"></i>
                    </button>
                    <button 
                      className="ui mini button basic red content desktop"
                      onClick={() => {this.setState({
                        modalOpen: true,
                        expToDelete: data[i].experience_id,
                        header: 'Are you sure you want to delete this experience?',
                        footer: [
                          <button key={keygen()} className='ui button' onClick={this.closeModal}>Cancel</button>, 
                          <button key={keygen()} 
                            className='ui button negative' 
                            onClick={async () => {
                              await this.deleteExp(); 
                              this.closeModal(); 
                              this.props.getServerData();
                            }}>Confirm</button>]
                    })}}
                    >Delete</button>
                    <button 
                      className="ui mini icon button basic red content mobile"
                      onClick={() => {this.setState({
                        modalOpen: true,
                        expToDelete: data[i].experience_id,
                        header: 'Are you sure you want to delete this experience?',
                        footer: [
                          <button key={keygen()} className='ui button' onClick={this.closeModal}>Cancel</button>, 
                          <button key={keygen()} 
                            className='ui button negative' 
                            onClick={async () => {
                              await this.deleteExp(); 
                              this.closeModal(); 
                              this.props.getServerData();
                            }}>Confirm</button>]
                    })}}>
                      <i className="close red icon"></i>
                    </button>
                  </Fragment>)}
              </div>
              <div className="content">
                <Link to={`/experience/${data[i].experience_id}`}>
                  <h3 className='truncate topMargin4px'>{data[i].title}</h3>
                </Link>
              </div>
            </div>
          ));
        }
  
        if (data[i].guests !== null){
          display.push((
            <div key={keygen()} className={`item indentedItem ${i === data.length - 1 ? 'bottomMargin20px' : ''}`}>
              <div className="right floated content">
                <button className="ui button mini basic orange" onClick={
                  () => {
                    this.setState({
                      modalOpen: true,
                      dateToDrop: data[i].date_id,
                      header: 'Are you sure you want to drop this date?',
                      footer: [
                        <button key={keygen()} className='ui button' onClick={this.closeModal}>Cancel</button>, 
                        <button key={keygen()} 
                          className='ui button negative' 
                          onClick={async () => {
                            await this.dropDate(); 
                            this.closeModal(); 
                          }}>Confirm</button>
                      ]
                    })
                  }
                  }
                >Drop</button>
              </div>
              <div className="content">
                <h4 className='topMargin4px'>
                  {
                    !asUser ? 
                      data[i].name ? 
                        <span className="ui label tiny marginRight7px verticalAlignTextBottom">
                          <i className="users icon"></i>{data[i].guests}</span> : 
                        <span className="ui tiny label marginRight7px verticalAlignTextBottom">Open</span> :
                        <span className="ui label tiny marginRight7px verticalAlignTextBottom">
                        <i className="users icon"></i>{data[i].guests}</span>
                  }
                  {`${data[i].date.substring(0, 10)}`} 
                  { 
                    !asUser ? data[i].name ? ` with ${data[i].name}` : null : null 
                  }
                </h4>
              </div>
            </div>
          ));
        }
      }
    }

    return (
      <div className = "bigTopMargin">
        <h2 className="ui header horizontal divider container">Upcoming</h2>
        <div className="ui middle aligned list container">
          {display}
        </div>
        <h3 className="container align center ui">
          {display.length ? null : 'You have no upcoming sessions.'}
        </h3>
        {!asUser ? 
          !data.length ? (<div className='ui center aligned container'>
                          <button className='ui button' onClick={() => {history.push('/create_experience')}}>Host Experience</button>
                        </div>) : (<div className='ui center aligned container'>
                          <span data-tooltip="You can only host one experience at a time."><button className='ui button disabled'>Host Experience</button></span>
                        </div>) : null }
        <Modal 
          header={this.state.header}
          body='This action cannot be undone.'  
          footer={this.state.footer}
          open={this.state.modalOpen}
          close={this.closeModal} />
      </div>
    );
  }
}

export default withRouter(Upcoming);
