'use strict'

module.exports = function(id) {
    this.id        = id;
    this.neighbors = [];
    this.triggered = false;
    this.event     = undefined;
    this.building  = undefined;
    this.players   = [];
}
