const { StatusCodes } = require('http-status-codes');
const companyService = require('../services/company.service');

const createCompany = async (req, res) => {
	try {
		const { name, area, foundationYear, description, director } = req.body;
		const newCompany = await companyService.registerCompany({ name, area, foundationYear, description, director });
		res.status(StatusCodes.CREATED).json(newCompany);
	} catch (error) {
		if (error.message === 'Company already registered') {
			return res.status(StatusCodes.CONFLICT).json({ message: error.message });
		}
	}
};

const updateCompany = async (req, res) => {
	try {
		const { body } = req;
  	const { id } = req.params;
		const updated = await companyService.updateById(id, body);
		return res.status(StatusCodes.OK).json(updated);
	} catch (error) {
		if (error.message === 'Company does not exist') {
			res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
		}
		res.status(StatusCodes.SERVICE_UNAVAILABLE).json({ message: error.message });
	}
};

const findAllCompanies = async (req, res) => {
	const { q } = req.query;
	try {
		const search = await companyService.filterAll(q);
		return res.status(StatusCodes.OK).json(search);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
};

const companyDetailById = async (req, res) => {
	try {
		const { id } = req.params;
		const { id: userId } = req.user;
		const detailCompany = await companyService.companyDetail(id, userId);
		return res.status(StatusCodes.OK).json(detailCompany);
	} catch (error) {
		if (error.message === 'Company does not exist') {
			res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
		}
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
};

const companyDelete = async (req,res) => {
	const { id } = req.params;
	try {
		await companyService.deleteCompany(id);
		return res.status(StatusCodes.NO_CONTENT).json({});
	} catch (error) {
		if (error.message === 'Company does not exist') {
			res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
		}
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
};

module.exports = {
	createCompany,
	updateCompany,
	findAllCompanies,
	companyDetailById,
	companyDelete,
};
