var app    = require('./app.js');
var db     = require('./db.js');
var quotes = require('./quotes.js');

db.connect(function(err){
	console.log('connected to db');
	quotes.seed(function(err, seeded){
		console.log('done seeding');
		if(seeded == true)
			console.log('seeded to db');
		app.listen(3000, function(){
			console.log('server running on port 3000');
		});
	});
});


// app.listen(3000, function(){
// 	console.log('server running on port 3000!!');
// });
