'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('prescriptions', {
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
      medication: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      posology: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      morning: {
        type: Sequelize.STRING
      },
      afternoon: {
        type: Sequelize.STRING
      },
      evening: {
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
    await queryInterface.dropTable('prescriptions');
  }
};