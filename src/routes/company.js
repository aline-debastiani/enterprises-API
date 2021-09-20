const express = require('express');

const router = express.Router();

const { createCompany, updateCompany,
	 findAllCompanies, companyDetailById, companyDelete } = require('../controllers/company.controller');

const { validateCompany } = require('../services/validations/company.validation');

const { validationToken, isAdmin } = require('../middlewares/authorization');

router.get('/company', validationToken, findAllCompanies);
router.put('/company/:id', validationToken, isAdmin, updateCompany);
router.get('/company/:id', validationToken, companyDetailById);
router.post('/company', validateCompany, validationToken, isAdmin, createCompany);
router.delete('/company/:id', validationToken, isAdmin, companyDelete);

module.exports = router;
