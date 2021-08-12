'use strict';

const { DATE } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {


    await queryInterface.bulkInsert("Todos",[
      {
        id:3,
        date:new Date().toString(),
        content:"quest1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:4,
        date:new Date().toString(),
        content:"quest2",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])

    /**
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
