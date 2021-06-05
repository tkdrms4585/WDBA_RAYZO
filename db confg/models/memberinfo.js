'use strict'

module.exports = (sequelize, DataTypes) => {
  const memberInfo = sequelize.define('memberInfo', {
    email: {
      type: DataTypes.STRING,
      allowNUll: false,
      validate: {
        isEmail: true
      },
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin', 'disabled']
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    updatedAt: DataTypes.DATE,
    deletedAt: DataTypes.DATE
  }, {
      timestamps: true, //true면 createdAt, updatedAt컬럼을 자동으로 만들어줌
      underscored: true, // 자동생성변수들의 작성 타입 스네이크와 케멀중 선택
      modelName: 'memberInfo', // 시퀄라이즈의 모델이름을 의미
      tableName: 'memberInfos', // 시퀄라이즈를 이용해 생성할 테이블의 이름을 의미 (모델의 복수형)
      paranoid: false, // true면 deletedAt 컬럼으로 삭제시간을 표시해둠 (완전히 삭제안하고)
      charset: 'utf8',  // 한글설정을 위해 필요 
      collate: 'utf8_general_ci',
  });
  return memberInfo;
};