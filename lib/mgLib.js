
// mongoose connection to mLab Database

'use strict';

// mongoose 4.11.11
var mongoose = require('mongoose');

// mongoose modal
var rate = require('./mongoose/rate.js'); // 載入 rate Model // 


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

mongooseLib.prototype.updateRate = function(query, data, options, callback) {

    console.log("updateRate !!");

    rate.findOneAndUpdate(query, data, options ,function(err, doc){
	    if(err) {
	        console.log(err);
	        callback(err, doc);
	    }
    });

    callback(); // means ok and pass back 
}

// export a instance of mongooseLib
module.exports = new mongooseLib();