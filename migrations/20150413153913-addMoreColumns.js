"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
  'users',
  'long',
  DataTypes.STRING
)
    migration.addColumn(
  'users',
  'lat',
  DataTypes.STRING
)
    migration.addColumn(
  'users',
  'bio',
  DataTypes.STRING
)
    done();
  },

  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    done();
  }
};
