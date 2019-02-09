import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import Calendar from '../../shared/calendar/calendar';
import ReviewsContainer from './reviews_container/reviews_container';
import Carousel from '../../shared/carousel';
import { convertDateObjToCalendarVal, getDate, keygen } from '../../../helper';
import './experience_details.css';
import Modal from '../../shared/modal';
import axios from 'axios';

class ExperienceDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      experience_id: null,
      date: "",
      auth: this.props.auth,
      guests: null,
      version: "",
      header: '',
      body: '',
      footer: '',
    };
  }

  componentDidUpdate(prevProps){
    if (prevProps.id !== this.props.id) {
      this.setState({
        experience_id: this.props.id
      });
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const {experience_id, date, guests, version} = this.state;
    const {activity, 
      occupation, 
      city, 
      country} = this.props;
    
    if (version === "invalid" ){
      return;
    }
    
    this.setState({
      guests: null
    });
    
    const resp = await axios.post(`/api/experiences/${experience_id}/dates/book`, 
    {
      date,
      guests,
    });

    if (resp.data.success) {
      this.setState({
        version: "success",
        header: 'Successfully Booked!',
        body: `You are scheduled for ${activity} with a ${occupation} in ${city}, ${country} on ${this.state.date}`,
        footer: ''
      });
    } else {
      this.setState({
        version: "failure",
        header: 'Failed to book.',
        body: 'You already have an experience booked on this date. Please choose a different date.',
        footer: ''
      });
    }

    this.props.getDetails();
  }

  getGuests = e => {
    e.preventDefault();

    if (e.target.value <= 0 || e.target.value > this.props.guests){
      this.setState({
        version: "invalid"
      })
    } else {
      this.setState({
        guests: e.target.value,
        version: "reserve"
      });
    }
  }

  redirectToLogin = () => {
    localStorage.setItem('redirectUrl', window.location.pathname)
    this.props.history.push('/login')
  }
  
  closeMessage = () => {
   this.setState({
     header: '',
     body: '',
     footer: '',
     version: "",
   });
  }

  handleDateClicked = (date) => {
    date = new Date(date);
    this.props.auth ? 
      this.setState({
        version: 'reserve',
        date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        header: `Reserving for ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        body: (<div className="ui one column stackable center aligned page grid">
          <div className="column ten wide">
            <form data-tooltip={`Up to ${this.props.guests} guests can join.`} action="" className="ui form" onSubmit={this.handleSubmit}>
              <div id="guests" className="ui action input eleven wide field">
                <input required type="number" placeholder="Enter # of Guests" onChange={this.getGuests}/>
                <button className="ui positive button" type="submit">Reserve</button>
              </div>
              {this.state.version === "invalid" ? 
              <div>
                <p className="errorMessage">Please Enter a valid # of Guests</p>
              </div> : ""} 
            </form>
          </div>
        </div>),
        footer: <div></div>
      }) : this.setState({
        version: 'noAuth',
        date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`,
        header: 'Please sign in before reserving',
        body: '',
        footer: [(<button
          key={keygen()}
          onClick={this.closeMessage}
          className='ui button'
        >Cancel</button>), (<button
          key={keygen()}
          onClick={this.redirectToLogin}
          className='ui button primary'
        >Log In / Sign Up</button>)]
      })

    for(let booking of this.props.dates){
      let matchingDates = getDate(new Date(booking.date)) === getDate(new Date(date))
      if (matchingDates && booking.guests){
        this.setState({
          version: ""
        })
      }
    }
  }

  displayCalendarDates = (date, dateArray) => {
    if(!dateArray){
      return ""
    }
    for (let booking of dateArray){
      let matchingDates = getDate(new Date(booking.date)) === getDate(new Date(date))
      if(matchingDates && !booking.guests){
        return "active"
      }else if(matchingDates){
        return "booked"
      }
    }
  }

  render() {
    const { id, 
            activity, 
            occupation, 
            city, 
            country, 
            dates,
            price, 
            guests, 
            host, 
            host_info,
            activity_info,
            reviews,
            average_rating, 
            total_ratings,
            images } = this.props;
    const title = `${activity} with a ${occupation}`;
    const starsDisplay = [];
    const averageRatingInteger = Math.floor(average_rating);
    const averageRatingDecimal = average_rating - averageRatingInteger;
    for (let i = 0; i < averageRatingInteger; i++) {
      starsDisplay.push(<i key={i} className="star icon"></i>);
    }

    if (averageRatingDecimal >= 0.5) {
      starsDisplay.push(<i key={4} className="star half icon"></i>);
    }

    const dateArray = dates ? 
      dates.map( value => convertDateObjToCalendarVal(new Date(value.date))) : 
      [];

      return (
        <div>
          <Carousel images={images}/>
          <div className="ui container bottomMargin">
            <h1 className="detailsHeading-1 center bottomMargin30px">{title}</h1>
            <div className="overview ui relaxed list container">
              <div className="item">
                <i className="icon map marker alternate large" id="detailsIcon"></i>
                &nbsp; {`${city}, ${country}`}
              </div>
              <div className="item">
                <i className="icon dollar sign large" id="detailsIcon"></i>
                &nbsp; {`$${price}`}
              </div>
              <div className="item">
                <i className="icon clock outline large" id="detailsIcon"></i>
                &nbsp; Full Day
            </div>
              <div className="item">
                <i className="icon users large" id="detailsIcon"></i>
                &nbsp; {guests}
              </div>
              <div className="item">
                <i className="icon id badge large" id="detailsIcon"></i>
                &nbsp; {host}
              </div>
            </div>
          </div>
          <div className="ui container">
            <h2 className="ui header horizontal divider container detailsHeading-2 topMargin">
              Host Info
            </h2>
            <p>{host_info}</p>
            <h2 className="ui header horizontal divider container detailsHeading-2 topMargin">
              Activity
            </h2>
            <p>{activity_info}</p>
          </div>
          <div className="topMargin ui container">
            <h2 className="ui header horizontal divider container detailsHeading-2 bottomMargin topMargin">
                Dates
            </h2>
            <Calendar 
              tileClassName={({date}) => this.displayCalendarDates(date, dates)}
              tileDisabled={({date}) => !dateArray.includes(date.toLocaleDateString())}
              onClickDay={(date)=>{this.handleDateClicked(date)}}
            />
            <div className="ui container topMargin calendar-legend">
              <div className="center">
                <div className="content legend" id="available"></div>
                <span>Available</span>
              </div>
              <div className="center">
                <div className="content legend" id="booked"></div>
                <span>Booked</span>
              </div>
            </div>
          </div>
          <div className="reviews bigTopMargin">
            <ReviewsContainer avg={average_rating} total={total_ratings} reviews={reviews}/>
          </div>
          <Modal 
            header={this.state.header}
            body={this.state.body}
            footer={this.state.footer || <button onClick={this.closeMessage} className='button ui positive'>Okay</button>}
            open={this.state.version}
            close={this.closeMessage}/>
        </div>
    );
  }
}

export default withRouter(ExperienceDetails);
