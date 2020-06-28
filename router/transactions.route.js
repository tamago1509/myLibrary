
var express = require('express');


var controller = require('../controllers/transaction.controller');

var router = express.Router();

router.get('/create',controller.create)
router.post('/:id/complete',(req, res)=> controller.postComplete)

router.post('/create',(req, res)=> controller.postLogin)

module.exports = router;