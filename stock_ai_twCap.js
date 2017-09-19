
// STOCK-AI.COM: 投資級經濟指標使用指南
// 台灣台股上市公司當月總市值 TWSE Market Capitalization

const request = require('request');
const cheerio = require('cheerio');
var moment = require('moment');

// 自訂 module
const mgLib = require('./lib/mgLib.js');

mgLib.init();

const uri = "https://stock-ai.com/eomDataQuery";

function getPayload(sblCode, stYr, stM, eYr, eM) {
	return {
		form: {
			a:"c",
			showType:"Value",
			symbolCode:sblCode,
			//symbolCode:"twIndexScore", // 台灣景氣對策信號(分數)
			//symbolCode:"marketCapitalization", // 台灣台股上市公司當月總市值
			//symbolCode:"twA02", // M1B 貨幣總計數 (= M1A ＋ 活期儲蓄存款) 
			startYear:stYr,
			startMonth:stM,
			endYear:eYr,
			endMonth:eM,
			hash:"d41d8cd98f00b204e9800998ecf8427e"	
		}	
	};
}

function getDate(date) {
	//console.log(date);
	//return moment(date, "YYYY-MM-DD").format('YYYY-MM-DD').toString();
	return moment(date, "YYYY-MM-DD").format('YYYY-MM-DD');
}

let payload = getPayload("marketCapitalization", 2000, 1, 2017, 8);
let dataL = [];

request.post(uri, payload, function(error, response, jsonStr) {

	if (!error && response.statusCode == 200) {
		let content = JSON.parse(jsonStr); // convert JSON 字串 to JSON object
		for(let i = 0; i < content.rows.length; i++) {
			let _row = {
				date: getDate(content.rows[i].sDate), // date
				price: content.rows[i].sPrice
			};
			//console.log(_row);	
			dataL.push(_row);
		}

    mgLib.updateTwCap(dataL, {upsert:true}, function(err) {
      if(err) {
        console.log("update TWSE Market Cap error !!");
      } else {
        console.log("update TWSE Market Cap successfully !!");
      }
    });
	}
});