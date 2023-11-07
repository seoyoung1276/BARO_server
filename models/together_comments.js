const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('together_comments', {
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
        model: 'together_posts',
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
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'together_comments',
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
        name: "user_no",
        using: "BTREE",
        fields: [
          { name: "user_no" },
        ]
      },
      {
        name: "post_id",
        using: "BTREE",
        fields: [
          { name: "post_id" },
        ]
      },
    ]
  });
};
