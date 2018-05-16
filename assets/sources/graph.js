// setup netword data
var graph     = document.getElementById('graph');
var graphData = {}, network;

 //Node Pattern
var options  = {
    'height'       : 'calc(100% - 2px)',
    'width'        : 'calc(100% - 1px)',
    'interaction'  : {
        'dragNodes': false,
        'hover'    : true
    },
    'edges'        : { 'width':2 },
    'physics'      : { 'enabled':false },
    'nodes'        : {
        'chosen'     : { 'node':nodesOnClick },
        'borderWidth': 2,
        'shape'      : 'circularImage',
        'size'       : 30,
        'font'       : {
            'size'   : 32,
            'color'  : '#ffffff',
            'vadjust': +5
        },
    },
    'groups': {
      'ocean'      : { 'color': { 'background':'#b8494f', 'border':'#b7282e' },
                       'shape': 'dot', 'size': 10 },
      'forest'     : { 'color': { 'background':'#956f29', 'border':'#ad7d4c' } },
      'mountain'   : { 'color': '#3eb370'},
      'boss'       : { 'color': { 'background':'#ec6d7e', 'border':'#e60000' },
                       'shape' : 'image', 'size' : 50, 'font':{ 'vadjust':-7 } },
      'player'     : { 'color': '#7b7c7d'},
      'playerLabel': { 'color': '#333631'}
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
