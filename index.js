require('dotenv').config();
console.log(process.env.SECTION_SECRETE)
var express = require('express');
var app = express();
var port= 5000;
var db = require('./db');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var userRoute = require('./router/users.route');
var authRoute = require('./router/auth.route');
var transactionsRoute = require('./router/transactions.route');
var favicon = require('serve-favicon');
var path = require('path')
var cookieParser = require('cookie-parser')




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

//routing
app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/auth', authRoute);
app.use('/transactions', transactionsRoute);




app.get('/', cookieMiddlewares.countCookie, cookieControllers.index) 

app.post('/books/index',(req, res)=>{
	req.body.id = shortid.generate();
	db.get('books').push(req.body).write();
	res.redirect('/'); 
})
// update sách

app.get('/books/:id/delete',(req, res)=>{

	var deleteId= req.params.id;
	db.get('books')
	.remove(book=>
		book.id == deleteId
	).write();
	res.redirect('/');
	
})
app.get('/books/:id/update',(req, res)=>{
	//
	res.render('books/update', {
		id: req.params.id
	})

})	





app.post('/books/:id/update',(req, res)=>{
	var updateId = req.params.id;
	db.get('books').find({ id:updateId}).assign({ title : req.body.title }).write();
	res.redirect("/")
})




app.listen(port,()=>{
	console.log('There is a port at ' +port);
})