var db = require('../db');
var express = require('express');
var app = express();


module.exports.index = function(req, res){

	var page = parseInt(req.query.page)||1;
	var perPage = 6;
	var start = (page -1)*perPage;
	var end = page *perPage;
	console.log(page)
	var pages = [1,2,3,4,5,6,7,8]

	res.render('books/index', {
		books : db.get('books').value().slice(start, end),
		nPage : pages.length,  //có bao nhiêu pages tất cả
		current : page,  //hiện tại mình ở đâu
		nBtn : 1  // muốn mỗi bên có bao nhiêu nút
	})
	//https://picsum.photos/400/300

}