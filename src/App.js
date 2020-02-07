import React, { Component } from 'react';
import logo from './images/logo.svg';
import duck from './images/duck.jpg';
import elephant from './images/elephant.jpg';
import leopard from './images/leopard.jpg';
import map from './images/map.svg';
import './App.scss';

const ScheduleCard = ({ title, openDays, openingHours, children, adult }) => {
  return(
    <div className="schedule-card">
      <p className="title">{title}</p>
      <p className="opendays">{openDays}</p>
      <p className="openhours">{openingHours}</p>
      <div className="price-container">
        <p className="price">adult ${adult}</p>
        <p className="price">children ${children}</p>
      </div>
    </div>
  );
}

class App extends Component {
  state = {
    backgroundImage: leopard,
    schedule: [{
      adult: 30,
      children: 15,
      openingHours: '9am - 6pm',
      openDays: 'monday - friday',
      title: 'weekdays'
    }, {
      adult: 25,
      children: 10,
      openingHours: '9am - 4pm',
      openDays: 'saturday & sunday',
      title: 'weekends'
    }, {
      adult: 20,
      children: 10,
      openingHours: '9am - 7pm',
      openDays: 'christmas, valentines etc',
      title: 'special occasions'
    }],
    scheduelPosition: 0
  }

  componentDidMount() {
    this.loopImages();
    window.addEventListener('scroll', this.scheduelPosition, false);
  }

  loopImages = () => {
    const images = [leopard, duck, elephant];
    let index = 1;
    setInterval(() => {
      this.setState({ backgroundImage: images[index] });
      if (index === images.length - 1) {
        index = 0;
      } else {
        index += 1;
      }
    }, 4000);
  }

  slideOne = () => {
    return(
      <div className="slideOne">
        <div className="back"
          style={{
            backgroundImage: `url(${this.state.backgroundImage})`
          }}
        />
      </div>
    );
  }

  scheduelPosition = () => {
    if (window.pageYOffset > 10 && this.state.scheduelPosition === 0) {
      window.removeEventListener('scroll', this.scheduelPosition, false);
      return this.setState({ scheduelPosition: -176 }, () => window.addEventListener('scroll', this.scheduelPosition, false));
    }
    if (window.pageYOffset <= 10 && this.state.scheduelPosition === -176) {
      window.removeEventListener('scroll', this.scheduelPosition, false);
      return this.setState({ scheduelPosition: 0 }, () => window.addEventListener('scroll', this.scheduelPosition, false));
    }
  }

  renderScheduleCards = () => {
    return (
      <div className="schedule-cards-container"
        style={{ top: this.state.scheduelPosition }}
      >
        {this.state.schedule.map((props) =>
          <ScheduleCard {...props}/>
        )}
      </div>
    );
  }

  renderMapContainer = () => {
    return (
      <div className="map-container">
        <img className="southwest-map" src={map} alt="south west nigeria map"/>
        <div className="map-writeup">
          <p className="title">
            we are located all over the south-west of nigeria
          </p>
          <p className="body">
            Esse sunt incididunt exercitation aliqua veniam. Veniam voluptate mollit eu nisi mollit. Aliqua ut dolore minim Lorem minim aliquip velit exercitation elit. Aliquip dolor consectetur enim do. Non velit duis sunt consequat mollit. Reprehenderit proident sit fugiat tempor consequat duis. Tempor duis mollit do sit eiusmod nisi exercitation qui cupidatat.
          </p>
        </div>
      </div>
    );
  }

  renderPopularAttractions = () => {
    return (
      <div>

      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <img src={logo} alt="the zoo logo" className="logo"/>
        {this.slideOne()}
        {this.renderScheduleCards()}
        {this.renderMapContainer()}
        {this.renderPopularAttractions()}
      </div>
    );
  }
}

export default App;
