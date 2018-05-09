// resHandler
var resHandler = {
    'start': function(data) {

        // get game status
        game = data.game.game;

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
        game = data.game
        draw(game)
    }
    'nextPhase': function(data) {
        showMessage(`${data.game.phase} phase`);
        changeButton();
    }
}