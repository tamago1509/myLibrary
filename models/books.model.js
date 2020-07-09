var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new mongoose.Schema({
	title: String,
	decs: String,
	img: String
})



var Book =  mongoose.model('Book', bookSchema,'books');





module.exports = Book;