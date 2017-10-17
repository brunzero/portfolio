import React from 'react';
import { connect } from 'react-redux'

//This class is used to wrap content around a big section with specific sizing
class Hero extends React.Component{
  render(){
    let title = this.props.title || "";
    let subtitle = this.props.subtitle || "";
    let size = this.props.size || "";
    let color = this.props.color || "";
    return(
      <div className={`hero is-${size} is-${color}`}>
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">
              {title}
            </h1>
            <h2 className="subtitle">
              {subtitle}
            </h2>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Hero;