
var nodemailer = require('nodemailer');


var bcrypt = require('bcrypt');
var db = require('../db');




module.exports.login = function(req, res){

	res.render('auth/login')

}

module.exports.postLogin = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	

	var user = db.get('users').find({ email: email }).value();

	var transporter = nodemailer.createTransport({
	    host: "smtp.ethereal.email",
	    port: 587,
	    secure: false,
	  	service: 'gmail',
	 	auth: {
		    user: 'dtngoc.nhat3k53.ftu@gmail.com',
		    pass: process.env.API_SECRETE
	  	}
	});

	var mailOptions = {
	  from: 'dtngoc.nhat3k53.ftu@gmail.com',
	  to: user.email,
	  subject: 'Login failed!',
	  text: 'You login failed 2 times. Please check your account!!!'
	};
	if(!user){
		res.render('auth/login',
		{
			errors: ['User does not exist.'],
			values: req.body
		});
		return;
	}
	

	bcrypt.compare(password, user.password, function(err, result) {
		// login trhanh cong
		if(result){
	    	res.cookie('userId', user.id,{
	    		signed: true
	    	});
	    	res.clearCookie('times')
			res.redirect('/users/index');
		} else { //login that bai

			let wrongLoginCount= req.cookies.times;
			
			if(!wrongLoginCount){  //undefined 

				res.cookie('times', 1)
				res.render('auth/login',
				{
					errors:['Wrong password.'],
					values: req.body,
				});

			} else { // co wrongLoginCount

				let errors = []
				let hide = false

				// check loginCount
				if(wrongLoginCount < 3){

					wrongLoginCount++
					errors = ['Wrong password.']
					res.cookie('times', wrongLoginCount)

				} else {

					errors = ['Wrong pass 4 times.']
					hide = true
					transporter.sendMail(mailOptions, function(error, info){
					  if (error) {
					   console.log('Mail is not sent')
					  } else {
					  	console.log('Mail sent')
					  }
					});

				}

				// render
				res.render('auth/login',{
					errors: errors,
					values: req.body,
					hide: hide
				});
			 	return;
			}
		}
		
	});
	

	
}