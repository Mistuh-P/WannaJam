var db = require('../models');
var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();


//display login form
router.get('/login',function(req,res){
    res.render('auth/login');
});


//process login data and login user
router.post('/login',function(req,res){
    db.user.find({where:{email:req.body.email}})
    .then(function(user){
        if(user){
            //check password
            bcrypt.compare(req.body.password,user.password,function(err,result){
                if(err) throw err;

                if(result){
                    //store user to session
                    req.session.user={
                        id:user.id,
                        email:user.email,
                        name:user.name
                    };
                    req.flash('success','You have been logged in.');
                    res.redirect('/main/map');
    //user is logged in forward them to the map page
                }else{
                    req.flash('danger','Invalid password.');
                    res.redirect('/auth/login');
                }
            })
        }else{
            req.flash('danger','Unknown user. Please sign up.');
            res.redirect('/auth/login');
        }
    })
    //error messages
});


//display sign up form
router.get('/signup',function(req,res){
    res.render('auth/signup');
});


//create new user in database
router.post('/signup',function(req,res){

    var userQuery={email:req.body.email};
    var userData={email:req.body.email,
              password:req.body.password,
              name:req.body.name,
              street:req.body.street,
              city:req.body.city,
              state:req.body.state,
              bio:req.body.bio};

    db.user.findOrCreate({where:userQuery,defaults:userData})
    .spread(function(user,created){
        if(created){
            req.session.user={
                        id:user.id,
                        email:user.email,
                        name:user.name
                    };
            req.flash('success','Awesome. What do you play?');
            res.redirect('/auth/instruments');
    //user is signed up then forwarded to the instruments page
        }else{
            req.flash('danger','e-mail already exists.');
            res.redirect('/auth/signup');
        }

    }).catch(function(error){

        //handle validation errors and create flash
        //messages
        if(error){
            if(Array.isArray(error.errors)){
                error.errors.forEach(function(errorItem){
                    req.flash('danger',errorItem.message);
                });
            }else{
                req.flash('danger','unknown error');
                console.log('unknown error',error);
            }
        }else{
            req.flash('danger','unknown error');
            console.log('error, but no error...');
        }
        res.redirect('/auth/signup');
    })

});


//display instruments form
router.get('/instruments',function(req,res){
    res.render('auth/instruments');
});


// set instruments played to user logged in
router.post('/instruments',function(req,res){
    db.user.find(req.getUser().id).then(function(user){
         db.instrument.findAll({where:{
            id:req.body.instruments
                }}).then(function(instruments){
                    user.setInstruments(instruments);
                        res.redirect('/main/map');
         })

    })
});







//logout logged in user
router.get('/logout',function(req,res){
    delete req.session.user;
    req.flash('info','You have been logged out.')
    res.redirect('/');
});


module.exports = router;