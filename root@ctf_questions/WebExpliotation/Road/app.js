var express = require('express');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());

require('./models/users_model.js');

mongoose.connect('mongodb://localhost/xssdb');

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('.html',require('ejs').__express);
app.set('views',__dirname + '/views');
app.set('view engine','html');

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true,
    store:new mongoStore({
        mongooseConnection:mongoose.createConnection('mongodb://localhost/xssdb'),
        collection: 'session' })
}));

require('./routes.js')(app);

app.listen(8080);