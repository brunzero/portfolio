import React from 'react';
import { connect } from 'react-redux'
require('./Home.scss');

class Home extends React.Component {
  render() {
    return (
      <div className="columns">
        <div className="column">Yo</div>
        <div className="column">This</div>
        <div className="column">A Column</div>
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
