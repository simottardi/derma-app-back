'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("appointments",[
{
      datetime: new Date(),
      adddress: "dermatology practice street",
 doctorId: 1,
       patientId: 1, 
              createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
      datetime: new Date(),
      adddress: "dermatology practice street",
 doctorId: 2,
       patientId: 2, 
              createdAt: new Date(),
        updatedAt: new Date(),
      },
      
     ]);
  },
  down: async (queryInterface, Sequelize) => {
await queryInterface.bulkDelete("appointments", null, {});
  }
}; 
