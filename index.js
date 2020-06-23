var express = require('express');
var app = express();
var port= 5000;
var low= require('lowdb');
var FileSync= require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var bodyParser = require('body-parser');
var shortid = require('shortid');

var db= low(adapter);
db.defaults({ books: [], users:[] }).write();

app.set('view engine','pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({extended: true}));


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

app.get('/users/index',(req, res)=>{
	res.render('users/index',{
		users: db.get('users').value()
	})
})
app.get('/users/:id/delete',(req, res)=>{
	var deleteUser = req.params.id;
	db.get('users')
	.remove(user=> user.id == deleteUser)
	.write();
	res.redirect('/users/index');
})

app.get('/users/:id/update',(req, res)=>{
	res.render('users/update',{
		id: req.params.id
	})
})




app.post('/users/:id/update',(req, res)=>{
	var updateId = req.params.id;
	db.get('users')
	.find({ id: updateId})
	.assign({ name: req.body.name, email: req.body.email})
	.write();
	res.redirect('/users/index')
})


app.post('/users/index',(req, res)=>{
	req.body.id =shortid.generate();
	db.get('users').push(req.body).write();
	res.redirect('index')
})


app.post('/books/:id/update',(req, res)=>{
	var updateId = req.params.id;
	db.get('books').find({ id:updateId}).assign({ title : req.body.title }).write();
	res.redirect("/")
})




app.listen(port,()=>{
	console.log('There is a port at ' +port);
})