'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users',
    [
      {
        id: 1,
        fullName: 'Aline Debastiani',
        email: 'aline@email.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        birthDate: '08/07/1990',
        UF: 'SP',
        city: 'Ubatuba',
        schooling: 'Superior',
        role: 'Admin',
      },
      {
        id: 2,
        fullName: 'Andre Santos',
        email: 'andre@email.com',
        password: '5bd2026f128662763c532f2f4b6f2476',
        birthDate: '09/11/1975',
        UF: 'SP',
        city: 'São Paulo',
        schooling: 'Doutorado',
        role: 'User',
      },
      {
        id: 3,
        fullName: 'Fernanda Oliveira',
        email: 'fernanda@email.com',
        password: '17f5967ccaf7b037c70215d59dbe9057',
        birthDate: '15/10/1978',
        UF: 'SP',
        city: 'São Paulo',
        schooling: 'Superior',
        role: 'User',
      },
      {
        id: 4,
        fullName: 'Joao Silva',
        email: 'joao@email.com',
        password: '4f1ee55889ee9a56c1d0a8eb185829d2',
        birthDate: '01/01/1985',
        UF: 'SP',
        city: 'São Paulo',
        schooling: 'Mestrado',
        role: 'User',
      },
    ], { timestamps: false });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
