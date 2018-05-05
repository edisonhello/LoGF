'use strict'

module.exports = {
    Player: (name) => {
        this.playerName = name;

        this.hp = 20;
        this.action = 10;
        this.saturation = 10;
        this.oxygen = 10;
        this.capacity = 10;
        this.attack = 2;
        this.defence = 0;
        this.potential = 0;

        this.wood = 0;
        this.apple = 0;
        this.stone = 0;
        this.diamond = 0;
    }
};
