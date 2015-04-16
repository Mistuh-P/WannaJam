var db = require('../models');
var express = require('express');
var router = express.Router();


router.get('/edit',function(req,res){
    var user = req.getUser();
    res.render('auth/edit',{user:user});
});























module.exports = router;