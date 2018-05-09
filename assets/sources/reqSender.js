// reqSender
var reqSender = {
    'move': function(destination) {
        console.log('reqSender:4 destination', destination)
        if(typeof(destination) !== 'string') return;
        if(destination.length !== 3) return;
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
    }
}