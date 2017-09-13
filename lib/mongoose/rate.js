// 客戶資料 Schema

var mongoose = require('mongoose');

var rateSchema = new mongoose.Schema({
    date: Date,
    bank: String
    currency: String,
    cashBuy: Number,
    cashSell: Number,
    sightBuy: Number,
    sightSell: Number,
}, {collection: 'rates'});

module.exports = mongoose.model('rate', rateSchema);