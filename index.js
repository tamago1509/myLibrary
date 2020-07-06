require('dotenv').config();
var express = require('express');
var app = express();
var port= 5000;
var db = require('./db');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var userRoute = require('./router/users.route');
var authRoute = require('./router/auth.route');
var transactionsRoute = require('./router/transactions.route');
var cartRouter = require('./router/cart.route');
var favicon = require('serve-favicon');
var path = require('path')
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var Book= require('./models/books.model');




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
	console.log(ext)
	return parser.format(ext.toString(), req.file.buffer)
}



//cloudinary and config
var cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'ngocduongflyinthesky1509', 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});
//




//multer middlewares
const multerUploads = multer({ storage }).single('image');
//




// app.post('/books/index', multerUploads, (req, res) => {
// 	if(req.file) {
// 		const file = req.file;
// 		uploader
// 		.upload(file)
// 		.then((result) => {
// 			const image = result.url;
// 			res.status(200).json({
// 			messge: 'Your image has been uploded successfully to cloudinary',
// 			data: {
// 				image
// 			}
// 		})
// 		}).catch((err) => res.status(400).json({
// 			messge: 'someting went wrong while processing your request',
// 			data: {
// 				err
// 			}
// 		}))
// 	}
// });

mongoose.connect(process.env.SECRETE_URL)

//config
var iconPath= path.join(__dirname, "public","favicon.ico")
var options = {
	maxAge: 200 *60 *60 *24 *1000
}

// import controllers
var cookieControllers = require('./controllers/cookie.controller');
var transactionsControllers = require('./controllers/transaction.controller');

//import middlewares
var cookieMiddlewares= require('./middlewares/cookie.middlewares')
var authMiddleware= require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware');




app.use(favicon(iconPath, options));
app.use(favicon(path.join(__dirname, 'public', 'images' , 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(favicon(__dirname + '/public/images/favicon.ico'));

//set view engine
app.set('view engine','pug');
app.set('views', './views');

//body-middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(process.env.SECTION_SECRETE))
app.use(sessionMiddleware.session);

//routing
app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/transactions', authMiddleware.requireAuth, transactionsRoute);
app.use('/cart', cartRouter);




app.get('/', cookieMiddlewares.countCookie, cookieControllers.index) 




//tao book

app.post('/books/index', multerUploads, (req, res) => {
	if(req.file) {

		const base64 = changeToBase64(req).content;
		// console.log(req.file)
		// console.log(base64)
		cloudinary.uploader
		.upload(base64)
		.then((result) => {
			const newBook = new Book({
				title: req.body.title,
				decs: req.body.decs,
				img: result.url
			})
			return newBook.save()

		})
		.then(result => {
			res.redirect("/")
		})
		.catch((err) => res.status(400).json({
			messge: 'someting went wrong while processing your request',
			data: {
				err
			}
		}))
	}
});

// app.post('/books/index',(req, res)=>{
	
// 	Book.insertMany(req.body,(err)=>{
// 		console.log(err);
// 	});
// 	res.redirect('/'); 
// })






// xóa sách

app.get('/books/:id/delete',(req, res)=>{

	var deleteId= req.params.id;
	
	Book.findOneAndRemove({ _id : deleteId},function(err){
		if(err)
			return handleError(err);
	})

			
	res.redirect('/')
	
})
//update sách
app.get('/books/:id/update',(req, res)=>{
	//

	res.render('books/update', {
		id: req.params.id
	})

})	





app.post('/books/:id/update',(req, res)=>{
	var updateId = { _id : req.params.id };
	var updateContent = { title : req.body.title };
	Book.findOneAndUpdate(updateId , updateContent,{
		returnOriginal: false
	},function(err){
		if(err)
			return handleError(err);
	})

	res.redirect("/")
})




app.listen(port,()=>{
	console.log('There is a port at ' +port);
})