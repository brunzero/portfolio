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

exports.geolocate = function(req, res){
  var ip = req.headers['x-forwarded-for'] || 
     req.connection.remoteAddress || 
     req.socket.remoteAddress ||
     req.connection.socket.remoteAddress;
  if(process.env.NODE_ENV=='development')
    ip = '71.47.170.82';

  rp('http://ip-api.com/json/'+ip, {json: true})
    .then(response => {
      return res.send(response);
    })
}

exports.weather = function(req, res){
  var baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';

  rp(baseUrl + '/geolocate', {json: true})
    .then(response => {
      return rp('http://api.wunderground.com/api/e2b6ca0c3ea2e2b7/conditions/q/'+response.region+'/'+response.city+'.json', {json: true});
    })
    .then(response => {
      var weather = response.current_observation;
      return res.send({weather});
    })
  /*fetch('http://api.wunderground.com/api/72ee86d736ffd975/conditions/q/FL/Orlando.json' {
    method: 'GET',
  }).then((response) => {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data.city);
        res.send({data});
      }).catch(function(error){
        console.log("JSON problems.");
        console.log(error);
      })
    }
    else console.log("Request for weather failed.");
  });*/
}