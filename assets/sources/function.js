// show message in game log box
function showMessage(msg) {
    let time = new Date();
    gameLog.innerHTML = (`<text>${time.toLocaleTimeString()} | ${msg}</text><br>` + gameLog.innerHTML);
}

// get node information by id
function getNodeInfoById(id) {
    let node = game.allnode[id];
    if(!node) return '';
    let inf  = '';
    inf += `ID： ${id}<br>`;
    inf += `地形： ${getTerrainById(node.id, 'ZH')}<br>`;
    inf += `玩家： ${(node.players.length)? node.players.toString() : '無'}<br>`;
    inf += `建築： ${(node.building)? node.building.name : '無'}<br>`;
    inf += `事件： ${(node.triggered)? 'node.event.name' : '未觸發'}<br>`;
    inf += `相鄰點： ${node.neighbors.toString().replace(/,/g, ', ')}<br>`;
    return inf;
}

// get terrain type name by id
function getTerrainById(id, lang) {
    if(lang === 'ZH') {
        if(id[0] === 'r') return '資源';
        if(id[0] === 'p') return '平原';
        if(id[0] === 'f') return '森林';
        if(id[0] === 'm') return '山地';
        if(id[0] === 'o') return '海洋';
        if(id[0] === 'b') return '王點';
    }
    else {
        if(id[0] === 'r') return 'resource';
        if(id[0] === 'p') return 'plain';
        if(id[0] === 'f') return 'forest';
        if(id[0] === 'm') return 'mountain';
        if(id[0] === 'o') return 'ocean';
        if(id[0] === 'b') return 'boss';
    }
}

// show up available buttons
function changeButton() {
    for(let i in buttons){
        if(buttons[i].isAvailable()) {
            buttons[i].style.display = 'none';
        }
        else buttons[i].style.display = '';
    }
}

// unselect nodes
function unselectNodes() {
    if(network) network.unselectAll();
    nodeInfo.innerHTML = '';
}
