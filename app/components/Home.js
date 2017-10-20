import React from 'react';
import { connect } from 'react-redux'
import Hero from './Hero';
import Column from './Column';
import Header from './Header';
import Pokemon from './Pokemon';




if(process.env.BROWSER)
{
  require('./Home.scss');
  var RecordRTC = require('recordrtc');
}

var recordRTC;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      record: false,
      blob: "",
      metadata: ""
    }
  }
  componentDidMount(){
  }

  beginRecording(stream){
    const self = this;
    this.setState({record:true});
    if(process.env.BROWSER)
    {
      navigator.mediaDevices.getUserMedia({audio:true, video:false})
      .then(function(stream){
        var options = {
            mimeType: 'audio/webm', 
            bitsPerSecond: 120000,
            bufferSize: 512,
            numberOfAudioChannels: 1,
        }
        recordRTC = RecordRTC(stream, options);
        recordRTC.startRecording(); 
      })
      .catch(function(error){
        console.log(error);
      });
    }
  }

  finishRecording(){
    const self = this;
    this.setState({record:false})
    recordRTC.stopRecording(function(audioURL) {
      var recordedBlob = recordRTC.getBlob();
      var reader = new FileReader();
      reader.readAsDataURL(recordedBlob);
      reader.onloadend = function(){
        var buffer = reader.result;
        fetch('/identify', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({buffer: buffer})
        }).then((response) => {
          if (response.ok) {
            response.json().then(function (data) {
              var body = JSON.parse(data.data.body);
              //console.log(body);
              self.setState({metadata: body.metadata.music[0], loading: false})
            }).catch(function(error){
              console.log("JSON problems.");
              console.log(error);
            })
          }
          else console.log("Request for song failed.");
        });
      }
    });
  }

 
  sendEncodedBlob(){

      //console.log(buffer);
     /* */
  }

  render() {
   //console.log(this.state.record);
   let record = this.state.record;
   let metadata = this.state.metadata;
   console.log(metadata);
    return (
      <div className="home-wrapper">
        <Header size="medium" color="light" title="Welcome" subtitle="To the crib"/>
        <div className="section gray">
          <div className="columns">
            <Column color="gray">
              Recording: {`${record}`} <br/>
              <button className="button" onClick={()=>this.beginRecording()}> Record </button>
              <button className="button" onClick={()=>this.finishRecording()}> Stop </button>
            </Column>
            {!this.state.loading &&
            <Column color="gray">
              {metadata.artists[0].name} - {metadata.title}
            </Column>}
          </div>
          <div className="columns">
            <Column color="red">
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
