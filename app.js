/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

var express = require('express');
var cfenv = require('cfenv');
var bodyParser = require('body-parser');
var multer = require('multer');
var request = require('request');
var methodOverride = require('method-override');
var morgan = require('morgan');
var unirest = require('unirest');

var app = express();
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

var appEnv = cfenv.getAppEnv();
var server = app.listen(appEnv.port, function() {
  console.log('***********************************');
  console.log('listening:', appEnv.url);
  console.log('***********************************');
});

module.exports = server;

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */

app.get('/photos', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/photos/_all_docs?include_docs=true',
    method: 'get',
    json: true
  };
  request(o, function(err, response, body){
    res.render('photos', body);
  });
});

app.post('/photos', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/photos',
    method: 'post',
    body: req.body,
    json: true
  };
  request(o, function(err, response, body){
    res.redirect('/photos');
  });
});

app.get('/', function(req, res){
  res.render('home');
});

app.get('/trip', function(req, res){
  res.render('trip', {cost: 0});
});

app.post('/trip', function(req, res){
  var cost = (req.body.distance / req.body.mpg) * req.body.cost;
  res.render('trip', {cost: cost});
});

/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
/* ----------------------------------------------------------------------------------------- */
