var createError = require('http-errors');
const express = require('express');
const http = require('http');
const path = require('path');
const conf = require('./conf');
const log = require('./libs/log');
const session = require('express-session');
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const app = express();


app.set('port', conf.get('port'));

const server = http.createServer(app).listen(app.get('port') ,function () {
  log.info('Express server is running on port - '+conf.get('port'))

});
const io =require('C:\\Users\\tesle\\PhpstormProjects\\Chat\\socket\\index.js')(server);
app.set('io', io);


// view engine setup
app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cookieParser());
/*app.use(logger('dev'));*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/*app.use(cookieParser());*/


var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
  mongooseConnection: mongoose.connection
});

store.on('error', function(error) {
  console.log(error);
});

app.use(session({
  secret: "This is a secret",
  key: conf.get('session:key'),
  cookie: {maxAge: 30 * 60 * 1000},
  store: store,
  resave: true,
  saveUninitialized: true
}));
/*app.use(function (req, res, next) {
  if (req.session.user) {
    //console.log('req.sess.user --'+req.session);// после истичения сессии req.session.user всегда undefined,
    //несмотря на то что в
    //логине я повторно задаю это
    // свойство req.session.user = user['_id']
    next();
  } else {
    console.log('sess end');
    res.redirect("/login");
  }

});*/
app.get('/test', function(req, res) {
  res.send('Hello ' + JSON.stringify(req.session.id));
});

app.use(require('./middleware/loadUser'));
require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
