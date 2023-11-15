const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('SharePost', {
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
      defaultValue: DataTypes.NOW // CURRENT_TIMESTAMP 대신 DataTypes.NOW 사용
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
    tableName: 'share_posts',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        fields: [
          { name: "id" }
        ]
      },
      {
        name: "user_no",
        fields: [
          { name: "user_no" }
        ]
      }
    ]
  });
};
