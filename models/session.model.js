var mongoose = require('mongoose');
const Schema = mongoose.Schema;



var sessionSchema = new mongoose.Schema({
	cart: Schema.Types.Mixed
})

var Session =  mongoose.model('Session', sessionSchema,'sessions');


module.exports = Session;