// models/users.js 파일
const { Sequelize, DataTypes} = require('sequelize');

class User extends Sequelize.Model {
  static initModel(sequelize) {
    User.init(
      {
        user_no: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING(40),
          allowNull: true,
        },
        name: {
          type: DataTypes.STRING(40),
          allowNull: true,
        },
        major: {
          type: DataTypes.STRING(40),
          allowNull: true,
        },
        snsId: {
          type: DataTypes.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
        paranoid: false,
        charset: 'utf8mb4',
      }
    );
  }
  static associate(db){}
};

module.exports = User;
