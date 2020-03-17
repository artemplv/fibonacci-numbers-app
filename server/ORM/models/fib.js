'use strict';
module.exports = (sequelize, DataTypes) => {
  const Fib = sequelize.define('Fib', {
    ip: DataTypes.STRING,
    request: DataTypes.INTEGER,
    result: DataTypes.BIGINT
  }, {});
  Fib.associate = function(models) {
    // associations can be defined here
  };
  return Fib;
};