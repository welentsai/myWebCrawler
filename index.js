
const moment = require('moment');

const mgLib = require('./lib/mgLib.js');

const botRates = require('./lib/webcrawler/bot_exchangeRate.js');

mgLib.init();

// 上傳今日匯率前, 先檢查今日是否已有上傳(避免重複)
mgLib.findLastRate(function(err, row) { //抓出最後更新的匯率日期

	if(row === null) {
		console.log("empty document !!");	
	} else { 
		let lastUpdate = moment(row.date).format('YYYY-MM-DD');
		let today = moment(new Date()).format('YYYY-MM-DD');
		if(lastUpdate === today) { // 今日已更新
			console.log("today is already updated !!!");
			return; // skip following code
		} 
	}

	getBoT_Rates();
});


function getBoT_Rates() {
	botRates.getRates(function(rates) {

		mgLib.updateRates(rates, {upsert:true}, function(err) {
			if(err) {
				console.log("update rates error !!");
			} else {
				console.log("update rates successfully !!");
			}
		});

	});
}



