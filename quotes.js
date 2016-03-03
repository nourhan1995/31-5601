var db      = require('./db.js');
var assert  = require('assert');
var express = require('express');
var router  = express.Router();
var fs      = require('fs');
var quote   = {
	"text" : "20 percent of the code has 80 percent of the errors. Find them, fix them!",
	"author": "Lowell Arthur"
};
// },
// {
// 	"text" : "Keep up the good work",
// 	"author" : "unknown"
// }];

function getElementByIndexElseRandom(array, index){
	if(typeof index == "undefined"){
		return array[Math.floor(Math.random() * array.length)];
	}else
		return array[index];
};

function getQuotesFromJSON(){
	return JSON.parse(fs.readFileSync("quotes.json"));
};

function getQuoteFromJSON(index){
	if(index === undefined)
		return getElementByIndexElseRandom(getQuotesFromJSON());
	else
		return getElementByIndexElseRandom(getQuotesFromJSON(), index);
};


router.get('/api/post', function(req, res, next){
	getQuoteFromDB(function(err, quote){
		if(err)
			next(err);
		res.send(quote);
	});
	// console.log('fetching');
	// db.db().collection('quotes').findOne(function(err, quote){
	// 	if(err)
	// 		return next(err);
	// 	// console.log('sending quote');
	// 	res.send('qoute');
	// 	// console.log('quote sent');
	// });
});

router.get('/api/posts', function(req, res, next){
	getQuotesFromDB(function(err, quotes){
		if(err)
			next(err);
		res.send(quotes);
	})
})

function seed(cb){
	db.clearDB(function(err){
		// if()
		assert.equal(null, err);
		if(err === null)
			console.log('clearDB is working');
		db.db().collection('quotes').insert(getQuotesFromJSON(), function(err, result){
			if(err === null)
				cb(err, true);
			else
				cb(err, false);
		});
	});
};

function getQuotesFromDB(cb){
	db.db().collection('quotes').find().toArray(function(err, quotes){
		// console.log(quotes);
		cb(err, quotes);
	});
};

function getQuoteFromDB(cb, index){
	getQuotesFromDB(function(err, quotes){
		// if(err === null){
			// if(index === undefined){
				cb(err,getElementByIndexElseRandom(quotes, index));
		// 	}else
		// 		return getElementByIndexElseRandom(quotes, index);
		// }
		// cb(err, quotes);
	});
};

module.exports                             = router;
module.exports.seed                        = seed;
module.exports.getElementByIndexElseRandom = getElementByIndexElseRandom;
module.exports.getQuoteFromJSON            = getQuoteFromJSON;
module.exports.getQuotesFromJSON           = getQuotesFromJSON;
module.exports.getQuotesFromDB             = getQuotesFromDB;
module.exports.getQuoteFromDB              = getQuoteFromDB;