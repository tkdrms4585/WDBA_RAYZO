'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }, // email 컬럼을 고유키로 두고, email 양식이 맞는지 확인하는 validate도 추가하였습니다.
         // 즉, 데이터가 " foo@example.com "과 같은 이메일 형식이 아니면, 유효성 검사에 실패하여 
         // 오류 메시지를 출력하고 DB에 저장하지 않습니다.
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt:{
      type: DataTypes.STRING
    }
  });

  return user;
};