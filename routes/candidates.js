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
    var collection = db.get('candidate');
	  collection.find({},{_id:0, name:1,abbr:1},function(e,docs){
    console.log(docs);

    res.json( {
            "candidateCollection" :   docs

        });
    });
});


module.exports = router;
