const express = require('express');

const router = express.Router();

const { createUser, updateUser, 
	userDetailById, findAllUsers, userDelete } = require('../controllers/user.controller');

const { adminRegister } = require('../controllers/admin.controller');

const { validateEmail, validatePassword } = require('../services/validations/user.validation');

const { validationToken, isAdmin } = require('../middlewares/authorization');

router.get('/user', validationToken, isAdmin, findAllUsers);
router.put('/user/:id', validationToken, updateUser);
router.get('/user/:id', validationToken, userDetailById);
router.post('/user', validateEmail, validatePassword, createUser);
router.delete('/user/:id', validationToken, isAdmin, userDelete);
router.post('/user/admin', validationToken, isAdmin, adminRegister);

module.exports = router;
