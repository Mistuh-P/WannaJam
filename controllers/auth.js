var db = require('../models');
var express = require('express');
var bcrypt = require('bcrypt');
var router = express.Router();

//GET /auth/login
//display login form
router.get('/login',function(req,res){
    res.render('auth/login');
});

//POST /login
//process login data and login user
router.post('/login',function(req,res){
    db.user.find({where:{email:req.body.email}})
    .then(function(user){
        if(user){
            //check password
            bcrypt.compare(req.body.password,user.password,function(err,result){
                if(err) throw err;

                if(result){
                    //store user to session!!
                    req.session.user={
                        id:user.id,
                        email:user.email,
                        name:user.name
                    };
                    req.flash('success','You have been logged in.');
                    res.redirect('/main/map');
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
    //do login here (check password and set session value)

    //user is logged in forward them to the home page
    // res.redirect('/');
});

//GET /auth/signup
//display sign up form
router.get('/signup',function(req,res){
    res.render('auth/signup');
});

//POST /auth/signup
//create new user in database
router.post('/signup',function(req,res){

    var userQuery={email:req.body.email};
    var userData={email:req.body.email,
              password:req.body.password,
              name:req.body.name,
              street:req.body.street,
              city:req.body.city,
              state:req.body.state,
              zip:req.body.zip,
              bio:req.body.bio};

    db.user.findOrCreate({where:userQuery,defaults:userData})
    .spread(function(user,created){
        if(created){
            req.session.user={
                        id:user.id,
                        email:user.email,
                        name:user.name
                    };
            req.flash('success','Awesome. Just a little more.');
            res.redirect('/auth/instruments');
        }else{
            req.flash('danger','e-mail already exists.');
            res.redirect('/auth/signup');
        }

    }).catch(function(error){
        //NOT COVERED IN CLASS
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


    //do sign up here (add user to database)
    // res.send(req.body);
    //user is signed up forward them to the home page
    // res.redirect('/');
});

//GET /auth/instruments
//display sign up form
router.get('/instruments',function(req,res){
    res.render('auth/instruments');
});

router.post('/instruments',function(req,res){

    console.log('body',req.body);

    // var user = req.getUser().id check if user is logged in before proceeding.
    db.user.find(req.getUser().id).then(function(user){
        // console.log("This is what we want", user.get())

   //      var instruments = req.params.instruments;
   // console.log(typeof(instruments), instruments);
        // for(var i=0;i<instruments.length;i++){

        db.instrument.findAll({where:{
            id:req.body.instruments
        }}).then(function(instruments){
            user.setInstruments(instruments);
            res.redirect('/main/map');
        })

    })
});


//GET /auth/logout
//logout logged in user
router.get('/logout',function(req,res){
    delete req.session.user;
    req.flash('info','You have been logged out.')
    res.redirect('/');
});


module.exports = router;