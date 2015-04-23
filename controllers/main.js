var db = require('../models');
var express = require('express');
var router = express.Router();


//home page of site
router.get('/',function(req,res){
    var user = req.getUser();
    res.render('main/index',{user:user});
});


// show the edit page
router.get('/auth/edit', function(req,res){
  var user = req.getUser();
  if(user){
    db.user.find(user.id).then(function(foundUser){
      res.render('auth/edit', {user:foundUser})
    });
    // if not signed in, prompted to do so
  }else{
    req.flash('danger','Please log in');
    res.redirect('/auth/login')
  }
})


// Update user info
router.post('/auth/edit', function(req,res){
  var user = req.getUser();

  db.user.find(req.getUser().id).then(function(user){
    user.updateAttributes({
       name:req.body.name,
       street:req.body.street,
       city:req.body.city,
       state:req.body.state,
       bio:req.body.bio
    }).then(function(){
      res.redirect('/main/map')
    });
  })
})


// show about page
router.get('/about', function(req,res){
  res.render('main/about')
})


// show the map page and get all user data for map
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
      email:location.email,
      instruments:location.instruments.map(function(i){
        return i.name;
      })
    }
  })


  res.render('main/map',{user:user, location:cleanUsers})
})


});



module.exports = router;