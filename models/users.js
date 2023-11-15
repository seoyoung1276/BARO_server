// models/users.js 파일

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('baro', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define('users', {
  user_no: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  major: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  snsId: {
    type: DataTypes.STRING(40),
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "user_no" },
      ]
    },
  ]
});

module.exports = User;
