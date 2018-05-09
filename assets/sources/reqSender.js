// reqSender
var reqSender = {
    'move': function(destination) {
        if(!Array.isArray(destination)) return;
        if(destination.length !== 1) return;
        if(game.players[turn].action < moveRequirement[destination[0]].action){
            showMessage('行動力不足，移動不可');
            return;
        }
        if(game.players[turn].oxygen < moveRequirement[destination[0]].oxygen){
            showMessage('氧氣不足，移動不可');
            return;
        }
        if(destination[0] === 'r'){
            showMessage('資源點移動不可')
            return;
        }
        socket.emit('request', {
            'type': 'move',
            'destination': destination
        })
    }
}