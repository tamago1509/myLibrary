var express = require('express');
var validate = require('../validate/user.validate');
var controller = require('../controllers/users.controllers');

//config multer
var multer  = require('multer')
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

var upload = multer({ dest: './public/uploads/' })

var router = express.Router();

router.get('/index', controller.index);

router.get('/:id/delete',controller.delete);

router.get('/:id/update',controller.update);

router.post('/:id/update', multerUploads, controller.postUpdate);

router.post('/index', multerUploads, 
	validate.postIndex,
	 controller.postIndex
	 );


module.exports = router;