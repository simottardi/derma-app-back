'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patientDay extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      patientDay.belongsTo(models.patient)
      // define association here
    }
  };
  patientDay.init({
          date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
itchScore: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      note: {
        type: DataTypes.STRING
      },
      image: {
        type: DataTypes.STRING
      },
      medicationMorning: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      medicationAfternoon: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      medicationEvening: {
        type: DataTypes.BOOLEAN,
      defaultValue: false
    },

       patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,

      }
  }, {
    sequelize,
    modelName: 'patientDay',
  });
  return patientDay;
};