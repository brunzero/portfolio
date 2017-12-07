import React from 'react'
import Column from './Column';
import SVG from './SVG';

if(process.env.BROWSER)
{
  var RecordRTC = require('recordrtc');
  require('./MusicRecognition.scss');
}

var stream;
class MusicRecognition extends React.Component{
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
    this.renderSongResult = this.renderSongResult.bind(this);
    this.toggleRecording = this.toggleRecording.bind(this);
  }

  componentDidMount(){
  }

  beginRecording(){
    const self = this;
    this.setState({record:true});
    if(process.env.BROWSER)
    {
      var options = {
          mimeType: 'audio/webm', 
          bitsPerSecond: 120000,
          bufferSize: 512,
          numberOfAudioChannels: 1,
      }
      if(!stream){
        navigator.mediaDevices.getUserMedia({audio:true, video:false}).then(function(streamCaptured){ 
          stream = streamCaptured;
          var recordRTC = RecordRTC(stream, options);
          recordRTC.startRecording(); 
          self.setState({recordRTC: recordRTC});
        }).catch();
      }
      else{
        var recordRTC = RecordRTC(stream, options);
        recordRTC.startRecording(); 
        self.setState({recordRTC: recordRTC});
      }
    }
  }

  finishRecording(){
    const self = this;
    var recordRTC = this.state.recordRTC;
    stream.stop();
    stream = null;
    self.setState({record:false});
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
              if(data.success)
                self.setState({metadata: body.metadata.music[0], loading: false})
              else
                self.setState({loading: false})
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
  toggleRecording(){
    if(this.state.record)
      this.finishRecording();
    else this.beginRecording();
  }
  renderSongResult(){
    if(this.state.loading)
      return(<span>Your song goes here</span>)
    else if(this.state.metadata=="")
      return(<span>I wasn't able to identify your song. <br/> Try recording again.</span>)
    else return <span>{this.state.metadata.title} - {this.state.metadata.artists[0].name}</span>
  }

  render(){
    let textcolor = this.props.textcolor;
    let record = this.state.record;
    let metadata = this.state.metadata;
    let recording = this.state.record ? "recording" : ""
    return(
      <div className={`music-recognition-wrapper text-${textcolor}`}>
        <div className="columns">
          <Column>
            Record part of the song and I'll tell you what it is. <br/> Recording on some devices is not supported. 
          </Column>
        </div>
        <div className="columns">
          <Column>
            <div className={`record-button ${recording}`} onClick={()=>this.toggleRecording()}><SVG name={"microphone"}/></div>
          </Column>
        </div>
        <div className="columns">
          <Column>
            {this.renderSongResult()}
          </Column>
        </div>            
      </div>
    )
  }
 

}

export default MusicRecognition