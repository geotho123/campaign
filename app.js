var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

var routes = require('./routes/index');
var api = require('./routes/api');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
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

router.get("/",function(req,res){
    res.json({"error" : false,"message" : "Hello World"});
});



// about page route (http://localhost:8080/about)
router.get('/about', function(req, res) {
    res.send('im the about page!');
});



module.exports = router;
module.exports = app;
