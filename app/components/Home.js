import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import Pokemon from './Pokemon';


if(process.env.BROWSER)
  require('./Home.scss');

class Home extends React.Component {

  render() {
    //console.log(pokemon.sprites.front_default);
    return (
      <div className="home-wrapper">
        <Header size="medium" color="light" title="Welcome" subtitle="To the crib"/>
        <div className="section gray">
          <div className="columns">
            <Column color="red">
              <Pokemon/>
            </Column>
            <Column color="red">
              <Pokemon/>
            </Column>
            <Column color="red">
              <Pokemon/>
            </Column>
          </div>
          <div className="columns">
            <Column color="red">
              <Pokemon/>
            </Column>
            <Column color="red">
              <Pokemon/>
            </Column>
            <Column color="red">
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
