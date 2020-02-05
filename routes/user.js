'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMidelware = multipart({ uploadDir: './uploads' })

router.get('/home', UserController.home);
router.get('/test', UserController.test);
router.post('/save-user', UserController.saveUser);
router.get('/user/:id?', UserController.getUser);
router.get('/list', UserController.userList);
router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);
router.post('/upload/:id', multipartMidelware, UserController.uploadImage);
router.get('/get-image/:image', UserController.getImageFile);


module.exports = router;
