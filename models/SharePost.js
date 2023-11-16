const { Sequelize, DataTypes} = require('sequelize');

class SharePost extends Sequelize.Model {
  static initModel(sequelize){
    SharePost.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_no'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP') // CURRENT_TIMESTAMP 대신 DataTypes.NOW 사용
    },
    title: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isfinish: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {
    sequelize,
    timestamps: false,
    underscored: false,
    modelName: 'SharePost',
    tableName: 'share_posts',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
}
static associate(db) {
  db.SharePost.belongsTo(db.User, {foreignKey: 'user_no'} )
}
};

module.exports = SharePost;