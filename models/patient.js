'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      patient.belongsTo(models.doctor);
      patient.hasMany(models.appointment);
      patient.hasMany(models.prescription);
    patient.hasMany(models.patientDay)
  }
  };
  patient.init({
     name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,        
        allowNull: false,
    unique: true,
      },
      password: {
        type: DataTypes.STRING,        
        allowNull: false,
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,        
        allowNull: true,
      },
  }, {
    sequelize,
    modelName: 'patient',
  });
  return patient;
};