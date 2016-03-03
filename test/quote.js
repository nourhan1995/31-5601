// if(typeof index == "undefined"){
//     return array[Math.floor(Math.random() * array.length)];

// deeh f function get qoutes fs.readFile('../quotes.json', 'utf8', function(err, data)

	// tests/quotes.js

var assert = require('chai').assert;
var expect = require('chai').expect;
var app = require('../app.js');
var request = require('supertest');
var Quote = require('../quotes.js');
var db = require('../db.js');

before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(err, db) {
       if (err) return done(err);
       else done();
    });
});

describe("getElementByIndexElseRandom", function() {
    var arr = [1, 2, 3, 43, 5];
    it("should return a random element that is included in the array if we omit the index", function() {
        expect(arr).to.include(Quote.getElementByIndexElseRandom(arr));
    });
    it("should return the first element if we also pass the index 0", function() {
        assert.equal(1, Quote.getElementByIndexElseRandom(arr, 0));
    });
    it("should return the last element if we also pass the index", function() {
        assert.equal(5, Quote.getElementByIndexElseRandom(arr, arr.length - 1));
    });
});

describe("getQuotesFromJSON", function() {
    it("should return an array of 102 quote", function() {
        // TODO: you know how many quotes are there
        assert.equal(102, Quote.getQuotesFromJSON().length);
    });
    it("first quote in the array's author should be Kevin Kruse", function() {
        // TODO: you know the content of first quote
        assert.equal('Kevin Kruse', Quote.getQuotesFromJSON()[0].author);
    });
});

describe("getQuoteFromJSON", function() {
    it('should return a quote object with an author and text property', function() {
        // TODO: check that the returned quote has text and author
        expect(Quote.getQuoteFromJSON()).to.exist;
    });
    it('should return a random quote if index not specified', function() {
       // TODO: is the returned quote in the all quotes array?
       expect(Quote.getQuotesFromJSON()).to.include(Quote.getQuoteFromJSON());
    });
    it('should return the first quote if we pass 0', function() {
        // TODO: you know the content of first quote
        assert.equal('Kevin Kruse', Quote.getQuoteFromJSON(0).author);
        assert.equal('Life isn’t about getting and having, it’s about giving and being', Quote.getQuoteFromJSON(0).text);
    });
});

// quotes collection should be called quotes
describe('seed', function() {
    before(db.clearDB);
    it('should populate the db if db is empty returning true', function(done) {
        // TODO: assert that seeded is true
        Quote.seed(function(err, seeded){
            assert.equal(true, seeded);
            done(err, seeded);
        });
    });
    it('should have populated the quotes collection with 102 document', function(done) {
        // TODO: check that the database contains 102 document
        Quote.seed(function(err, seeded){
            if(seeded){
                Quote.getQuotesFromDB(function(err, quotes){
                    assert.equal(102, quotes.length);
                    done(err, quotes);
                });
            }
        });
    });
    it('should not seed db again if db is not empty returning false in the callback', function(done) {
        // TODO: assert that seeded is false
        Quote.seed(function(err, seeded){
            assert.notEqual(false, seeded);
            done(err, seeded);
        })

    });
    it('should not seed db again if db is not empty', function(done) {
        // TODO: The database should have 102 quote still
        Quote.seed(function(err, seeded){
            if(seeded){
                Quote.getQuotesFromDB(function(err, quotes){
                    assert.equal(102, quotes.length);
                    done(err, quotes);
                });
            }
        });
    });
});

describe('getQuotesFromDB', function() {
    it('should return all quote documents in the database', function(done) {
        // TODO: there should be 102 documents in the db
        Quote.getQuotesFromDB(function(err, quotes){
            assert.equal(102, quotes.length);
            done(err, quotes);
        });
    });
});

describe('getQuoteFromDB', function() {
    it('should return a random quote document', function(done) {
        // TODO: see if it returns on of the quotes from all quotes
        var arr;
        Quote.getQuotesFromDB(function(err, quotes){
            arr = quotes;
        });
        // console.log(arr);
        Quote.getQuoteFromDB(function(err, quote){
            assert.equal(null, err);
            expect(arr).to.include(quote);
            done(err, quote);
        });
    });
    it('should return the first quote if passed 0 after callback', function(done) {
        // TODO: you know the content of object in the file
        Quote.getQuoteFromDB(function(err, quote){
            assert.equal('John Lennon', quote.author);
            assert.equal('When I was 5 years old, my mother always told me that happiness was the key to life.  When I went to school, they asked me what I wanted to be when I grew up.  I wrote down ‘happy’.  They told me I didn’t understand the assignment, and I told them they didn’t understand life', quote.text);
            done(err, quote);
        }, 0);
    });
});

describe('API', function() {
    request = request(app);
    it("should return a 404 for urls that don't exist", function(done) {
        // TODO: test with supertest
        request.get('/').expect(200, done);
    });

    it('/api/quote should return a quote JSON object with keys [_id, text, author]', function(done) {
        // TODO: test with supertest
        request.get('/api/post').expect('Content-Type', 'application/json; charset=utf-8').expect(200, done);
    });

    it('/api/quotes should return an array of JSON object when I visit', function(done) {
        // TODO: test with supertest
        request.get('/api/posts').expect('Content-Type', 'application/json; charset=utf-8').expect(200, done);

    });
});
