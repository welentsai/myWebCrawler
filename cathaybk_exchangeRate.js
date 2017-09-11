
// 國泰銀行牌告匯率爬蟲

var request = require('request');
var cheerio = require('cheerio');

var exchangeRate=[];

request("https://www.cathaybk.com.tw/cathaybk/personal/exchange/product/currency-billboard/", function (error, response, html) {
  if (!error && response.statusCode == 200) {

    const dom = cheerio.load(html);

    // 幣別
    dom('tbody').each(function (i, element) {
        if(i == 2 ) { // target tbody exchange rate table
            dom(this).children().each(function (i, element) {

                // 把蒐集來的資料整理成 => JSON
                let currencyRate = {
                    currency: dom(this).children().first().text().trim(),
                    cashBuy: dom(this).children().first().next().text(),
                    cashSell: dom(this).children().last().text() 
                };
                exchangeRate.push(currencyRate); // JSON Array

                // console.log(dom(this).children().first().text().trim()); //幣別
                // console.log(dom(this).children().first().next().text()); // Bank Buy 
                // console.log(dom(this).children().last().text()); // Bank Sell
                // console.log("---- end ---");
            });
        }        
    });

    display();
  }
});

function display() {
	for(let i = 0; i < exchangeRate.length; i++) {
		console.log(exchangeRate[i]);
	}
}

