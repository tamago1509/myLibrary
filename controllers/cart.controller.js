
var mongoose = require('mongoose');

var Book = require('../models/books.model');
var Session = require('../models/session.model');
module.exports.borrowBook = async function(req, res){

	var bookId = req.params.id;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/')
		return;
	}
	
	Session.findById(sessionId).then( session => {
		let cart = session.cart || {}
		cart[bookId] = cart[bookId] == undefined ? 1 : cart[bookId] + 1;

		Session.findByIdAndUpdate(sessionId, {
			$set:{ cart: cart}
		}).then( session =>{
			res.redirect('/');
		}) 
	})

	
	
}