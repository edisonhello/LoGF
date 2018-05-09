// show message in game log box
function showMessage(msg) {
    let time = new Date();
    gameLog.innerHTML = (`<text>${time.toLocaleTimeString()} | ${msg}</text><br>` + gameLog.innerHTML);
}

// get node information by id
function getNodeInfoById(id) {
    let node = game.allnode[id];
    let inf  = {};
    inf.id = id;
    inf.neighbors = node.neighbors;
    inf.terrain = getTerrainById(node.id, 'ZH');
    inf.building = node.building || undefined;
    inf.players = node.players || undefined;
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