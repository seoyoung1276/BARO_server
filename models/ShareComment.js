const { Sequelize, DataTypes } = require('sequelize');


class ShareComment extends Sequelize.Model {
  static initModel(sequelize) {
    ShareComment.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_no'
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'share_posts',
        key: 'id'
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    responseto: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    timestamps: false,
    underscored: false,
    modelName: 'ShareComment',
    tableName: 'share_comments',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
} static associate(db) {
  db.ShareComment.belongsTo(db.User, {foriegnKey: 'user_no'})
  db.ShareComment.belongsTo(db.SharePost, {foriegnKey: 'id'})
}
};

module.exports = ShareComment;