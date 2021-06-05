'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('memberInfos', {
      email: {
        type: DataTypes.STRING,
        //allowNUll: false,
        autoIncrement: true,
        validate: {
          isEmail: true
        },
        primaryKey: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salt: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birth: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM,
        values: ['user', 'admin', 'disabled']
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: DataTypes.DATE,
      deleted_at: DataTypes.DATE
    });
  },
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('memberInfos');
  }
};