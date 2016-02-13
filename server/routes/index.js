var express = require('express');
var path = require('path');
var router = express.Router();
var passport = require('passport');
var User = require('../../models/user');

//Serve up main page
router.get('/', function(request, response){
    var joinedPath = path.join(__dirname, '../public/views/index.html');
    response.sendFile(joinedPath);
});

//set up endpoints for login authentication
router.get('/success', function(request, response){
    console.log('successful login: ', request.user);
    //response.send('success');
    response.send(request.user);
});

//used prior to User Service
router.get('/failure', function(request,response){
    response.send('failure');
});

// used when User Service was added
//router.get('/failure', function(request,response){
//    var joinedPath = path.join(__dirname, '../public/views/fail.html');
//    response.sendFile(joinedPath);
//});

//router.get('/register', function(request,response){
//    response.sendFile(path.join(__dirname, '../public/views/register.html'));
//});

router.post('/', passport.authenticate('local', {
    //successRedirect: '/success', failureRedirect: '/failure'
    successRedirect: '/success', failureRedirect: '/'
}));

router.post('/registerMe/:username/:password', function(request, response){
    var userName = request.params.username;
    var passWord = request.params.password;
    User.create({ username: userName, password: passWord }, function(error, post){
        if(error){
            next(error);
        } else {
            response.redirect('/success');
        }
    });
});

//Need here (bottom) for catch-all to fix page refresh issue
router.get('/*', function(request, response){
    response.redirect('/');
});

module.exports = router;