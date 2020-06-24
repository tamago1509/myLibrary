var express = require('express');
var app = express();
var port= 5000;
var db = require('./db');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var userRoute = require('./router/users.route');
var favicon = require('serve-favicon');
var path = require('path')
var iconPath= path.join(__dirname, "public","favicon.ico")
var options = {
	maxAge: 200 *60 *60 *24 *1000
}

app.use(favicon(iconPath, options));
app.use(favicon(path.join(__dirname, 'public', 'images' , 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
// app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.set('view engine','pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use('/users', userRoute);



app.get('/',(req, res)=>{
	res.render('books/index', {
		books : db.get("books").value()
	})
})

app.post('/books/index',(req, res)=>{
	req.body.id = shortid.generate();
	db.get('books').push(req.body).write();
	res.redirect('/'); //sua lai
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


app.get('/transactions/create',(req, res)=>{
	res.render('transactions/create',{
		users: db.get('users').value(),
		books: db.get('books').value(),
		transactions: db.get('transactions').value()

	})
})
app.get('/transactions/:id/complete',(req, res)=>{
	res.render('transactions/complete',{
		id: req.params.id
	})
})
app.post('/transactions/:id/complete',(req, res)=>{
	var completeId= req.params.id;
	let data =  req.body.isComplete ? true : false
	db.get('transactions').find({id: completeId}).assign({isComplete: data}).write();
	
	//redirect cần 1 tham số là 1 url
	res.redirect('/transactions/create') 
})

app.post('/transactions/create',(req, res)=>{
	let data = {
		id:shortid.generate(),
		userId: req.body.userId,
		bookId: req.body.bookId,
		isComplete: false
	}
	db.get('transactions').push(data).write();
	res.redirect('create');
})
app.post('/books/:id/update',(req, res)=>{
	var updateId = req.params.id;
	db.get('books').find({ id:updateId}).assign({ title : req.body.title }).write();
	res.redirect("/")
})




app.listen(port,()=>{
	console.log('There is a port at ' +port);
})