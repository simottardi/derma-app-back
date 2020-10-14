'use strict';
const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

module.exports = {
  up: async (queryInterface, Sequelize) => {
await queryInterface.bulkInsert(
      "patients",[
        {
          name: "testuser",
          email: "test@test.com",
          password:bcrypt.hashSync("test1234", SALT_ROUNDS),
          doctorId: 1,
          address: "test avenue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "dummy",
          email: "a@a.com",
          password:bcrypt.hashSync("a", SALT_ROUNDS),
          doctorId: 2,
          address: "dummy street",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
 
      ],
      {}
    );
  },
      

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete("patients", null, {});
  },
};
