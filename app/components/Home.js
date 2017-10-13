import React from 'react';
import { connect } from 'react-redux'

if(process.env.BROWSER)
  require('./Home.scss');

class Home extends React.Component {
  render() {
    return (
      <div className="home-wrapper columns">
        <div className="column">
          <div className="card">
            <div className="content">
              BLABLLALSDLASDLASLDLASL
            </div>
          </div>
        </div>
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
