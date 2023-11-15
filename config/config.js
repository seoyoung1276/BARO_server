require('dotenv').config();
const env = process.env;

const development = {
  username: env.SQL_USERNAME,
  password: env.SQL_PW,
  database: env.SQL_DATABASE,
  host: env.SQL_HOST,
  dialect: "mysql",
  //port: env.SQL_PORT
};

const production = {
  username: env.SQL_USERNAME,
  password: env.SQL_PW,
  database: env.SQL_DATABASE,
  host: env.SQL_HOST,
  dialect: "mysql",
  //port: env.SQL_PORT
};

const test = {
    username: env.SQL_USERNAME,
    password: env.SQL_PW,
    database: env.SQL_DATABASE,
    host: env.SQL_HOST,
    dialect: "mysql",
    //port: env.MYSQL_PORT
};

module.exports = { development, production, test };