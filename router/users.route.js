var express = require('express');
var router = express.Router();

var controller = require('../controllers/users.controllers');


router.get('/index',controller.index);

router.get('/:id/delete',controller.delete);

router.get('/:id/update',controller.update);

router.post('/:id/update', controller.postUpdate);

router.post('/index',controller.postIndex);

module.exports = router;