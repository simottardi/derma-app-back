'use strict';

const doctor = require("../models/doctor");

module.exports = {
  up: async (queryInterface, Sequelize) => {
await queryInterface.bulkInsert("doctors", [
      {
      name: "Albert Alberti",
      email: "alberti@doctor.com", 
      password: "IAmDoctor",
      isDoctor: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        name: "Andrea Andrei",
        email: "andrei@doctor.com", 
        password: "IAmDoctor",
        isDoctor: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("doctors", null, {});
  }
};
