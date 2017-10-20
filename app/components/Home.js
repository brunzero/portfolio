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

//var recordRTC;
var stream;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      record: false,
      blob: "",
      metadata: "",
      recordRTC: ""
    }
    this.beginRecording = this.beginRecording.bind(this);
    this.finishRecording = this.finishRecording.bind(this);
  }
  componentDidMount(){
    navigator.mediaDevices.getUserMedia({audio:true, video:false}).then(function(streamCaptured){
      console.log("capped the stream");
      stream = streamCaptured;
    }).catch();
  }

  beginRecording(){
    const self = this;
    this.setState({record:true});
    if(process.env.BROWSER)
    {
      var recordRTC = RecordRTC(stream, {recorderType: RecordRTC.StereoAudioRecorder});
      recordRTC.startRecording(); 
      self.setState({recordRTC: recordRTC});
    }
  }

  finishRecording(){
    const self = this;
    var recordRTC = this.state.recordRTC;
    recordRTC.stopRecording(function(audioURL) {
      self.setState({record:false})
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
