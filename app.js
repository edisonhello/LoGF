'use strict'

var express = require('express');
var app     = express();
var server  = require('http').Server(app);
var http    = require('http');
var io      = require('socket.io')(server);
var handler = require('./assets/js/handle.js');
var config  = require('./config.json');
var port    = config.port || 3000;

app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/pages/index.html', function() {
        res.end();
    });
});

app.get('/test', function(req, res) {
    res.sendFile(__dirname + '/pages/test.html', function() {
        res.end();
    })
})

server.listen(port, function () {
    console.log("Server listening on port", port);
})

io.sockets.on('connection', function(socket) {
    let game;
    socket.on('start', function(data) {
        game = handler(data, null, socket);
    })
    socket.on('request', function(data) {
        if(!game) return;
        handler(data, game, socket);
    });
});