// var md5 = require('md5');

var bcrypt = require('bcrypt');
var db = require('../db');




module.exports.login = function(req, res){
	res.render('auth/login')

}

module.exports.postLogin = function(req, res){
	var email = req.body.email;
	var password = req.body.password;
	

	var user = db.get('users').find({ email: email }).value();

	if(!user){
		res.render('auth/login',
		{
			errors: ['User does not exist.'],
			values: req.body
		});
		return;
	}
	

	bcrypt.compare(password, user.password, function(err, result) {
		
		if(result){
	    	res.cookie('userId', user.id,{
	    		signed: true
	    	});
			res.redirect('/users/index');
		} else {

			let wrongLoginCount= req.cookies.times;
			
			if(!wrongLoginCount){  //undefined 
				res.cookie('times', 0)
				res.render('auth/login',
				{
					errors:['Wrong password.'],
					values: req.body,
				});
			} else { // co wrongLoginCount
				let errors = []
				let hide = false
				// check loginCount
				if(wrongLoginCount < 2){
					wrongLoginCount++
					errors = ['Wrong password.']
					res.cookie('times', wrongLoginCount)
				} else {
					errors = ['Wrong pass 4 times.']
					hide = true
				}

				//render
				res.render('auth/login',
					{
						errors: errors,
						values: req.body,
						hide : hide
					});
				return;
			}
		}
		
	});
	

	
}