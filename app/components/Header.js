import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';

if(process.env.BROWSER){
  require('./Header.scss');
}

class Header extends React.Component {
    constructor(props) {
    super(props);
    this.renderTopLeft = this.renderTopLeft.bind(this);
  }
  renderTopLeft(){
    if(this.props.home)
      return "Bruno's Workshop";
    else if(this.props.reader)
      return "Manga Reader";
    else 
      return "Bruno's Workshop";
  }
  render(){
    let title = this.props.title || "";
    let subtitle = this.props.subtitle || "";
    let size = this.props.size || "";
    let color = this.props.color || "";
    let textcolor = this.props.textcolor || "";
    return(
      <div className="header-wrapper">
        <div className={`hero is-${size} ${color}`}>
          <div className="hero-head">
            <nav className="navbar" role="navigation">
              <div className="navbar-brand">
                <div className="navbar-item">
                  <img src="/resources/icons/moogle.gif" width="32" height="32" alt="Bulma"/>
                </div>  
                <div className="navbar-item">
                  <b><span className={`text-${textcolor}`}>{this.renderTopLeft()}</span></b>
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