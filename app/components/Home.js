import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import Pokemon from './Pokemon';
import Weather from './Weather';
import MusicRecognition from './MusicRecognition';
import SVG from './SVG';
import requestParser from './RequestParser';

if(process.env.BROWSER)
{
  require('./Home.scss');
}

class Home extends React.Component {
  render() {
    return (
      <div className="home-wrapper">
        <Header size="medium" color="palette1" title="Welcome" textcolor="white" headertitle="Bruno's Workshop"/>
        <div className="pokemon-home-wrapper">
          <Hero title = "Have some Pokèmon" subtitle="See if you can find your favorites!" centered>
              <div className="columns">
                <Column color="palette2">
                  <Pokemon textcolor="black"/>
                </Column>
                <Column color="palette3">
                  <Pokemon textcolor="black"/>
                </Column>
                <Column color="palette4">
                  <Pokemon textcolor="black"/>
                </Column>
              </div>
          </Hero>
        </div>
        <div className="music-recognition-home-wrapper">
        <Hero textcolor="white" color="palette1" title="Are you listening to music?" centered>
          <MusicRecognition textcolor="white"/>
        </Hero>
        </div>
        <div className="weather-home-wrapper">
          <Weather/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
