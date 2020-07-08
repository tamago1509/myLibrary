
var mongoose = require('mongoose');

var Book = require('../models/books.model');
var Session = require('../models/books.model');
module.exports.borrowBook = async function(req, res){

	var bookId = req.params.id;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/')
		return;
	}
	

	Book.findById(bookId).then( findBook=>{
		var updateContent = { 'title': findBook._id,  $inc: { 'count': 1 } }

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


	})
	
}