
// 利用網頁資料, 建立即時指標

const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');

// 判斷景氣分數的燈號
function getLight(score) {
	if(score >= 9 && score <= 16) { // 低迷
		return "藍燈 低迷";
	} else if (score >=17 && score <=22) { // 轉向
		return "藍黃燈 轉向";
	} else if (score >=23 && score <=31) { // 穩定
		return "綠燈 穩定";
	} else if (score >=32 && score <=37) { // 轉向
		return "黃紅燈 轉向";
	} else if (score >=38 && score <= 45) { //熱絡
		return "紅燈 熱絡";
	} else {
		return "數值不在燈號範圍內 !!";
	}
}

// reformat date from 國發會
function getDateNdc(date) {
	//console.log(date);
	//return moment(date, "YYYY-MM-DD").format('YYYY-MM-DD').toString();
	return moment(date, "YYYYMM").format('YYYY-MM');
}

// reformat date from Stock-ai
function getDateSAI(date) {
	//console.log(date);
	return moment(date, "YYYY-MM-DD").format('YYYY-MM').toString();
}

// reformat date from TWSE
function getDateTWSE(date) {
	//console.log(date);
	return moment(date, "MM/DD").format('YYYY-MM-DD').toString();
}

// 建立 Stock AI Query 用的 POST Payload
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

// 取得景氣燈號

// // 國發會 - 景氣指標查詢系統
const ndc_uri = "http://index.ndc.gov.tw/n/json/data/eco/indicators";
request.post(ndc_uri, function(error, response, jsonStr) {

	if (!error && response.statusCode == 200) {
		let content = JSON.parse(jsonStr); // convert JSON 字串 to JSON object
		let scoreList = content.line['12'].data; // 取得 景氣對策信號 分數array
		let last6 = scoreList.slice(-6); //最後6筆資料
		for(let i = 0; i < last6.length; i++) {
			console.log("景氣對策信號 日期: " +  getDateNdc(last6[i].x) + "  分數: " + last6[i].y + "  燈號: " + getLight(last6[i].y));
		}
	}
});

// // 取得 Stock-ai - M1B 貨幣計數
const stockAI_uri = "https://stock-ai.com/eomDataQuery";

let payload = getPayload("twA02", 2017, 2, 2017, 9);

request.post(stockAI_uri, payload, function(error, response, jsonStr) {

	if (!error && response.statusCode == 200) {
		let content = JSON.parse(jsonStr); // convert JSON 字串 to JSON object
		for(let i = 0; i < content.rows.length; i++) {
			console.log("M1B貨幣計數 日期: " + getDateSAI(content.rows[i].sDate) + "  M1B貨幣計數(十億): " + content.rows[i].sPrice);
		}
	}
});

// 取得 證交所 - 即時市值
const twse_uri = "http://www.tse.com.tw/rsrc/data/zh/home/values.json";

request.get(twse_uri, function(error, response, jsonStr) {

	if (!error && response.statusCode == 200) {
		let content = JSON.parse(jsonStr); // convert JSON 字串 to JSON object
		for(let i = 0; i < content.market.length; i++) {
			//console.log(getDateTWSE(content.market[i][0]));
			console.log("即時市值 日期: " + getDateTWSE(content.market[i][0]) + "  總市值(十億): " + content.market[i][1]/10);
		}
	}
});






