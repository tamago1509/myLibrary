
var db = require("../db");
var shortid =require('shortid');

module.exports.index=function(req, res){
	res.render('users/index',{
		users: db.get('users').value()
	})
}

module.exports.delete=function(req, res){
	var deleteUser = req.params.id;
	db.get('users')
	.remove(user=> user.id == deleteUser)
	.write();
	res.redirect('/index');
}
module.exports.update = function(req, res){
	res.render('users/update',{
		id: req.params.id
	})
}
module.exports.postUpdate =function(req, res){
	var updateId = req.params.id;
	db.get('users')
	.find({ id: updateId})
	.assign({ name: req.body.name, email: req.body.email})
	.write();
	res.redirect('/index')
}
module.exports.postIndex =function(req, res){
	req.body.id =shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('index')
}