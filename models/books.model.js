var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new mongoose.Schema({
	title: String,
	decs: String,
	img: String
})


var sessionSchema = new mongoose.Schema({
	cart: {
		title: { type: Schema.Types.ObjectId, ref: 'Book'},
		count: {type : Number, default : 0}
	}
})

var Session =  mongoose.model('Session', sessionSchema,'sessions');
var Book =  mongoose.model('Book', bookSchema,'books');





module.exports = Session;
module.exports = Book;