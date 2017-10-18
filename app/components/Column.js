import React from 'react';
import { connect } from 'react-redux'

if(process.env.BROWSER)
  require('./Column.scss');

class Column extends React.Component{
  render(){
    let color = this.props.color || "";
    let height = this.props.height || "";
    return (
      <div className="column">
        <div className={`${color} ${height}`}>
          <div className="centered">
              {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Column;