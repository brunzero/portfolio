import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';


class Header extends React.Component {
  render(){
    let title = this.props.title || "";
    let subtitle = this.props.subtitle || "";
    let size = this.props.size || "";
    let color = this.props.color || "";
    return(
      <div className={`hero is-${size} is-${color}`}>
        <div className="header">
          <nav className="navbar is-light" role="navigation">
            <div className="navbar-brand">
              <a className="navbar-item" href="https://bulma.io">
                <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"/>
              </a>
              <div className="navbar-burger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </nav>
        </div>
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

export default Header;