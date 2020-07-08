// var shortId = require('shortId');
const Session = require('../models/books.model')
var Book = require('../models/books.model');



module.exports.session= async function(req, res, next){
	if(!req.signedCookies.sessionId){ //neu chua co thi tao

		let newSession = new Session()
		let currentSession = await newSession.save()
		var sessionId = currentSession._id

		res.cookie("sessionId" , sessionId,{
			signed: true
		})


	} else {
		Session.findById( req.signedCookies.sessionId ).then(findSession=>{
			
			if(findSession.cart){

			var totalItems = Object.values(findSession.cart);  //  [2,3,1]
			var borrowedBooks = totalItems.reduce((sum, item)=>{
			 	return sum + item
			}, 0) 
			
			res.locals.borrowedBooks = borrowedBooks;
		} else(
			console.log('Cant find cart'))
	})
	}	
	next();
		
}


