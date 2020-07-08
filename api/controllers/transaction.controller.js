const mongoose = require('mongoose');
const Transaction = require('../../models/transactions.model')
const User = require('../../models/user.model')
const Book =  require('../../models/books.model')
const Session = require('../../models/books.model')


module.exports.create = async (req, res)=>{
	let userId = req.signedCookies.userId;
	
	let users = await User.find();
	let books = await Book.find();
	let transactions = await Transaction.find();
	// let sessions = await Session.find();
	User.findOne( {_id : userId}).then(function(user){
		if(user.isAdmin){

			res.json({
				users: users,
				books: books,
				transactions: transactions,
				hide: false
			})
		} else {

		//nếu không phải thì chỉ hiện tên user thôi, không hiện nút borow, ko hiện link complete
		// ....
			var sessionId = req.signedCookies.sessionId;
			Session.findOne({ _id: sessionId})
			.then(session => {
				var wantedbooks = session.cart || {} ; // an object
			
				transactions = transactions.filter((trans) => trans.userName == user.name )

				res.json({
					users: [user],
					books: [],
					borrows: wantedbooks,
					transactions: transactions,
					hide : true

				})
			})
		}
	})
		
}