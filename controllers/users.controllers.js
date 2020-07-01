require("dotenv").config();
var express = require('express');
var multer  = require('multer')
var validate = require('../validate/user.validate');
var db = require("../db");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var shortId = require('shortId');
var cloudinary = require('cloudinary').v2;

var upload = multer({ dest: './public/uploads/' })


cloudinary.config({ 
  cloud_name: 'ngocduongflyinthesky1509', 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

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

// handle sign up
module.exports.postIndex = function(req, res){
	//check xem email ton tai chua? nếu tồn tại thì bắt nhập lại mail khác
	//nếu không thì lưu vào database
	let email = req.body.email;
	
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	var file = req.body.avatar;
	
	cloudinary.uploader.upload("./public/" + file , function(error, result){
		console.log(result, error); 
	});

	var userEmail = db.get('users').find({ email: email}).value();
	if(userEmail){

		let errors = ["Email has been existed!"]
		res.render('users/index',{
			errors: errors,
			users: db.get('users').value()
		})
	} else {
	// store into db
		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    // Store hash in your password DB.
    		db.get('users').push({
    			id: shortId.generate(),
    			name: req.body.name,
    			email: req.body.email,
    			password: hash,
    			avatarURL: req.body.avatar
    		}).write();
			res.redirect('index')
		});
	}

}	


module.exports.update = function(req, res){
	res.render('users/update',{
		id: req.params.id,
	})
}

module.exports.postUpdate = function(req, res){
	var updateId = req.params.id;
	req.body.avatar = req.file.path.split('\\').slice(1).join('/');
	var file = req.body.avatar;
	console.log(file);



	cloudinary
	.uploader
	.upload("./public/" + file, function(err, result) {
        console.log(result);


		var user = db.get('users')
		.find({ id: updateId})
		.assign({ name: req.body.name, 
					email: req.body.email,
					avatarURL: file
					})
		.write();

		res.redirect('/users/index')
	});
	
}
		
	



