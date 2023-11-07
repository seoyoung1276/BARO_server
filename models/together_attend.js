const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('together_attend', {
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
    tableName: 'together_attend',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "together_id",
        using: "BTREE",
        fields: [
          { name: "together_id" },
        ]
      },
      {
        name: "user_no",
        using: "BTREE",
        fields: [
          { name: "user_no" },
        ]
      },
    ]
  });
};
