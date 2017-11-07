var ACRCloud = require('acr-cloud');

var acr = new ACRCloud({
    // required 
    access_key: process.env.ACRCLOUD_KEY,
    access_secret: process.env.ACRCLOUD_SECRET,
    // optional 
    requrl: 'identify-us-west-2.acrcloud.com',
    http_method: 'POST',
    http_uri: '/v1/identify',
    audio_format: 'webm',
    data_type: 'Fingerprint',
    signature_version: '1',
    timestamp: Date.now()
});


//route to discover song
exports.identify = function(req, res){
  var buffer = req.body.buffer.toString();
  buffer = buffer.replace(/^data:audio\/webm;base64,/, "")
  acr.identify(buffer)
  .then( function( data ) {
    var response = JSON.parse( data.body );
    if( data.statusCode == 200 && response.status ) {
      var success = ( response.status.msg == 'Success' );
      return res.send({
        success: success,
        msg: response.status.msg,
        data: data
      });
    } else {
      return res.send({
        success: false,
        msg: "Error reaching API",
        data: data
      });
    }
  })
  .catch( function( err ) {
    return res.status(200).send({
      success: false,
      msg: "Error identifying audio",
      data: err
    });
  })
}