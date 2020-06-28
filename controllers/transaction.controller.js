var db = require("../db");
var shortid =require('shortid');


module.exports.create = function(req, res){
	//lay user tu cookie
	let userId = req.cookies.userId;
	let user = db.get('users').find({ id: userId}).value()
	
	
	//check xem phải admin ko? nếu phải 
	if(user.isAdmin){

		res.render('transactions/create',{
			users: db.get('users').value(),
			books: db.get('books').value(),
			transactions: db.get('transactions').value(),
			hide: false
		})
	} else {

	//nếu không phải thì chỉ hiện tên user thôi, không hiện nút borow, ko hiện link complete
	// ....
		let transactions = db.get("transactions").value()
		transactions = transactions.filter((trans) => trans.userName == user.name )
		// console.log(transactions)
		res.render('transactions/create',{
			users: [user],
			books: [],
			transactions: transactions,
			hide : true

		})

	}

}

module.exports.postComplete = function(req, res){
	var completeId= req.params.id;
	let data =  req.body.isComplete ? true : false
	db.get('transactions').find({id: completeId}).assign({isComplete: data}).write();
	
	//redirect cần 1 tham số là 1 url
	res.redirect('/transactions/create') 
}
module.exports.postCreate = function(req, res){
	let data = {
		id:shortid.generate(),
		userName: req.body.userName,
		bookTitle: req.body.bookTitle,
		isComplete: false
	}

	db.get('transactions').push(data).write();
	res.render('create',{

	});
}