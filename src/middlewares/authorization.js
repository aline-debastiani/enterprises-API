const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');

const validationToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token not found' });
  }
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
  const { email, id, role } = payload;

  req.user = { email, id, role };

  next();
};

const isAdmin = (req, res, next) => {
  const { role } = req.user;
  if (role != 'Admin') {
    return res.status(StatusCodes.FORBIDDEN).json({ message: 'Require Admin Role!' })
  }
  next();
}

module.exports = { 
  validationToken,
  isAdmin,
};
