module.exports.countCookie= function(req, res, next){

	
	
	if(
		req.cookies.cookieName 
		&& req.cookies.cookieName != ""
	){
		//nếu có thì đếm 

		let count = req.cookies.counter //0
		count++

		// console.log(req.cookies)
		console.log(count)
		res.cookie('counter', count)
	} else {  	//nếu không có thì tạo
	 	//create cookie
		res.cookie('cookieName', "Welcome");
		res.cookie('counter', "0")
	}

	next()


	// //check cái cookieName
	//lấy counter từ cookie 
	// //nếu ko có cookie name thì next
	// //nếu có cookieName thì tăng biến counter để dếm
	// //sau đó ++counter rồi next 
	//lưu count vào cookie lại
}