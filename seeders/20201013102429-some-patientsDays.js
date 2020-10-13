'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert("patientDays",[
{
  itchScore: 1,
  note: "feeling good, itch is almost absent",
  image: "url-1",
  medicationMorning: true,
  medicationAfternoon: true,
  medicationEvening: true,
  patientId:1,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  itchScore: 2,
  note: "feeling ok, itch is almost gone",
  image: "url-2",
  medicationMorning: true,
  medicationAfternoon: true,
  medicationEvening: true,
  patientId:1,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  itchScore: 3,
  note: "feeling so and so, I feel itchy",
  image: "url-2",
  medicationMorning: true,
  medicationAfternoon: true,
  medicationEvening: true,
  patientId:1,
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  itchScore: 2,
  note: "feeling better, itch is almost gone",
  image: "url-11",
  medicationMorning: true,
  medicationAfternoon: false,
  medicationEvening: false,
  patientId:2,
  createdAt: new Date(),
  updatedAt: new Date(),
},
      
     ]);
  },


  down: async (queryInterface, Sequelize) => {
await queryInterface.bulkDelete("patientDays", null, {});
  }
};