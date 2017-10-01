// 台銀 美元3年歷史牌告匯率
const csv=require('csvtojson');
const moment = require('moment');

const mgLib = require('./lib/mgLib.js');

const csvFilePath='./data/ExchangeRate@201709301603.csv';

const rateList = [];

mgLib.init();

csv()
.fromFile(csvFilePath)
.on('csv',(csvRow)=>{ // Convert to CSV row arrays

	let rateRow = {
		date: getDate(csvRow[0]),
		bank: "Bank of Taiwan, BOT",
		currency: csvRow[1],
		cashBuy: csvRow[3],
		cashSell: csvRow[13],
		sightBuy: csvRow[4],
		sightSell: csvRow[14]
	};

	rateList.push(rateRow);
})

.on('done',(error)=>{
    console.log('end');
    //display();
    mgLib.updateRates(rateList, {upsert:true}, function(err) {
    	if(err) {
    		console.log("update Rates error !!");
    	} else {
    		console.log("update Rates successfully !!");
    	}
    });
})

function getDate(date) {
	return moment(date, "YYYYMMDD").format('YYYY-MM-DD');
}

function display() {
	for(let i = 0; i < rateList.length; i++) {
		console.log(rateList[i]);
	}
}


