
var db = require('../db');
module.exports.borrowBook =function(req, res){

	var bookId = req.params.id;
	var sessionId = req.signedCookies.sessionId;

	if(!sessionId){
		res.redirect('/')
		return;
	}
	
	var findBook = db.get('books').find({ id: bookId}).value();
	var count = db.get('sessions').find({
		'id':sessionId
	})
	.get('cart.' + findBook.title, 0)
	.value(); 
 	db.get('sessions').find({
	 	'id': sessionId
		 })
		 .set('cart.' + findBook.title, count+1)
		 .write();
		 res.redirect('/')


}