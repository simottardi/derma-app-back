'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
await queryInterface.bulkInsert(
      "patients",[
        {
          name: "testuser",
          email: "test@test.com",
          password:"test1234",
          doctorId: 1,
          address: "test avenue",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "dummy",
          email: "a@a.com",
          password:"a",
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
