require("dotenv").config();

// console.log("WHAT IS ENV", process.env.PORT);

module.exports = {
  "development": {
"url":`${process.env.DATABASE_URL_DEVELOPMENT}`,
    "dialect": "postgress"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
