var express = require('express');
var path = require('path');
var path = require('http');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var aws = require('aws-sdk');
var request = require('request');

var app = express();
var router = express.Router();

var json = require('json-middleware');
//router.use(json);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});


/*
 * Respond to GET requests to /account.
 * Upon request, render the 'account.html' web page in views/ directory.
 */
app.get('/createAccount', function(req, res){
    res.render('pages/createAccount');
});

app.post('/createAccount', function(req, res){
    var body = req.body;
    console.log(body);
    res.render('pages/createAccount');
});


router.get('/getAccount', function(req, res){

  bodyParser.json(req);
  var query=req.param("searchQuery")
  console.log(req.param("searchQuery"));
  var endpoint= 'http://localhost:5000/api/accounts'
 var epWithQS = endpoint + '?q='+query
 console.log(epWithQS)
var options = {
url: epWithQS,
headers: {
  'Accept': 'application/json'
}
};
//console.log(url);
request.get(options, function (error, response, body) {
if (!error && response.statusCode == 200) {
  console.log(body) // Show the HTML for the Google homepage.
    res.render('pages/searchAccount', {
        body: body ,
        useListFlag: 'Y'

      });

    }
  })


  });

  router.post('/getAccount', function(req, res){

    bodyParser.json(req);
    var query=req.param("searchQuery")
    console.log(req.param("searchQuery"));
    var endpoint= 'http://localhost:5000/api/accounts'
   var epWithQS = endpoint + '?q='+query
   console.log(epWithQS)
  var options = {
  url: epWithQS,
  headers: {
    'Accept': 'application/json'
  }
  };
  //console.log(url);
  request.get(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
      res.render('pages/searchAccount', {
          body: body ,
          useListFlag: 'Y'

        });

      }
    })


    });

/*
 * Respond to GET requests to /account.
 * Upon request, render the 'account.html' web page in views/ directory.
 */
app.get('/showAccount', function(req, res){
    res.render('pages/showAccount');
});


app.get('/searchAccount', function(req, res){

    res.render('pages/searchAccount', {
        body: "" ,
        useListFlag: 'N'

      });
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


/*
 * Load the S3 information from the environment variables.
 */
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;


var routes = require('./routes/index');
var api = require('./routes/api');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
// apply the routes to our application
app.use('/', router);



router.use('/', routes);
router.use('/api', api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


router.get("/hello",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});



// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
  res.render('pages/about');
  });



/*
 * Respond to GET requests to /sign_s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and the
 * anticipated URL of the image.
 */
router.get('/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY , secretAccessKey: AWS_SECRET_KEY });
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.file_name,
        Expires: 60,
        ContentType: req.query.file_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.file_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});


/*
 * Respond to GET requests to /sign_s3.
 * Upon request, return JSON containing the temporarily-signed S3 request and the
 * anticipated URL of the image.
 */
router.get('/file/sign_s3', function(req, res){
    res.json({"error" : false,"message" : "Hello World",
    "Key": req.query.file_name,
    "ContentType": req.query.file_type
    });
});

/*
 * Respond to POST requests to /submit_form.
 * This function needs to be completed to handle the information in
 * a way that suits your application.
 */
router.post('/submit_form', function(req, res){
   var body = req.body
   console.log('submit form');
   console.log(body);
   var endpoint= 'http://localhost:5000/api/accounts'
//  var postBody='{"name":{"first":"'+body.firstName+'","last":"'+body.lastName+'"},"social":{"facebook":"'+body.facebook+'","twitter":"'+body.twitter+'","email":"'+body.email+'"},"profile_pic":"'+body.profile_pic+'"}';
  console.log(JSON.stringify(body))
   console.log(endpoint)
  var options = {
    url: endpoint,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  };
  //console.log(url);
  request.post(options, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body) // Show the HTML for the Google homepage.
      res.render('pages/searchAccount', {
          body: body ,
          useListFlag: 'N'
        });
   }
 })
  //  res.render('pages/searchAccount')
});

module.exports = router;
module.exports = app;
