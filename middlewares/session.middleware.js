// var shortId = require('shortId');
const Session = require('../models/sessions.model')
var Book = require('../models/books.model');



module.exports.session= async function(req, res, next){
	if(!req.signedCookies.sessionId){ //neu chua co thi tao

		let newSession = new Session({$inc: {'count' : 0}})
		let currentSession = await newSession.save()
		var sessionId = currentSession._id

		res.cookie("sessionId" , sessionId,{
			signed: true
		})


	} else {
		let findSession = await Session.findOne({ _id : req.signedCookies.sessionId })
		if(findSession.cart){

			var totalItems = Object.values(findSession.cart);  //  [2,3,1]
			var borrowedBooks = totalItems.reduce((sum, item)=>{
			 	return sum + item
			}, 0) 
			
			res.locals.borrowedBooks = borrowedBooks;
		}
	} 
	next();
		
}


