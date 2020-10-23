'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   

  await queryInterface.bulkInsert("prescriptions",[
    {
   date: "2020-10-13 12:08:49.402+00",
    medication: "betametasone",
      posology: "three times a day",
      morning: true,
      afternoon: true,
      evening: true,
      doctorId: 1,
      patientId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
   },
       {
   date: "2020-10-13 12:08:49.402+00",
    medication: "cyclosporine",
      posology: "one time a day in the morning 50mg",
      morning: true,
      afternoon: false,
      evening: false,
      doctorId: 2,
      patientId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
   }
  ]);
},
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("prescriptions", null, {});
  }
}; 
