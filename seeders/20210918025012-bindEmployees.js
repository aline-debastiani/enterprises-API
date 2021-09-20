'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('bindEmployees',
      [
        {
          userId: 2,
          companyId: 1,
          jobTitle: 'Diretor'
        },
        {
          userId: 3,
          companyId: 1,
          jobTitle: 'Empregado'
        },
        {
          userId: 4,
          companyId: 1,
          jobTitle: 'Gestor'
        },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('bindEmployees', null, {});
  }
};
