require('dotenv').config();
var express = require('express');
var app = express();
var port= process.env.PORT || 5000;
var db = require('./db');
var bodyParser = require('body-parser');
var userRoute = require('./router/users.route');
var authRoute = require('./router/auth.route');
var transactionsRoute = require('./router/transactions.route');
var apiRoute = require('./api/routes/book.route');
var loginRoute = require('./api/routes/login.route');
var bookRoute = require('./router/books.route');
var cartRouter = require('./router/cart.route');
var transactionApiRouter = require('./api/routes/transactions.route');
var userApiRouter = require('./api/routes/user.route');
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

mongoose.connect(process.env.SECRETE_URL,{ useNewUrlParser: true })

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
app.use('/books', bookRoute);

app.use('/api/books', apiRoute);
app.use('/api/login', loginRoute);
app.use('/api/transactions', transactionApiRouter);
app.use('/api/users', userApiRouter);




app.get('/', cookieMiddlewares.countCookie, cookieControllers.index) 


app.use(function(err, req, res,_){
	res.render('error/500',{err});
})

app.listen(port,()=>{
	console.log('There is a port at ' +port);
})