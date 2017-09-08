
var request = require('request');
var cheerio = require('cheerio');

/*
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});
*/

/*
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
*/

request("http://rate.bot.com.tw/xrt?Lang=zh-TW", function (error, response, html) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(html);
    $('td.rate-content-cash').each(function (i, element) {
    	var a = $(this);
    	console.log(a);
    });
    //console.log(currency[0].attribs.data-table);
    //console.log(currency[0].children[0].data);

    //console.log(currency);
    /*
    $('span.comhead').each(function(i, element){
      var a = $(this).prev();
      console.log(a.text());
    });
    */
  }
});