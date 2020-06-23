var express = require('express');
var app = express();
var port= 5000;
var db = require('./db');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var userRoute = require('./router/users.route');



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




app.post('/books/:id/update',(req, res)=>{
	var updateId = req.params.id;
	db.get('books').find({ id:updateId}).assign({ title : req.body.title }).write();
	res.redirect("/")
})




app.listen(port,()=>{
	console.log('There is a port at ' +port);
})