import React, { Component } from 'react';
// Install React CSS Transition Addon:
// npm install --save react-addons-css-transition-group
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

  componentDidMount() {
    this.getImageData();
  }

  getImageData() {
    // This is where you would make an API call to get image data
    this.setState({
      images: [
        'https://s3-us-west-1.amazonaws.com/when-in-rome/082ed233-4a04-41ab-9866-32734e417f7a.jpg',
        'https://s3-us-west-1.amazonaws.com/when-in-rome/33ef0622-abec-40f5-839f-9858667c2e62.jpg',
      ],
    });
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
    const { canClick, currentIndex, images: { length }, transitionTime } = this.state;
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
    const { direction, currentIndex, images, transitionTime } = this.state;

    if (!images.length) {
      return (
        <div className="center-all carousel-container">
          <h1 className="center">Loading Images</h1>
        </div>
      )
    }

    const src = images[currentIndex];

    return (
      <div className="ui container">
        {/* <h3 className="carousel-text center">{text}</h3> */}
        <button onClick={this.changeImg.bind(this, 'previous')}>Previous Image</button>
        <div className="carousel-container">
          <Transition
            transitionName={`carousel-${direction}`}
            transitionEnterTimeout={transitionTime}
            transitionLeaveTimeout={transitionTime}
          >
            <img key={src} src={src} className="carousel-img" />
          </Transition>
        </div>
        <button onClick={this.changeImg.bind(this, 'next')}>Next Image</button>
        <Indicators onClick={this.directToImage.bind(this)} count={images.length} current={currentIndex} />
      </div>
    );
  }
}

export default Carousel;
