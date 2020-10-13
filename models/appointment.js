'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      appointment.belongsTo(models.doctor);
      appointment.belongsTo(models.patient);
    }
  };
  appointment.init({
datetime: {
        type: DataTypes.DATE
      },
      adddress: {
        type: DataTypes.STRING
      },
 doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,

                },
      
       patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,

                }

  }, {
    sequelize,
    modelName: 'appointment',
  });
  return appointment;
};