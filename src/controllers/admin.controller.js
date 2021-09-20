const { StatusCodes } = require('http-status-codes');
const userService = require('../services/user.service');

const adminRegister = async (req, res) => {
	try {
	const { fullName, email, password, birthDate, UF, city, schooling, role } = req.body;
	const newUser = await userService.registerUser({ fullName, email, password, birthDate, UF, city, schooling, role });
	return res.status(StatusCodes.CREATED).json({ newUser });
	} catch (error) {
	return res.status(StatusCodes.CONFLICT).json({ message: error.message });
	}
	};
	
	module.exports = { adminRegister };