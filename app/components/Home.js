import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import Pokemon from './Pokemon';


if(process.env.BROWSER)
{
  require('./Home.scss');
  var acrcloud = require('acrcloud');
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      blob: ""
    }
    this.changeRecordingState = this.changeRecordingState.bind(this);
    this.onStop = this.onStop.bind(this);
  }

renderClientSide(){
  if(process.env.BROWSER){
    var {ReactMic} = require('react-mic');
    return <ReactMic
              record = {record}
              onStop = {this.onStop}
            />
  }
  else return;
}

 changeRecordingState(status){
   if(status!=this.state.record)
   {
    this.setState({
      record:status
    });
   }
 }

 onStop(blob){
   //console.log(blob.blobURL);
   this.setState({
     blob: blob.blobURL
   })
 }

  render() {
   //console.log(this.state.record);
   let record = this.state.record;
    //console.log(pokemon.sprites.front_default);
    return (
      <div className="home-wrapper">
        <Header size="medium" color="light" title="Welcome" subtitle="To the crib"/>
        <div className="section gray">
          <div className="columns">
            <Column color="gray">
              Recording: {`${record}`} <br/>
              {this.renderClientSide()}
              <button className="button" onClick={()=>this.changeRecordingState(true)}> Record </button>
              <button className="button" onClick={()=>this.changeRecordingState(false)}> Stop </button>
            </Column>
          </div>
          <div className="columns">
            <Column color="red">
              <audio ref="audio" className="bet" controls>
                <source ref="audiosource" src={this.state.blob} type="audio/webm"/>
              </audio>
            </Column>
            <Column color="red">
              <Pokemon/>
            </Column>
            <Column color="red">
              <Pokemon/>
            </Column>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
