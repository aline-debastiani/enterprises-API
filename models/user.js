const user = (sequelize, DataTypes) => {
  const userTable = sequelize.define("user", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    birthDate: DataTypes.STRING,
    UF: DataTypes.STRING,
    city: DataTypes.STRING,
    schooling: DataTypes.STRING,
    role: DataTypes.STRING,
  }, { timestamps: false });

  return userTable;
};

module.exports = user;