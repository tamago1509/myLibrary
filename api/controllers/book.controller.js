var mongoose = require('mongoose');

var Book = require('../../models/books.model');


module.exports.index = async function(req, res){
	var books = await Book.find();
	res.json(books);
}

