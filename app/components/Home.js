import React from 'react';
import { connect } from 'react-redux'

if(process.env.BROWSER)
  require('./Home.scss');

class Home extends React.Component {
  render() {
    return (
      <div className="home-wrapper">
        <nav className="navbar" role="navigation">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://bulma.io">
              <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"/>
            </a>
            <div className="navbar-burger">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </nav>
        <div className="columns">
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
