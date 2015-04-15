"use strict";
module.exports = function(sequelize, DataTypes) {
  var instrument = sequelize.define("instrument", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        models.instrument.hasMany(models.user)

      }
    }
  });
  return instrument;
};