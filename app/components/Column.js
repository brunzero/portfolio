import React from 'react';
import { connect } from 'react-redux'

if(process.env.BROWSER)
  require('./Column.scss');

class Column extends React.Component{
  render(){
    let color = this.props.color || "";
    let height = this.props.height || "";
    return (
      <div className={`column ${color} ${height}`}>
        {this.props.children}
      </div>
    )
  }
}

export default Column;