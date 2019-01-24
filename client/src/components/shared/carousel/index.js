import React, { Fragment, Component } from 'react';
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
    // this.state.images = this.props.images;
  }

  getImageData() {
    // This is where you would make an API call to get image data

    this.setState({
      images: [
        'https://s3-us-west-1.amazonaws.com/when-in-rome/082ed233-4a04-41ab-9866-32734e417f7a.jpg',
        'https://s3-us-west-1.amazonaws.com/when-in-rome/33ef0622-abec-40f5-839f-9858667c2e62.jpg',
        'https://s3-us-west-1.amazonaws.com/when-in-rome/bce61fd7-a5f7-4332-b629-89a7522f4c25.jpg',
        'https://s3-us-west-1.amazonaws.com/when-in-rome/94344140-61c1-45b4-b2db-2ee7590d4cef.jpg',
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
    const { direction, currentIndex, transitionTime } = this.state;
    const { images } = this.state;
    // // let images = [];
    
    // if (this.props.images && this.props.images.length) {
    //   images = this.props.images.map(image => 'https://s3-us-west-1.amazonaws.com/when-in-rome/' + image.imagePath);
    // }
    
    if (!images.length) {
      return (
        <div className="center-all carousel-container">
          <h1 className="center">Loading Images</h1>
        </div>
      )
    }

    const src = images[currentIndex];

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
              <i className="huge angle left icon overlay center-vertical" onClick={this.changeImg.bind(this, 'previous')}></i>
              <i className="huge angle right icon overlay center-vertical" onClick={this.changeImg.bind(this, 'next')}></i>
          </div>
        </div>
        <Indicators onClick={this.directToImage.bind(this)} count={images.length} current={currentIndex} />
      </Fragment>
    );
  }
}

export default Carousel;
