const { Sequelize, DataTypes} = require('sequelize')

class LearnComment extends Sequelize.Model {
  static initModel(sequelize) {
    LearnComment.init({
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
          model: 'learn_posts',
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
      modelName: 'LearnComment',
      tableName: 'learn_comments',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  } static associate(db){
    db.LearnComment.belongsTo(db.User, {foreignKey: 'user_no'})
    db.LearnComment.belongsTo(db.LearnPost, {foreignKey: 'id'})
  }
};

module.exports = LearnComment;