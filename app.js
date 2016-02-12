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

app.get('/rangers', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/rangers/_all_docs?include_docs=true',
    method: 'get',
    json: true
  };
  request(o, function(err, response, body){
    res.render('rangers', body);
  });
});

app.post('/rangers', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/rangers',
    method: 'post',
    body: req.body,
    json: true
  };
  request(o, function(err, response, body){
    console.log('body: ', body)
    res.redirect('/rangers');
  });
});

app.get('/ranger/:id', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/rangers/' + req.params.id,
    method: 'get',
    json: true
  };
  request(o, function(err, response, body){
    res.render('ranger', body);
  });
});

app.put('/ranger/:id', function(req, res){
  var o = {
    uri: process.env.CLOUDANT + '/rangers/' + req.params.id,
    method: 'put',
    body: req.body,
    json: true
  };
  request(o, function(err, response, body){
    res.send(body);
  });
});

app.get('/cecil-bro', function(req, res){
  res.render('cecil-bro');
});

app.post('/biodata', function(req, res){

  var data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 86, 27, 90]
          }
        ]
    };
    console.log(data);
    res.send(data);
});


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
