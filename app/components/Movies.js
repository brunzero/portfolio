import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import Pokemon from './Pokemon';
import SVG from './SVG';
import requestParser from './RequestParser';

if(process.env.BROWSER){
  require('./Movies.scss');
}

class Movies extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      moviecode: "",
      title: ""
    }
  }
  submitForm(e){
    const self = this;
    e.preventDefault();
    var title = this.refs.title.value;
    this.setState({title:title});
    
    fetch('/movies/'+title)
    .then(function(response){
      return response.text();
    })
    .then(function(response){
      var responses = response.replace(/http/g, "https");
      //console.log(responses); 
      var vid = self.refs.video.contentWindow.document;
      vid.open();
      vid.write(response);
      vid.close();
      self.setState({moviecode: response});
    })
  }
  render(){
    let moviecode = this.state.moviecode || "";
    let title = this.state.title || "";
    return(
      <div className="movies-wrapper">
        <Header size="small" headertitle="Movies!" textcolor="white" color="palette1"/>
        <form className = "form field" onSubmit={(e)=>{this.submitForm(e)}}>
          <div className = "movie">
            <label className="label">Movie Title</label>
            <div className = "control"> 
              <input ref="title" className="input" type="text" placeholder="inception"/>
            </div>
          </div>
          <input className="button" type="submit"/>
        </form>
        <Hero centered color="palette1">
          {title!="" && <iframe ref="video" className="embedded-video" allowFullScreen="true" scrolling="no"/>}
        </Hero>
      </div>
    )
  }
}

export default Movies;