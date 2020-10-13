'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class prescription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      prescription.belongsTo(models.doctor);
      prescription.belongsTo(models.patient);
          // define association here
    }
  };
  prescription.init({
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      medication: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      posology: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      morning: {
        type: DataTypes.STRING
      },
      afternoon: {
        type: DataTypes.STRING
      },
      evening: {
        type: DataTypes.STRING
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
       patientId: {
        type: DataTypes.INTEGER,
        allowNull: false
                }

  }, {
    sequelize,
    modelName: 'prescription',
  });
  return prescription;
};