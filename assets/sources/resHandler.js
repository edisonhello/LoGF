// resHandler
var resHandler = {
    'start': function(data) {

        // get game status
        game = data.game.game;

        // draw map
        draw(data.game.graphNodes, data.game.graphEdges);

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
        changeButton();
    },
    'move': function(data) {
        if(game.players[game.turn].location === data.destination){
            showMessage(`${game.players[game.turn].playerName} 停留在 ${data.destination}`);
        }
        else showMessage(`玩家 ${data.player} 移動至 ${data.destination}`);
        network.selectNodes([data.destination]);
        
        // move animation
        let id = game.players[game.turn].playerName, il = id + "label";
        let loc = game.players[game.turn].location, des = data.destination;
        let locCor = {}, desCor = {}, gNodes = graphData.nodes._data;
        for(let i in gNodes){
          if(gNodes[i].id === loc){ locCor.x = gNodes[i].x, locCor.y = gNodes[i].y; }
          if(gNodes[i].id === des){ desCor.x = gNodes[i].x, desCor.y = gNodes[i].y; }
        }
        let count = 0, dx = (desCor.x - locCor.x) / 50, dy = (desCor.y - locCor.y) / 50;
        var SIIdmove = setInterval(function(){
          network.moveNode(id, locCor.x + count * dx, locCor.y + count * dy);
          network.moveNode(il, locCor.x + count * dx, locCor.y + count * dy - 70);
          count++;
          if(count === 50){ clearInterval(SIIdmove); }
        }, 10);
        unselectNodes();
        
        game = data.game;
        changeButton();
    },
    'skip': function(data) {
        game = data.game;
        showMessage(`現在是 ${game.players[game.turn].playerName} 的回合`);
        unselectNodes();
        changeButton();
    },
    'nextPhase': function(data) {
        showMessage(`${data.game.phase} phase`);
        changeButton();
    }
}
