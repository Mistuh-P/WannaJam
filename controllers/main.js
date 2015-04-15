var db = require('../models');
var express = require('express');
var router = express.Router();

//GET /
//home page of site
router.get('/',function(req,res){
    var user = req.getUser();
    res.render('main/index',{user:user});
});



router.get('/main/map', function(req,res){
  var user = req.getUser();
  db.user.findAll({include:[db.instrument]})
.then(function(users){

  var cleanUsers=users.map(function(location){
    return {
      name:location.name,
      lat:location.lat,
      long:location.long,
      bio:location.bio,
      instruments:location.instruments.map(function(i){
        return i.name;
      })
    }
  })


  res.render('main/map',{user:user, location:cleanUsers})
})


});




//GET /restricted
//an example restricted page
router.get('/restricted',function(req,res){
  if(req.getUser()){
    res.render('main/restricted');
  }else{
    req.flash('danger','You must be logged in to access that page.');
    res.redirect('/');
  }
});


module.exports = router;