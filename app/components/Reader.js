import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import Pokemon from './Pokemon';
import SVG from './SVG';
import requestParser from './RequestParser';
var rp = require('request-promise');


class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: []
    };
  }
  componentDidMount(){
    const self = this;
    var ch = 2;
    rp(requestParser.uriMinusPath+'/chapter/'+ch, {method:'GET', json:true})
      .then(function(response){
        var book = self.state.book;
        book.push(response.pages);
        self.setState(book);
      })
  }
  render(){
    console.log(this.state.book);
    let book = this.state.book;
    return(
      <div className="reader-wrapper">
        <Header size="small" color="palette1" textcolor="white" reader/>
        <Hero color="palette1" title="One Piece" textcolor="white" centered = "centered">
        {book.map(function(chapter, i){
          return (
            chapter.map(function(page, j){
              return <img src={page.url}/>
            })
          )
        })}
        </Hero>
      </div>
    )
  }
}

export default Reader;