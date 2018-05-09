// resHandler
var resHandler = {
    'start': function(data) {

        // get game status
        game = data.game.game;

        // draw map
        draw(data.game.graphNodes, data.game.graphEdges)

        // zoom in effect
        network.once("beforeDrawing", function() {
            network.focus('f08', { scale: 2 });
        });
        network.once("afterDrawing", function() {
            network.fit({
                animation: {
                    duration: 3000,
                    easingFunction: 'linear'
                }
            });
        });

        // change interface
        showMessage('遊戲開始!!')
        $('#nameForm').hide();
    },
    'move': function(data) {
        game = data.game;
        network.selectNodes([data.destination]);
        showMessage(`玩家 ${data.player} 移動至 ${data.destination}`)
    },
    'nextPhase': function(data) {
        showMessage(`${data.game.phase} phase`);
        changeButton();
    }
}