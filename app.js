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

app.post('/message', function(req, res){
  var message = req.body.message;
  var phone = req.body.phone;
  var sid = process.env.TWILIO_SID;
  var tok = process.env.TWILIO_TOK;

  var client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  client.sendMessage({
    to: phone,
    from: '+1 917-746-1483',
    body: message
  }, function(err, responseData){
    res.send(responseData);
  });
});

app.put('/people/:id', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/people/' + req.params.id,
    method: 'put',
    body: req.body,
    json: true
  };
  request(o, function(err, response, body){
    res.send(body);
  });
});

app.get('/people/:id', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/people/' + req.params.id,
    method: 'get',
    json: true
  };
  request(o, function(err, response, body){
    res.render('person', body);
  });
});

app.get('/people', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/people/_all_docs?include_docs=true',
    method: 'get',
    json: true
  };
  request(o, function(err, response, body){
    res.render('people', body);
  });
});

app.post('/people', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/people',
    method: 'post',
    body: req.body,
    json: true
  };
  request(o, function(err, response, body){
    res.redirect('/people');
  });
});

app.delete('/photos', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/photos/' + req.body._id + '?rev=' + req.body._rev,
    method: 'delete',
    json: true
  };
  request(o, function(err, response, body){
    res.redirect('/photos');
  });
});

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
