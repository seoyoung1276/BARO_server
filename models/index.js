const Sequelize = require('sequelize');
const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];
const User = require('./User');

const SharePost = require('./SharePost');
const ShareComment = require('./ShareComment')
const LearnPost = require('./LearnPost');
const LearnComment = require('./LearnComment');
const TogetherPost = require('./TogetherPost');
const TogetherComment = require('./TogetherComment');
const TogetherAttend = require('./TogetherAttend')


const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.User = User;
db.SharePost = SharePost;
db.ShareComment = ShareComment;
db.LearnPost = LearnPost;
db.LearnComment = LearnComment;
db.TogetherPost = TogetherPost;
db.TogetherComment = TogetherComment;
db.TogetherAttend = TogetherAttend;

User.initModel(sequelize);
SharePost.initModel(sequelize);
ShareComment.initModel(sequelize);
LearnPost.initModel(sequelize);
LearnComment.initModel(sequelize);
TogetherPost.initModel(sequelize);
TogetherComment.initModel(sequelize);
TogetherAttend.initModel(sequelize);

// 연관 관계 설정은 initModel 이후에 호출
User.associate(db);
SharePost.associate(db);
ShareComment.associate(db);
LearnPost.associate(db);
LearnComment.associate(db);
TogetherPost.associate(db);
TogetherComment.associate(db);
TogetherAttend.associate(db);

module.exports = db;
