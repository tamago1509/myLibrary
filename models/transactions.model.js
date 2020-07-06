var mongoose = require('mongoose');


var transactionSchema = new mongoose.Schema({
	userName: String,
	bookTitle: String,
	isComplete: Boolean
})

var Transaction =  mongoose.model('Transaction', transactionSchema,'transactions');

module.exports = Transaction;