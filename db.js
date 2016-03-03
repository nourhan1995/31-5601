// db.js
var mongo  = require('mongodb').MongoClient;
var assert = require('assert');
var DB     = null;
var dbURL  = 'mongodb://localhost:27017/Quotes';
var quote  = {
	"text" : "20 percent of the code has 80 percent of the errors. Find them, fix them!",
	"author": "Lowell Arthur"
};
/**
 * function that connects to the mongodb instance initialized.
 * @param  {Function} cb callback for when connection is complete
 */
exports.connect = function(cb) {
    // You do this one
    mongo.connect(dbURL, function(err, db){
    	assert.equal(null, err);
    	DB = db;
    	cb(err, db);
    });
};

/**
 * used to get access to the db object to query the database
 * throws an error if db not initialized.
 * example use case assuming you required the module as db
 *     db.db().find(.... etc
 * @return {MongoDBObject} 
 */
exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};

/**
 * clears all collections in the database calling the callback when done
 * @param  {Function} done callback indicating the operation is complete
 */
 exports.clearDB = function clearDB(done) {
	console.log('trying to clear');
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany(); 
            console.log('removed a collection');  
        });
        done();
    }).catch(done);
};

// module.exports = clearDB;
// module.exports = connect;

// exports.seed = function(cb){
// 	console.log('trying to seed');
// 	clearDB(function(err){
// 		console.log('trying to assert');
// 		assert.equal(null, err);
// 		DB.db().collection('quote').insert(quote, function(err, result){
// 			assert.equal(null, err);
// 			assert.equal(1, result.result.n);
// 			cb(err);
// 		});
// 	});
// };


// seed: function seed(cb){
// 		DB.clear(function(err){
// 			assert.equal(null, err);
// 			DB.db().collection('post').insert(post,function(err, result){
// 				assert.equal(null, err);
// 				assert.equal(1, result.result.n);
// 				cb(err);
// 			});
// 		});