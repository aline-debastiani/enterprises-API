const companyService = require('../company.service');
const { StatusCodes } = require('http-status-codes');

const validateCompany = async (req, res, next) => {
	const { name } = req.body;
	const companyExists = await companyService.findCompanyByName(name);
	if (companyExists) {
		return res.status(StatusCodes.CONFLICT).json({ message: 'Company already registered' });
	}
	next();
};

module.exports = {
	validateCompany,
};
