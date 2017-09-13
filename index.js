
// mongoose 4.10.8
var mongoose = require('mongoose');

/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

var mongodbUri = 'mongodb://welen:welen88@ds064198.mlab.com:64198/welendb';

mongoose.connect(mongodbUri, options);

var conn = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));

conn.once('open', function() {
	// we're connected!
	console.log("MongoDB Connected !");
});