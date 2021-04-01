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

describe('Scraping function for professors',function(){
  this.timeout(30000);
  it("should return(quality 3.9, difficulty 3.2, number of ratings 61, would take again 66%)",async function(){
    this.timeout(30000);
    //setTimeout(done,30000);
    let res= await scraper.prof_scraper("Amos Bloomberg","New York University");
    
    assert.equal(res.q,'3.9');
    assert.equal(res.d,'3.2');
    assert.equal(res.r,'61');
    assert.equal(res.t,"66%");
  });
});


