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
      title: "",
      chapter: [],
      chaptertitle: "",
      chapternum: 1,
      pagenum: 1,
    };
    this.requestChapter = this.requestChapter.bind(this);
  }
  componentDidMount(){
  }
  requestChapter(title, chapternum){
    const self = this;
    var title = title.replace(/[ \t]+$/, '');
    title = title.replace(/ /g, '-').toLowerCase();
    title = title.replace(/[^\w-]/g,'');
    console.log(title);
    self.setState({loading: true});
    fetch(requestParser.uriMinusPath+'/chapter/'+title+'/'+chapternum)
      .then(function(response){
        return response.json()
      })
      .then(function(response){
        if(JSON.stringify(response) !== '{}'){
          title = title.replace(/-/, ' ').toLowerCase();
          title = title.toLowerCase().replace(/\b\w/g, s => s.toUpperCase());
          self.setState({
            title: title,
            chapter: response.pages,
            chaptertitle: response.name,
            chapternum: parseInt(chapternum),
            loading: false
          });
        }
      })
  }
  submitForm(e){
    e.preventDefault();
    var title = this.refs.title.value;
    var chapter = this.refs.chapter.value;
    this.requestChapter(title, chapter);
  }
  render(){
    let title = this.state.title || "";
    let chapter = this.state.chapter || "";
    let chaptertitle = this.state.chaptertitle || "";
    let chapternum = this.state.chapternum || 1;
    let pagenum = this.state.pagenum || 1;
    return(
      <div className="reader-wrapper">
        <Header size="small" color="palette1" textcolor="white" reader/>
          <form className = "form field" onSubmit={(e)=>{this.submitForm(e)}}>
            <div className = "manga">
              <label className="label">Manga Title</label>
              <div className = "control"> 
                <input ref="title" className="input" type="text" placeholder="one piece"/>
              </div>
            </div>
            <div className = "chapter">
              <label className="label">Ch</label>
              <div className = "control"> 
                <input ref="chapter" className="input" type="text" placeholder="1"/>
              </div>
            </div>
            <input className="button" type="submit"/>
          </form>
        <div className="chapter-wrapper">
          <Hero color="palette1" title={title} subtitle={"Chapter " + chapternum + ": " + chaptertitle} textcolor="palette4" subtextcolor="white" centered = "centered">    
              {!this.state.loading ? chapter.map(function(page, i){
                var url = page.url.replace(/^http:\/\//i, 'https://');
                  return (
                    <img className={`chapter-${chapternum} page-${page.pageId}`} src={url} key={i}/>
                  )
                })
                :
                <div>
                  <figure className="loading-wrapper">
                    <div className="loading"/>
                  </figure>
                </div>
              }
          </Hero>
          <div className="left-button" onClick={()=>this.requestChapter(title, (chapternum-1))}>
            <SVG name="leftarrow"/>
          </div>
          <div className="right-button" onClick={()=>this.requestChapter(title, (chapternum+1))}>
            <SVG name="rightarrow"/>
          </div> 
        </div>
      </div>
    )
  }
}

export default Reader;