var DataTypes = require("sequelize").DataTypes;
var _learn_comments = require("./learn_comments");
var _learn_posts = require("./learn_posts");
var _share_comments = require("./share_comments");
var _share_posts = require("./share_posts");
var _together_attend = require("./together_attend");
var _together_comments = require("./together_comments");
var _together_posts = require("./together_posts");
var _users = require("./users");

function initModels(sequelize) {
  var learn_comments = _learn_comments(sequelize, DataTypes);
  var learn_posts = _learn_posts(sequelize, DataTypes);
  var share_comments = _share_comments(sequelize, DataTypes);
  var share_posts = _share_posts(sequelize, DataTypes);
  var together_attend = _together_attend(sequelize, DataTypes);
  var together_comments = _together_comments(sequelize, DataTypes);
  var together_posts = _together_posts(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  learn_comments.belongsTo(learn_posts, { as: "post", foreignKey: "post_id"});
  learn_posts.hasMany(learn_comments, { as: "learn_comments", foreignKey: "post_id"});
  share_comments.belongsTo(share_posts, { as: "post", foreignKey: "post_id"});
  share_posts.hasMany(share_comments, { as: "share_comments", foreignKey: "post_id"});
  together_attend.belongsTo(together_posts, { as: "together", foreignKey: "together_id"});
  together_posts.hasMany(together_attend, { as: "together_attends", foreignKey: "together_id"});
  together_comments.belongsTo(together_posts, { as: "post", foreignKey: "post_id"});
  together_posts.hasMany(together_comments, { as: "together_comments", foreignKey: "post_id"});
  learn_comments.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(learn_comments, { as: "learn_comments", foreignKey: "user_no"});
  learn_posts.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(learn_posts, { as: "learn_posts", foreignKey: "user_no"});
  share_comments.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(share_comments, { as: "share_comments", foreignKey: "user_no"});
  share_posts.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(share_posts, { as: "share_posts", foreignKey: "user_no"});
  together_attend.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(together_attend, { as: "together_attends", foreignKey: "user_no"});
  together_comments.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(together_comments, { as: "together_comments", foreignKey: "user_no"});
  together_posts.belongsTo(users, { as: "user_no_user", foreignKey: "user_no"});
  users.hasMany(together_posts, { as: "together_posts", foreignKey: "user_no"});

  return {
    learn_comments,
    learn_posts,
    share_comments,
    share_posts,
    together_attend,
    together_comments,
    together_posts,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
