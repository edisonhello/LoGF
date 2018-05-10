'use strict'

const setup = require('./setup.js');

function nextPhase(game) {
    const phases = ['revive', 'move', 'trigger', 'build', 'collect'];
    game.phase = phases[(phases.indexOf(game.phase) + 1) % 5];
    if(game.phase === 'revive' && !game.players[game.turn].isDead) nextPhase(game);
}

function shufflePlayer(game) {
    game.turn = 0;
    ++ game.round;
    game.players.sort((p1, p2) => { return p1.potential < p2.potential; });
    for(let i in game.players) for(let j in game.players) {
        if(i === j) continue;
        if(game.players[i].potential !== game.players[j].potential) continue;
        [game.players[i], game.players[j]] = [game.players[j], game.players[i]];
    }
}

function playerDeath(player) {
    player.wood = Math.round(player.wood / 2);
    player.apple = Math.round(player.apple / 2);
    player.stone = Math.round(player.stone / 2);
    player.diamond = Math.round(player.diamond / 2);
    player.saturation = 5;
    player.oxygen = 10;
    player.hp = 10;
    player.potential = Math.round(player.potential * 0.8);
    player.isDead = true;
    player.deathProtect = 2;
}

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
        if(typeof(game.allnode[data.destination]) !== 'object') return;
        let currentPlayer = game.players[game.turn];
        let currentPosition = currentPlayer.location;
        if(currentPosition === data.destination) {
            if(currentPlayer.action < 1) return;
            currentPlayer.action -= 1;
        }
        else{
            if(game.allnode[currentPosition].neighbors.indexOf(data.destination) === -1) return;
            let movable = true;
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
        }

        currentPlayer.isMoved = true;
        nextPhase(game);
        socket.emit('response', {
            'type': 'move',
            'game': game,
            'destination': data.destination,
            'player': currentPlayer.playerName
        });
    },
    'skip': (data, game, socket) => {
        if(game.phase === 'move') {
            let player = game.players[game.turn];
            if(!player.isMoved) return;
            player.isMoved = false;

            const recover = [0, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3];
            player.action += recover[player.saturation] + recover[player.oxygen];
            -- player.deathProtect;
            player.saturation -= 2;
            if(player.saturation <= 0) playerDeath(player);

            ++ game.turn;
            if(game.turn === game.players.length) shufflePlayer(game);

            game.phase = 'collect';
            nextPhase(game);
            socket.emit('response', {
                'type': 'skip',
                'game': game
            });
        }
        else if(game.phase === 'build') {
            nextPhase(game);
            socket.emit('response', {
                'type': 'skip',
                'game': game
            });
        }
        else if(game.phase === 'collect') {
            nextPhase(game);
            socket.emit('response', {
                'type': 'skip',
                'game': game
            });
        }
    },
    'revive': (data, game, socket) => {
        if(game.phase !== 'revive') return;
        let player = game.players[game.turn];
        if(player.spawnPoint.indexOf(data.spawnPoint) === -1) return;
        player.location = data.spawnPoint;
        player.isDead = false;

        nextPhase(game);
        socket.emit('response', {
            'type': 'revive',
            'game': game
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
