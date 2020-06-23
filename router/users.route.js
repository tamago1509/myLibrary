var express = require('express');
var router = express.Router();
var db = require('../db');
var shortid =require('shortid');

router.get('/index',(req, res)=>{
	res.render('users/index',{
		users: db.get('users').value()
	})
})
router.get('/:id/delete',(req, res)=>{
	var deleteUser = req.params.id;
	db.get('users')
	.remove(user=> user.id == deleteUser)
	.write();
	res.redirect('/index');
})

router.get('/:id/update',(req, res)=>{
	res.render('users/update',{
		id: req.params.id
	})
})




router.post('/:id/update',(req, res)=>{
	var updateId = req.params.id;
	db.get('users')
	.find({ id: updateId})
	.assign({ name: req.body.name, email: req.body.email})
	.write();
	res.redirect('/index')
})


router.post('/index',(req, res)=>{
	req.body.id =shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('index')
})

module.exports = router;