var fetch = require('node-fetch');
var rp = require('request-promise');

exports.movie = function(req, res, next){
  var title = req.params.title;
  rp("http://vodlocker.to/embed?t="+title)
  .then(function(response){
    res.send(response);
  })
}