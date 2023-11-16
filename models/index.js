const Sequelize = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];
const User = require('./User');

const SharePost = require('./SharePost');
const ShareComment = require('./ShareComment')
const LearnPost = require('./LearnPost');
const TogetherPost = require('./TogetherPost');


const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.SharePost = SharePost;
db.ShareComment = ShareComment;
db.LearnPost = LearnPost;
db.TogetherPost = TogetherPost;

User.initModel(sequelize);
SharePost.initModel(sequelize);
ShareComment.initModel(sequelize);
LearnPost.initModel(sequelize);
TogetherPost.initModel(sequelize);

// 연관 관계 설정은 initModel 이후에 호출
User.associate(db);
SharePost.associate(db);
ShareComment.associate(db);
LearnPost.associate(db);
TogetherPost.associate(db);

module.exports = db;
