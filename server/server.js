var express = require('express');
var passport = require('passport');
var session = require('express-session');
var mongoose = require('mongoose');
var index = require('./routes/index');
var api = require('./routes/api');
var bodyParser = require('body-parser');
var User = require('../models/user');

//Bring in express and assign to variable app
var app = express();
var localStrategy = require('passport-local').Strategy;

//Establish root folder for server from where all resources will be available
app.use(express.static('server/public'));

//Bring in bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Bring in express-session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 60000, secure: false}
}));

//Bring in passport
app.use(passport.initialize());
app.use(passport.session());

//Bring in index and api in order to access the established routes (endpoints).
app.use('/api', api);
app.use('/', index);

//Mongo stuff
var mongoURI = 'mongodb://localhost:27017/passport_mongo';
var mongoDB = mongoose.connect(mongoURI).connection;

//Test for Mongo error/connection
mongoDB.on('error', function(error){
    console.log('MongoDB error: ', error);
});

mongoDB.on('open', function(){
    console.log('MongoDB connected!');
});

//Passport Things
passport.serializeUser(function(user, done){
    //console.log('Serialize ran');

    //Place ID on session, so we can get user back
    //console.log(user.id, user._id);
    console.log('serializeUser: ', user);
    done(null, user.id);
});

passport.deserializeUser(function(user, done){
    //console.log('Deserialize ran');

    console.log('deserializeUser', id);

    //Go get User object to put on req.user
    User.findById(user.id, function(error, user){
        if(error){
            done(error);
        }
        done(null, user);  //req.user
    });
});

passport.use('local', new localStrategy({
    passReqToCallback: true, usernameField: 'username'},
        function(request, username, password, done){

            //checking the password

            User.findOne({username: username}, function(error, user){
                if(error){
                    console.log(error);
                }

                if(!user){
                    return done(null, false);
                }

                user.comparePassword(password, function(error, isMatch){
                    if(error){
                        console.log(error);
                    }

                    if(isMatch){
                        done(null, user);  //success
                    } else {
                        done(null, false);  //fail
                    }
                });
            });
}));

//Start server
var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', port);
});