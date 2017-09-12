
// 空氣品質監測網
// 回傳 JSON Data

const request = require('request');


request("https://taqm.epa.gov.tw/taqm/aqs.ashx?lang=tw&act=aqi-epa", function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var content = JSON.parse(body); // convert JSON 字串 to JSON object
        const dataList = content.Data;
        for(let i = 0; i< dataList.length; i++) {
            console.log(dataList[i].SiteName +" " + dataList[i].AQI);    
        }
    }
});
