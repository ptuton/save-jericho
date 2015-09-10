var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var multer = require('multer');
var request = require('request');
var methodOverride = require('method-override');
var morgan = require('morgan');

var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

var appEnv = cfenv.getAppEnv();
app.listen(appEnv.port, function() {
  console.log('server starting on', appEnv);
});

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

var dbUrl;

if (appEnv.isLocal) {
  var credentials = require('./credentials.json');

  // dbUrl = credentials.services.cloudantNoSQLDB[0].credentials.url;
} else {
  var x;

  // dbUrl = appEnv.services.cloudantNoSQLDB[0].credentials.url;
}

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

app.get('/', function(req, res){
  res.render('home/index');
});

app.get('/square', function(req, res){
  res.render('math/square', {square: null});
});

app.post('/square', function(req, res){
  var square = req.body.x * req.body.x;
  res.render('math/square', {square: square});
});

app.get('/root', function(req, res){
  res.render('math/root', {root: null});
});

app.post('/root', function(req, res){
  var root = Math.sqrt(req.body.x);
  res.render('math/root', {root: root});
});

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
