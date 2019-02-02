import React, { Fragment, Component } from 'react';
import Transition from 'react-addons-css-transition-group';
import Indicators from './indicators';
import './carousel.css';

class Carousel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      currentIndex: 0,
      images: [],
      direction: 'next',
      transitionTime: 500,
      canClick: true
    }
  }

  enableClick(delay) {
    setTimeout(() => {
      this.setState({ canClick: true })
    }, delay);
  }

  directToImage(index) {
    const { canClick, transitionTime } = this.state;
    if (!canClick) return;

    this.setState({
      currentIndex: index,
      direction: 'fade',
      canClick: false
    }, () => this.enableClick(transitionTime));
  }

  changeImg(nextDirection = 'next') {
    const { canClick, currentIndex, transitionTime } = this.state;
    const length = this.props.images.length;
    if (!canClick) return;

    if (nextDirection !== 'next' && nextDirection !== 'previous') {
      nextDirection = 'next'
    }

    let nextIndex = nextDirection === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (nextIndex >= length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = length - 1;
    }
    
    this.setState({
      currentIndex: nextIndex,
      direction: nextDirection,
      canClick: false
    }, () => this.enableClick(transitionTime));
  }

  render() {
    const { direction, currentIndex, transitionTime } = this.state;
    let images = [];
    
    if (this.props.images && this.props.images.length) {
      images = this.props.images.map(image => 'https://s3-us-west-1.amazonaws.com/when-in-rome/' + image.imagePath);
    }
    
    if (!images.length) {
      return (
        <div className="center-all carousel-container">
          <div class="ui segment">
            <div class="ui active inverted dimmer">
              <div class="ui massive text loader">Loading</div>
            </div>
            <p></p>
          </div>
        </div>
      );
    }

    const src = images[currentIndex];
    const count = images.length > 1 ? images.length : 0;
    const arrows = count ? (
                    <Fragment>
                      <i className="huge angle left leftpush icon overlay center-vertical white" onClick={this.changeImg.bind(this, 'previous')}></i>
                      <i className="huge angle right rightpush icon overlay center-vertical white" onClick={this.changeImg.bind(this, 'next')}></i>
                    </Fragment>
                    ) : null;                  

    return (
      <Fragment>
        <div className="image-center">
          <div className="carousel-container">
            <Transition
              transitionName={`carousel-${direction}`}
              transitionEnterTimeout={transitionTime}
              transitionLeaveTimeout={transitionTime}
            >
              <img key={src} src={src} className="carousel-img center-vertical" />
            </Transition>
            {arrows}
          </div>
        </div>
        <Indicators onClick={this.directToImage.bind(this)} count={count} current={currentIndex} />
      </Fragment>
    );
  }
}

export default Carousel;
