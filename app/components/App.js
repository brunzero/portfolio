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
      </div>
    );
  }
}

export default App;
