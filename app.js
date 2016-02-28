var express = require('express');
var app = express();


app.get('/css/style.css', function(req, res){
	res.sendFile('/home/nourhan/Documents/semester6/SoftwareEngineering/assignment1/31-5601'+'/public/css/style.css');
});

app.get('/css/..img/download.jpg', function(req, res){
	res.sendFile('/home/nourhan/Documents/semester6/SoftwareEngineering/assignment1/31-5601'+'/img/download.jpg')
})

app.get('/js/main.js', function(req, res){
	res.sendFile('/home/nourhan/Documents/semester6/SoftwareEngineering/assignment1/31-5601'+'/public/js/main.js');
});

app.get('/', function(req, res){
	res.sendFile('/home/nourhan/Documents/semester6/SoftwareEngineering/assignment1/31-5601'+ '/public/index.html')
});

app.get('/index.html', function(req, res){
	res.sendFile('/home/nourhan/Documents/semester6/SoftwareEngineering/assignment1/31-5601'+ '/public/index.html')
});

app.get('index', function(req, res){
	res.sendFile('/home/nourhan/Documents/semester6/SoftwareEngineering/assignment1/31-5601'+ '/public/index.html')
});



// var routes = require('./public/index.html');

// app.use('/', routes);
// app.use('/index.html', routes);
// app.use('index', routes);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

app.listen(3000, function(){
	console.log('Listening on port 3000!');
});

exports.app = app;
