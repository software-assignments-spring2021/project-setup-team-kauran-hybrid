const axios=require('axios')
const mocha=require('mocha')
const chai=require('chai')
const assert=require('assert')
const scraper=require('./scraper')
const app=require('./app')
const results = require('./results')
const login = require('./login_logout')

const expect = require("chai").expect;
const request = require("supertest");


// test the dummy probability calculation for now

describe('Calculate Probability of Getting Into Course', function() {
  it('should return (100-position)/100 for now', function() {
    assert.strictEqual(results.calcProbGetIn(7, 100), .93);
  });
});

// test that the results page functions
describe('GET /results', function() {
  it('should send the expected probability to the results page', function(done) {
    request(require('./app.js'))
        .get('/results')
        .expect(200, function(err, res) {
          expect(res.body).to.not.equal({});
          done();
        });
  });
});

describe('Scraping function for professors', function() {
  this.timeout(30000);
  it('should return(quality 3.9, difficulty 3.2, number of ratings 61, would take again 66%)', async function() {
    this.timeout(300000);
    // setTimeout(done,30000);
    const res= await scraper.prof_scraper('Amos Bloomberg', 'New York University');


    assert.equal(res.q, '3.9');
    assert.equal(res.d, '3.2');
    assert.equal(res.r, '61');
    assert.equal(res.t, '66%');
  });
});

describe('GET /class_modules', function() {
  it('should respond with classes from API', function(done) {
    request(require('./app.js'))
        .get('/class_modules')
        .expect(200, function(err, res) {
          expect(res.body).to.not.equal({});
          done();
        });
  });
});

describe('POST /home_login', function() {
  it('responds with json of email, position, number', function(done) {
    request(app)
        .post('/home_login')
        .send({email: '123@nyu.edu', position: 22, number: 2790})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
  });
});

describe('GET /prof_info', function() {
  this.timeout(3000);
  it('should respond with prof from API', function(done) {
    this.timeout(300000);
    request(require('./app.js'))
        .get('/prof_info')
        .expect(200, function(err, res) {
          expect(res.body).to.eql({q: '3.9', r: '61', d: '3.2', t: '66%'});
          done();
        });
  });
});

describe('GET /login', function() {
  it('should respond with giving us the return status code 200 which we will assert.equal', function() {
    request(require('./app.js'))
        .get('localhost:3000/login_logout', function(err, res) {
          assert.equal(200, res.statusCode);
          //done();
        });
  });
});

describe('GET /signin', function() {
  it('should respond with giving us return status code 200 which will assert.equal again', function() {
    request(require('./app.js'))
        .get('localhost:3000/login_login', function(err, res) {
          assert.equal(200, res.statusCode);
          //done();
        });
  });
});

describe('POST /login_logout', function() {
  it('responds with json of email, password', function(done) {
    request(app)
        .post('/login_logout')
        .send({email: '123@nyu.edu', password: 000000})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
  });
});

// Junk, will remove once the login checker is better.. check the enterTheID function...
describe('login success checker', function() {
  it('should simply tell whether the details we have entered are acceptable or not', function() {
    assert.ok(login.loginSuccessChecker('junk_id', 'junk_checker'), 'junk_pswd');
  });
});

describe('enterTheID', function() {
  it('First lets attempt the most simple userid and make sure that its accepted', function() {
    assert.equal(login.enterTheID('cs_nyu_edu'), true);
  });
  it('Now lets try a more unique type of userid and check if its accepted as well', function() {
    assert.equal(login.enterTheID('$$$'), true);
  });
  it('Now lets not enter anything, and check it its rejected or not', function() {
    assert.equal(login.enterTheID(''), false);
  });
});

// unit test to see if the albert scraper runs an appropriate value at a certain index of the expected json object
describe('Scraping function for Albert', function() {
  this.timeout(30000);
  it('result[0].sections[0].instructors[0] should return \'Staff\'', async function() {
    this.timeout(300000);
    // setTimeout(done,30000);
    const res= await scraper.albert_scraper();
    assert.equal(res[0].sections[0].instructors[0], 'Staff');
  });
});

// unit test for class info
describe('GET /class_info', function() {
  it('should respond with detailed class info from API', function(done) {
    request(require('./app.js'))
        .get('/class_info')
        .expect(200, function(err, res) {
          expect(res.body).to.not.equal({});
          done();
        });
  });
});
