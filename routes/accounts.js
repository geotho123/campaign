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

/* GET statesCollection page.
    var db = req.db;
    /*router.get('/',function(req, res) {
    var collection = db.get('accounts');
	  collection.find({},{},function(e,docs){
      console.log('findAll');
    console.log(docs);

    res.json( {
            "accounts" : docs

        });
    });
});

*/
/* GET statesCollection page. */
router.get('/',function(req, res) {
    var db = req.db;
    var query = req.query.q;
    var collection = db.get('accounts');
    if (query != null && query !=''){
      console.log('findbyQuery');
      console.log(query);
      collection.find({},{
      "$or": [
          {
              "name.first": query
          },
          {
              "name.last": query
          }
      ]
  },function(e,docs){

      console.log(docs);

      res.json( {
              "accounts" : docs

          });
      });

    }else {
      console.log('findAll');
      collection.find({},{},function(e,docs){
      console.log(docs);
      res.json( {
              "accounts" : docs
          });
      });

    }
});


/* GET statesCollection page. */
router.get('/:id',function(req, res) {

    var db = req.db;
    var idparam = req.params.id;
    var query = req.query.q;
    var collection = db.get('accounts');

    if(idparam != null && idparam !=''){
      console.log('findbyID');
      console.log(idparam);
  	  collection.findById(idparam,function(e,docs){
            console.log(docs);
            res.json(docs);
          });
    }
});



router.post('/',function(req, res) {
    var db = req.db;
    var body = req.body;
    var collection = db.get('accounts');
    if (body != null && body !=''){

      collection.insert(body, function (err, docs) {
        console.log(docs);
        res.json(docs);

		});
    }
});


module.exports = router;
