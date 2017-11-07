var url = require('url'); 

if(process.env.BROWSER){
  var requestParser = (function() {
    var href = document.location.href;
    var urlObj = url.parse(href, true);
    var protocol = urlObj.protocol + "//";
    var domain = urlObj.hostname;

    return { 
      domain,
      protocol,
      href,
      urlObj,
      getQueryStringValue: (key) => {
        let value = ((urlObj && urlObj.query) && urlObj.query[key]) || null;
        return value;
      },
      uriMinusPath: urlObj.protocol + '//' + urlObj.host                                              
    };  
  })();
}
else var requestParser = (function(){});

export default requestParser;