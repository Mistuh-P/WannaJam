"use strict";
module.exports = function(sequelize, DataTypes) {
  var longlat = sequelize.define("longlat", {
    long: DataTypes.FLOAT,
    lat: DataTypes.FLOAT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return longlat;
};