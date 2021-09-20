const userService = require('../user.service');
const { StatusCodes } = require('http-status-codes');

const validateEmail = async (req, res, next) => {
	const { email } = req.body;
  const emailExists = await userService.findUserByEmail(email);
	if (emailExists) {
		return res.status(StatusCodes.CONFLICT).json({ message: 'User already registered' });
	}
	next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (password === '') {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"password" is not allowed to be empty' });
  }
  if (password === undefined) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"password" is required' });
   }
   if (password.length < 6) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

module.exports = {
	validateEmail,
	validatePassword,
};
