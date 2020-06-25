var express = require('express');
var validate = require('../validate/user.validate');
var controller = require('../controllers/users.controllers');

var router = express.Router();

router.get('/index',controller.index);

router.get('/:id/delete',controller.delete);

router.get('/:id/update',controller.update);

router.post('/:id/update', controller.postUpdate);

router.post('/index', validate.postIndex, controller.postIndex);


module.exports = router;