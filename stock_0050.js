
// 台灣證交所
// 首頁 > 交易資訊 > 盤後資訊 > 個股日成交資訊 > 0050
// 回傳 JSON Data

const request = require('request');

const full_uri = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=20170901&stockNo=0050';
const uri = 'http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=';
//const stockNo = '0050';


dateL = getDataListByYear(2016);

const promises = []; // task list

// 當 i > 5, 開始出現error, 應該是request發出的速度太快, 被server端擋住
// 利用 Timer 慢慢發出 request
for(let i = 0; i < dateL.length; i++) {
	promises.push(getMonthlyTradeInfo(dateL[i], '0050', (i+1)*500));  // push task into task list
}

// 建立一個 Promise task 
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

// 處理 Promise Tasks 結果(resolve/reject)
Promise.all(promises)
	.then(function(data) {
		console.log(data);
		console.log("All Task Successed !!");
	})
	.catch(function(err) {
		console.log("Error Happen !!");
		console.log(err);
	});

function getDataListByYear(year) {
	const _dateL = [];
	for(let i = 0; i < 12; i++) {
		let y = year.toString();
		let m = ('0' + (i + 1)).slice(-2);
		let d = '01';
		_dateL.push(y + m + d);
	}
	return _dateL;
	//console.log(_dateL);
}