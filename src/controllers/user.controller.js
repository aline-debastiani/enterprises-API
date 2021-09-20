const { StatusCodes } = require('http-status-codes');
const userService = require('../services/user.service');

const createUser = async (req, res) => {
	try {
		const { fullName, email, password, birthDate, UF, city, schooling, role = 'User' } = req.body;
		if (role != 'User') throw new Error('Only Admin user can register a new admin');
		const newUser = await userService.registerUser({ fullName, email, password, birthDate, UF, city, schooling, role });
		res.status(StatusCodes.CREATED).json({ newUser });
	} catch (error) {
		if (error.message === 'User already registered') {
			res.status(StatusCodes.CONFLICT).json({ message: error.message });
		}
		if (error.message === 'Only Admin user can register a new admin') {
			res.status(StatusCodes.FORBIDDEN).json({ message: error.message });
		}
	}
};

const updateUser = async (req, res) => {
	try {
		const { body } = req;
  	const { id } = req.params;
		const { id: userId, role } = req.user;
		if (userId != id && role != 'Admin') throw new Error('Require Admin Role!');
		const updated = await userService.updateById(id, body, userId);
		return res.status(StatusCodes.OK).json(updated);
	} catch (error) {
		if (error.message === 'User does not exist') {
			res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
		}
		if (error.message === 'Require Admin Role!') {
			res.status(StatusCodes.FORBIDDEN).json({ message: error.message });
		}
	}
};

const userDetailById = async (req, res) => {
	try {
		const { id } = req.params;
		const { id: userId, role } = req.user;
		if (userId != id && role != 'Admin') throw new Error('Require Admin Role!');
		const detailsUser = await userService.userDetail(id);
		return res.status(StatusCodes.OK).json(detailsUser);
	} catch (error) {
		if (error.message === 'User does not exist') {
			res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
		}
		if (error.message === 'Require Admin Role!') {
			res.status(StatusCodes.FORBIDDEN).json({ message: error.message });
		}
	}
};

const findAllUsers = async (req, res) => {
	const { q } = req.query;
	try {
		const search = await userService.filterAll(q);
		return res.status(StatusCodes.OK).json(search);
	} catch (error) {
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
};

const userDelete = async (req,res) => {
	const { id } = req.params;
	try {
		await userService.deleteUser(id);
		return res.status(StatusCodes.NO_CONTENT).json({});
	} catch (error) {
		if (error.message === 'User does not exist') {
			res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
		}
		res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
	}
};

module.exports = {
	createUser,
	updateUser,
	userDetailById,
	findAllUsers,
	userDelete,
};
