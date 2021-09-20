module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bindEmployees', {
      userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'userId',
        references: {
        model: 'users',
        key: 'id'
      }
    },
    companyId: {
      primaryKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      field: 'companyId',
      references: {
      model: 'companies',
      key: 'id'
    }
  },
  jobTitle: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bindEmployees');
  }
};