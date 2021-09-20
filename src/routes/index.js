const express = require('express');

const router = express.Router();

const user = require('./user');
const login = require('./login');
const company = require('./company');

router.use('/', user);
router.use('/', login);
router.use('/', company);

module.exports = router;
