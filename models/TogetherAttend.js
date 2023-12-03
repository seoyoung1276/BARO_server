const {Sequelize, DataTypes } = require('sequelize');

class TogetherAttend extends Sequelize.Model{
  static initModel(sequelize) {
    TogetherAttend.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      together_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'together_posts',
          key: 'id'
        }
      },
      user_no: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_no'
        }
      }
    }, {
      sequelize,
      underscored: false,
      modelName: 'TogetherAttend',
      tableName: 'together_attend',
      paranoid: false,
      timestamps: false
    });
  } static associate(db) {
    db.TogetherAttend.belongsTo(db.TogetherPost, {foreignKey: 'id'})
    db.TogetherAttend.belongsTo(db.User, {foreignKey: 'user_no'})
  }
}

module.exports = TogetherAttend;
