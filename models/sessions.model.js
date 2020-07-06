const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Book = require('../models/books.model')




var sessionSchema = new mongoose.Schema({
	cart: {
		title: { type: Schema.Types.ObjectId, ref: 'Book'},
		count: Number
	}
})

var Session =  mongoose.model('Session', sessionSchema,'sessions');



module.exports = Session;