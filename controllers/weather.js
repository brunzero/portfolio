var fetch = require('node-fetch');
var rp = require('request-promise');

exports.ip = function(req, res){
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  console.log(ip);
  return res.send({ip:ip});
}

exports.weather = function(req, res){
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;

  if(process.env.NODE_ENV=='development')
    ip = '71.47.170.82';

  rp('http://ip-api.com/json/'+ip, {json: true})
    .then(response => {
      console.log("Region: " + response.region + " City: " + response.city);
      return rp('http://api.wunderground.com/api/e2b6ca0c3ea2e2b7/conditions/q/'+response.region+'/'+response.city+'.json', {json: true});  
    })
    .then(response => {
      var weather = response.current_observation;
      return res.send({weather});
    });
}