var express = require('express');

var controller = require('../controllers/book.controller');
var router = express.Router();
var multer  = require('multer')
const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).single('image');

var upload = multer({ dest: './public/uploads/' })

router.post('/index', multerUploads,controller.postIndex);

router.get('/:id/delete', controller.getDelete);

router.get('/:id/update', controller.getUpdate);

router.post('/:id/update', controller.postUpdate);

module.exports = router;