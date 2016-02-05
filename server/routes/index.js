var express = require('express');
var path = require('path');
var router = express.Router();

//Serve up main page
router.get('/', function(request, response){
    var joinedPath = path.join(__dirname, '../public/views/index.html');
    response.sendFile(joinedPath);
});

//Need here (bottom) for catch-all to fix page refresh issue
router.get('/*', function(request, response){
    response.redirect('/');
});

module.exports = router;