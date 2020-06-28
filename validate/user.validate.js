var db = require('../db');
module.exports.postIndex = function(req, res, next){
	var errors = [];

	if(!req.body.name){
		errors.push('Name is required.');
	}
	if(req.body.name.length > 30){
		errors.push('Name is over 30 characters, please check it');
	}
	if(!req.body.email){
		errors.push('Mail is required.');
	}
	if(errors.length){
		res.render('users/index',{
			users: db.get('users').value(),
			errors : errors,
			values: req.body
		})
		return;
	}
	next();
};