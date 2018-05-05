'use strict'

module.exports = {
    Node: (id) => {
        this.id = id;
        this.neighbors = [];
        this.event = undefined;
        this.building = undefined;
        this.triggered: false;
    }
};

