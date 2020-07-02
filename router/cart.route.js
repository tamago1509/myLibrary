var express = require('express');
var controller = require('../controllers/cart.controller');

var router = express.Router();

router.get('/add/:id',controller.borrowBook);


module.exports = router;