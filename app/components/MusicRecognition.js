import React from 'react'
import Column from './Column';

if(process.env.BROWSER)
{
  var RecordRTC = require('recordrtc');
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
  }

  componentDidMount(){
    navigator.mediaDevices.getUserMedia({audio:true, video:false}).then(function(streamCaptured){
      stream = streamCaptured;
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

  render(){
    let record = this.state.record;
    let metadata = this.state.metadata;
    return(
      <div>
        <div className="columns">
          <Column color="gray centered">
            Recording: {`${record}`} <br/>
            <button className="button" onClick={()=>this.beginRecording()}> Record </button>
            <button className="button" onClick={()=>this.finishRecording()}> Stop </button>
          </Column>
          {!this.state.loading &&
          <Column color="gray centered">
            {metadata.artists[0].name} - {metadata.title}
          </Column>}
        </div>
      </div>
    )
  }
 

}

export default MusicRecognition