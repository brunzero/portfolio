import React from 'react';
import { connect } from 'react-redux'
import requestParser from './RequestParser';
import Hero from './Hero';
import Column from './Column';

if(process.env.BROWSER){
  require('./Weather.scss')
}
class Weather extends React.Component{
  constructor(props){
    super(props);
    this.state={
      weather: undefined
    }
  }
  componentDidMount(){
  const self = this;
  fetch(requestParser.uriMinusPath+'/weather')
    .then(function(response){
      return response.json();
    })
    .then(response=>{
      var weather = response.weather;
      self.setState({weather: weather});
    })
  }
  render(){
    let weather = this.state.weather;
    console.log(weather);
    return(
      <div className="weather-wrapper">
        <Hero size="small" title="How's the weather?" centered>
          <div className="columns centered">
            <Column color="palette3" width="half">
            {
              weather &&
              <div className="weather-column">
                <span className="country">{weather.display_location.country}<br/></span>
                <span className="citystate">{weather.display_location.full}<br/></span> 
                <span className="weather">{weather.weather}</span> - <span className="temperature">{weather.temperature_string}</span>
              </div>
            }
            </Column>
          </div>
        </Hero>
      </div>
    )
  }
}

export default Weather;