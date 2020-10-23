'use strict';
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

const doctor = require("../models/doctor");

module.exports = {
  up: async (queryInterface, Sequelize) => {
await queryInterface.bulkInsert("doctors", [
      {
      name: "Albert Alberti",
      email: "alberti@doctor.com", 
      password: bcrypt.hashSync("IAmDoctor", SALT_ROUNDS),
      isDoctor: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
        name: "Andrea Andrei",
        email: "andrei@doctor.com", 
        password: bcrypt.hashSync("IAmDoctor", SALT_ROUNDS),
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
