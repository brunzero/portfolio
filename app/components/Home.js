import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import Pokemon from './Pokemon';
import MusicRecognition from './MusicRecognition';




if(process.env.BROWSER)
{
  require('./Home.scss');
}



class Home extends React.Component {
  
  render() {
    return (
      <div className="home-wrapper">
        <Header color="palette1" title="Welcome" subtitle="To the crib" textcolor="white"/>
        <div className="pokemon-home-wrapper">
          <Hero title = "Here" subtitle="Have some pokemon">
              <div className="columns">
                <Column color="palette3">
                  <Pokemon textcolor="white"/>
                </Column>
                <Column color="palette4">
                  <Pokemon textcolor="white"/>
                </Column>
                <Column color="palette5">
                  <Pokemon textcolor="white"/>
                </Column>
              </div>
          </Hero>
        </div>
        <Hero title="Do you like music?" subtitle="What are you listening to?" centered="centered">
          <MusicRecognition/>
        </Hero>
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
