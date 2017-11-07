import React from 'react';
//require('../favicon.ico');

if(!process.env.BROWSER)
{
  global.window = {};
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        {this.props.children}
        <div className="music-player">
          <iframe src="https://open.spotify.com/embed?uri=spotify:user:12129645831:playlist:0hhpEDlyBgujrGy7T0c4uK" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>        
        </div>
      </div>
    );
  }
}

export default App;
