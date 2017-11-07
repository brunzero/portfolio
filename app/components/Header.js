import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import { browserHistory } from 'react-router';
import requestParser from './RequestParser';


if(process.env.BROWSER){
  require('./Header.scss');
}

class Header extends React.Component {
  constructor(props){
    super(props);
    this.state={
      active: false,
      slide: false
    }
  }
  componentDidMount(){
    setTimeout(()=>{this.setState({slide: true})}, 50);
  }
  routeTo(route){
    if(requestParser.protocol == "http://" && process.env.NODE_ENV=='production')
      window.location.href = "https://" + requestParser.domain + route;
    browserHistory.push(route);
  }
  toggleActive(){
    if(this.state.active)
      this.setState({active:false});
    else this.setState({active:true});
  }
  determineSketchyRoute(route){
    if(process.env.BROWSER)
      return requestParser.uriMinusPath + route;
    else return route;
  }
  render(){
    let title = this.props.title || "";
    let subtitle = this.props.subtitle || "";
    let size = this.props.size || "";
    let color = this.props.color || "";
    let textcolor = this.props.textcolor || "";
    let active = this.state.active ? "active" : "";
    let slide = this.state.slide ? 'slide' : "";
    return(
      <div className="header-wrapper">
        <div className={`hero is-${size} ${color}`}>
          <div className="hero-head">
            <nav className="navbar" role="navigation">
              <div className="navbar-brand">
                <div className={`navbar-left ${slide}`}>
                  <div className="navbar-item">
                    <img src="/resources/icons/moogle.gif" width="32" height="32"/>
                  </div>  
                  <div className="navbar-item">
                    <b><span className={`text-${textcolor}`}>{this.props.headertitle}</span></b>
                  </div>
                </div>
                <div className={`navbar-burger is-${active}`} onClick={()=>this.toggleActive()}>
                  <span/>
                  <span/>
                  <span/>
                </div>
              </div>
              <div className={`navbar-menu is-${active}`}>
                <div className="navbar-end">
                  <a className="navbar-item" onClick={()=>this.routeTo('/home')}>
                    home
                  </a>
                  <a className="navbar-item" href={this.determineSketchyRoute('/movies')}>
                    movies
                  </a>
                  <a className="navbar-item" onClick={()=>this.routeTo('/reader')}>
                    manga
                  </a>
                </div>
              </div>
            </nav>
          </div>
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className={`title text-${textcolor}`}>
                {title}
              </h1>
              <h2 className={`subtitle text-${textcolor}`}>
                {subtitle}
              </h2>
            </div>
          </div>
        </div>
      </div>
    )      
  }
}

export default Header;