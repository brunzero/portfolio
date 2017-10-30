import React from 'react';
import { connect } from 'react-redux'

if(process.env.BROWSER)
  require('./Column.scss');

class Column extends React.Component{
  render(){
    let color = this.props.color || "";
    let height = this.props.height || "";
    let width = this.props.width || ""; 
    return (
      <div className={`column is-${width}`}>
        <div className={`column-child ${color} ${height}`}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Column;