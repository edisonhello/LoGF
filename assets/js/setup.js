'use strict'

const Node = require('./node.js').Node;
const nodeData = require('../node_data.json');

function setup() {
    let allnode = {};
    let nodes = {
        resource: {},
        plain: {},
        forest: {},
        mountain: {},
        ocean: {},
        boss: {}
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
        for(let idx in nodeData[key]) {
            allnode[key].neighbors[idx] = allnode[nodeData[key][idx]];
        }
    }
}

module.exports = setup;
