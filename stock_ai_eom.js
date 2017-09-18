
// STOCK-AI.COM: 投資級經濟指標使用指南
// 台灣景氣對策信號(分數) Taiwan Monitoring indicators

const request = require('request');
const cheerio = require('cheerio');

const uri = "https://stock-ai.com/eomDataQuery";

const form = {
	form: {
		a:"c",
		showType:"Value",
		symbolCode:"twIndexScore",
		startYear:1990,
		startMonth:01,
		endYear:2017,
		endMonth:07,
		hash:"d41d8cd98f00b204e9800998ecf8427e"	
	}
};

request.post(uri, form, function(error, response, jsonStr) {

	if (!error && response.statusCode == 200) {
		let content = JSON.parse(jsonStr); // convert JSON 字串 to JSON object
		//console.log(content);
		for(let i = 0; i < content.rows.length; i++) {
			console.log(content.rows[i]);	
		}
		
	}
});