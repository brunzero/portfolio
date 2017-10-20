var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var dotenv = require('dotenv');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var Provider = require('react-redux').Provider;
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var request = require('request');
var sass = require('node-sass-middleware');
var webpack = require('webpack');
var config = require('./webpack.config');
var ACRCloud = require('acr-cloud');

// Load environment variables from .env file
dotenv.load();

// ES6 Transpiler
require('babel-core/register');
require('babel-polyfill');

// Models
var User = require('./models/User');

// Controllers
var userController = require('./controllers/user');

// React and Server-Side Rendering
var routes = require('./app/routes');
var configureStore = require('./app/store/configureStore').default;

var app = express();

var compiler = webpack(config);
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

/*
mongoose.createConnection(process.env.MONGODB);
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});
*/

var acr = new ACRCloud({
    // required 
    access_key: "73d6f63fb7f29a0162415ab06fc6be1f",
    access_secret: "HYyaskkUCHM6z2sVdc9d99hJHX5yWzBxNs3DcPpP",
    // optional 
    requrl: 'identify-us-west-2.acrcloud.com',
    http_method: 'POST',
    http_uri: '/v1/identify',
    audio_format: 'webm',
    data_type: 'Fingerprint',
    signature_version: '1',
    timestamp: Date.now()
});

// Enable cross domain
app.use( function( req, res, next ) {
	res.header( 'Access-Control-Allow-Origin', '*' );
	res.header( 'Access-Control-Allow-Headers', 'X-Requested-With' );
	next();
});

// Body parser with bigger body size limit
var sizeLimit = process.env.SIZE_LIMIT || '5mb';
app.use( bodyParser.json( { limit: sizeLimit } ) );
app.use( bodyParser.urlencoded( { limit: sizeLimit, extended: true } ) );

var hbs = exphbs.create({
  defaultLayout: 'main',
  helpers: {
    ifeq: function(a, b, options) {
      if (a === b) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    toJSON : function(object) {
      return JSON.stringify(object);
    }
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(sass({ src: path.join(__dirname, 'public'), dest: path.join(__dirname, 'public') }));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  req.isAuthenticated = function() {
    var token = (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token;
    try {
      return jwt.verify(token, process.env.TOKEN_SECRET);
    } catch (err) {
      return false;
    }
  };

  if (req.isAuthenticated()) {
    var payload = req.isAuthenticated();
    User.findById(payload.sub, function(err, user) {
      req.user = user;
      next();
    });
  } else {
    next();
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
  app.use(require('webpack-hot-middleware')(compiler));
}


app.post('/tomp3', function(req, res){
  var lamejs = require('lamejs');
  var channels = 1; //1 for mono or 2 for stereo 
  var sampleRate = 44100; //44.1khz (normal mp3 samplerate) 
  var kbps = 128; //encode 128kbps mp3 
  var mp3encoder = new lamejs.Mp3Encoder(channels, sampleRate, kbps);
  var mp3Data = [];
  
  var samples = new Int16Array(req.body.buffer) //one second of silence (get your data from the source you have) 
  var sampleBlockSize = 1152; //can be anything but make it a multiple of 576 to make encoders life easier 
  
  var mp3Data = [];
  for (var i = 0; i < samples.length; i += sampleBlockSize) {
    var sampleChunk = samples.subarray(i, i + sampleBlockSize);
    var mp3buf = mp3encoder.encodeBuffer(sampleChunk);
    if (mp3buf.length > 0) {
        mp3Data.push(mp3buf);
    }
  }
  mp3buf = mp3encoder.flush();   //finish writing mp3 
  
  if (mp3buf.length > 0) {
      mp3Data.push(new Int8Array(mp3buf));
  }

  res.send({
    data:mp3Data
  })
})

// Place endpoints here
app.post('/identify', function(req, res){
  var buffer = req.body.buffer.toString();
  buffer = buffer.replace(/^data:audio\/webm;base64,/, "")
  acr.identify(buffer)
  .then( function( data ) {
    console.log("I HAVEN'T EVEN IDENTIFIED");
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
})

// React server rendering
app.use(function(req, res) {
  var initialState = {
    auth: { token: req.cookies.token, user: req.user },
    messages: {}
  };

  var store = configureStore(initialState);

  Router.match({ routes: routes.default(store), location: req.url }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Provider, { store: store },
        React.createElement(Router.RouterContext, renderProps)
      ));
      res.render('layouts/main', {
        html: html,
        initialState: store.getState()
      });
    } else {
      res.sendStatus(404);
    }
  });
});


// Production error handler
if (app.get('env') === 'production') {
  app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.sendStatus(err.status || 500);
  });
}

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
