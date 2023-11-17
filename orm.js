const SequelizeAuto = require('sequelize-auto');
const dotenv = require('dotenv');

dotenv.config();
const SQL_PW = process.env.SQL_PW;
const auto = new SequelizeAuto("baro", SQL_USERNAME, SQL_PW, {
      host: SQL_HOST,
      port: "3306",
      dialect: "mysql",
      directory: './models'
      //noAlias: true // as 별칭 미설정 여부
   }
);
auto.run((err)=>{
   if(err) throw err;
})