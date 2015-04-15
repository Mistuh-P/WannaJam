"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("longlats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      long: {
        type: DataTypes.FLOAT
      },
      lat: {
        type: DataTypes.FLOAT
      },
      userId: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("longlats").done(done);
  }
};