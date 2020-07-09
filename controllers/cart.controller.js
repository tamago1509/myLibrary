
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

	// Book.findById(bookId).then( findBook=>{
	// 	var updateContent = { 'title': findBook._id,  $inc: { 'count': 1 } }
	// 	var options = { multi: true, upsert: true, new: true, setDefaultsOnInsert: true };

	// 	Session.updateMany(
	// 	   {_id: sessionId},
	// 	    { "$set": {cart: updateContent} },
	// 	    options,
	// 	    function(err,numAffected) {
	// 	        if (err) throw err;
	// 	        console.log( "updated n docs: %s", 'ok' );
	// 	    }
	// 	);

			
	// 		res.redirect('/')


	// })
	
}