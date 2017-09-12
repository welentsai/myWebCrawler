
// 國泰銀行牌告匯率爬蟲

var request = require('request');
var cheerio = require('cheerio');

var weatherTable = [];

request("https://taqm.epa.gov.tw/taqm/tw/default.aspx", function (error, response, html) {
  if (!error && response.statusCode == 200) {

    var $ = cheerio.load(html);

    // 氣象資料表
    // dom('select').each(function (i, element) {
    //     console.log(i);
    //     console.log(dom(this).children());
    // });

    console.log($.html());

    $('.TableAir tbody tr').each(function (i, element) {
        console.log(i);
    });



    //display();
  }
});

function display() {
	for(let i = 0; i < exchangeRate.length; i++) {
		console.log(exchangeRate[i]);
	}
}

