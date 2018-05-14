'use strict'

const Node          = require('./node.js');
const nodeData      = require('../node_data.json');
const nodePosition  = require('../node_position.json');
const nodeImg       = require('../node_img.json');
const Player        = require('./player.js');
//const PlayersImg  = require('../players_img.json');
const initLocation  = ['p04', 'p07', 'p17', 'p21'];

function setupNodes(playerName) {
    let allnode = {};
    let nodes = {
        'resource': {},
        'plain':    {},
        'forest':   {},
        'mountain': {},
        'ocean':    {},
        'boss':     {}
    };
    for(let key in nodeData) {
        allnode[key] = new Node(key);
        if(key[0] === 'r') nodes.resource[key] = allnode[key];
        if(key[0] === 'p') nodes.plain[key]    = allnode[key];
        if(key[0] === 'f') nodes.forest[key]   = allnode[key];
        if(key[0] === 'm') nodes.mountain[key] = allnode[key];
        if(key[0] === 'o') nodes.ocean[key]    = allnode[key];
        if(key[0] === 'b') nodes.boss[key]     = allnode[key];
    }
    for(let key in nodeData) {
        for(let i in nodeData[key]) {
            allnode[key].neighbors[i] = nodeData[key][i];
        }
    }
    for(let key in playerName) {
        if(playerName[key] !== '') {
            allnode[initLocation[key]].players.push(playerName[key]);
        }
    }
    return [allnode, nodes];
}

function getGraph(nodes) {
    let gNodes = [], gEdges = [];
    for(let category in nodes) {
        for(let nodeKey in nodes[category]) {
            let nNode = { 'id':nodeKey, 'label':nodeKey, 'group':category };
            if(nodePosition[nodeKey] !== undefined) {
                nNode.x = nodePosition[nodeKey].x * 100;
                nNode.y = nodePosition[nodeKey].y * 100;
                nNode.image = nodeImg[category];
                nNode.shape = 'image';
            }
            gNodes.push(nNode);
            for(let idx in nodes[category][nodeKey]['neighbors']) {
                let to = nodes[category][nodeKey]['neighbors'][idx];
                if(to < nodeKey) continue;
                gEdges.push({ 'from':nodeKey, 'to':to });
            }
        }
    }
    return [gNodes, gEdges];
}

function getPlayer(playerName) {
    let players = [];
    for(let i in playerName) {
        if(playerName[i] === '') continue;
        players.push(new Player(playerName[i], initLocation[i]));
    }
    return players;
}

// function setupPlayers(players){
//     let graphPlayers = [];
//     for(let i in players){
//         let PImg = {};
//         for(let j in nodePosition){
//             if(players[i].location !== j) continue;
//             PImg = {
//                 'id':    players[i].playerName,
//                 'label': players[i].playerName,
//                 'x':     nodePosition[players[i].location].x * 100,
//                 'y':     (nodePosition[players[i].location].y + 2) * 100,
//                 'image': undefined,
//                 'shape': 'circularImage'
//             };
//         }
//         graphPlayers.push(PImg);
//     }
//     for(let j = 0;j < 4;j++){
//         if(graphPlayers[j] == null) break;
//         if(graphPlayers[j].image == undefined){
//             graphPlayers[j].image = PlayersImg[j];
//         }        
//     }
//     return graphPlayers;
// }

function setup(playerName) {
    let [allnode, nodes] = setupNodes(playerName);
    let [graphNodes, graphEdges] = getGraph(nodes);
    let players = getPlayer(playerName);
//  let graphPlayers = setupPlayers(players);
    return {
        'game': {
            'round': 0,
            'turn': 0,
            'phase': 'move',
            'players': players,
            'map': nodes,
            'allnode': allnode
        },
        'graphNodes': graphNodes,
        'graphEdges': graphEdges,
//      'graphPlayers': graphPlayers
    }
}

module.exports = setup;
