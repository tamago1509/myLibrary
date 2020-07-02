var shortId = require('shortId');
var db = require('../db');

module.exports.session= function(req, res, next){
	if(!req.signedCookies.sessionId){ //neu chua co thi tao
		var sessionId = shortId.generate()
		res.cookie("sessionId" , sessionId,{
			signed: true
		})

		db.get('sessions').push({
			"id": sessionId 
		}).write();

	} else {
		findSession = db.get('sessions')
		.find({ id: req.signedCookies.sessionId})
		.value();
		if(findSession.cart){
			var totalItems = Object.values(findSession.cart);
			var borrowedBooks = totalItems.reduce((sum, item)=>{
			 	return sum + item
			}, 0) 
			res.locals.borrowedBooks = borrowedBooks;
		}
	} 
	next();
		
}


