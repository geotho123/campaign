var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('geo:satyam@ds015909.mlab.com:15909/heroku_dnmj5kmm');
// get an instance of router





// Make our db accessible to our router
router.use(function(req,res,next){
    req.db = db;
    next();
});

/* GET statesCollection page. */
router.get('/',function(req, res) {
    var db = req.db;
    var collection = db.get('years');
	  collection.find({},{},function(e,docs){
    console.log(docs);

    res.json( {
            "yearsCollection" :   JSON.stringify(docs)

        });
    });
});


module.exports = router;
