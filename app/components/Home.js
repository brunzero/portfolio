import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import Pokemon from './Pokemon';
import MusicRecognition from './MusicRecognition';
import SVG from './SVG';
import requestParser from './RequestParser';
//var rp = require('request-promise');




if(process.env.BROWSER)
{
  require('./Home.scss');
}



class Home extends React.Component {
  componentDidMount(){/*
    rp(requestParser.uriMinusPath+'/weather', {method:'GET', json:true})
      .then(response=>{
        console.log(response);
      })*/
  }
  render() {
    return (
      <div className="home-wrapper">
        <Header size="medium" color="palette1" title="Welcome" textcolor="white" home/>
        <div className="pokemon-home-wrapper">
          <Hero title = "Have some Pokèmon" subtitle="Refresh the page if you don't like your team" centered="centered">
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
        <Hero textcolor="white" color="palette1" title="Are you listening to music?" centered="centered">
          <MusicRecognition textcolor="white"/>
        </Hero>
        </div>
        <div className="weather-home-wrapper">
        <Hero size="medium" title="How's the weather?" subtitle="Coming Soon" centered = "centered">
        </Hero>
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
