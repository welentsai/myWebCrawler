
// Google Finance
// Fetch S&P 500 Historical Data

const request = require('request');
const cheerio = require('cheerio');
var moment = require('moment');

const mgLib = require('./lib/mgLib.js');

//const uri = "https://finance.google.com/finance/historical?cid=626307&startdate=Jan+1,+2000&enddate=Jan+32,+2000";

const uri_1 = "https://finance.google.com/finance/historical?cid=626307&startdate=Jan+1%2C+1970&enddate=Dec+31%2C+1970&num=200";
const uri_2 = "https://finance.google.com/finance/historical?cid=626307&startdate=Jan+1%2C+1970&enddate=Dec+31%2C+1970&num=200&start=200";

const uri = "https://finance.google.com/finance/historical?cid=626307&startdate=Jan+1%2C+";

const tradingList = [];

mgLib.init();

function getDate(date) {
	//console.log(date);
	return moment(date, "MMM DD, YYYY").format('YYYY-MM-DD');
}

// 回傳一個 Promise task 
function getTradeInfo(year, delayInterval, startNo) {
  return new Promise(function(resolve, reject){
    setTimeout(() => { // 設定 Timer
      const _uri = uri + year + "&enddate=Dec+31%2C+" + year + "&num=200" + "&start=" + startNo;
      console.log(_uri);

      request.get(_uri, function (error, response, html) {
        if (!error && response.statusCode == 200) {
          let dom = cheerio.load(html);
          
          dom('table.historical_price').find('tr').each(function (i, element) {
            if(i > 0) { // 第一第資料是欄位資訊, 跳過
              let _trading = {
                date: getDate(dom(this).children().eq(0).text().trim()), // Date
                op: dom(this).children().eq(1).text().trim(), // Today Open Price
                th: dom(this).children().eq(2).text().trim(), // Today High
                tl: dom(this).children().eq(3).text().trim(), // Today Low
                cp: dom(this).children().eq(4).text().trim(), // Today Close Price
                vol: dom(this).children().eq(5).text().trim(), // Today Volumn
              };
              //console.log(_trading);
              //console.log("---------");
              tradingList.push(_trading);
            }
          });
          //console.log(_dataList);
          resolve();
        } else {
          reject(error);  
        }
      });
    }, delayInterval);

  });
}

const promises = []; // task list

// year done : 1970 ~ 1973

//for(let i = 0; i < dateL.length; i++) {
promises.push(getTradeInfo("2017", 1*500, "0"));  // push task into task list
promises.push(getTradeInfo("2017", 2*500, "200"));  // push task into task list

// for(let i = 0; i < 17; i++) {
//   let _idx = ('0' + i).slice(-2);
//   let yr = "20" + _idx ;
//   //console.log(yr);
//   promises.push(getTradeInfo(yr, (i+1)*500, "0"));  // push task into task list
//   promises.push(getTradeInfo(yr, (i+2)*500, "200"));  // push task into task list
// }

// 處理 Promise Tasks 結果(resolve/reject)
Promise.all(promises)
  .then(function(data) {
    // console.log(data);
    // for(let i = 0; i < tradingList.length; i++) {
    //   console.log(tradingList[i]);
    // }

    mgLib.updateUSTradings(tradingList, {upsert:true}, function(err) {
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