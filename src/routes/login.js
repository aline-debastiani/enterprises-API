const express = require('express');

const router = express.Router();

const { postLogin } = require('../controllers/login.controller');

const { validatePassword } = require('../services/validations/user.validation');

router.post('/login', validatePassword, postLogin);

module.exports = router;
