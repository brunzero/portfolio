import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';

if(process.env.BROWSER)
  require('./Home.scss');

class Home extends React.Component {
  render() {
    return (
      <div className="home-wrapper">
        <Header size="medium" color="light" title="Welcome" subtitle="To the crib"/>
        <div className="columns">
          <Column color="red">
            This is some text
          </Column>
          <Column color="blue">
            This is some text
          </Column>
          <Column color="green">
            This is some text
          </Column>
          <Column color="yellow">
            This is some text
          </Column>
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
