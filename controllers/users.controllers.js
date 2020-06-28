
var db = require("../db");
var shortid =require('shortid');

module.exports.index= function(req, res){
	res.render('users/index',{
		users: db.get('users').value()
	})
}

module.exports.delete= function(req, res){
	var deleteUser = req.params.id;
	db.get('users')
	.remove(user=> user.id == deleteUser)
	.write();
	res.redirect('/users/index');
}
module.exports.update = function(req, res){
	res.render('users/update',{
		id: req.params.id
	})
}
module.exports.postUpdate = function(req, res){
	var updateId = req.params.id;
	db.get('users')
	.find({ id: updateId})
	.assign({ name: req.body.name, email: req.body.email})
	.write();
	res.redirect('/users/index')
}

// handle sign up
module.exports.postIndex = function(req, res){
	//check xem email ton tai chua? nếu tồn tại thì bắt nhập lại mail khác
	//nếu không thì lưu vào database
	let email = req.body.email;

	var userEmail = db.get('users').find({ email: email}).value();
	if(userEmail){

		let errors = ["Email has been existed!"]
		res.render('users/index',{
			errors: errors,
			users: db.get('users').value()
		})
	} else {
	// store into db
		req.body.id =shortid.generate();
		db.get('users').push(req.body).write();
		res.redirect('index')
	}
}
