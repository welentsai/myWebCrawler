
// 台銀牌告匯率爬蟲

var request = require('request');
var cheerio = require('cheerio');

var currencyList = [];
var rateCashList = [];
var rateSightList = [];
var exchangeRate=[];

const uri = "http://rate.bot.com.tw/xrt?Lang=zh-TW";

// export function 
exports.getRates = function(callback) {

	request(uri, function (error, response, html) {
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
	    //display();
	    callback(exchangeRate);
	  }
	});
}

function display() {
	for(let i = 0; i < exchangeRate.length; i++) {
		console.log(exchangeRate[i]);
	}
}

// 把蒐集來的資料整理成 => JSON Array
function toResult() {
	for(let i=0; i<currencyList.length; i++) {
		let currencyRate = {
            date: new Date(),
			currency: currencyList[i],
			cashBuy: rateCashList.shift(),
			cashSell: rateCashList.shift(),
			sightBuy: rateSightList.shift(),
			sightSell: rateSightList.shift()
		};

		exchangeRate.push(currencyRate);
	}
}