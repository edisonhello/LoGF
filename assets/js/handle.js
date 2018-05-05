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
        for(let idx in data.name) {
            if(typeof(data.name[i]) !== 'string') isPlayerName = false;
            else if(data.name[i] !== '') ++countPlayer;
        }
        if(isPlayerName === false || !(countPlayer >= 2 && countPlayer <= 4)) {
            socket.emit('response', {
                'type': 'setup',
            });
            return undefined;
        }
        let information = setup(data.name);
        socket.emit('response', {
            'type': 'setup',
            'game': information.game
        });
        return information;
    }
}

function handler(data, game, socket) {
    if(typeof(data) !== 'object') return;
    if(data.type === undefined) return;
    if(typeof(adapter[data.type]) !== 'function') return;
    return adapter[data.type](data, status, socket);
}

module.exports = handler;
