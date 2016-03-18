var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/campaign');
// get an instance of router





// Make our db accessible to our router
router.use(function(req,res,next){
    req.db = db;
    next();
});

/* GET statesCollection page. */
router.get('/',function(req, res) {
    var db = req.db;
    var collection = db.get('ConstituencyCollection');
	  collection.find({},{_id:0, name:1,abbr:1},function(e,docs){
    console.log(docs);

    res.json( {
            "constituencyCollection" :   docs

        });
    });
});


module.exports = router;
