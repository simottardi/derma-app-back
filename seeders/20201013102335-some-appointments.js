"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("appointments", [
      {
        datetime: "2020-11-01T08:09:00.000Z",
        adddress: "dermatology practice street",
        doctorId: 1,
        patientId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        datetime: "2020-11-01T08:08:00.000Z",
        adddress: "dermatology practice street",
        doctorId: 2,
        patientId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        datetime: "2020-12-01T08:09:00.000Z",
        adddress: "dermatology practice street",
        doctorId: 1,
        patientId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        datetime: "2020-12-01T08:08:00.000Z",
        adddress: "dermatology practice street",
        doctorId: 2,
        patientId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        datetime: "2021-01-05T08:09:00.000Z",
        adddress: "dermatology practice street",
        doctorId: 1,
        patientId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        datetime: "2021-01-05T08:08:00.000Z",
        adddress: "dermatology practice street",
        doctorId: 2,
        patientId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        datetime: "2021-02-05T08:09:00.000Z",
        adddress: "dermatology practice street",
        doctorId: 1,
        patientId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        datetime: "2021-02-05T08:08:00.000Z",
        adddress: "dermatology practice street",
        doctorId: 2,
        patientId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        datetime: "2021-03-05T08:09:00.000Z",
        adddress: "dermatology practice street",
        doctorId: 1,
        patientId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        datetime: "2021-03-05T08:08:00.000Z",
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
  },
};
