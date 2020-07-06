
var mongoose = require('mongoose');
var Session = require('../models/sessions.model');
var Book = require('../models/books.model');
module.exports.borrowBook = async function(req, res){

	var bookId = req.params.id;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/')
		return;
	}
	



	var findBook = await Book.findOne({ _id: bookId});
	var updateContent = { 'title': findBook.id,  count }

	Session.updateMany(
	   {_id: sessionId},
	    { "$set": {cart: updateContent} },
	    { "multi": true },
	    function(err,numAffected) {
	        if (err) throw err;
	        console.log( "updated n docs: %s", 'ok' );
	    }
	);

		
		 res.redirect('/')


}