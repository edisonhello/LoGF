'use strict'

var express = require('express');
var app     = express();
var config  = require('./config.json');
var port    = config.port || 3000;

app.use('/', express.static(__dirname + '/assets'))

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html', function() {
        res.end();
    });
});

app.listen(port, function () {
    console.log("Server listening on port", port);
});
