import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import Pokemon from './Pokemon';
import SVG from './SVG';
import requestParser from './RequestParser';


if(process.env.BROWSER){
  require('./Reader.scss');
}

class Reader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      chapter: [],
      chaptertitle: "",
      chapternum: 1,
      pagenum: 1,
      
    };
    //this.requestChapter = this.requestChapter.bind(this);
  }
  componentDidMount(){
    //this.requestChapter(5);
  }
  /*requestChapter(chapternum){
    const self = this;
    self.setState({loading: true});
    rp(requestParser.uriMinusPath+'/chapter/'+chapternum, {method:'GET', json:true})
      .then(function(response){
        console.log(response);
        self.setState({
          chapter: response.pages,
          chaptertitle: response.name,
          chapternum: chapternum,
          loading: false
        });
      })
  }*/
  render(){
    //let book = this.state.book;
    let chapter = this.state.chapter;
    let chaptertitle = this.state.chaptertitle;
    let chapternum = this.state.chapternum;
    let pagenum = this.state.pagenum;
    return(
      <div className="reader-wrapper">
        <Header size="small" color="palette1" textcolor="white" reader/>
        <div className="columns is-mobile">
          <Column width="2">
            <div className="left-button" onClick={()=>this.requestChapter(chapternum-1)}>
              <SVG name="leftarrow"/>
            </div>
          </Column>
          <Column width="6">
            <div className = "field">
              <label className="label">Manga Title</label>
              <div className = "control"> 
                <input className="input" type="text" placeholder="ex. one-piece (separate spaces with dashes)"/>
              </div>
            </div>
          </Column>
          <Column width="2">
            <div className = "field">
              <label className="label">Ch</label>
              <div className = "control"> 
                <input className="input" type="text" placeholder="1"/>
              </div>
            </div>
          </Column>
          <Column width="2">
            <div className="right-button" onClick={()=>this.requestChapter(chapternum+1)}>
              <SVG name="rightarrow"/>
            </div>
          </Column>
        </div>   
        <div className="chapter-wrapper">
          <Hero color="palette1" title="One Piece" subtitle={"Chapter " + chapternum + ": " + chaptertitle} textcolor="palette4" subtextcolor="white" centered = "centered">   
              {!this.state.loading ? chapter.map(function(page, i){
                return (
                  <img className={`chapter-${chapternum} page-${page.pageId}`} src={page.url}/>
                )
                })
                :
                <div>
                  <figure className="loading-wrapper">
                    <div className="loading"/>
                  </figure>
                </div>
              }
            <div className="columns reader-footer is-mobile">
              <Column width="2">
                <div className="left-button" onClick={()=>this.requestChapter(chapternum-1)}>
                  <SVG name="leftarrow"/>
                </div>
              </Column>
              <Column width="8"/>
              <Column width="2">
                <div className="right-button" onClick={()=>this.requestChapter(chapternum+1)}>
                  <SVG name="rightarrow"/>
                </div>
              </Column>
            </div>
          </Hero>
        </div>
      </div>
    )
  }
}

export default Reader;