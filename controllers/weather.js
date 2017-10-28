var fetch = require('node-fetch');

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

  fetch('http://ip-api.com/json/' + ip, {
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
    else console.log("Request for Pokemon failed.");
  });
}