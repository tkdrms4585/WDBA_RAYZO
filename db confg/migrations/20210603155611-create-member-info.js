'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('memberInfos', {
      email: {
        type: Sequelize.STRING,
        //allowNUll: false,
        validate: {
          isEmail: true
        },
        primaryKey: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salt: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      role: {
        type: DSequelize.ENUM,
        values: ['user', 'admin', 'disabled']
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    });
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('memberInfos');
  }
};