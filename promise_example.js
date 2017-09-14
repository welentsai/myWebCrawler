
const request = require('request');

// 產生一個 Promise Task 
var promise = new Promise(function (resolve, reject) {
  request.get('http://www.google.com', function (err, res, body) {
    if (err) reject(err);
    else resolve(res);
  });
});

// Handle Promise resolve/reject
// resolve for task successed
// reject for task failed 
promise.then( res => { // success cb
	console.log("Task Successed !!");
	console.log(res.statusCode);
}, err => { // fail cb
	console.log("error happen !!");
})