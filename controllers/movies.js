var fetch = require('node-fetch');
var rp = require('request-promise');

exports.movie = function(req, res, next){
  var title = req.params.title || "";
  //var season = season!="" ? "&season=" + req.params.season : "";
  //var episode = episode!="" ? "&episode=" + req.params.episode : "";
  /*console.log("http://vodlocker.to/embed?t="+title+season+episode);
  rp("http://vodlocker.to/embed?t="+title+season+episode)
  .then(function(response){
    res.send(response);
  })*/
  console.log("watching: "+title+" S "+req.params.season+" E "+req.params.episode);
  res.status(200);
}