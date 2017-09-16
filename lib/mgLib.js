
// mongoose connection to mLab Database

'use strict';

// mongoose 4.11.11
var mongoose = require('mongoose');

// mongoose modal
var rate = require('./mongoose/rate.js'); // 載入 exchange rate Model
var trading = require('./mongoose/trading.js'); // 載入 台股 日成交資訊 Model
var ustrading = require('./mongoose/us_trading.js'); // 載入 美股 日成交資訊 Model

// mongoose 及 mLab 連線參數
const mongodbUri = 'mongodb://welen:welen88@ds064198.mlab.com:64198/welendb';
const options = { keepAlive: true,
                reconnectTries: Number.MAX_VALUE,
				useMongoClient: true};

var db = mongoose.connection;

// constructor
function mongooseLib () {
	this.isInitialized = false;
}

// 初始化
// Node.js 環境中
// 利用 require()取得的module, 如果是同一檔案, 將會回傳同一 Object
// 所有的 Isntances 將會指向同一個 Object
mongooseLib.prototype.init = function() {
	// 利用 mongoose 建立default連線
	if (! this.isInitialized) {
		console.log("building up mongodb connection ....");
        
		mongoose.connect(mongodbUri, options);

		//Bind connection to error event (to get notification of connection errors)
		db.on('error', console.error.bind(console, 'MongoDB connection error:'));

		db.once('open', function() {
		  // we're connected!
		  console.log("mLab MongoDB Connected !");
		});
	}
	this.isInitialized = true;
}

mongooseLib.prototype.updateRates = function(datas, options, callback) {

    console.log("updateRates !!");

    console.log("total count is : " + datas.length);

    rate.insertMany(datas, function(err, doc) {
    	if(err) {
    		console.log(err);
    		callback(err);
    	}
    });

    callback(); // means ok and pass back 
}

mongooseLib.prototype.findLastRate = function(callback) {

    console.log("findLastRate() !!");

    // using Mongoose Query Builder
    // -id => to find the newest
    // id => to find the oldest
    rate.findOne().sort('-date').exec(function (err, row) {
        if(err) {
            console.error(err);
        }
        //console.log(JSON.stringify(row));
        callback(err, row);
    });
}

mongooseLib.prototype.updateTradings = function(datas, options, callback) {

    console.log("updateTradings !!");

    console.log("total count is : " + datas.length);

    trading.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
    });

    callback(); // means ok and pass back 
}

mongooseLib.prototype.updateUSTradings = function(datas, options, callback) {

    console.log("updateUSTradings !!");

    console.log("total count is : " + datas.length);

    ustrading.insertMany(datas, function(err, doc) {
        if(err) {
            console.log(err);
            callback(err);
        }
    });

    callback(); // means ok and pass back 
}

// export a instance of mongooseLib
module.exports = new mongooseLib();