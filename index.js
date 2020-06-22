var express = require('express');
var app = express();
var port= 5000;
var low= require('lowdb');
var FileSync= require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');
var bodyParser = require('body-parser');

var db= low(adapter);
db.defaults({ books: [] }).write();

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
	db.get('books').push({
		id:db.get('books').value().length+1,
		title: req.body.title,
		desc: req.body.desc
	}).write();
	res.redirect('/'); //sua lai
})
// update sách

app.get('/books/:id/delete',(req, res)=>{

	var deleteId= req.params.id;
	db.get('books')
	.remove(book=>
		book.id == deleteId
	).write();
	var temp = db.get('books').value().map(book=>{
		if(book.id > deleteId){
			book.id--;
		}
		return book;
	})
	db.set('books',temp).write();

	res.redirect('/');
	
})
app.get('/books/:id/update',(req, res)=>{
	res.render('books/update')
	var updateId = parseInt(req.params.id);
	db.get('books').remove(book=> book.id ==updateId).write();
	db.get('books').push({
		id: updateId,
		title: req.body.title
	}).write();
	res.redirect('/books/index');
})	






app.listen(port,()=>{
	console.log('There is a port at ' +port);
})