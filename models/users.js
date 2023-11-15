const Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
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
    sequelize,
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
};
