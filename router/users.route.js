var express = require('express');
var multer  = require('multer')
var validate = require('../validate/user.validate');
var controller = require('../controllers/users.controllers');

var upload = multer({ dest: './public/uploads/' })

var router = express.Router();

router.get('/index', controller.index);

router.get('/:id/delete',controller.delete);

router.get('/:id/update',controller.update);

router.post('/:id/update', upload.single('avatar'), controller.postUpdate);

router.post('/index', upload.single('avatar'), 
	validate.postIndex,
	 controller.postIndex
	 );


module.exports = router;