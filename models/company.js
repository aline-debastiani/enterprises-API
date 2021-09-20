const company = (sequelize, DataTypes) => {
  const companyTable = sequelize.define("company", {
    name: DataTypes.STRING,
    area: DataTypes.STRING,
    foundationYear: DataTypes.INTEGER,
    description: DataTypes.STRING,
    director: DataTypes.STRING,
  }, { timestamps: false });

  return companyTable;
};

module.exports = company;