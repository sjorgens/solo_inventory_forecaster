var express = require('express');
var index = require('./routes/index');
var api = require('./routes/api');
var bodyParser = require('body-parser');

//Bring in express and assign to variable app
var app = express();

//Bring in bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Establish root folder for server from where all resources will be available
app.use(express.static('server/public'));

//Bring in index and api in order to access the established routes (endpoints).
app.use('/api', api);
app.use('/', index);


//Start server
var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', port);
});