const { Sequelize, DataTypes} = require('sequelize');

class TogetherPost extends Sequelize.Model {
  static initModel(sequelize) {
    TogetherPost.init({
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
      place: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      meet_date: {
        type: DataTypes.STRING(40),
        allowNull: true
      },
      Hire_personnel: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      isfinish: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },{ 
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'TogetherPost',
      tableName: 'together_posts',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
  });
} static associate(db){
  db.TogetherPost.belongsTo(db.User, {foreignKey: 'user_no'})
}
}; 
module.exports = TogetherPost;
