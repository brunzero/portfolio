var fetch = require('node-fetch');

exports.pokemon = function(req, res){
  fetch("https://pokeapi.co/api/v2/pokemon/"+req.params.id, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json'},
  }).then((response) => {
    if (response.ok) {
      response.json().then(function (data) {
        res.send(data);
      }).catch(function(error){
        console.log("JSON problems.");
        console.log(error);
      })
    }
    else console.log("Request for Pokemon failed.");
  });
}