
var bcrypt = require('bcrypt');
const User = require('../../models/user.model')



module.exports.login = async function(req, res){
	res.render('auth/login')
}


module.exports.postLogin = async function(req, res){
	var email = req.body.email;
	var password = req.body.password;

	var loginInfo = await User.create(req.body);

	res.json(loginInfo);
	

	// var user = await User.findOne({ email : email }).exec()
	
	// if(!user){
	// 	res.render('auth/login',
	// 	{
	// 		errors: ['User does not exist.'],
	// 		values: req.body
	// 	});
	// 	return;
	// }
	
	

	// //so snah pass
	// bcrypt.compare(password, user.password, function(err, result) {
	// 	// login trhanh cong
	// 	if(result){
			
	//     	res.cookie('userId', user._id,{

	//     		signed: true
	//     	});
	    	
	// 		res.redirect('/users/index');
	// 	} else { //login that bai
	// 			res.render('auth/login',
	// 			{
	// 				errors:['Wrong password.'],
	// 				values: req.body,
	// 			});
	// 			return;
	// 		}
	// 	})
	

	
}