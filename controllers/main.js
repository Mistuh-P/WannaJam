var db = require('../models');
var express = require('express');
var router = express.Router();

//GET /
//home page of site
router.get('/',function(req,res){
    var user = req.getUser();
    res.render('main/index',{user:user});
});


router.get('/auth/edit', function(req,res){
  var user = req.getUser();
  if(user){
    db.user.find(user.id).then(function(foundUser){
      res.render('auth/edit', {user:foundUser})
    });
  }else{
    req.flash('danger','Please log in');
    res.redirect('/auth/login')
  }
})

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