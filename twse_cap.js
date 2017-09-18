
// 台灣證卷交易所
// 上市公司總市值

const request = require('request');
const cheerio = require('cheerio');

const uri = "http://www.tse.com.tw/rsrc/data/zh/home/values.json";

request(uri, function (error, response, jsonStr) {
    if (!error && response.statusCode == 200) {
    	let content = JSON.parse(jsonStr); // convert JSON 字串 to JSON object
    	console.log("得到過去五天股市總市值資料");
    	dataL = content.market;
    	for(let i = 0; i < dataL.length; i++) {
    		console.log(dataL[i][0]); // date
    		console.log(dataL[i][1]); // market cap value
    	}
    }
});

