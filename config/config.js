require('dotenv').config();
const env = process.env;

const development = {
  username: env.SQL_USERNAME,
  password: env.SQL_PW,
  database: env.SQL_DATABASE,
  host: env.SQL_HOST,
  dialect: "mysql",
  //port: env.SQL_PORT
  timezone: "+9:00"
};

const production = {
  username: env.SQL_USERNAME,
  password: env.SQL_PW,
  database: env.SQL_DATABASE,
  host: env.SQL_HOST,
  dialect: "mysql",
  //port: env.SQL_PORT
  timezone: "+9:00"
};

const test = {
    username: env.SQL_USERNAME,
    password: env.SQL_PW,
    database: env.SQL_DATABASE,
    host: env.SQL_HOST,
    dialect: "mysql",
    //port: env.MYSQL_PORT
    timezone: "+9:00"
};

module.exports = { development, production, test };