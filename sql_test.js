var db = require('./models');



db.user.findAll({include:[db.instrument]})
.then(function(users){

  var cleanUsers=users.map(function(user){
    return {
      name:user.name,
      lat:user.lat,
      long:user.long,
      bio:user.bio,
      instruments:user.instruments.map(function(i){
        return i.name;
      })
    }
  })


});

  console.log(cleanUsers);


// db.user.find({
//   where:{id:32},
//   include:[db.instrument]
// }).then(function(user){
//   console.log(user.get());
//   user.instruments.forEach(function(item){
//     console.log('...',item.name);
//   });
// });



// db.user.find(32).then(function(user){
//   console.log(user.get());
//   user.getInstruments().then(function(items){
//     items.forEach(function(item){
//       console.log('...',item.name);
//     });
//   });
// });

