import React, { Component } from 'react';
import Calendar from '../../shared/calendar/calendar';
import ReviewsContainer from './reviews_container/reviews_container'
import Carousel from '../../shared/carousel';
import { convertDateObjToCalendarVal } from '../../../helper';
import './experience_details.css';
import axios from 'axios';

class ExperienceDetails extends Component {
  constructor(props){
    super(props);
    this.state = {
      experience_id: null,
      show: false,
      date: "",
      auth: this.props.auth,
      guests: null
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.id !== this.props.id){
      this.setState({
        experience_id: this.props.id
      })
    }
  }

  handleSubmit = async e => {
    const {experience_id, date, guests} = this.state
    e.preventDefault();

    await axios.post(`/api/experiences/${experience_id}/dates/book`, 
    {
      date,
      guests,
    });
    
    this.props.getDetails()
    // this.props.history.push('/');
  }

  getGuests = e => {
    e.preventDefault();

    this.setState({
      guests: e.target.value
    });
  }

  reserveModal = () => (
    <div className="ui one column stackable center aligned page grid">
      <div className="column four wide">
        <form action="" className="ui form" onSubmit={this.handleSubmit}>
          <div id="guests" className="ui action input topMargin eleven wide field">
            <input type="number" placeholder="Enter # of Guests" onChange={this.getGuests}/>
            <button className="ui teal button" type="submit">Reserve</button>
          </div>
        </form>
      </div>
    </div>
    );
  
  signInPrompt = () => (
        this.props.auth ? (<a 
          href='/oauth/logout'
          className='ui button primary'
        >Log Out</a>)
        :
        (<a 
          href='/oauth/login'
          className='ui button primary'
        >Log In / Sign Up</a>)
  );

  displayModal = () => {
    if (this.state.auth) {
      return this.reserveModal();
    } else {
      return this.signInPrompt();
    }
  }

  handleDateClicked = (date) => {
    date = new Date(date)
    console.log(date)
    this.setState({
      show: true,
      date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    });
  }

  render() {
    console.log(this.props.id, 'state', this.state)
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
            tileClassName={({date}) => dateArray.includes(date.toLocaleDateString()) ? "active" : null }
            tileDisabled={({date}) => !dateArray.includes(date.toLocaleDateString())}
            onClickDay={(date)=>{this.handleDateClicked(date)}}
          />
        </div>
        <div className="center aligned bigTopMargin">
          { this.state.show ? this.displayModal() : ''}
        </div>
        <div className="reviews bigTopMargin">
          <ReviewsContainer avg={average_rating} total={total_ratings} reviews={reviews}/>
        </div>
      </div>
    );
  }
}

export default ExperienceDetails;

