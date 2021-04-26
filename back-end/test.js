const axios=require('axios')
const mocha=require('mocha')
const chai=require('chai')
const assert=require('chai').assert;
const scraper=require('./scraper')
const app=require('./app')
const server=require('./server')
const whModels=require('./mongo/wh_models.js')
const results = require('./results')
const login = require('./login_logout')
const path = require('path');
const expect = require("chai").expect;
const request = require("supertest");
const mongoose = require('mongoose');

chaiHttp = require('chai-http');
chai.use(chaiHttp);

// test the dummy probability calculation for now

describe('Calculate Probability of Getting Into Course', function() {
  it('should return (100-position)/100 for now', function(done) {
    assert.strictEqual(results.calcProbGetIn(7, 100), .93);
    done();
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
    assert.equal(res.r, '61 ratings');
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

// describe('GET /prof_info', function() {
//   this.timeout(3000);
//   it('should respond with prof from API', function(done) {
//     this.timeout(300000);
//     request(require('./app.js'))
//         .get('/prof_info')
//         .expect(200, function(err, res) {
//           expect(res.body).to.eql({q: '3.9', r: '61', d: '3.2', t: '66%'});
//           done();
//         });
//   });
// });



// unit test to see if the albert scraper runs an appropriate value at a certain index of the expected json object
describe('Scraping function for Albert', function() {
  this.timeout(30000);
  it('result[0].sections[0].instructors[0] should return \'C Sinan Gunturk\'', async function() {
    this.timeout(300000);
    // setTimeout(done,30000);
    const res= await scraper.albert_scraper();
    assert.equal(res[0].sections[0].instructors[0], 'C Sinan Gunturk');
    
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
 
