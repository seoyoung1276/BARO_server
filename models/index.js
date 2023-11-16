const Sequelize = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];
const SharePost = require('./SharePost');
const User = require('./User');

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.SharePost = SharePost;

User.initModel(sequelize);
SharePost.initModel(sequelize);

// 연관 관계 설정은 initModel 이후에 호출
User.associate(db);
SharePost.associate(db);

module.exports = db;
