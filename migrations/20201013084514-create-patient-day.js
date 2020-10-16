'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('patientDays', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      itchScore: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      medicationMorning: {
        type: Sequelize.BOOLEAN
      },
      medicationAfternoon: {
        type: Sequelize.BOOLEAN
      },
      medicationEvening: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('patientDays');
  }
};