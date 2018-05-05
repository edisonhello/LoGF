'use strict'

var express = require('express');
var app     = express();
var server  = require('http').Server(app)
var io      = require('socket.io')(server)
var handleReq = require('./assets/js/handle.js')
var config  = require('./config.json');
var port    = config.port || 3000;

app.use('/', express.static(__dirname + '/assets'))

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html', function() {
        res.end();
    });
});

app.get('/test', function(req,res) {
    res.sendFile(__dirname + '/test.html', function() {
        res.end();
    });
});

app.listen(port, function () {
    console.log("Server listening on port", port);
});

io.sockets.on('connection', function(socket){
    socket.on('request', function(data){
        handleReq(data, socket)
    });
});