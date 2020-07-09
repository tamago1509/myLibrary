
var mongoose = require('mongoose');
var User = require('../../models/user.model')
mongoose.connect(process.env.SECRETE_URL)


module.exports.index= function(req, res){
	
User.find().then(function(users){
	res.json({
		users: users
	})
})
}



module.exports.postIndex = function(req, res){
	//check xem email ton tai chua? nếu tồn tại thì bắt nhập lại mail khác
	//nếu không thì lưu vào database
	let email = req.body.email;


	User.findOne({ email: email}).then(function(userEmail){
		if(userEmail){
			let errors = ["Email has been existed!"]
			User.find().then(function(users){
			res.json({
				errors: errors,
				users: users
			})

			})
		} else {
		// store into db
			bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
	    // Store hash in your password DB.
	    		if(req.file) {

					const base64 = changeToBase64(req).content;
					 // console.log(req.file)
					 // console.log(base64)
					cloudinary.uploader
					.upload(base64)
					.then((result) => {
						const newUser = new User({
							name: req.body.name,
							email: req.body.email,
							password: hash,
							avatarURL: result.url
						})
						return newUser.save()

					}).then(result => {
						res.redirect("/users/index")
					})
					.catch((err) => res.status(400).json({
						messge: 'someting went wrong while processing your request',
						data: {
							err
						}
					}))
					
				}
			});
		}
	})
	

}	
