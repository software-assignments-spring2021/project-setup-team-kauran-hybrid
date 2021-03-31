const axios=require('axios')
const mocha=require('mocha')
const chai=require('chai')
const assert=require('assert')
const scraper=require('./scraper')
const app=require('./app')


// dummy example
describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });

// test the dummy probability calculation for now
describe('Calculate Probability of Getting Into Course', function() {
    it('should return (100-position)/100 for now', function() {
      assert.strictEqual(app.calcProbGetIn(7,100), .93);
    });
});


