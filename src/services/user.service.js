const { user, company } = require('../../models');
const md5 = require('md5');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const createUser = async ({ fullName, email, password, birthDate, UF, city, schooling, role }) => ((await user.create({ 
  fullName,
  email,
  password,
  birthDate,
	UF,
	city,
	schooling,
	role, 
})).get({ plain: true })
);

const registerUser = async ({ fullName, email, password, birthDate, UF, city, schooling, role }) => {
	const newUser = {
		fullName,
		email,
		password: md5(password),
		birthDate,
		UF,
		city,
		schooling,
		role,
	}
	const userCreated = await createUser(newUser);
	return userCreated;
};

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const getToken = async (email) => {
	const emailExist = await findUserByEmail(email);
	if (!emailExist) throw new Error('Invalid fields');
  const userLogin = await user.findOne({ where: { email } });
	const login = {
		id: userLogin.id,
		email: userLogin.email,
		role: userLogin.role,
	};
  const token = jwt.sign(login, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const findUserByEmail = async (email) => {
	const userByEmail = await user.findOne({ where: { email } });
	return userByEmail;
};

const updateById = async (id, data) => {
	const { fullName, email, password, birthDate, UF, city, schooling } = data;
  const userById = await user.findByPk(id);
  if (!userById) throw new Error('User does not exist');
  await user.update({ fullName, email, password, birthDate, UF, city, schooling }, { where: { id } });
	return { message: 'User updated' };
};

const userDetail = async (id) => {
	const findUser = await user.findByPk(id, {
		include: [
			{ model: company, as: 'companies', through: { attributes: [] } },
		],
	});
	if (!findUser) throw new Error('User does not exist');
	return findUser;
};

const findUsers = async () => {
	const users = await user.findAll();
	return users;
};

const filterAll = async (searchTerm) => {
	if (!searchTerm) {
    const getAll = await findUsers();
    return getAll;
  }
	const searchUser = await user.findAll({
		where: { [Op.or]: [
			{ fullName: { [Op.like]: `%${searchTerm}%` } },
      { email: { [Op.like]: `%${searchTerm}%` } },
			{ birthDate: { [Op.like]: `%${searchTerm}%` } },
			{ UF: { [Op.like]: `%${searchTerm}%` } },
			{ city: { [Op.like]: `%${searchTerm}%` } },
			{ schooling: { [Op.like]: `%${searchTerm}%` } },
		],
	 },
	});
	return searchUser;
};

const deleteUser = async (id) => {
	const userToDelete = await user.findOne({ where: { id } });
	if (!userToDelete) throw new Error('User does not exist');
	await user.destroy({ where: { id } });
	return {};
};

module.exports = {
	registerUser,
	findUserByEmail,
	getToken,
	updateById,
	userDetail,
	filterAll,
	deleteUser,
	findUsers,
};
