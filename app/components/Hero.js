import React from 'react';
import { connect } from 'react-redux'

//This class is used to wrap content around a big section with specific sizing
class Hero extends React.Component{
  render(){
    let title = this.props.title || "";
    let subtitle = this.props.subtitle || "";
    let size = this.props.size || "";
    let color = this.props.color || "";
    let textcolor = this.props.textcolor || "";
    let centered = this.props.centered || "";
    return(
      <div className={`hero is-${size} ${color} has-text-${centered}`}>
        <div className="hero-head">
          <div className="container has-text-centered">
            <h1 className={`title text-${textcolor}`}>
              {title}
            </h1>
            <h2 className={`subtitle text-${textcolor}`}>
              {subtitle}
            </h2>
          </div>
        </div>
        <div className="hero-body">
            {this.props.children}
        </div>
      </div>
    )
  }
}

export default Hero;