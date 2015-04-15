"use strict";
module.exports = function(sequelize, DataTypes) {
  var instrumentsusers = sequelize.define("instrumentsusers", {
    instrumentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return instrumentsusers;
};