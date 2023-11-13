'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.changeColumn('share_posts', 'isfinish', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('share_posts', 'isfinish',{
      type: Sequelize.BOOLEAN,
      allowNull: true,
    });
  },
};
