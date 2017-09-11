
var request = require('request');
var cheerio = require('cheerio');

/*
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred 
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
  console.log('body:', body); // Print the HTML for the Google homepage. 
});
*/

var currencyList = [];
var rateCashList = [];
var rateSightList = [];
var exchangeRate=[];

request("http://rate.bot.com.tw/xrt?Lang=zh-TW", function (error, response, html) {
  if (!error && response.statusCode == 200) {

    var $ = cheerio.load(html);

    // 幣別
    $('div.visible-phone').each(function (i, element) {
    	//currencyList.push($(this).text().replace(/ /g, '')); // remove whitespace
    	currencyList.push($(this).text().trim()); // remove whitespace
    });
    
    // 現金買入/賣出
    $('td.rate-content-cash').each(function (i, element) {
    	//var a = $(this).text();
    	//console.log($(this).text());
    	rateCashList.push($(this).text());
    });

    // 即期買入/賣出
    $('td.rate-content-sight').each(function (i, element) {
    	//var a = $(this).text();
    	//console.log($(this).text());
    	rateSightList.push($(this).text());
    });

    toResult();
    display();
  }
});

function display() {
	for(let i = 0; i < exchangeRate.length; i++) {
		console.log(exchangeRate[i]);
	}
}

// 把蒐集來的資料整理成 => JSON Array
function toResult() {
	for(let i=0; i<currencyList.length; i++) {
		let currencyRate = {
			currency: currencyList[i],
			cashBuy: rateCashList.shift(),
			cashSell: rateCashList.shift(),
			sightBuy: rateSightList.shift(),
			sightSell: rateSightList.shift()
		};

		exchangeRate.push(currencyRate);
	}
}

