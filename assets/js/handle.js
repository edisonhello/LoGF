'use strict'

const setup = require('./setup.js');

var adapter = {
    'refresh': (data, game, socket) => {
        socket.emit('response', {
            'type': 'refresh',
            'status': game
        })
    },
    'start': (data, trash, socket) => {
        let isPlayerName = true, countPlayer = 0;
        if(data.name.length !== 4) isPlayerName = false;
        for(let i in data.name) {
            if(typeof(data.name[i]) !== 'string') isPlayerName = false;
            else if(data.name[i] !== '') ++countPlayer;
        }
        if(isPlayerName === false || !(countPlayer >= 2 && countPlayer <= 4)) {
            socket.emit('response', {
                'type': 'start'
            });
            return undefined;
        }
        let information = setup(data.name);
        socket.emit('response', {
            'type': 'start',
            'game': information
        });
        return information.game;
    },
    'move': (data, game, socket) => {
        if(game.phase !== 'move') return;
        if(typeof(data.destination) !== 'string') return;
        const requirement = {
            'p': { 'action':1 },
            'f': { 'action':2 },
            'm': { 'action':3 },
            'o': { 'action':2, 'oxygen':3 },
            'b': { 'action':2, 'oxygen':3 }
        };
        if(typeof(requirement[data.destination[0]]) !== 'object') return;
        let currentPlayer = game.players[game.turn];
        let currentPosition = currentPlayer.location;
        if(game.allnode[currentPosition].neighbors.indexOf(data.destination) === -1) return;
        let movable = true;
        Object.entries
        Object.entries(requirement[data.destination[0]]).forEach(([key, val]) => {
            if(currentPlayer[key] < val) movable = false;
        });
        if(!movable) return;

        Object.entries(requirement[data.destination[0]]).forEach(([key, val]) => {
            currentPlayer[key] -= val;
        });

        let players = game.allnode[currentPlayer.location].players;
        players.splice(players.indexOf(currentPlayer.playerName), 1);
        game.allnode[data.destination].players.push(currentPlayer.playerName);
        currentPlayer.location = data.destination;

        socket.emit('response', {
            'type': 'move',
            'game': game,
            'destination': data.destination,
            'player': currentPlayer.playerName
        });
    }
}

function handler(data, game, socket) {
    if(typeof(data) !== 'object') return;
    if(data.type === undefined) return;
    if(typeof(adapter[data.type]) !== 'function') return;
    return adapter[data.type](data, game, socket);
}

module.exports = handler;
