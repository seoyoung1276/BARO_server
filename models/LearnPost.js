const { Sequelize, DataTypes }= require('sequelize');


class LearnPost extends Sequelize.Model {
  static initModel(sequelize) {
    LearnPost.init({
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
      date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
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
      }
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'LearnPost',
      tableName: 'learn_posts',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  } static associate(db){
    db.LearnPost.belongsTo(db.User, {foreignKey: 'user_no'})
  }
};

module.exports = LearnPost;
