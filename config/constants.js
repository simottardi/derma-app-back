require("dotenv").config();

module.exports = {

  SALT_ROUNDS:parseInt(process.env.SALT_ROUNDS),
  PORT: process.env.PORT 
};
