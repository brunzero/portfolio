import React from 'react'
import Column from './Column';

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
      recordingSupported: false,
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
    const self = this;
    navigator.mediaDevices.getUserMedia({audio:true, video:false}).then(function(streamCaptured){ 
      stream = streamCaptured;
      self.setState({recordingSupported: true});
    }).catch();
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
      var recordRTC = RecordRTC(stream, options);
      recordRTC.startRecording(); 
      self.setState({recordRTC: recordRTC});
    }
  }

  finishRecording(){
    const self = this;
    var recordRTC = this.state.recordRTC;
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

  renderSongResult(){
    if(this.state.loading)
      return(<span>Your song goes here</span>)
    else if(this.state.metadata.match(""))
      return(<span>Try recording it again</span>)
    else return <span>{this.state.metadata.artists[0].name} - {this.state.metadata.title}</span>
  }

  render(){
    let record = this.state.record;
    let metadata = this.state.metadata;
    let supported = this.state.recordingSupported ? "supported":"not supported";
    return(
      <div className="music-recognition-wrapper">
        <div className="columns">
          <Column color="gray centered">
            Press record while listening to a song and I'll tell you what song it is. Recording on your device is {supported}. 
          </Column>
          <Column color="gray">
            Recording: {`${record}`} <br/>
            <button className="button" onClick={()=>this.beginRecording()}> Record </button>
            <button className="button" onClick={()=>this.finishRecording()}> Stop </button>
          </Column>
          <Column color="gray centered">
            {!this.state.loading ? <span>{metadata.artists[0].name} - {metadata.title}</span> : <span>Your song goes here</span>}
          </Column>
        </div>            
      </div>
    )
  }
 

}

export default MusicRecognition