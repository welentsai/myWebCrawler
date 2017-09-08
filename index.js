
var request = require('request');

/*
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});
*/

var pm25 = function() {
  request({
    url: "http://rate.bot.com.tw/xrt?Lang=zh-TW",
    method: "GET"
  }, function(error, response, body) {
    if (error || !body) {
      return;
    }
    // 爬完網頁後要做的事情
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Print the HTML for the Google homepage. 
  });
};

pm25();