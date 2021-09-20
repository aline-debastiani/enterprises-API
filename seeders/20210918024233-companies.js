'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('companies',
    [{
      id: 1,
      name: 'Ioasys',
      area: 'Technology',
      foundationYear: 2012,
      description: 'Construímos experiências únicas para empresas ousadas.',
      director: 'Joao Silva',
    },
    ], { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('companies', null, {});
  }
};
