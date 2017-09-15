
// Google Finance
// Fetch S&P 500 Historical Data

const request = require('request');
const cheerio = require('cheerio');
var moment = require('moment');

//const uri = "https://finance.google.com/finance/historical?cid=626307&startdate=Jan+1,+2000&enddate=Jan+32,+2000";

const uri_1 = "https://finance.google.com/finance/historical?cid=626307&startdate=Jan+1%2C+1970&enddate=Dec+31%2C+1970&num=200";
const uri_2 = "https://finance.google.com/finance/historical?cid=626307&startdate=Jan+1%2C+1970&enddate=Dec+31%2C+1970&num=200&start=200";

function getDate(date) {
	console.log(date);
	return moment(date, "MMM DD, YYYY").format('YYYY-MM-DD');
}

request(uri_1, function (error, response, html) {
  if (!error && response.statusCode == 200) {
    let dom = cheerio.load(html);
    //console.log(dom('table.historical_price').text());
    dom('table.historical_price').find('tr').each(function (i, element) {
    	if(i > 0) { // 第一第資料是欄位資訊, 跳過
    		let _trading = {
    			date: getDate(dom(this).children().eq(0).text().trim()), // Date
    			vol: dom(this).children().eq(5).text().trim(), // Today Volumn
    			op: dom(this).children().eq(1).text().trim(), // Today Open Price
    			th: dom(this).children().eq(2).text().trim(), // Today High
    			tl: dom(this).children().eq(3).text().trim(), // Today Low
    			cp: dom(this).children().eq(4).text().trim() // Today Close Price
    		};
    		console.log(_trading);
	  		console.log("---------");	
    	}
    });
  }

  // request(uri_2, function (error, response, html) {
		// if (!error && response.statusCode == 200) {
	 //    let dom = cheerio.load(html);
	 //    dom('table.historical_price').find('tr').each(function (i, element) {
		//     if(i > 0) { // 第一第資料是欄位資訊, 跳過
		//     	let _trading = dom(this).text();
		//     	console.log(_trading);
		//     	console.log("---------");	
	 //    	}
	 //    });
	 //  }
  // });
});