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
app.listen(appEnv.port, function() {
  console.log('**************************');
  console.log('server starting on', appEnv);
  console.log('**************************');
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

app.get('/weather', function(req, res){
  res.render('api/weather', {forecast: []});
});

app.post('/weather', function(req, res){
  // These code snippets use an open-source library.
  unirest.get("https://george-vustrey-weather.p.mashape.com/api.php?location=" + req.body.city)
  .header("X-Mashape-Key", process.env.MASHAPE)
  .header("Accept", "application/json")
  .end(function (result) {
    res.render('api/weather', {forecast: result.body});
  });
});

app.get('/define', function(req, res){
  res.render('api/define', {definitions: []});
});

app.post('/define', function(req, res){
  // These code snippets use an open-source library.
  unirest.get("https://montanaflynn-dictionary.p.mashape.com/define?word=" + req.body.word)
  .header("X-Mashape-Key", process.env.MASHAPE)
  .header("Accept", "application/json")
  .end(function (result) {
    res.render('api/define', {definitions: result.body.definitions});
  });
});

app.get('/yoda', function(req, res){
  res.render('api/yoda', {translated: null});
});

app.post('/yoda', function(req, res){
  // These code snippets use an open-source library.
  unirest.get("https://yoda.p.mashape.com/yoda?sentence=" + req.body.phrase)
  .header("X-Mashape-Key", process.env.MASHAPE)
  .header("Accept", "text/plain")
  .end(function (result) {
    res.render('api/yoda', {translated: result.body});
  });
});

app.get('/', function(req, res){
  res.render('home/index');
});

app.get('/tax', function(req, res){
  res.render('math/tax', {amount: null, collected: null, total: null});
});

app.post('/tax', function(req, res){
  var amount = req.body.amount * 1;
  var tax;
  switch(req.body.state){
    case 'CA':
      tax = 0.20;
      break;
    case 'TX':
      tax = 0.05;
      break;
    case 'NY':
      tax = 0.30;
  }

  var collected = amount * tax;
  var total = amount + collected;
  res.render('math/tax', {amount: amount.toFixed(2), collected: collected.toFixed(2), total: total.toFixed(2)});
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
