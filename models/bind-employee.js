const bindEmployee = (sequelize, DataTypes) => {
  const bindEmployeeTable = sequelize.define('bindEmployee', {
    jobTitle: DataTypes.STRING,
  }, { timestamps: false });

  bindEmployeeTable.associate = (models) => {
    models.user.belongsToMany(models.company, {
      onDelete: 'CASCADE',
      as: 'companies',
      through: bindEmployeeTable,
      foreignKey: 'userId',
      otherKey: 'companyId',
    });

    models.company.belongsToMany(models.user, {
      onDelete: 'CASCADE',
      as: 'users',
      through: bindEmployeeTable,
      foreignKey: 'companyId',
      otherKey: 'userId',
    });
  };

  return bindEmployeeTable;
};

module.exports = bindEmployee;