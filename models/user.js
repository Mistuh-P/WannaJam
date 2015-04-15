var bcrypt = require('bcrypt');
var geocoder = require('geocoder');
// this is if you need to do beforeUpdate
// var geocoderLifeCycle = beforeCreate: function(user,options,sendback){
    //     var addr = user.street+',' + user.city+','+user.state


    //     geocoder.geocode(addr, function ( err, data ) {


    //       user.lat = data.results[0].geometry.location.lat
    //       user.long = data.results[0].geometry.location.lng

    //       //inside gecode callback
    //       bcrypt.hash(user.password,10,function(err,hash){
    //         if(err){ throw err; }
    //         user.password=hash;
    //         sendback(null,user);
    //       })
    //     })
    //   }
    // }

"use strict";
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8,200],
          msg: 'Password must be at least 8 characters long.'
        }
      }
    },
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER,
    lat: DataTypes.STRING,
    long: DataTypes.STRING,
    bio: DataTypes.STRING
  },
  {
    classMethods: {
      associate: function(models) {
        models.user.hasMany(models.instrument)

      }
    },
    hooks: {
      beforeCreate: function(user,options,sendback){
        var addr = user.street+',' + user.city+','+user.state


        geocoder.geocode(addr, function ( err, data ) {


          user.lat = data.results[0].geometry.location.lat
          user.long = data.results[0].geometry.location.lng

          //inside gecode callback
          bcrypt.hash(user.password,10,function(err,hash){
            if(err){ throw err; }
            user.password=hash;
            sendback(null,user);
          })
        })
      }
    }
  });
  return user;
};


