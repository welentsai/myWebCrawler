
// 台灣證交所
// 首頁 > 交易資訊 > 盤後資訊 > 個股日成交資訊 > 0050
// 回傳 JSON Data

const request = require('request');
var moment = require('moment');

const mgLib = require('./lib/mgLib.js');

const full_uri = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20170901&stockNo=0050';
const uri = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=';
//const stockNo = '0050';

const tradingList = [];

mgLib.init();

// 民國轉西元
function getRoCToCE(rocDate) {
	let _dateL = rocDate.split('/');
	let _year = parseInt(_dateL[0]) + 1911; // 民國1年 = 西元 1912年
	let _month = _dateL[1];
	let _day = _dateL[2];
	let _date = _year + _month + _day;
	return moment(_date, "YYYYMMDD").format('YYYY-MM-DD');
}

function getDataListByYear(year) {
	const _dateL = [];
	for(let i = 0; i < 12; i++) {
		let y = year.toString();
		let m = ('0' + (i + 1)).slice(-2);
		let d = '01';
		_dateL.push(y + m + d);
	}
	//console.log(_dateL);
	return _dateL;
}

// 回傳一個 Promise task 
function getMonthlyTradeInfo(date, stockNo, delayInterval) {
	return new Promise(function(resolve, reject){
		setTimeout(() => { // 設定 Timer
			const _uri = uri + date + '&stockNo=' + stockNo;
			console.log(_uri);

			request.get(_uri, function (error, response, body) {
				if (!error && response.statusCode == 200) {
					const _content = JSON.parse(body); // convert JSON 字串 to JSON object
					const _fields = _content.fields; // 欄位
					const _dataList = _content.data; //逐日資料
					//console.log(_dataList);
					resolve(_dataList);
				} else {
					reject(error);	
				}
			});
		}, delayInterval);

	});
}

function formatTrading(data) {
	for(let i = 0; i < data.length; i++) {
		for(let j = 0; j < data[i].length; j++) {
			let _trading = {
				date: getRoCToCE(data[i][j][0]), //日期
				vol: data[i][j][1], // 成交股數
				to: data[i][j][2], // 成交金額
				op: data[i][j][3], // 開盤價
				th: data[i][j][4], // 最高價
				tl: data[i][j][5], // 最低價
				cp: data[i][j][6], // 收盤價
				chg: data[i][j][7], // 漲跌價差
				txn: data[i][j][8] // 成交筆數
			};
			tradingList.push(_trading);
			//console.log(_trading);	
		}
		
	}
}

// 0050 民國93年成立, 歷史資料從94年, 西元2004年開始
//dateL = getDataListByYear(2004); //done
//dateL = getDataListByYear(2005); // done
//dateL = getDataListByYear(2006); // done
//dateL = getDataListByYear(2007); // done
//dateL = getDataListByYear(2008); // done
//dateL = getDataListByYear(2009); // done
//dateL = getDataListByYear(2010); // done
//dateL = getDataListByYear(2011); // done
//dateL = getDataListByYear(2012); // done
//dateL = getDataListByYear(2013); // done
//dateL = getDataListByYear(2014); // done
//dateL = getDataListByYear(2015); // done
//dateL = getDataListByYear(2016); // done
dateL = getDataListByYear(2017); // 目前mLab中 0050的資料紀錄到 2017/9/14

const promises = []; // task list

//for(let i = 0; i < dateL.length; i++) {
for(let i = 0; i < dateL.length; i++) {
	promises.push(getMonthlyTradeInfo(dateL[i], '0050', (i+1)*100));  // push task into task list
}

// 處理 Promise Tasks 結果(resolve/reject)
Promise.all(promises)
	.then(function(data) {
		//console.log(data);
		formatTrading(data);
		// for(let i = 0; i < tradingList.length; i++) {
		// 	console.log(tradingList[i]);
		// }


		mgLib.updateTradings(tradingList, {upsert:true}, function(err) {
			if(err) {
				console.log("update Tradings error !!");
			} else {
				console.log("update Tradings successfully !!");
			}
		});
		console.log("All Task Successed !!");
	})
	.catch(function(err) {
		console.log("Error Happen !!");
		console.log(err);
	});

