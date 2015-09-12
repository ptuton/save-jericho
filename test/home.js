var expect  = require("chai").expect;
var request = require('supertest');
var server = require('../app');

describe('Home', function(){
  it('Gets the home page', function(done){
    request(server).get('/').end(function(err, res){
      expect(res.text).to.contain('Home');
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

describe('Quote', function(){
  it('Gets a quote', function(done){
    request(server).post('/quote').end(function(err, res){
      expect(JSON.parse(res.text).quote).to.be.truthy;
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});
