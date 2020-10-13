'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('appointments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      datetime: {
        type: Sequelize.DATE
      },
      adddress: {
        type: Sequelize.STRING
      },
 doctorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
                references: {
          model: "doctors",
          key: "id",
                }
      },
       patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
                references: {
          model: "patients",
          key: "id",
                }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('appointments');
  }
};