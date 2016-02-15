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

//set up endpoints for signIn/signOut
router.get('/success', function(request, response){
    console.log('successful login: ', request.user);
    response.send(request.user);
});

router.get('/failure', function(request,response){
    response.send('failure');
});

router.post('/', passport.authenticate('local', {
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

router.get('/signOut', function(request, response){
    //console.log('from index.js....signing out user');
    //console.log('response: ', response);
    request.logout();
    response.sendStatus(200);
    //request.session.destroy();
    //response.redirect('/');
});

//Need here (bottom) for catch-all to fix page refresh issue
router.get('/*', function(request, response){
    response.redirect('/');
});

module.exports = router;