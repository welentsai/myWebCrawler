
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
const iconv = require('iconv-lite');

const uri = "http://mops.twse.com.tw/server-java/t164sb01";

function getPayload(stockCode, year, season) {
	return {
		step:1,
		DEBUG:'',	
		CO_ID:stockCode,
		SYEAR:year,
		SSEASON:season,
		REPORT_ID:'C'
	};
}

let payload = getPayload(2330, 2014, 4);
//console.log(payload);

request.post({
	url: uri,
	form: payload,
	encoding: null // 不使用 request 套件的預設編碼
}, function(error, response, html) {
	if (!error && response.statusCode == 200) {
		let str = iconv.decode(html, "big5"); // big5 to utf-8
		const dom = cheerio.load(str);

		// 資產負債表
		// dom('.result_table').find('tr').each(function (i, element) {
		// 	console.log(dom(this).text());
		// });

		// 綜合損益表 及 其他一堆
		dom('.main_table').find('tr').each(function (i, element) {
			console.log(dom(this).text());
		});		
	}
});