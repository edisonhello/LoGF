// setup netword data
var graph     = document.getElementById('graph');
var graphData = {}, network;
var options   = {
    'height'      : 'calc(100% - 2px)',
    'width'       : 'calc(100% - 1px)',
    'interaction' : { 'dragNodes':false },
    'edges'       : { 'width':2 },
    'physics'     : { 'enabled':false },
    'nodes'       : {
        'chosen': { 'node':nodesOnClick },
        'borderWidth': 2,
        'shape': 'dot',
        'size' : 30,
        'font' : {
            'size' : 32,
            'color': '#ffffff'
        }
    }
}

// draw graph
function draw(graphNodes, graphEdges) {
    graphData.nodes   = new vis.DataSet(graphNodes);
    graphData.edges   = new vis.DataSet(graphEdges);
    network = new vis.Network(graph, graphData, options);

    network.on('deselectNode', function (params) {
        nodeInfo.innerHTML = '';
    })

    document.addEventListener('keydown', function(event){
        if(event.keyCode === 27){
            unselectNodes();
        }
    })
}
