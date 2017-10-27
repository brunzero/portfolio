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
        <Header size="medium" color="light" title="Welcome" subtitle="To the crib"/>
        <div className="section gray">
          <MusicRecognition/>
          <div className="columns">
            <Column color="red">
              <Pokemon/>
            </Column>
            <Column color="blue">
              <Pokemon/>
            </Column>
            <Column color="green">
              <Pokemon/>
            </Column>
          </div>
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
