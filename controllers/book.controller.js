var mongoose = require('mongoose');

var Book = require('../models/books.model');

var cloudinary = require('cloudinary').v2;
var path = require('path')


module.exports.postIndex = async function(req, res){
	const DatauriParser = require('datauri/parser');
	const parser = new DatauriParser();
	const changeToBase64 = req => {
		let ext = req.file.originalname.split(".")
		ext = `.${ext.pop()}`
		console.log(ext)
		return parser.format(ext.toString(), req.file.buffer)
	} 

	if(req.file) {

		const base64 = changeToBase64(req).content;
		// console.log(req.file)
		// console.log(base64)
		cloudinary.uploader
		.upload(base64)
		.then((result) => {
			const newBook = new Book({
				title: req.body.title,
				decs: req.body.decs,
				image: result.url
			})
			return newBook.save()

		})
		.then(result => {
			res.redirect("/")
		})
		.catch((err) => res.status(400).json({
			messge: 'someting went wrong while processing your request',
			data: {
				err
			}
		}))
	}
};


// xóa sách

module.exports.getDelete = function(req, res){

	var deleteId= req.params.id;
	
	Book.findOneAndRemove({ _id : deleteId},function(err){
		if(err)
			return handleError(err);
	})
		
	res.redirect('/')
	
}

//update sách
module.exports.getUpdate = function(req, res){
	res.render('books/update', {
		id: req.params.id
	})
}

module.exports.postUpdate = function(req, res){
	var updateId = { _id : req.params.id };
	var updateContent = { title : req.body.title };
	Book.findOneAndUpdate(updateId , updateContent,{
		returnOriginal: false
	},function(err){
		if(err)
			return handleError(err);
	})

	res.redirect("/")
}

