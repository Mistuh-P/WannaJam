"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
   migration.addColumn(
  'user',
  'long',
  DataTypes.FLOAT
)
   migration.addColumn(
  'user',
  'lat',
  DataTypes.FLOAT
)
    migration.addColumn(
  'user',
  'bio',
  DataTypes.TEXT
)
    done();
  },

  down: function(migration, DataTypes, done) {
   migration.removeColumn('user', 'long')
   migration.removeColumn('user', 'lat')
   migration.removeColumn('user', 'bio')

    done();
  }
};
