import React, { Component } from 'react';
import Calendar from '../../shared/calendar/calendar';
import './experience_details.css';
import ReviewsContainer from './reviews_container/reviews_container'
import Carousel from '../../shared/carousel';

class ExperienceDetails extends Component {
  constructor(props){
    super(props);

    this.state = {
      show: false,
      date: "",
      signedIn: false,
      guests: null
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.history.push('/');
  }

  getGuests = e => {
    e.preventDefault();

    this.setState({
      guests: e.target.value
    });
  }

  reserveModal = () => (
    <div className="ui one column stackable center aligned page grid">
      <div className="column twelve wide">
        <form action="" className="ui form" onSubmit={this.handleSubmit}>
          <div id="guests" className="ui action input topMargin eleven wide field">
            <input type="number" placeholder="Enter Number of Guests" onChange={this.getGuests}/>
            <button className="ui teal button" type="submit">Reserve</button>
          </div>
        </form>
      </div>
    </div>
    );
  
  signInPrompt = () => (
    <h1 className="ui center aligned header">Please Sign In</h1>
  );

  displayModal = () => {
    if (this.state.signedIn) {
      return this.reserveModal();
    } else {
      return this.signInPrompt();
    }
  }

  handleDateClicked = () => {
    this.setState({
      show: true
    });
  }

  render() {
    const { id, 
            activity, 
            occupation, 
            city, 
            country, 
            price, 
            guests, 
            host, 
            host_info,
            activity_info,
            imagePath,
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

    const image_url = 'https://s3-us-west-1.amazonaws.com/when-in-rome/' + imagePath;

    //dummy dates for calendar
    const dateArray = ['1/20/2019', '1/23/2019'];
    
    return (
      <div>
        <Carousel images={images}/>
        <div className="ui container bottomMargin">
          <h1 className="detailsHeading-1 center bottomMargin20px">{title}</h1>
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
            onClickDay={this.handleDateClicked}
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

