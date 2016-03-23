var express = require('express');
var router = express.Router();

var states = require('./states');

var country = require('./country');
var constituency = require('./constituency');
var candidates = require('./candidates');
var years = require('./years');
var accounts = require('./accounts');

router.use('/states', states);
router.use('/country', country);
router.use('/constituency', constituency);
router.use('/candidates', candidates);
router.use('/years', years);
router.use('/accounts', accounts);


router.get("/",function(req,res){
    res.json({"message" : "Welcome to Campaign API Page"});
});

// Make our db accessible to our router
router.use(function(req,res,next){
    next();
});



module.exports = router;
