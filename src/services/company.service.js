const { company, user } = require('../../models');
const { Op } = require('sequelize');

const registerCompany = async (data) => {
	const newCompany = await company.create(data);
	return newCompany;
};

const findCompanyByName = async (name) => {
	const companyByName = await company.findOne({ where: { name } });
	return companyByName;
};

const updateById = async (id, data) => {
	const { name, area, foundationYear, description, director } = data;
  const companyById = await company.findByPk(id);
  if (!companyById) throw new Error('Company does not exist')
  await company.update({ name, area, foundationYear, description, director }, { where: { id } });
	return { message: 'Company updated' };
};

const filterAll = async (searchTerm) => {
	if (!searchTerm) {
    const getAll = await company.findAll();
    return getAll;
  }
	const searchCompany = await company.findAll({
		where: { [Op.or]: [
			{ name: { [Op.like]: `%${searchTerm}%` } },
      { area: { [Op.like]: `%${searchTerm}%` } },
			{ foundationYear: { [Op.like]: `%${searchTerm}%` } },
			{ description: { [Op.like]: `%${searchTerm}%` } },
			{ director: { [Op.like]: `%${searchTerm}%` } },
		],
	 },
	});
	return searchCompany;
};

const companyDetail = async (id) => {
	const findCompany = await company.findByPk(id, {
		include: [
			{ model: user, as: 'users', attributes: [] }
		],
	});
	if (!findCompany) throw new Error('Company does not exist');
	return findCompany;
};

const deleteCompany = async (id) => {
	const companyToDelete = await company.findOne({ where: { id } });
	if (!companyToDelete) throw new Error('Company does not exist');
	await company.destroy({ where: { id } });
	return {};
};

module.exports = {
	registerCompany,
	findCompanyByName,
	updateById,
	filterAll,
	companyDetail,
	deleteCompany,
};
