'use strict'

module.exports = function(name, location) {

    // player data
    this.playerName  = name;
    this.location    = location;
    this.spawnPoint  = [location];
    this.isMoved = false;
    this.isDead = false;
    this.deathProtect = 0;

    // status initialize
    this.hp          = 20;
    this.maxHp       = 20;
    this.action      = 10;
    this.saturation  = 10;
    this.oxygen      = 10;
    this.capacity    = 10;
    this.attack      = 2;
    this.defense     = 0;
    this.potential   = 0;

    // resource
    this.wood        = 0;
    this.apple       = 0;
    this.stone       = 0;
    this.diamond     = 0;

    // player harvest action allowed
    this.canHarvestStone = false;
    this.canHarvestDiamond = false;
}
