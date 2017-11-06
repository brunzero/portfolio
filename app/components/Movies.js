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
      title: "",
      season: "",
      episode: "",
    }
  }
  submitForm(e){
    const self = this;
    e.preventDefault();
    var title = this.refs.title.value;
    var season = this.refs.season.value!="" ? this.refs.season.value : "";
    var episode = this.refs.episode.value!="" ? this.refs.episode.value : "";
    this.setState({title:title});
    this.setState({season: season});
    this.setState({episode: episode});
    fetch('/movies/'+title+"/"+season+"/"+episode);
  }
  render(){
    let moviecode = this.state.moviecode || "";
    let title = this.state.title || "";
    let season = this.state.season!="" ? "&season=" + this.state.season : "";
    let episode = this.state.episode!="" ? "&episode=" + this.state.episode : "";
    return(
      <div className="movies-wrapper">
        <Header size="small" headertitle="Movies!" textcolor="white" color="palette1"/>
        <form className = "form field" onSubmit={(e)=>{this.submitForm(e)}}>
          <div className = "movie">
            <label className="label">Movie/Show Title</label>
            <div className = "control"> 
              <input ref="title" className="input" type="text" placeholder="inception"/>
            </div>
          </div>
          <div className = "season">
            <label className="label">Season</label>
            <div className = "control"> 
              <input ref="season" className="input" type="text" placeholder="1"/>
            </div>
          </div>
          <div className = "episode">
            <label className="label">Episode</label>
            <div className = "control"> 
              <input ref="episode" className="input" type="text" placeholder="1"/>
            </div>
          </div>
          <input className="button" type="submit"/>
        </form>
        <Hero centered color="palette1">
          {title!="" && <iframe ref="video" className="embedded-video" src={"http://vodlocker.to/embed?t="+title+season+episode} allowFullScreen="true" scrolling="no" sandbox="allow-same-origin allow-scripts"/>}
        </Hero>
      </div>
    )
  }
}

export default Movies;