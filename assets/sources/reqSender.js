// declare move requirement
const moveRequirement = {
    'p': { 'action':1, "oxygen":0 },
    'f': { 'action':2, "oxygen":0 },
    'm': { 'action':3, "oxygen":0 },
    'o': { 'action':2, "oxygen":3 },
    'b': { 'action':2, "oxygen":3 }
}

// reqSender
var reqSender = {
    'move': function(destination) {
        console.log('reqSender:4 destination', destination)
        if(typeof(destination) !== 'string') return;
        if(typeof(game.allnode[destination]) !== 'object') return;
        if(destination === game.players[game.turn].location){
            if(game.players[game.turn].action < 1){
                showMessage('行動力不足，移動不可');
                return;
            }
            socket.emit('request', {
                'type': 'move',
                'destination': destination
            })
            return;
        }
        if(game.players[game.turn].action < moveRequirement[destination[0]].action){
            showMessage('行動力不足，移動不可');
            return;
        }
        if(game.players[game.turn].oxygen < moveRequirement[destination[0]].oxygen){
            showMessage('氧氣不足，移動不可');
            return;
        }
        if(destination[0] === 'r'){
            showMessage('資源點移動不可');
            return;
        }
        if(!game.allnode[game.players[game.turn].location].neighbors.includes(destination)){
            showMessage('非相鄰點，移動不可');
            return;
        }
        socket.emit('request', {
            'type': 'move',
            'destination': destination
        })
        console.log('sent move req')
    },
    'skip': function() {
        socket.emit('request', {
            'type': 'skip'
        })
    }
}