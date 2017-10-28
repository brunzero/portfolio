import React from 'react';
//require('../favicon.ico');

if(!process.env.BROWSER)
{
  global.window = {};
}

class App extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
