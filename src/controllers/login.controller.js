const { getToken } = require('../services/user.service');
const { StatusCodes } = require('http-status-codes');

const postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await getToken(email, password);
    return res.status(StatusCodes.OK).json({ token });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid Fields' });
  }
};

module.exports = {
	postLogin,
};
