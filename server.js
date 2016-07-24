var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var morgan = require('morgan'); 
var session = require('express-session');
var mongoose = require('mongoose');
var configDB = require('./Config/db.js');

mongoose.connect(configDB.url); //connect to database

require('./Config/passport.js')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'html');

app.use(session({ secret : "topsecret" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/Public')); //looking in the Public folder for static files, this may not work?

require('./App/routes.js')(app, passport);

app.listen(port);
console.log('Listening from port ' + port);