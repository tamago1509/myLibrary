require("dotenv").config();
var express = require('express');
var validate = require('../validate/user.validate');
var db = require("../db");
const bcrypt = require('bcrypt');
const saltRounds = 10;
var cloudinary = require('cloudinary').v2;
var path = require('path')




//multer and config
const multer  = require('multer')
const storage = multer.memoryStorage();
//


//data uri 
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
//
const changeToBase64 = req => {
	let ext = req.file.originalname.split(".")
	ext = `.${ext.pop()}`
	return parser.format(ext.toString(), req.file.buffer)
}

cloudinary.config({ 
  cloud_name: 'ngocduongflyinthesky1509', 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});

const multerUploads = multer({ storage }).single('image');

//config mongoose
var mongoose = require('mongoose');
var User = require('../models/user.model')
mongoose.connect(process.env.SECRETE_URL)





module.exports.index= function(req, res){
	
	User.find().then(function(users){
		res.render('users/index',{
			users: users
		})
	})
}

module.exports.delete= function(req, res){
	var deleteUser = req.params.id;
	User.findOneAndDelete({_id : deleteUser},function(err){
		if(err)
			return handleError(err);
	})
	res.redirect('/users/index');
}



module.exports.update = async function(req, res){
	var updateUser = await User.findById(req.params.id);
	res.render('users/update',{
		id: req.params.id,
		name: updateUser.name,
		email:updateUser.email

	})
}

module.exports.postUpdate = async function(req, res){
	const DatauriParser = require('datauri/parser');
	const parser = new DatauriParser();
	const changeToBase64 = req => {
	let ext = req.file.originalname.split(".")
	ext = `.${ext.pop()}`
	console.log(ext)
	return parser.format(ext.toString(), req.file.buffer)
	}

	if(req.file) {

		const base64 = changeToBase64(req).content;
		 
		var avatarURL = cloudinary.uploader
		.upload(base64)
		.then((result) => {
		var updateId = { _id :req.params.id};
		var updateContent = { name: req.body.name, email: req.body.email, avatarURL: result.url}
		User.findOneAndUpdate(updateId , updateContent,{
			returnOriginal: false
		},function(err){
			if(err)
				return handleError(err);
		}).then(result => {
			res.redirect("/users/index")
		}).catch((err) => res.status(400).json({
			messge: 'someting went wrong while processing your request',
			data: {
				err
			}
		}))
		})
		
	}else{
		var updateUser = await User.findById(req.params.id);
		var updateId = { _id :req.params.id};
		var updateContent = { name: req.body.name || updateUser.name,
		email: req.body.email || updateUser.email,
		avatarURL:updateUser.avatarURL}
		User.findOneAndUpdate(updateId , updateContent,{
			returnOriginal: false
		},function(err){
			if(err)
				return handleError(err);
		}).then(result => {
			res.redirect("/users/index")
		}).catch((err) => res.status(400).json({
			messge: 'someting went wrong while processing your request',
			data: {
				err
			}
		})

	)}


}
		
	



