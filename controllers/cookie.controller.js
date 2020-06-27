var db = require('../db');
var express = require('express');
var app = express();


module.exports.index = function(req, res){


	res.render('books/index', {
		books : db.get("books").value()
	})

}