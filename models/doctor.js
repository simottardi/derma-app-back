'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      doctor.hasMany(models.patient);
      doctor.hasMany(models.appointment)
      doctor.hasMany(models.prescription)
      // define association here
    }
  };
  doctor.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    unique: true,
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
      isDoctor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
    sequelize,
    modelName: 'doctor',
  });
  return doctor;
};