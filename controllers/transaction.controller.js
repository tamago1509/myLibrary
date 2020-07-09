const mongoose = require('mongoose');
const Transaction = require('../models/transactions.model')
const User = require('../models/user.model')
const Book =  require('../models/books.model')
const Session = require('../models/books.model')


module.exports.create = async function(req, res){
	//lay user tu cookie
	let userId = req.signedCookies.userId;
	
	let users = await User.find();
	let books = await Book.find();
	let transactions = await Transaction.find();
	// let sessions = await Session.find();
	User.findOne( {_id : userId}).then(function(user){
		if(user.isAdmin){

			res.render('transactions/create',{
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

				res.render('transactions/create',{
					users: [user],
					books: [],
					borrows: wantedbooks,
					transactions: transactions,
					hide : true

				})
			})
		}
	})
		
		
		//check xem phải admin ko? nếu phải 
	

}

module.exports.postComplete = function(req, res){
	var completeId= req.params.id;
	let data =  req.body.isComplete ? true : false
	Transaction.findOneAndUpdate({_id: completeId},{isComplete: data},{
		returnOriginal: false
	},function(err){
		if(err)
			return handleError(err);
	})
	
	//redirect cần 1 tham số là 1 url
	res.redirect('/transactions/create') 
}
module.exports.postCreate = function(req, res){
	let data = {
		userName: req.body.userName,
		bookTitle: req.body.bookTitle,
		isComplete: false
	}

	Transaction.insertOne(data);
	res.render('create',{

	});
}