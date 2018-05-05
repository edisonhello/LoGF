'use strict'

var express = require('express');
var app     = express();
var config  = require('./config.json');
var port    = config.port;

app.use('/', express.static(__dirname + '/assest'))

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html', function() {
        res.end();
    });
});

app.listen(port, function () {
    console.log("Server listening on port", port);
});