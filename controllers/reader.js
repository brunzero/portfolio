var fetch = require('node-fetch');
var rp = require('request-promise');


exports.chapter = function(req, res){
  var siteid = 'mangareader.net';
  var mangaid = req.params.title;
  var chapterid = req.params.chapter;
  var options = {
    method: 'GET',
    uri: 'https://doodle-manga-scraper.p.mashape.com/'+siteid+'/manga/'+mangaid+'/'+chapterid,
    headers: {
      'X-Mashape-Key' : process.env.MANGA_KEY
    },
    json:true
  }
  rp(options)
    .then(function(response){ 
      res.send(response);
    })
    .catch(function(error){
      console.log(error);
      res.status(300);
    })
}